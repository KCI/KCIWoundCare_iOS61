/**
 *
 */
Ext.define('KCI.controller.Updates', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            
        }
    },
    
	/**
	 *
	 */
	doConfigUpdate: function(){
		if(KCI.util.Config.getDebug())console.log('Updating');
		
		//get instances of local and remote store
		var remoteStore = Ext.getStore('RemoteConfig');
		var localStore = Ext.getStore('LocalConfig');
		
		if(KCI.util.Config.getHybrid() == true){
			if(this.getApplication().getController('Hybrid').cordovaCheck() == true){
				if(KCI.util.Config.getLOCALDATA() != null){					
					var fullPath = "file://" + KCI.util.Config.getLOCALDATA() + '/' + KCI.util.Config.getCONFIG();
					
					window.resolveLocalFileSystemURI(fullPath, 
						function(success){
							remoteStore.setProxy({
				                url: fullPath
				            });
							
							if(KCI.util.Config.getDebug())console.log("Config URI: " + fullPath);
							
							loadStore(localStore,remoteStore);
						},
						function(error){
							console.log("Config: Resolve FS Fail");
							loadStore(localStore,remoteStore);
						});				
				}else{
				   loadStore(localStore,remoteStore);
				}
			}
        }else{
			loadStore(localStore,remoteStore);
		}

		function loadStore(localStore, remoteStore){
			//load remote store
			remoteStore.load({
			    scope   : this,
			    callback: function(records, operation, success) {
					//check if store has any data
					var localCount = localStore.getCount();

					if(localStore.getCount() == 0){
						KCI.app.getApplication().getController('Updates').syncStore(localStore, remoteStore);
					}else{
						
						//compare localstore records to remotestore
						//if a remote record doesnt exist remove local record
						localStore.each(function (record) {
							remoteRecord = remoteStore.findRecord('xid',record.data.xid, null, false, false, true);
							if(!remoteRecord){
								if(KCI.util.Config.getDebug())console.log("Remove " + record.data.type + ": Yes");
								localStore.remove(record);
							}
						});
						
						//sync store
					    if(localStore.sync()){
							if(KCI.util.Config.getDebug())console.log('Sync: Config(Local => Remote)');
						}
						
						//version check each item in config, if new version save remote record to local
						remoteStore.each(function (record) {
							var localRecord = localStore.findRecord('xid',record.data.xid, null, false, false, true);
							if(localRecord){
								if(record.data.version > localRecord.data.version){
									if(KCI.util.Config.getDebug())console.log("Update " + record.data.type + ": Yes");
									localStore.remove(localRecord);
									localStore.add(record);
								}
							}else{
								if(KCI.util.Config.getDebug())console.log("Add " + record.data.type + ": Yes");
								localStore.add(record);
							}	
					    });
						//sync store
					    if(localStore.sync()){
							if(KCI.util.Config.getDebug())console.log('Sync: Config(Remote => Local)');
						}
					}	
					KCI.app.getApplication().getController('Updates').doContentUpdate();
			    }
			});
		}//end loadStore
	},
	
	/**
	 *
	 */	
	doContentUpdate: function(){
		var contentData, remoteStore, localStore, localConfigStore;
		
		remoteStore = Ext.getStore('RemoteContent');
		localStore = Ext.getStore('LocalContent');
		
		if(KCI.util.Config.getHybrid() == true){
			if(this.getApplication().getController('Hybrid').cordovaCheck() == true){
				if(KCI.util.Config.getLOCALDATA() != null){
					
					localConfigStore = Ext.getStore("LocalConfig");
					
		            //get config item filename
		        	var contentData = localConfigStore.findRecord('type','content');
		        	var fileName = contentData.data.filename;					
					var fullPath = "file://" + KCI.util.Config.getLOCALDATA() + '/' + fileName;
					
					window.resolveLocalFileSystemURI(fullPath, 
						function(success){
							remoteStore.setProxy({
				                url: fullPath
				            });
				
							if(KCI.util.Config.getDebug())console.log("Content URI: " + fullPath);
							
							KCI.app.getApplication().getController('Updates').loadContent(localStore, remoteStore);
						},
						function(error){
							console.log("Content: Resolve FS Fail");
							KCI.app.getApplication().getController('Updates').loadContent(localStore, remoteStore);
						});				
				}else{
				   KCI.app.getApplication().getController('Updates').loadContent(localStore, remoteStore);
				}
			}
        }else{
			KCI.app.getApplication().getController('Updates').loadContent(localStore, remoteStore);
		}
		
	},	
	loadContent: function(localStore, remoteStore){
		remoteStore.load({
		    scope   : this,
			//node	: 'items',
		    callback: function(records, operation, success) {
				
				//check if store is populated	
				if(localStore.getCount() == 0){
					KCI.app.getApplication().getController('Updates').syncStore(localStore, remoteStore);
					
					//launch
					KCI.app.getApplication().getController('Main').doLaunchView();	
					
				}else{
					var updateCount = 0;
					//compare localstore records to remotestore
					//if a remote record doesnt exist remove local record
					
					localStore = Ext.getStore('LocalContent');
					localStore.each(function (localRecord) {
						remoteRecord = remoteStore.findRecord('xid',localRecord.data.xid, null, false, false, true);
						if(remoteRecord == null){
							if(KCI.util.Config.getDebug())console.log("Remove " + localRecord.data.title + ": Yes");
							localStore.remove(localRecord);
							++updateCount;
						}
					});
					
					//sync store
				    if(localStore.sync()){
						if(KCI.util.Config.getDebug())console.log('Sync: Content(Local => Remote)');
					}
					
					//console.log("RS:"+remoteStore.getProxy().getUrl());
					//version check each item in config, if new version save remote record to local
					remoteStore.each(function (record) {
						var localRecord = localStore.findRecord('xid',record.data.xid, null, false, false, true);
						if(localRecord){
							if(record.data.modified > localRecord.data.modified){	
								if(KCI.util.Config.getDebug())console.log("Update " + localRecord.data.title + ": Yes");
								localStore.remove(localRecord);
								localStore.add(record);
								++updateCount;
							}
						}else{
							if(KCI.util.Config.getDebug())console.log("Add " + record.data.title + ": Yes");
							localStore.add(record);
							++updateCount;
						}	
				    });
					//sync store
				    if(localStore.sync()){
						if(KCI.util.Config.getDebug())console.log('Sync: Content(Remote => Local)');
						
						//launch
						KCI.app.getApplication().getController('Main').doLaunchView();
					}
					//check update count
					if(updateCount > 0){
						KCI.app.getApplication().getController('Updates').onUpdate();
					}
				}//end if
		    }
		});

	},
	
	/**
	 *
	 */
	onUpdate: function(){
		Ext.Msg.show({
			title: 'Content Update',
			message: KCI.util.Config.getUpdateMsg(),
			buttons: Ext.MessageBox.OKCANCEL,
			zIndex: 20,
			fn: function(buttonId){
				if(buttonId == 'ok'){
					if(KCI.util.Config.getDebug())console.log('Reloading...');
					window.location.reload();
				}else{
					return
				}
			}

		});
	},
	//private functions
	
	/**
	 *
	 */
	storeCheck: function(localStore) {
		var theCount = localStore.getCount();
		
		return theCount >= 1;
	},
	
	/**
	 *
	 */
	syncStore: function(localStore, remoteStore) {
		localStore.removeAll();
		remoteStore.each(function (record) {
	        localStore.add(record.copy());
	    });

	    if(localStore.sync()){
			if(KCI.util.Config.getDebug())console.log('Success: remoteStore -> localStore');
		}
		return true;
	}	
});