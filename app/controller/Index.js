/**
 *
 */
Ext.define('KCI.controller.Index', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            navigationViewContainer: 'indexNavigationViewContainer',
			titleBar: 'indexTitleBar',
			navigationDataView: 'indexNavigationDataView',
			navigationView: 'indexNavigationView',
			indexLanding: 'tabletIndexLanding',
			menuButton: 'indexTitleBar button[action=view-menu]',
			menuOverlay: 'menuOverlay',
			productHotSpot: 'tabletProductHotSpot',
			modalCloseButton: 'indexTitleBar button[action=modal-close]',
			hotSpotModal: 'modalOverlay',
			backButton: 'indexTitleBar button[action=view-back]', //GG			
			//viewport reference for orientation change
			viewport: 'viewport'
        },
        control: {
            navigationDataView: {
				itemtap: 'onNavItem'
			},
			indexLanding: {
				activate: 'onActivate'
			},
			viewport: {
				orientationchange: 'onOrientationChange'
			},
			menuButton: {
				tap: 'onMenuButton'
			},
			modalCloseButton: {
				tap: 'doCloseModal'
			},
			navigationView: {//GG	
				back: 'onNavBack'//GG	
			},//GG	
			backButton: {//GG	
				tap: 'onBack'//GG	
			}//GG	
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
		//get instance of navigationDataView
		var navigationDataView = this.getNavigationDataView();
		
		/*
		var indexData = [
			{
				title: 'Videos A-Z',
				index: true,
				type: 'video',
                attachments: []
			},
			{
				title: 'Products A-Z',
				index: true,
				type: 'product',
                attachments: []
			}
		];
		*/
		
		//Set dataview with returned items from query
		navigationDataView.setData(indexData);
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
			this.getApplication().getController('Main').doTrackPageView("/Index");

		}else if(KCI.util.Config.getHybrid() == true){	
			if(this.getApplication().getController('Hybrid').cordovaCheck() == true){
				//Google Analytics Tracking
				this.getApplication().getController('Hybrid').doTrackPageView("/Index");
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
		var titleBar = this.getTitleBar();
		
		//dont update navigationViewContainer if it is an index item
		if(record.data.index != true){
			//if navigation view container has html, remove it
			if(navigationViewContainer.getHtml() != null){
				navigationViewContainer.setHtml('');
			}
		}
		
		if(record.data.index == true){
			var theQuery = localStore.queryBy(function(rec){
	        	return rec.get('type') == record.data.type && rec.get('navigation') == 'products' && rec.get('title') != 'Overview';
	        });
	
			//sort items alphabetically and ASC
			theQuery.items.sort(function(a,b){
				if(a.data.title<b.data.title){
					return -1;
				}
				if(a.data.title>b.data.title){
					return 1;
				}
				return 0;

			});
	
		}else{
			var theQuery = localStore.queryBy(function(rec){
	        	return rec.get('parent') == record.data.xid;
	        });
		}

		//If there are items in the tree, create a new dataview and push it on the stack
		if(theQuery.items != 0){
			//create new dataview
			var navView = Ext.create('KCI.view.tablet.index.IndexNavigationDataView', {
			   	title: record.data.title
			});
			
			//set data
			navView.getStore().setData(theQuery.items);
			
			//push new view onto stack
			navigationView.push(navView);
			
			//isolate first record
			var firstRecord = theQuery.items[0];
			
			if(record.data.group == 'false' && record.data.content == ''){
				//set first record as record to be used below
				record = firstRecord;
			}
		}	
		
		if(record.data.type == 'carousel'){
			//create instance of DetailTemplate
			var newView = Ext.create('KCI.view.tablet.products.ProductDetailTemplate',{
				scrollable:false
			});
		}else{
			//create instance of DetailTemplate
			var newView = Ext.create('KCI.view.tablet.products.ProductDetailTemplate');
		}
		
		//Perform template check, create template instances, return detail template
		var newDetail = this.doSetTemplate(record);			

			//Check for attachments, return array
			if(record.data.type != 'hotspot'){
				var attachmentArray = this.doSetAttachment(record.data.attachments);
			}

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
		
		//dont update navigationViewContainer if it is an index item
		//if(record.data.index != true){
				//if content is blank, keep current detailview on stack
				if(record.data.content != '' && record.data.type != 'hotspot'){
					//Update titleBar with record title
					titleBar.setTitle(record.data.title);
					//update navigationview container with new view (detail template)
					navigationViewContainer.push(newView);

				}else if(record.data.content != '' && record.data.type == 'hotspot'){
					//get previous item in stack
					var previousItem = navigationView.getPreviousItem();
					//get base class of previous item
					var baseCls = previousItem.getBaseCls();

					//if the previous card in the stack is a group data view
					if(baseCls != 'nav-groupdataview'){
						//update navigationview container with new view (detail template)
						navigationViewContainer.push(newView);
					}else{
						navigationView.push(newView);
					}
					this.doSetImageMapListeners(record);
				
				}else if(record.data.content == '' && record.data.attachments != null){
					//Update titleBar with record title
					titleBar.setTitle(record.data.title);
					//update navigationview container with new view (detail template)
					navigationViewContainer.push(newView);	
				}else if(record.data.content == '' && record.data.link != null){
					//Update titleBar with record title
					titleBar.setTitle(record.data.title);
					//update navigationview container with new view (detail template)
					navigationViewContainer.push(newView);
				}else if(record.data.content == '' && record.data.carousel != null){
					//Update titleBar with record title
					titleBar.setTitle(record.data.title);
					//update navigationview container with new view (detail template)
					navigationViewContainer.push(newView);				
				}else if(record.data.content == '' && record.data.attachments == null){
					//do nothing here
				}
		//}
		
		//if(record.data.type == 'hotspot'){
		//	//create listeners for each hotspot DOM id
		//	this.doSetImageMapListeners(record);
		//}
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

			case 'carousel':
				//create instance of DetailPanel
				var newDetail = Ext.create('KCI.view.tablet.products.ProductCarousel',{
					flex: 1
				});	

				//make this easier to work with
				var recordCarousel = record.data.carousel;

				//create array to hold carousel items
				var carouselItems = [];

				//make first card page content with detail view - disabled for now
				//var card = Ext.create('KCI.view.ui.DetailPanel');
				//card.setData(record.data);
				//carouselItems[0] = card;

				//loop through carousel objects and add to array			
				for (var i = 0; i < recordCarousel.length; i++) {
					
					//if its the last card, 
					if(i == recordCarousel.length - 1){
						var card = Ext.create('KCI.view.tablet.products.ProductCarouselItem',{
							tpl: carouselLastItem,
							baseCls: record.data.selector
						});
					}else{
						var card = Ext.create('KCI.view.tablet.products.ProductCarouselItem',{
							baseCls: record.data.selector
						});
					}
					
					card.setData(recordCarousel[i]);
					carouselItems[i] = card;
				}
				newDetail.setItems(carouselItems);
				
				return newDetail;
			break;
			
			case 'hotspot':
				//create instance of DetailPanel
				var newDetail = Ext.create('KCI.view.tablet.products.ProductHotSpot');
				//assign template
				newDetail.setTpl(hotSpotTemplate);
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
		if(record != null){
			//make this easier to work with
			var recordAttachments = record;
			
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
		var indexLanding = this.getIndexLanding();
		
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
		indexLanding.insert(0,navigationView);
		//show navigationView
		navigationView.show();
	},
	
	/**
	 *
	 */
	onIndexHotSpot: function(item, event, eOpts){
		var productHotSpot = this.getProductHotSpot().getData();
		
		var hotSpot = productHotSpot.hotspot;
		
		//get matching hotspot record
		for (var i = 0; i < hotSpot.length; i++) {
			var mapId = hotSpot[i].map;
			if(item.target.id == mapId){
				//create new modal with hotspot record
				this.doCreateModal(hotSpot[i], productHotSpot);
				//GG
				console.log("GG KK1 spots");
			}					
		}
		
	},
	
	/**
	 *
	 */
	doSetImageMapListeners: function(record){
		var hotSpot = record.data.hotspot;
		//GG
		console.log("GG KK1");
		//loop through hotspot objects and add listeners			
		for (var i = 0; i < hotSpot.length; i++) {
			//var mapId = null;
			//mapId = hotSpot[i].map;
			mapId = null;
			var mapId = hotSpot[i].map;	
			
			//remove any existing listeners
			Ext.get(mapId).clearListeners();
			
			//set listener according to map key
			Ext.get(mapId).on({
			        tap: 'onIndexHotSpot',
			        scope: this
			});			
			//GG
		    console.log("GG KK1 exit");						
		}
	},
	
	/**
	 *
	 */
	doCreateModal: function(hotspot, record){
		var navigationViewContainer = this.getNavigationViewContainer();
		var attachmentArray = this.doSetAttachment(record.attachments);
		
		var modalOverlay = Ext.create('KCI.view.ui.ModalOverlay',{
			width: 400,
			height: 450,
			scrollable: true
		});
		
		var titleBar = Ext.create('KCI.view.tablet.index.IndexTitleBar',{
			title: record.title,
			docked: 'top',
			items: [
				{
					xtype: 'button',
					align: 'right',
					text: 'Close',
					ui: 'action',
					action: 'modal-close'
				}
			]
		});
		
		var productHotSpotDetail = Ext.create('KCI.view.ui.ProductHotSpotDetail',{
			data: hotspot
		});
		
		modalOverlay.add([titleBar, productHotSpotDetail]);
		
		//add buttons to bottom of detail template
		if(attachmentArray){
			var newView = Ext.create('Ext.Container');
			for (var i = 0; i < attachmentArray[0].length; i++) {
				newView.add(attachmentArray[0][i]);
			}
			modalOverlay.add(newView);			
		}
		
		//add modal to view container
		navigationViewContainer.add(modalOverlay);
		//show modal
		modalOverlay.show();
	},
	
	/**
	 *
	 */
	doCloseModal: function(){
		var hotSpotModal = this.getHotSpotModal();
		hotSpotModal.hide();
		hotSpotModal.destroy();
	},
	
	/**
	 *
	 *///GG	
	onBack: function(view, eOpts) {
		console.log("GG Index onBack");
		//get instance of navigation view container
		var navigationViewContainer = this.getNavigationViewContainer();
		//get instance of navigation view
		var navigationView = this.getNavigationView();
		
		navigationViewContainer.setNavigationBar({
			hidden: true
		});
		
		navigationViewContainer.destroy();
		navigationView.show();
	},
	
	/**
	 *
	 */
	onNavBack: function(view, eOpts) {
		console.log("GG Index onNavBack");
		if( window.navigation_depth_count > 1 )
         {
            window.navigation_depth_count--;
         }
         //get instances of components
		var indexLanding = this.getIndexLanding();
		var navigationViewContainer = this.getNavigationViewContainer();
		var navigationView = this.getNavigationView();
				
		//get previous item in stack
		var previousItem = navigationView.getPreviousItem();
		//get base class of previous item
		var baseCls = previousItem.getBaseCls(); 
		
		console.log("GG Index baseCls" + baseCls);
		//if the previous card in the stack is a group data view
		if(baseCls == 'nav-groupdataview'){
		////remove navigationViewContainer
			console.log("GG Index on NavBack remove ");
			indexLanding.remove(navigationViewContainer, true);
		}
		var myhotspot = this.getProductHotSpot();
		myhotspot.destroy();
	}
});