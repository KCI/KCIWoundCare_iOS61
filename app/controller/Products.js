/**
 *
 */
Ext.define('KCI.controller.Products', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            navigationViewContainer: 'productNavigationViewContainer',
			titleBar: 'productTitleBar',
			menuButton: 'productTitleBar button[action=view-menu]',
			menuOverlay: 'menuOverlay',
			navigationDataView: 'productNavigationDataView',
			navigationGroupDataView: 'productNavigationGroupDataView',
			navigationView: 'productNavigationView',
			productLanding: 'tabletProductLanding',
			tabPanel: 'tabletTabPanel',
			productHotSpot: 'tabletProductHotSpot',
			modalCloseButton: 'productTitleBar button[action=modal-close]',
			hotSpotModal: 'modalOverlay',
			logo: 'productNavigationView logo',
			backButton: 'productTitleBar button[action=view-back]',
			//viewport reference for orientation change
			viewport: 'viewport'
        },
        control: {
            navigationDataView: {
				itemtap: 'onNavItem'
			},
			navigationGroupDataView: {
					itemtap: 'onNavGroupItem'
			},
			navigationView: {
				back: 'onNavBack'
			},
			menuButton: {
				tap: 'onMenuButton'
			},
			modalCloseButton: {
				tap: 'doCloseModal'
			},
			viewport: {
				orientationchange: 'onOrientationChange'
			},
			productLanding: {
				activate: 'onActivate'
			},
			backButton: {
				tap: 'onBack'
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
	onActivate: function() {		
	    window.navigation_depth_count = 0;
		if(KCI.util.Config.getWeb() == true){
			//Google Analytics Tracking
			this.getApplication().getController('Main').doTrackPageView("/Products");
			
		}else if(KCI.util.Config.getHybrid() == true){	
			if(this.getApplication().getController('Hybrid').cordovaCheck() == true){
				//Google Analytics Tracking
				this.getApplication().getController('Hybrid').doTrackPageView("/Products");
			}
		}
	},
	
	/**
	 *
	 */
	doSetListData: function() {
		//get instance of store
		var localStore = Ext.getStore('LocalContent');
		//get instance of dataview
		var navigationGroupDataView = this.getNavigationGroupDataView();
		
		//Query store to return parent items
		var theQuery = localStore.queryBy(function(rec){
			return rec.get('navigation') == 'products' && rec.get('parent') == 0;
		});
		
		//sort items by order and ASC
		theQuery.items.sort(function(a,b){
			if(a.data.order < b.data.order){
				return -1;
			}
			if(a.data.order > b.data.order){
				return 1;
			}
			return 0;
		});
		
		var logo = this.getLogo()
		if(logo.getHidden() != true){
			logo.setHidden(true);	
		}
		
		//Set dataview with returned items from query
		navigationGroupDataView.getStore().setData(theQuery.items);
	},
	
	/**
	 *
	 */
	onNavGroupItem: function(view, index, target, record, e, eOpts) {
		//Get instance of store
		var localStore = Ext.getStore('LocalContent');
		//get instance of navigation view container
		var navigationView = this.getNavigationView();
		//get instance of productLanding
		var productLanding = this.getProductLanding();
		
		//Get all child items
		var theQuery = localStore.queryBy(function(rec){
        	return rec.get('parent') == record.data.xid;
        });

		//sort items by order and ASC
		theQuery.items.sort(function(a,b){
			if(a.data.order < b.data.order){
				return -1;
			}
			if(a.data.order > b.data.order){
				return 1;
			}
			return 0;
		});
		
		//If there are items in the tree, create a new dataview and push it on the stack
		if(theQuery.items != 0 && record.data.group == 'true'){
			var navView = Ext.create('KCI.view.tablet.products.ProductNavigationGroupDataView', {
			   	title: record.data.title
			});
			
			var logo = this.getLogo()
			if(logo.getHidden() == true){
				logo.setHidden(false);	
			}
			
			//set data
			navView.getStore().setData(theQuery.items);
			
			//push new view onto stack
			navigationView.push(navView);
			
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
			
		}else if(theQuery.items != 0 && record.data.group == 'false'){
			//create new container
			var newView = Ext.create('KCI.view.tablet.products.ProductNavigationViewContainer',{
				flex: 2
			});
			var newTitleBar = Ext.create('KCI.view.tablet.products.ProductTitleBar');
			
			newView.add(newTitleBar);
			productLanding.add(newView);
			
			//get orientation
			var orientation = Ext.Viewport.determineOrientation();			
			//if portrait, handle landscape orientation
			if(orientation == "portrait"){
				this.doHandlePortrait();
			}
			
			var logo = this.getLogo();
			logo.hide();
			
			this.onNavItem(null,null,null,record,null,null);
			
		}else if(theQuery.items == 0 && record.data.group == 'false'){
			/*
			//hide main navigation view
			navigationView.hide();
			
			//create new container
			var newView = Ext.create('KCI.view.tablet.products.ProductNavigationViewContainer',{
				flex: 1
			});
			var newTitleBar = Ext.create('KCI.view.tablet.products.ProductTitleBar',{
				items: [
					{
						xtype: 'button',
						text: 'Back',
						ui: 'back',
						action: 'view-back'
					}
				]
			});
			
			newView.add(newTitleBar);
			productLanding.add(newView);
			*/
			//simulate itemtap
			this.onNavItem(null,null,null,record,null,null);
			
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
				var class_list = ['kci-navigation-bar-prevena', 'kci-navigation-bar-abthera', 'kci-navigation-bar-vactherapy', 'kci-navigation-bar-graftjacket'];
				
				if(pageUrl == '/products/Prevena')
                {
                    window.navigation_depth_count++;
                               
                    Ext.select('div.kci-navigation-bar').removeCls(class_list);
                    Ext.select('div.kci-navigation-bar').addCls('kci-navigation-bar-prevena');
                }
                else if(pageUrl == '/products/ABThera')
                {
                     window.navigation_depth_count++;
                     Ext.select('div.kci-navigation-bar').removeCls(class_list);                                                       
                     Ext.select('div.kci-navigation-bar').addCls('kci-navigation-bar-abthera');
                }
				else if(pageUrl == '/products/V.A.C.Ulta' ||
					    pageUrl == '/products/SensaT.R.A.C. Technology' ||
					    pageUrl == '/products/InfoV.A.C.' ||
					    pageUrl == '/products/ActiV.A.C.' ||
					    pageUrl == '/products/V.A.C.Via' ||
					    pageUrl == '/products/V.A.C. Freedom' ||
					    pageUrl == '/products/VeraFlo / VeraFlo Cleanse' ||
			            pageUrl == '/products/Simplace / Simplace EX' ||
				        pageUrl == '/products/GranuFoam Bridge / Bridge XG' ||
				        pageUrl == '/products/GranuFoam Silver' || 
				        pageUrl == '/products/Granu Foam' ||
				        pageUrl == '/products/WhiteFoam')
				{			
				    window.navigation_depth_count++;		                  
				    Ext.select('div.kci-navigation-bar').removeCls(class_list);
				    Ext.select('div.kci-navigation-bar').addCls('kci-navigation-bar-vactherapy');

                }
                else if(pageUrl == '/products/Graftjacket RTM' ||
                        pageUrl == '/products/Graftjacket Xpress')
                {
                    window.navigation_depth_count++;                            
                    Ext.select('div.kci-navigation-bar').removeCls(class_list); 
                    Ext.select('div.kci-navigation-bar').addCls('kci-navigation-bar-graftjacket');
                }
                else if(record.data.title == 'How to Use' ||
                        record.data.title == 'Case Studies' ||
                        pageUrl == '/products/Videos'
                        )
                {
                    window.navigation_depth_count++;
                }
				
				this.getApplication().getController('Hybrid').doTrackPageView(pageUrl);
			}
		}
		
		//Get instance of store
		var localStore = Ext.getStore('LocalContent');
		//get instance of navigation view container and title view
		var navigationView = this.getNavigationView();
		var navigationViewContainer = this.getNavigationViewContainer();
		var titleBar = this.getTitleBar();
		
		//Get all child items
		var theQuery = localStore.queryBy(function(rec){
        	return rec.get('parent') == record.data.xid;
        });

		if(theQuery.items != 0){
			//create new dataview
			var navView = Ext.create('KCI.view.tablet.products.ProductNavigationDataView', {
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
				scrollable:false,
				title: record.data.title
			});
		}else{
			//create instance of DetailTemplate
			var newView = Ext.create('KCI.view.tablet.products.ProductDetailTemplate',{
				title: record.data.title
			});
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
		
		//TODO:
		//add related dressings/choose dressing button
		/*
		if(record.data.type == 'product'){
			//choose dressing button/related
			var relatedButton = Ext.create('KCI.view.ui.RelatedButton',{
				text: 'Featured Products',
				related: record.data.related
			});
		}*/
		
		//check for links, return array
		var linkArray = this.doSetLink(record);

		//add links to detail template
		if(linkArray){
			for (var i = 0; i < linkArray.length; i++) {
				newView.add(linkArray[i]);
			}
		}
		
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
				//Update titleBar with record title
				titleBar.setTitle(record.data.title);
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
					}else if(i != 0){
						var card = Ext.create('KCI.view.tablet.products.ProductCarouselItem',{
							tpl: carouselMiddleItem,
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
				if(record.data.title == '360 Degrees of Healing'){
					newDetail.setTpl(hotSpotDefaultTemplate);
				}else{
					newDetail.setTpl(hotSpotTemplate);
				}
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
	onProductHotSpot: function(item, event, eOpts){
		
		var productHotSpot = this.getProductHotSpot().getData();
		
		var hotSpot = productHotSpot.hotspot;
		
		//get matching hotspot record
		for (var i = 0; i < hotSpot.length; i++) {
			var mapId = hotSpot[i].map;
			if(item.target.id == mapId){
				//create new modal with hotspot record
				this.doCreateModal(hotSpot[i], productHotSpot);
				//GG
				console.log("GG KK2 spots");
			}					
		}
		
	},
	
	/**
	 *
	 */
	doSetImageMapListeners: function(record){
		
		var hotSpot = record.data.hotspot;
		//GG
		console.log("GG KK2");
		//loop through hotspot objects and add listeners			
		for (var i = 0; i < hotSpot.length; i++) {
			mapId = null;
			var mapId = hotSpot[i].map;	
			
			//remove any existing listeners
			Ext.get(mapId).clearListeners();
			
			//set listener according to map key
			Ext.get(mapId).on({
			        tap: 'onProductHotSpot',
			        scope: this
			});	
			//GG
		    console.log("GG KK2 exit");				
		}
	},
	
	/**
	 *
	 */
	doCreateModal: function(hotspot, record){
		var navigationViewContainer = this.getNavigationViewContainer();
		var navigationView = this.getNavigationView();
		var attachmentArray = this.doSetAttachment(record.attachments);
		
		var modalOverlay = Ext.create('KCI.view.ui.ModalOverlay',{
			width: 450,
			height: 450,
			scrollable: true
		});
		
		var titleBar = Ext.create('KCI.view.tablet.products.ProductTitleBar',{
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
		
		//get previous item in stack
		var previousItem = navigationView.getPreviousItem();
		
		if(previousItem){
			//get base class of previous item
			var baseCls = previousItem.getBaseCls();
		}
		
		//if the previous card in the stack is a group data view
		if(baseCls != 'nav-groupdataview'){
			//add modal to view container
			navigationViewContainer.add(modalOverlay);
		}else{
			navigationView.add(modalOverlay);
		}
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
									posterUrl: KCI.app.getApplication().getController('Main').doProvideUri() + '/' + KCI.util.Config.getPOSTER()
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
	onBack: function(view, eOpts) {
		//get instance of navigation view container
		console.log("GG Prod onBack");
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
		console.log("GG Prod onNavBack");
	     if(window.navigation_depth_count == 1)
         {
             var class_list = ['kci-navigation-bar-prevena', 'kci-navigation-bar-abthera', 'kci-navigation-bar-vactherapy', 'kci-navigation-bar-graftjacket'];
             Ext.select('div.kci-navigation-bar').removeCls(class_list);
             window.navigation_depth_count = 0;
         }
         else if( window.navigation_depth_count > 1 )
         {
            window.navigation_depth_count--;
         }
        
		//get instances of components
		var productLanding = this.getProductLanding();
		var navigationViewContainer = this.getNavigationViewContainer();
		var navigationView = this.getNavigationView();
				
		//get previous item in stack
		var previousItem = navigationView.getPreviousItem();
		//get base class of previous item
		var baseCls = previousItem.getBaseCls(); 
		console.log("GG Products baseCls" + baseCls);
		//if the previous card in the stack is a group data view
		if(baseCls == 'nav-groupdataview'){
			//get orientation
			var orientation = Ext.Viewport.determineOrientation();			
			//if portrait, handle landscape orientation
			if(orientation == "portrait"){
				this.doHandleLandscape();
			}
			console.log("GG Products on NavBack remove");
			//remove navigationViewContainer
			productLanding.remove(navigationViewContainer, true);
			
			//console.log(navigationView.getItems().length);
			var navBar = navigationView.getNavigationBar();
			console.log(navBar.backButtonStack.length);
			
			if(navBar.backButtonStack.length == 1){
				//handle logo
				var logo = this.getLogo()
				if(logo.getHidden() != true){
					logo.setHidden(true);	
				}
			}else{
				//handle logo
				var logo = this.getLogo()
				if(logo.getHidden() == true){
					logo.setHidden(false);	
				}
			}
			
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
		var tabPanel = this.getTabPanel();
		//get index of tab panel active item
		var active = tabPanel.getInnerItems().indexOf(tabPanel.getActiveItem());
		//get active item
		var activeItem = navigationView.getActiveItem();
		
		if(active == 0){
			//if orientation is portrait
			if(orientation == "portrait"){
				if(activeItem.getBaseCls() != "nav-groupdataview"){
					this.doHandlePortrait();
				}

			//if orientation is landscape	
			}else if(orientation == "landscape"){
				if(activeItem.getBaseCls() != "nav-groupdataview"){
					this.doHandleLandscape();
				}
			}
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
		
		//create new menu button
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
				
		var navClasses = Ext.select('div.kci-navigation-bar').elements[0].getAttribute('class');
				
		var navigationView = this.getNavigationView();
		var titleBar = this.getTitleBar();
		var menuButton = this.getMenuButton();
		var menuOverlay = this.getMenuOverlay();
		var productLanding = this.getProductLanding();
		
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
		productLanding.insert(0,navigationView);
		
		Ext.select('div.kci-navigation-bar').addCls(navClasses);
		
		//show navigationView
		navigationView.show();
	}
});