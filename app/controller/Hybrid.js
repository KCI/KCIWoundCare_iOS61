Ext.define('KCI.controller.Hybrid', {
    extend: 'Ext.app.Controller',
	
    config: {
		refs: {
		},
		control: {
			emailLink: 'doSendEmail'
		}
    },
	init: function(){
				
		this.callParent(arguments);
	},
    cordovaCheck: function(){
       if(Ext.browser.is.WebView && Ext.browser.is.PhoneGap && !Ext.os.is.Desktop){
           return true;
       }
    },
	checkConnection: function(){
	    var networkState = navigator.network.connection.type;

	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.NONE]     = 'No network connection';
	
		if(KCI.util.Config.getDebug()){
			console.log("Network Status: " + states[networkState]);
		}

	    if(states[networkState] == 'No network connection' || states[networkState] == 'Unknown connection'){
			//no connection, probably offline
			return false;
		}else{
			//connection active - online in some capacity
			return true;
		}
	},
	doShowDocument: function(url){
		//requires ChildBrowser Plugin
		window.plugins.childBrowser.showWebPage(encodeURI(url));
	},
	doShowLink: function(url){
		//requires ChildBrowser Plugin
		window.plugins.childBrowser.showWebPage(url);
	},
	doTrackEvent: function(category, action, opt_label, opt_value) {
		//Google Analytics Event Tracking
		//GG googleAnalytics = window.plugins.googleAnalyticsPlugin;
		//googleAnalytics.trackEvent("category", "action", "label goes here", 1234);
		//GG googleAnalytics.trackEvent(category, action, opt_label, opt_value);
		//GG if(KCI.util.Config.getDebug() == true)console.log('GA Event: '+ category + action);
		
	},
	doTrackPageView: function(opt_pageURL){
		//Google Analytics Page Tracking
		//GG googleAnalytics = window.plugins.googleAnalyticsPlugin;
		//googleAnalytics.trackPageview("/test");
		//GG googleAnalytics.trackPageview(opt_pageURL);
		//GG if(KCI.util.Config.getDebug() == true)console.log('GA Page View: '+ opt_pageURL);
	},
	//GG Initial run move assests from bundle to Documents
	doMoveData: function(){
		//Data
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
			var LocalRoot = fileSystem.root.fullPath;
			console.log("GG 1 Local FullPath: " + LocalRoot);
			
			// Retrieve data directory end exit if exists
			fileSystem.root.getDirectory("Data", {create: false, exclusive: false}, 
			function(parent){
				var fullDataPath = LocalRoot + '/' + parent.name;				
				//update config LOCALDATA
				KCI.util.Config.setLOCALDATA(fullDataPath);				
			},
			//GG Need to move from bundle to ../Documents/Data the pdfs and images from bundled
			function(evt){
				console.log("GG 2 Get Local Data Dir Fail: " + evt.code);
			});			
			//If exists then exit
			if(KCI.util.Config.getLOCALDATA()){ 
				//KCI.app.getApplication().getController('Hybrid').doMoveData();
				console.log("GG 3 Local Data folder exists..." + KCI.util.Config.getLOCALDATA());
				return
			}
			
			'use strict';
			var wwwpath = window.location.pathname;
			wwwpath = wwwpath.substr (wwwpath, wwwpath.length - 10);
			console.log("GG 4 WWW path: " + wwwpath);
			//
			
			var ft = new FileTransfer();
			ft.download(wwwpath + "data/content9.json", LocalRoot + '/' + "GGcontent9.json",
			function(thefile){
				console.log("GG 9 Download Completed: " + thefile.fullPath);				
			},
			function(error){
				console.log("GG 9.1 Error Download File: " + error.code);
			});
			
			//If it does not exists, then copy
			//console.log("GG Data folder created..." + KCI.util.Config.getLOCALDATA());
			//LocalData = KCI.util.Config.getLOCALDATA();
			//console.log("GG Documents/Data path: " + LocalData);
			
			
			
			
			fileSystem.root.getDirectory(wwwpath + "data", {create: false, exclusive: false}, 
			function(parent){
				console.log("GG 5.0 www Data Directory: " + parent/name);
				// copy the directory to a new directory and rename it
		    	parent.copyTo(LocalRoot, "Data", success, fail);
		    	KCI.util.Config.setLOCALDATA(LocalRoot + '/' + 'Data');
			},
			function(evt){
				console.log("GG 5 Copy from WWW/Data into Local Data Dir Fail: " + evt.code);
			});
		    
			if(!KCI.util.Config.getLOCALDATA()){ 
				KCI.app.getApplication().getController('Hybrid').doMoveData();
				return
			}

		},
		function(evt){
			console.log("GG 6 doMoveData Failed: " + evt.code);
		});
	},
	doMoveAssets: function(){
		//Copy Config, Content, Manifest-Images, Manifest-Videos, Manifest-Documents JSON File
		//Assets
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
			var LocalData = fileSystem.root.fullPath;
			console.log("GG Local FullPath: " + LocalData);
			// Retrieve assets directory, or create it if it does not already exist
			fileSystem.root.getDirectory("Assets", {create: true, exclusive: false}, 
			function(parent){
				var fullPath = LocalData + '/' + parent.name;
				//update config LOCALASSETS
				KCI.util.Config.setLOCALASSETS(fullPath);
				
			},
			//GG Need to move from bundle to ../Documents/Assets the json files from bundled 
			function(evt){
				console.log("Get Assets Dir Fail: " + evt.code);
			});
			if(!KCI.util.Config.getLOCALASSETS()){ 
				KCI.app.getApplication().getController('Hybrid').doMoveAssets();
				return
			}
			console.log("GG Assets folder created..." + KCI.util.Config.getLOCALASSETS());
			LocalData = KCI.util.Config.getLOCALASSETS();
			console.log("GG Documents/Assets path: " + LocalData);
			var wwwpath = window.location.pathname;
			wwwpath = wwwpath.substr (wwwpath, wwwpath.length - 10);
			console.log("GG WWW path: " + wwwpath);
		},
		function(evt){
			console.log("Request FS Fail: " + evt.code);
		});

	},
	//
	doResolveConfig: function(){
		//GG Need to move from bundle to ../Documents/Assets the pdfs and images from bundled
		//GG Need to move from bundle to ../Documents/Data the json files from bundled 
		//KCI.app.getApplication().getController('Hybrid').doMoveData();
		//KCI.app.getApplication().getController('Hybrid').doMoveAssets();
		
		
		// request the persistent file system
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
			var LocalData = fileSystem.root.fullPath;
			
			// Retrieve data directory, or create it if it does not already exist
			fileSystem.root.getDirectory("Data", {create: true, exclusive: false}, 
			function(parent){
				var fullPath = LocalData + '/' + parent.name;
				//update config LOCALDATA
				KCI.util.Config.setLOCALDATA(fullPath);
				//Resolve Assets FS
				KCI.app.getApplication().getController('Hybrid').doResolveAssets();
			},
			function(evt){
				console.log("Get Data Dir Fail: " + evt.code);
			});
			
		},
		function(evt){
			console.log("Request FS Fail: " + evt.code);
		});
	},
	doResolveAssets: function(){
		// request the persistent file system
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
			var LocalData = fileSystem.root.fullPath;
						
			// Retrieve assets directory, or create it if it does not already exist
			fileSystem.root.getDirectory("Assets", {create: true, exclusive: false}, 
			function(parent){
				var fullPath = LocalData + '/' + parent.name;
				//update config LOCALASSETS
				KCI.util.Config.setLOCALASSETS(fullPath);
				//Start the update
				if(KCI.util.Config.getLOCALASSETS() != null){
					KCI.app.getApplication().getController('Hybrid').doConfigDownload();
				}else{
					KCI.app.getApplication().getController('Hybrid').doResolveAssets();
				}
			},
			function(evt){
				console.log("Get Assets Dir Fail: " + evt.code);
			});
		},
		function(evt){
			console.log("Request FS Fail: " + evt.code);
		});
	},
	doConfigDownload: function(){
		//Check for LocalData path in config
		if(!KCI.util.Config.getLOCALDATA()){
			//if empty, call method to resolve FS path and update config
			KCI.app.getApplication().getController('Hybrid').doResolveConfig();
			return
		}
		
		//check if online
		if(KCI.app.getApplication().getController('Hybrid').checkConnection() == true){
			var config = KCI.util.Config.getCONFIG();
		    var cdn = KCI.util.Config.getCDN();
			var LocalData = KCI.util.Config.getLOCALDATA();

		    var fullURI = cdn + '/' + config;
			var fullPath = LocalData + '/' + config;

			if(KCI.util.Config.getDebug() == true){
				console.log("fullURI: " + fullURI);
				console.log("fullPath:" + fullPath);
			}

			var ft = new FileTransfer();
			ft.download(fullURI,fullPath,
				function(entry) {
					if(KCI.util.Config.getDebug() == true){
						console.log("DL Success: " + entry.fullPath);
					}
					KCI.app.getApplication().getController('Hybrid').doParseConfig(entry.fullPath);
				},
				function(error) {
					if(KCI.util.Config.getDebug() == true){
						console.log("DL Error Source: " + error.source);
						console.log("DL Error Target: " + error.target);
					}
				}
			);
		}else{
			//launch update
			KCI.app.getApplication().getController('Updates').doConfigUpdate();
			
			if(KCI.util.Config.getDebug()){
				console.log("Config Download Exited");
			}
		}
		
	},
	doParseConfig: function(fullPath){
		var reader = new FileReader();
        reader.onloadend = function(evt) {
           var jsObj = JSON.parse(evt.target.result);
           KCI.app.getApplication().getController('Hybrid').doDownloadData(jsObj.config);
        };
        reader.readAsText(fullPath);
	},
	doDownloadData: function(config){
		var LocalData = KCI.util.Config.getLOCALDATA();	
		
		for (var i = 0; i < config.length; i++) {
			
			var fullURI = null;
			var fullPath = null;
			
			fullURI = config[i].url;
			fullPath = LocalData + '/' + config[i].filename;
				
			var ft = new FileTransfer();
			ft.download(fullURI,fullPath,
				function(entry) {
					if(KCI.util.Config.getDebug() == true){
						console.log("DL Success: " + entry.fullPath);
					}                        
            
					if(entry.name == 'manifest-documents2.json'){
					    KCI.app.getApplication().getController("Hybrid").doProcessAssets(entry);
					} else { 
					    if(entry.name == 'manifest-images5.json'){
						    KCI.app.getApplication().getController('Hybrid').doProcessAssets(entry);
					    } 
					    else if(entry.name == 'manifest-videos2.json'){
						    //KCI.app.getApplication().getController('Hybrid').doProcessAssets(entry);
						}
					}
					
				},
				function(error) {
					if(KCI.util.Config.getDebug() == true){
						
						console.log("DL Error Source: " + error.source);
						console.log("DL Error Target: " + error.target);
					}
				}
			);	
		}//end for
	},
	doProcessAssets: function(entry){
		var LocalAssets = KCI.util.Config.getLOCALASSETS();
		if(KCI.util.Config.getDebug() == true)console.log("Assets: "+LocalAssets);		
		
		//Check for LocalData path in config
		if(LocalAssets != null){
			
			var reader = new FileReader();
	        
			reader.onloadend = function(evt) {
	        	var jsObj = JSON.parse(evt.target.result);
				var count = 1;
				
				for (var i = 0; i < jsObj.root.length; i++) {

					var fullURI = null;
                    var lookupPath = null;
                    var fullPath = null;

					fullURI = jsObj.root[i].url;
					fullPath = LocalAssets + '/' + jsObj.root[i].filename;
					lookupPath = "file://" + LocalAssets + '/' + jsObj.root[i].filename;
						
					//add asset to download queue
					KCI.app.getApplication().getController('Hybrid').doAddToQueue(lookupPath,fullURI,fullPath,"new");
					
					//if we have reached the end of the loop
					if(jsObj.root.length == count){
						//start download process
						KCI.app.getApplication().getController('Hybrid').doProcessQueueTimer();
					}
					
					//increment counter
					count++;

				}//end for
	        };//end onloadend	
			reader.readAsText(entry.fullPath);
		}
	},
	doAddToQueue: function(lookupPath,fullURI,fullPath, status){
		//get instance of DownloadQueue
		var downloadQueue = Ext.getStore('DownloadQueue');
		
		//TODO: version check?										
		window.resolveLocalFileSystemURI(lookupPath, 
			function(success){							
				if(KCI.util.Config.getDebug())console.log("Asset Found:" + success.name);
			},
			function(error){
				//check status, apply default
				if(!status){
					status = "new";
				}

				var queueRecord = Ext.create('KCI.model.DownloadQueue', {
				    lookuppath: lookupPath,
				    fulluri : fullURI,
					fullpath: fullPath,
					status: status
				});		

				var existingRecord = downloadQueue.findRecord('fullpath',fullPath, null, false, false, true);

				if(!existingRecord){
					downloadQueue.add(queueRecord);
					downloadQueue.sync();
					if(KCI.util.Config.getDebug()){
						console.log("Queue: " + queueRecord.data.fulluri);
					}
				}
			});
	},
	doProcessQueue: function(){
		//get instance of DownloadQueue
		var downloadQueue = Ext.getStore('DownloadQueue');
		
		var theCount = downloadQueue.getCount();
		
		if(theCount > 0){
			//get each record, call download method
			downloadQueue.each(function (record) {
				//If record is new or failed, proceed to download, update status to downloading
				if(record.data.status == "new" || record.data.status == "failed"){
					record.set('status','downloading');
					downloadQueue.sync();
					//call download method
					KCI.app.getApplication().getController('Hybrid').doDownloadAsset(record.data.lookuppath, record.data.fulluri, record.data.fullpath);
				}			
			});
		}else{
			//update timer
			KCI.app.getApplication().getController('Hybrid').doUpdateTimer();
		}
	},
	doDownloadAsset: function(lookupPath,fullURI,fullPath){
		//get instance of DownloadQueue
		var downloadQueue = Ext.getStore('DownloadQueue');
		
		//download asset
		var ft = new FileTransfer();
		ft.download(fullURI,fullPath,
			function(entry) {
				if(KCI.util.Config.getDebug() == true){
					console.log("Asset Download Success: " + entry.fullPath);
				}
				
				//download finished, clean up queue
				var queueRecord = downloadQueue.findRecord('fullpath',entry.fullPath, null, false, false, true);
				if(queueRecord){
					downloadQueue.remove(queueRecord);
					downloadQueue.sync();
				}
				
				//update timer
				KCI.app.getApplication().getController('Hybrid').doUpdateTimer();
			},
			function(error) {
				if(KCI.util.Config.getDebug() == true){
					console.log("Asset Download Error Source: " + error.source);
					console.log("Asset Download Error Target: " + error.target);
				}
				
				//update record with failed status
				var queueRecord = downloadQueue.findRecord('fullpath',error.target, null, false, false, true);
				if(queueRecord){
					queueRecord.set('status', 'failed');
					downloadQueue.sync();
					KCI.app.getApplication().getController('Hybrid').doQueueTimer();
				}
			}
		);//end FT
	},
	doQueueTimer: function(){
			
		//kickoff the queue delayed task
		var task = Ext.create('Ext.util.DelayedTask', function() {
		    KCI.app.getApplication().getController('Hybrid').doProcessQueue();
		});
	
		//start timer
		task.delay(6000);
	},
	doUpdateTimer: function(){
		//update delayed task
		var task = Ext.create('Ext.util.DelayedTask', function() {
		    //get instance of DownloadQueue
			var downloadQueue = Ext.getStore('DownloadQueue');
			var theCount = downloadQueue.getCount();
			var updated = KCI.util.Config.getUPDATED();
			
			//if nothing is in the queue, we're ready to run the update
			if(theCount == 0 && updated == false){
				KCI.util.Config.setUPDATED(true);
				KCI.app.getApplication().getController('Updates').doConfigUpdate();
			}
		});
		
		//start timer
		task.delay(3000);
	},
	doProcessQueueTimer: function(){
		//update delayed task
		var task = Ext.create('Ext.util.DelayedTask', function() {
			KCI.app.getApplication().getController('Hybrid').doProcessQueue();
		});
		
		//start timer
		task.delay(3000);
	}
});