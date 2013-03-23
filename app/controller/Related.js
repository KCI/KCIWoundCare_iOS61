/**
 *
 */
Ext.define('KCI.controller.Related', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            navigationViewContainer: 'relatedNavigationViewContainer',
			titleBar: 'relatedTitleBar',
			navigationDataView: 'relatedNavigationDataView',
			navigationView: 'relatedNavigationView',
			relatedLanding: 'tabletRelatedLanding',
			tabPanel: 'tabletTabPanel',
			closeButton: 'relatedTitleBar button[action=close]',
            relatedDetailTemplate: 'relatedDetailTemplate',
			productHotSpot: 'tabletRelatedLanding tabletProductHotSpot',
			modalCloseButton: 'relatedTitleBar button[action=modal-close]',
			hotSpotModal: 'modalOverlay'
        },
        control: {
            navigationDataView: {
				itemtap: 'onNavItem'
			},
			closeButton: {
				tap: 'onClose'
			},
			modalCloseButton: {
				tap: 'doCloseModal'
			}
        }
    },

	/**
	 *
	 */
	doShowRelated: function(xid) {
		
		var localStore = Ext.getStore('LocalContent');
		
		localRecord = localStore.findRecord('xid',xid, null, false, false, true);
		if(localRecord){
			
			//Query store to return child items
			var theQuery = localStore.queryBy(function(rec){
	        	return rec.get('parent') == localRecord.data.xid;
	        });
			
			var relatedNavDataView = Ext.create('KCI.view.tablet.related.RelatedNavigationDataView',{
				title: null
			});			
			relatedNavDataView.getStore().setData(theQuery.items);		
			
			//create new dataview
			var newView = Ext.create('KCI.view.tablet.related.RelatedLanding',{
				layout: 'hbox',
				showAnimation: 'slideIn',
				items:[
					{
						xtype: 'relatedNavigationView',
						flex: 1,
						items: [relatedNavDataView]
					},
					{
						xtype: 'relatedNavigationViewContainer',
						flex: 2,
						items: [
							{
								xtype: 'relatedTitleBar',
								title: localRecord.data.title,
								items: [
									{
										xtype: 'button',
										text: 'Close',
										ui: 'action',
										align: 'right',
										action: 'close'
									}
								]
							},
							{
								xtype: 'relatedDetailTemplate',
								items: [
									{
										xtype: 'detailPanel',
										data: localRecord.data,
										tpl: productTemplate
									}
								]
							}
						]
					}
				]
			});

            var relatedDetailTemplate = this.getRelatedDetailTemplate();

            //Check for attachments, return array
            var attachmentArray = this.doSetAttachment(localRecord);

            //add buttons to bottom of detail template
            if(attachmentArray){
                for (var i = 0; i < attachmentArray[0].length; i++) {
                    relatedDetailTemplate.add(attachmentArray[0][i]);
                }
            }

			Ext.Viewport.setActiveItem(newView);
		}else{
			Ext.Msg.alert('Opps!', 'Sorry this product was not found');
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
		
		//Get all child items
		var theQuery = localStore.queryBy(function(rec){
        	return rec.get('parent') == record.data.xid;
        });

		if(theQuery.items != 0){
			//create new dataview
			var navView = Ext.create('KCI.view.tablet.related.RelatedNavigationDataView', {
			   	title: record.data.title
			});
			
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
			var newView = Ext.create('KCI.view.tablet.related.RelatedDetailTemplate',{
				scrollable:false
			});
		}else{
			//create instance of DetailTemplate
			var newView = Ext.create('KCI.view.tablet.related.RelatedDetailTemplate');
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
		
		
		//if content is blank, keep current detailview on stack
		if(record.data.content != ''){
			//Update titleBar with record title
			titleBar.setTitle(record.data.title);
			//update navigationview container with new view (detail template)
			navigationViewContainer.push(newView);

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
		
			if(record.data.type == 'hotspot'){
				//create listeners for each hotspot DOM id
				this.doSetImageMapListeners(record);
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
	onClose: function() {
	    Ext.select('#kci-bottom-right-logo').show();
		var relatedLanding = this.getRelatedLanding();
		var navigationViewContainer = this.getNavigationViewContainer();
		var navigationDataView = this.getNavigationDataView();
		var navigationView = this.getNavigationView();
		var relatedDetailTemplate = this.getRelatedDetailTemplate();
		if(navigationViewContainer){
			navigationViewContainer.destroy();
		}
		if(navigationDataView){
			navigationDataView.destroy();
		}
		if(navigationView){
			navigationView.destroy();
		}
		if(relatedDetailTemplate){
			relatedDetailTemplate.destroy();
		}
		
		var tabPanel = this.getTabPanel();
		Ext.Viewport.setActiveItem(tabPanel);
		
	},
	
	/**
	 *
	 */
	onRelatedHotSpot: function(item, event, eOpts){
		
		var productHotSpot = this.getProductHotSpot().getData();
		
		var hotSpot = productHotSpot.hotspot;
		
		//get matching hotspot record
		for (var i = 0; i < hotSpot.length; i++) {
			var mapId = hotSpot[i].map;
			if(item.target.id == mapId){
				//create new modal with hotspot record
				this.doCreateModal(hotSpot[i], productHotSpot);
			}					
		}
		
	},
	
	/**
	 *
	 */
	doSetImageMapListeners: function(record){
		
		var hotSpot = record.data.hotspot;
		//loop through hotspot objects and add listeners			
		for (var i = 0; i < hotSpot.length; i++) {
			var mapId = null;
			mapId = hotSpot[i].map;
			
			//remove any existing listeners
			Ext.get(mapId).clearListeners();
			
			//set listener according to map key
			Ext.get(mapId).on({
			        tap: 'onRelatedHotSpot',
			        scope: this
			});					
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
		
		var titleBar = Ext.create('KCI.view.tablet.related.RelatedTitleBar',{
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
	}
});