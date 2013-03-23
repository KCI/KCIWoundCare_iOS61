/**
 *
 */
Ext.define('KCI.controller.ContactUs', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            navigationViewContainer: 'contactUsNavigationViewContainer',
			titleBar: 'contactUsTitleBar',
			navigationDataView: 'contactUsNavigationDataView',
			navigationView: 'contactUsNavigationView',
			contactUsLanding: 'tabletContactUsLanding',
			menuButton: 'contactUsTitleBar button[action=view-menu]',
			menuOverlay: 'menuOverlay',
			tabPanel: 'tabletTabPanel',
			//viewport reference for orientation change
			viewport: 'viewport'
        },
        control: {
            navigationDataView: {
				itemtap: 'onNavItem'
			},
			menuButton: {
				tap: 'onMenuButton'
			},
			viewport: {
				orientationchange: 'onOrientationChange'
			},
			contactUsLanding: {
				activate: 'onActivate'
			}
        }
    },

	/**
	 *
	 */
    launch: function(app) {
		//need to set list data
        //this.doSetListData();
    },

	/**
	 *
	 */
	doSetListData: function() {
		//get instance of store
		var localStore = Ext.getStore('LocalContent');
		//get instance of dataview
		var navigationDataView = this.getNavigationDataView();
		
		//Query store to return parent items
		var theQuery = localStore.queryBy(function(rec){
			return rec.get('navigation') == 'contact' && rec.get('parent') == 0;
		});
		
		//Set dataview with returned items from query
		navigationDataView.getStore().setData(theQuery.items);
	},
	
	/**
	 *
	 */
	onActivate: function() {
		//get orientation
		var orientation = Ext.Viewport.determineOrientation();			
		//if portrait, handle landscape orientation
		if(orientation == "portrait"){
			this.doHandlePortrait();
		}
			
		if(KCI.util.Config.getWeb() == true){
			//Google Analytics Tracking
			this.getApplication().getController('Main').doTrackPageView("/Contact Us");

		}else if(KCI.util.Config.getHybrid() == true){	
			if(this.getApplication().getController('Hybrid').cordovaCheck() == true){
				//Google Analytics Tracking
				this.getApplication().getController('Hybrid').doTrackPageView("/Contact Us");
			}
		}
	},
	
	/**
	 *
	 */
	onNavItem: function(view, index, target, record, e, eOpts) {
		if(KCI.util.Config.getWeb() == true){
			//Google Analytics Tracking
			var pageUrl = '/' + record.data.navigation + '/' + record.data.title;
			this.getApplication().getController('Main').doTrackPageView(pageUrl);

		}else if(KCI.util.Config.getHybrid() == true){	
			if(this.getApplication().getController('Hybrid').cordovaCheck() == true){
				//Google Analytics Tracking
				var pageUrl = '/' + record.data.navigation + '/' + record.data.title;
				this.getApplication().getController('Hybrid').doTrackPageView(pageUrl);
			}
		}
		
		//Get instance of store
		var localStore = Ext.getStore('LocalContent');
		//get instance of navigation view container and title view
		var navigationView = this.getNavigationView();
		var navigationViewContainer = this.getNavigationViewContainer();
		var navigationDataView = this.getNavigationDataView();
		var titleBar = this.getTitleBar();
		
		//Get all child items
		var theQuery = localStore.queryBy(function(rec){
        	return rec.get('parent') == record.data.xid;
        });
		
		//If there are items in the tree, create a new dataview and push it on the stack
		if(theQuery.items != 0){
			//create new dataview
			var navView = Ext.create('KCI.view.tablet.contactus.ContactUsNavigationDataView', {
			   	title: record.data.title
			});
			
			//set data
			navView.getStore().setData(theQuery.items);
			
			//push new view onto stack
			navigationView.push(navView);
			
			//isolate first record
			var firstRecord = theQuery.items[0];
			//set first record as record to be used below
			record = firstRecord;
			/*
			//Apply Selected Class
			//get id of naview, then get element by class
			var firstItem = Ext.fly(navView.getId()).select('.nav-dataview-item');
			//isolate classname			
			var className = firstItem.elements[0].className;
			//apply classname to element
			firstItem.elements[0].className = className + ' x-item-selected';
			
			//Remove Selected Class
			//get id of naview, then get element by class
			var firstItem = Ext.fly(navigationDataView.getId()).select('.nav-dataview-item');
			console.log(firstItem);
			//isolate classname			
			var className = firstItem.elements[0].className;
			//apply classname to element
			firstItem.elements[0].className = className + ' x-item-selected';
			 if(firstItem.elements[0].className.search('x-item-selected') != -1){
				firstItem.removeCls('x-item-selected');
			}*/
		}
		
		//create instance of DetailTemplate
		var newView = Ext.create('KCI.view.tablet.contactus.ContactUsDetailTemplate');		
		
		//Perform template check, create template instances, return detail template
		var newDetail = this.doSetTemplate(record);

		//Check for attachments, return array
		var attachmentArray = this.doSetAttachment(record);

		//add videos to top of detail template
		if(attachmentArray){
			for (var i = 0; i < attachmentArray[1].length; i++) {
				newView.add(attachmentArray[1][i]);
			}			
		}

		//add detail panel to detail template
		newView.add(newDetail);

		//add buttons to bottom of detail template
		if(attachmentArray){
			for (var i = 0; i < attachmentArray[0].length; i++) {
				newView.add(attachmentArray[0][i]);
			}			
		}

		//check for links, return array
		var linkArray = this.doSetLink(record);

		//add links to detail template
		if(linkArray){
			for (var i = 0; i < linkArray.length; i++) {
				newView.add(linkArray[i]);
			}
		}
		
		//if content is blank, keep current detailview on stack
		if(record.data.content != ''){
			//if navigation view container has html, remove it
			if(navigationViewContainer.getHtml() != null){
				navigationViewContainer.setHtml('');
			}
			//Update titleBar with record title
			titleBar.setTitle(record.data.title);
			//update navigationview container with new view (detail template)
			navigationViewContainer.push(newView);
			
		}else if(record.data.content == '' && record.data.attachments != null){
			//if navigation view container has html, remove it
			if(navigationViewContainer.getHtml() != null){
				navigationViewContainer.setHtml('');
			}
			//Update titleBar with record title
			titleBar.setTitle(record.data.title);
			//update navigationview container with new view (detail template)
			navigationViewContainer.push(newView);	
		}else if(record.data.content == '' && record.data.link != null){
			//if navigation view container has html, remove it
			if(navigationViewContainer.getHtml() != null){
				navigationViewContainer.setHtml('');
			}
			//Update titleBar with record title
			titleBar.setTitle(record.data.title);
			//update navigationview container with new view (detail template)
			navigationViewContainer.push(newView);			
		}else if(record.data.content == '' && record.data.attachments == null){
			//do nothing here
		}		
	},
	
	/**
	 *
	 */
	doSetTemplate: function(record) {
		switch(record.data.type){
			case 'product':
				//create instance of DetailPanel
				var newDetail = Ext.create('KCI.view.ui.DetailPanel');
				//assign template
				newDetail.setTpl(productTemplate);
				//Give detail panel some data
				newDetail.setData(record.data);
				
				return newDetail;
			break;

			default:
				//create instance of DetailPanel
				var newDetail = Ext.create('KCI.view.ui.DetailPanel');
				//assign template
				newDetail.setTpl(defaultTemplate);
				//Give detail panel some data
				newDetail.setData(record.data);
				
				return newDetail;
			break;
		}
	},
	
	/**
	 *
	 */
	doSetAttachment: function(record) {
		//If attachments exists...
		if(record.data.attachments){
			//make this easier to work with
			var recordAttachments = record.data.attachments;
			
			//create counters and arrays to hold attachment objects
			var b = 0;
			var v = 0;
			var attachmentArray = [];
			var attachmentButtons = [];
			var attachmentVideos = [];
			
			//loop through attachments array
			for (var i = 0; i < recordAttachments.length; i++) {		
			    //if there is a matching document, create an object instance
				switch(recordAttachments[i].mime_type){
					
					case 'application/pdf':
						//create instance of a button
						//url: KCI.app.getApplication().getController('Main').doProvideUri() + '/' + recordAttachments[i].url,
						//speedbump: true,
						var documentButton = Ext.create('KCI.view.ui.DocumentButton',{
							title: recordAttachments[i].title,
							url: KCI.app.getApplication().getController('Main').doProvideUri() + '/' + recordAttachments[i].url,
							speedbump: true,
							docked: 'left'
						});
						//url: KCI.app.getApplication().getController('Main').doProvideUri() + '/' + recordAttachments[i].url
							
						var emailButton = Ext.create('KCI.view.ui.EmailButton',{
							title: recordAttachments[i].title,
							url: KCI.util.Config.getCDN() + '/' + recordAttachments[i].url,
							speedbump: false,
							docked: 'right'
						});
						
						var container = Ext.create('Ext.Container',{
							layout: 'hbox',
							docked: 'bottom',
							items: [documentButton,emailButton]
						});
						
						var buttonContainer = Ext.create('KCI.view.ui.ButtonContainer',{
							html: '<h1>'+ recordAttachments[i].title +'</h1>',
							items: [container]
						});
						
						//add document button objects to array
						attachmentButtons[b] = buttonContainer;
						b++;
						break;
						
					case 'video/mp4':
						//create instance of a video
						var newVideo = Ext.create('Ext.Container',{
							width: '100%',
							height: 300,
							baseCls: 'detail-video',
							items: [
								{
									xtype: 'video',
									preload: false,
									url: KCI.util.Config.getCDN() + '/' + recordAttachments[i].url,
									posterUrl: this.getApplication().getController('Main').doProvideUri() + '/' + KCI.util.Config.getPOSTER()
								}
							]
						});
						
						//add video object to array
						attachmentVideos[v] = newVideo;
						v++;
						break;
						
					default:
						break;
				}
			}

            //setup array
            if(attachmentButtons){
                attachmentArray[0] = attachmentButtons;
            }
            if(attachmentVideos){
                attachmentArray[1] = attachmentVideos;
            }
			
			//return attachments array
			return attachmentArray;
		}
	},
	
	/**
	 *
	 */
	doSetLink: function(record) {
		var linkArray = [];
		
		//check for links - add buttons
		if(record.data.link){
			//make this easier to work with
			var recordLinks = record.data.link;
			
			for (var i = 0; i < recordLinks.length; i++) {
				//create instance of a button
				var linkButton = Ext.create('KCI.view.ui.LinkButton',{
					title: recordLinks[i].name,
					url: recordLinks[i].url,
					speedbump: true,
					docked: 'left'
				});
				
				var emailButton = Ext.create('KCI.view.ui.EmailButton',{
					title: recordLinks[i].name,
					url: recordLinks[i].url,
					speedbump: false,
					docked: 'right'
				});
				
				var container = Ext.create('Ext.Container',{
					layout: 'hbox',
					docked: 'bottom',
					items: [linkButton,emailButton]
				});
				
				var buttonContainer = Ext.create('KCI.view.ui.ButtonContainer',{
					html: '<h1>'+ recordLinks[i].name +'</h1>',
					items: [container]
				});
				
				linkArray[i] = buttonContainer;
			}
			return linkArray;
		}
	},
	
	/**
	 *
	 */
	onMenuButton: function(button, e, eOpts){
		//get references to components
		var navigationView = this.getNavigationView();
		var menuOverlay = this.getMenuOverlay();
		var menuButton = this.getMenuButton();
		
		if(!menuOverlay){
			//create overlay
			var menuOverlay = Ext.create('KCI.view.ui.MenuOverlay');

		}
		
		//show navigationView in overlay
		menuOverlay.add(navigationView).show();
		
		//show menu overlay by menu button
		menuOverlay.showBy(menuButton);
		
	},
	
	/**
	 *
	 */
	onOrientationChange: function(viewport, orientation, width, height){
		
		//get references to componenets
		var navigationView = this.getNavigationView();
			
		//if orientation is portrait
		if(orientation == "portrait"){
			this.doHandlePortrait();
			
		//if orientation is landscape	
		}else if(orientation == "landscape"){
			this.doHandleLandscape();
		}
	},
	
	/**
	 *
	 */
	doHandlePortrait: function(){
		//get references to componenets
		var navigationView = this.getNavigationView();
		var titleBar = this.getTitleBar();
		
		//remove existing button from titlebar, if exists
		var menuButton = titleBar.down('button[action=view-menu]');
		if(menuButton){
			//remove menu button from titlebar
			menuButton.destroy();
		}
		
		//create new meny button
		var newButton = Ext.create('Ext.Button',{
			iconCls: 'list',
			iconMask: true,
			align: 'left',
			action: 'view-menu'
		});
		
		//add menu button to title bar
		titleBar.add(newButton);
			
		//hide and remove navigationView from view			
		navigationView.hide().remove(this, false);
	},
	
	/**
	 *
	 */
	doHandleLandscape: function(){
		var navigationView = this.getNavigationView();
		var titleBar = this.getTitleBar();
		var menuButton = this.getMenuButton();
		var menuOverlay = this.getMenuOverlay();
		var contactUsLanding = this.getContactUsLanding();
		
		//populate variable with navigationView hidden state
		var isHidden = navigationView.isHidden();
		
		//if overlay is visible when orientation changs to landscape
		//remove navigationView from overlay, hide and destroy overlay	
		if(isHidden != true){
			menuOverlay.remove(navigationView, false);
			menuOverlay.hide().destroy();
		}
		//remove menu button from titlebar
		menuButton.destroy();
		//insert navigationView back at 0 index
		contactUsLanding.insert(0,navigationView);
		//show navigationView
		navigationView.show();
	}
});