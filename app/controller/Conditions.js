/**
 *
 */
Ext.define('KCI.controller.Conditions', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
			titleBar: 'conditionsTitleBar',
			navigationDataView: 'conditionsNavigationDataView',
			navigationView: 'conditionsNavigationView',
			navigationGroupedDataView: 'conditionsNavigationView navigationGroupedDataView',
			navigationGroupDataView: 'conditionsNavigationGroupDataView',
			showRelatedButton: 'conditionsDetailTemplate button[action=view-related]',
			modalCloseButton: 'conditionsTitleBar button[action=modal-close]',
			conditionsLanding: 'tabletConditionsLanding',
			navigationViewModal: 'conditionsNavigationView tabletConditionsModalOverlay'
        },
        control: {
            navigationDataView: {
				itemtap: 'onNavItem'
			},
			navigationGroupedDataView: {
				itemtap: 'onRelatedItem'
			},
			showRelatedButton: {
				tap: 'onRelated'
			},
			navigationGroupDataView: {
				itemtap: 'onNavGroupItem'
			},
			modalCloseButton: {
				tap: 'doCloseModal'
			},
			conditionsLanding: {
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
	onActivate: function() {		
		if(KCI.util.Config.getWeb() == true){
			//Google Analytics Tracking
			this.getApplication().getController('Main').doTrackPageView("/Conditions");

		}else if(KCI.util.Config.getHybrid() == true){	
			if(this.getApplication().getController('Hybrid').cordovaCheck() == true){
				//Google Analytics Tracking
				this.getApplication().getController('Hybrid').doTrackPageView("/Conditions");
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
			return rec.get('navigation') == 'conditions' && rec.get('parent') == 0;
		});
		
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
		var conditionsLanding = this.getConditionsLanding();
		
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
			var navView = Ext.create('KCI.view.tablet.conditions.ConditionsNavigationGroupDataView', {
			   	title: record.data.title
			});
			
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
			
		}else if(theQuery.items == 0 && record.data.group == 'false'){
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
				this.getApplication().getController('Hybrid').doTrackPageView(pageUrl);
			}
		}
		
		//Get instance of store
		var localStore = Ext.getStore('LocalContent');
		//get instance of navigation view container and title view
		var navigationView = this.getNavigationView();
		var titleBar = this.getTitleBar();
		
		//Get all child items
		var theQuery = localStore.queryBy(function(rec){
        	return rec.get('parent') == record.data.xid;
        });
		
		//If there are items in the tree, create a new dataview and push it on the stack
		if(theQuery.items != 0){
			//create new dataview
			var navView = Ext.create('KCI.view.tablet.conditions.ConditionsNavigationDataView', {
			   	title: record.data.title
			});
			
			//set data
			navView.getStore().setData(theQuery.items);
			
			//push new view onto stack
			navigationView.push(navView);
		}
		
		//create instance of DetailTemplate
		var newView = Ext.create('KCI.view.tablet.conditions.ConditionsDetailTemplate',{
			title: record.data.title
		});		
		
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
		
		//Related
		if(record.data.related){
			var relatedButton = Ext.create('KCI.view.ui.RelatedButton',{
				text: 'Featured Products',
				related: record.data.related
			});
			newView.add(relatedButton);
		}
		
		//if content is blank, keep current detailview on stack
		if(record.data.content != ''){
			//update navigationview container with new view (detail template)
			navigationView.push(newView);
			
		}else if(record.data.content == '' && record.data.attachments != null){
			//update navigationview container with new view (detail template)
			navigationView.push(newView);	
		}else if(record.data.content == '' && record.data.link != null){
			//update navigationview container with new view (detail template)
			navigationView.push(newView);			
		}else if(record.data.content == '' && record.data.attachments == null){
			//do nothing here
		}
		
	},
	
	/**
	 *
	 */
	onRelated: function(button, event, eOpts){
		//get instance of button
		var showRelatedButton = this.getShowRelatedButton();
		//get related
		var related = showRelatedButton.getRelated();
		
		//Get instance of store
		var localStore = Ext.getStore('LocalContent');
		
		var relatedItems = [];
		
		//loop through related array
		for (var i = 0; i < related.length; i++) {
			var theQuery = [];
			//Perform query, return related items
			theQuery = localStore.queryBy(function(rec){
	        	return rec.get('xid') == related[i];
	        });
			
			if(theQuery.items[0] != 'undefined'){
				//add item to array
				relatedItems[i] = theQuery.items[0];
			}
			
		}
		
		var navigationViewModal = this.getNavigationViewModal();
		
		if(navigationViewModal){
			navigationViewModal.destroy();
		}
		
		//get instance of navigation view container
		var navigationView = this.getNavigationView();
					
		
		var newView = Ext.create('KCI.view.ui.NavigationGroupedDataView');
		
		//set data
		newView.getStore().setData(relatedItems);
		
		var newTitleBar = Ext.create('KCI.view.tablet.conditions.ConditionsTitleBar',{
			title: 'Featured Products',
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
		
		var modalOverlay = Ext.create('KCI.view.tablet.conditions.ConditionsModalOverlay',{
			width: 480,
			height: 450,
			items: [newTitleBar, newView]
		});
		
		navigationView.add(modalOverlay);

		modalOverlay.show();			

                // Hack to get the prevena bg consistent without re-architecting the application code.
                setTimeout(
                    function(){
                        Ext.select('.nav-groupeddataview-item .brand-prevena-bg').replaceCls('brand-prevena-bg', 'brand-vac-therapy-subtemplate2-bg');
                        Ext.select('.nav-groupeddataview-item .brand-vac-therapy-subtemplate2-bg').show();
                        Ext.select('.nav-groupeddataview-item .brand-abthera-bg').replaceCls('brand-abthera-bg', 'brand-vac-therapy-subtemplate2-bg');
                        Ext.select('.nav-groupeddataview-item .brand-vac-therapy-subtemplate2-bg').show();
                    },
                400);
	},
	
	/**
	 *
	 */
	onRelatedItem: function(view, index, target, record, e, eOpts){
		//redirect to products route
		//this.redirectTo('products/' + record.data.xid);
        this.getApplication().getController('Related').doShowRelated(record.data.xid);

		//Google Analytics Tracking
		var pageUrl = record.data.navigation + '/' + record.data.title;
		this.getApplication().getController('Main').doTrackPageView(pageUrl);
	},
	
	/**
	 *
	 */
	doCloseModal: function(){
		var navigationViewModal = this.getNavigationViewModal();
		navigationViewModal.hide();
	},
	
	/**
	 *
	 */
	doSetTemplate: function(record) {
		switch(record.data.type){
			case 'product':
				//create instance of DetailPanel
				var newDetail = Ext.create('KCI.view.ui.DetailPanel',{
					tpl: productTemplate,
					data: record.data
				});				
				return newDetail;
			break;

			default:
				//create instance of DetailPanel
				var newDetail = Ext.create('KCI.view.ui.DetailPanel',{
					tp: defaultTemplate,
					data: record.data
				});
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
				var newButton = Ext.create('KCI.view.ui.LinkButton',{
					text: recordLinks[i].name,
					url: recordLinks[i].url,
					description: recordLinks[i].description
				});
				linkArray[i] = newButton;
			}
			return linkArray;
		}
	}
});
