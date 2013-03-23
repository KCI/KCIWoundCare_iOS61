/**
 *
 */
Ext.define('KCI.controller.Main', {
    extend: 'Ext.app.Controller',
	
    config: {
		refs: {
			tabPanel: 'tabPanel',
			
			showProductDocumentButton: 'productDetailTemplate button[action=view-document]',
			showProductEmailButton: 'productDetailTemplate button[action=email-document]',
			showProductLinkButton: 'productDetailTemplate button[action=view-link]',
			
			showConditionsDocumentButton: 'conditionsDetailTemplate button[action=view-document]',
			showConditionsEmailButton: 'conditionsDetailTemplate button[action=email-document]',
			showConditionsLinkButton: 'conditionsDetailTemplate button[action=view-link]',
			
			showContactUsDocumentButton: 'contactUsDetailTemplate button[action=view-document]',
			showContactUsEmailButton: 'contactUsDetailTemplate button[action=email-document]',
			showContactUsLinkButton: 'contactUsDetailTemplate button[action=view-link]',
			
			showMoreDocumentButton: 'moreDetailTemplate button[action=view-document]',
			showMoreEmailButton: 'moreDetailTemplate button[action=email-document]',
			showMoreLinkButton: 'moreDetailTemplate button[action=view-link]',
			
			showIndexDocumentButton: 'indexDetailTemplate button[action=view-document]',
			showIndexEmailButton: 'indexDetailTemplate button[action=email-document]',
			showIndexLinkButton: 'indexDetailTemplate button[action=view-link]',
			
            showRelatedDocumentButton: 'relatedDetailTemplate button[action=view-document]',
			showRelatedEmailButton: 'relatedDetailTemplate button[action=email-document]',
			showRelatedLinkButton: 'relatedDetailTemplate button[action=view-link]',
			
			showModalDocumentButton: 'modalOverlay button[action=view-document]',
			showModalEmailButton: 'modalOverlay button[action=email-document]',
			showModalLinkButton: 'modalOverlay button[action=view-link]',
			
			productLogo: 'productNavigationView logo',
			productsHome: 'tabletProductLanding logo',
			conditionsHome: 'tabletConditionsLanding logo',
			indexHome: 'tabletIndexLanding logo',
			contactUsHome: 'tabletContactUsLanding logo',
			moreHome: 'tabletMoreLanding logo',
			
			productLanding: 'tabletProductLanding',
			productNavigationView: 'productNavigationView',
			productNavigationViewContainer: 'productNavigationViewContainer',
			
			conditionsLanding: 'tabletConditionsLanding',
			conditionsNavigationView: 'conditionsNavigationView',
			
			indexLanding: 'tabletIndexLanding',
			indexNavigationView: 'indexNavigationView',
			indexNavigationViewContainer: 'indexNavigationViewContainer',
			indexTitleBar: 'indexTitleBar',
			
			contactUsLanding: 'tabletContactUsLanding',
			contactUsNavigationView: 'contactUsNavigationView',
			contactUsNavigationViewContainer: 'contactUsNavigationViewContainer',
			contactUsTitleBar: 'contactUsTitleBar',
			
			moreLanding: 'tabletMoreLanding',
			moreNavigationView: 'moreNavigationView',
			moreNavigationViewContainer: 'moreNavigationViewContainer',
			moreTitleBar: 'moreTitleBar',
		},
		control: {
			showProductDocumentButton: {
				tap:  'doShowDocument'
			},
			showProductEmailButton: {
				tap:  'doEmailDocument'
			},
			showProductLinkButton: {
				tap:  'doShowLink'
			},
			
			showConditionsDocumentButton: {
				tap:  'doShowDocument'
			},
			showConditionsEmailButton: {
				tap:  'doEmailDocument'
			},
			showConditionsLinkButton: {
				tap:  'doShowLink'
			},
			
			showContactUsDocumentButton: {
				tap:  'doShowDocument'
			},
			showContactUsEmailButton: {
				tap:  'doEmailDocument'
			},
			showContactUsLinkButton: {
				tap:  'doShowLink'
			},
			
			showMoreDocumentButton: {
				tap:  'doShowDocument'
			},
			showMoreEmailButton: {
				tap:  'doEmailDocument'
			},
			showMoreLinkButton: {
				tap:  'doShowLink'
			},
			
			showIndexDocumentButton: {
				tap:  'doShowDocument'
			},
			showIndexEmailButton: {
				tap:  'doEmailDocument'
			},
			showIndexLinkButton: {
				tap:  'doShowLink'
			},
			
            showRelatedDocumentButton: {
                tap: 'doShowDocument'
            },
			showRelatedEmailButton: {
                tap: 'doEmailDocument'
            },
			showRelatedLinkButton: {
				tap: 'doShowLink'
			},
			
			showModalDocumentButton: {
				tap:  'doShowDocument'
			},
			showModalEmailButton: {
				tap:  'doEmailDocument'
			},
			showModalLinkButton: {
				tap:  'doShowLink'
			},
			
			productsHome: {
				tap: 'doGoProductsHome'
			},
			conditionsHome: {
				tap: 'doGoConditionsHome'
			},
			indexHome: {
				tap: 'doGoIndexHome'
			},
			contactUsHome: {
				tap: 'doGoContactUsHome'
			},
			moreHome: {
				tap: 'doGoMoreHome'
			}
		}
    },

	/**
	 *
	 */
	init: function(){		
		this.callParent(arguments);
	},
	
	/**
	 *
	 */
	doTrackEvent: function(category, action, opt_label, opt_value, opt_noninteraction) {
		if(KCI.util.Config.getWeb() == true){
			//Google Analytics Event Tracking
			//_gaq.push(['_trackEvent', 'Videos', 'Play', 'Gone With the Wind']);
			//GG _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
			//GG if(KCI.util.Config.getDebug() == true)console.log('GA Event: '+ category + action);
		}
	},
	
	/**
	 *
	 */
	doTrackPageView: function(opt_pageURL){
		if(KCI.util.Config.getWeb() == true){
			//Google Analytics Page Tracking
			//_gaq.push(['_trackPageview', '/home/landingPage']);
			//GG _gaq.push(['_trackPageview', opt_pageURL]);
			//GG if(KCI.util.Config.getDebug() == true)console.log('GA Page View: '+ opt_pageURL);
		}
	},
	
	/**
	 *
	 */
	doShowDocument: function(button) {
		
		//Speedbump check
		if(button.getSpeedbump() == true && KCI.util.Config.getWeb() == true){
			Ext.Msg.show({
				title: button.getText() + ' ' + button.getTitle(),
				message: KCI.util.Config.getDocumentSpeedBumpMsg(),
				buttons: Ext.MessageBox.OKCANCEL,
				zIndex: 20,
				fn: function(buttonId){
					showDocument(buttonId);
				}
				
			});
		}else{
			showDocument('ok');
		}
		
		//open document in new window
		function showDocument(value){
			if(value == 'ok'){
				if(KCI.util.Config.getHybrid() == true){
					if(KCI.app.getApplication().getController('Hybrid').cordovaCheck() == true){
						//hybrid childbrowser function
						KCI.app.getApplication().getController('Hybrid').doShowDocument(button.getUrl());
						
						//Google Analytics Tracking
						KCI.app.getApplication().getController('Hybrid').doTrackEvent('Link','View',button.getTitle());
					}
				}else{
					KCI.app.getApplication().getController('Main').doShowExternal(button.getUrl());
					
					//Google Analytics Tracking
					KCI.app.getApplication().getController('Main').doTrackEvent('Document','View',button.getTitle());
				}
			}
		}
	},
	
	/**
	 *
	 */
	doEmailDocument: function(button) {		
		if(button.getDescription() != null){
			KCI.app.getApplication().getController('Main').doShowExternal('mailto:?subject=' + 'Emailing ' + button.getTitle() +'&body=' + KCI.util.Config.getEmailBodyMsg() + button.getDescription() + ' '+ button.getUrl());
		}else{
			KCI.app.getApplication().getController('Main').doShowExternal('mailto:?subject=' + 'Emailing ' + button.getTitle() +'&body=' + KCI.util.Config.getEmailBodyMsg() + button.getUrl());
		}
	},
	
	/**
	 *
	 */
	doShowLink: function(button) {
		//Speedbump check
		if(button.getSpeedbump() == true && KCI.util.Config.getWeb() == true){
			Ext.Msg.show({
				title: button.getText(),
				message: KCI.util.Config.getLinkSpeedBumpMsg(),
				buttons: Ext.MessageBox.OKCANCEL,
				zIndex: 20,
				fn: function(buttonId){
					showLink(buttonId);
				}
				
			});
		}else{
			showLink('ok');
		}
		
		//open document in new window
		function showLink(value){
			if(value == 'ok'){
				if(KCI.util.Config.getHybrid() == true){
					if(KCI.app.getApplication().getController('Hybrid').cordovaCheck() == true){
						//hybrid childbrowser function
						KCI.app.getApplication().getController('Hybrid').doShowLink(button.getUrl());
						
						//Google Analytics Tracking
						KCI.app.getApplication().getController('Hybrid').doTrackEvent('Link','View',button.getText());
					}
				}else{
					KCI.app.getApplication().getController('Main').doShowExternal(button.getUrl());
					
					//Google Analytics Tracking
					KCI.app.getApplication().getController('Main').doTrackEvent('Link','View',button.getText());
				}				
			}
		}
	},
	
	/**
	 *
	 */
	doShowExternal: function(url){
		//link hack to bypass mobile popup blockers
		var link = Ext.getDom('hidden_link'),
		clickevent = document.createEvent('Event');
		link.href = url;
		clickevent.initEvent('click', true, false);
		link.dispatchEvent(clickevent);
	},
	
	/**
	 *
	 */
	doProvideUri: function(){
		if(KCI.util.Config.getHybrid() == true){
						
			if(KCI.util.Config.getLOCALASSETS() != null){
				return KCI.util.Config.getLOCALASSETS();
				//return KCI.util.Config.getCDN();
			}else{
				return KCI.util.Config.getCDN();
			}
			
		}else if(KCI.util.Config.getWeb() == true){
			return KCI.util.Config.getCDN();
		}
	},
	
	/**
	 *
	 */
	doProvideImageUri: function(){
		if(KCI.util.Config.getWeb()){
			return KCI.util.Config.getCDN();
		}else{
			//this is a relative path to the app assets/images folder
			//use only when packaging assets with app bundle
			//return KCI.util.Config.getIMAGEASSETS();
			
			//return localassets folder
			return KCI.util.Config.getLOCALASSETS();
		}		
	},
	
	/**
	 *
	 */
	doShowDisclaimer: function(){
		Ext.Msg.show({
			title: 'Important Information',
			message: KCI.util.Config.getDisclaimerMsg(),
			buttons: Ext.MessageBox.OK,
			zIndex: 20,
			width: 360,
			cls: 'msg-disclaimer',
			fn: function(buttonId){
				if(KCI.util.Config.getDebug())console.log("EULA Confirmed");
			}
			
		});
	},
	
	/**
	 *
	 */
	doGoProductsHome: function(){
	
        var class_list = ['kci-navigation-bar-prevena', 'kci-navigation-bar-abthera', 'kci-navigation-bar-vactherapy', 'kci-navigation-bar-graftjacket'];
        Ext.select('div.kci-navigation-bar').removeCls(class_list);
        window.navigation_depth_count = 0;     
	
		var productLanding = this.getProductLanding();
		var productNavigationView = this.getProductNavigationView();
		var productNavigationViewContainer = this.getProductNavigationViewContainer();
		var orientation = Ext.Viewport.determineOrientation();
		
		if(orientation == "landscape"){
			
			//get all items within productlanding
			var landingItems = productLanding.getItems();
			
			//loop through each item after productNavigationView
			if(landingItems.items.length > 1){
				for (var i = 1; i < landingItems.items.length; i++) {
					//destroy each item
					landingItems.items[i].destroy();
				}
			}

			//if logo was hidden, show it
			var logo = this.getProductLogo()
			if(logo.getHidden() != true){
				logo.setHidden(true);	
			}

			//reset the navigation view
			productNavigationView.reset();	
			
		}else if(orientation == "portrait"){	
			
			//if exists
			if(productNavigationViewContainer){
				//destroy navigation view container
				productNavigationViewContainer.destroy();
								
				//insert navigationView back at 0 index
				productLanding.insert(0,productNavigationView);
				
				//reset the navigation view
				productNavigationView.reset();
				
				//show navigationView
				productNavigationView.show();
			}else{
				//reset the navigation view
				productNavigationView.reset();
			}
			
			//if logo was hidden, show it
			var logo = this.getProductLogo()
			if(logo.getHidden() != true){
				logo.setHidden(true);	
			}
			
		}
		
	},
	
	/**
	 *
	 */
	doGoConditionsHome: function(){
		var conditionsLanding = this.getConditionsLanding();
		var conditionsNavigationView = this.getConditionsNavigationView();
		var tabPanel = this.getTabPanel();
		
		//get all items within productlanding
		var landingItems = conditionsLanding.getItems();
		
		//loop through each item after productNavigationView
		if(landingItems.items.length > 1){
			for (var i = 1; i < landingItems.items.length; i++) {
				//destroy each item
				landingItems.items[i].destroy();
			}
		}
		//reset the navigation view
		conditionsNavigationView.reset();
		
		//reset home
		this.doGoProductsHome();
		//set tabpanel to 1st panel (home)
		tabPanel.setActiveItem(0);
	},
	
	/**
	 *
	 */
	doGoIndexHome: function(){
		var indexLanding = this.getIndexLanding();
		var indexNavigationView = this.getIndexNavigationView();
		var indexNavigationViewContainer = this.getIndexNavigationViewContainer();
		var indexTitleBar = this.getIndexTitleBar();
		var orientation = Ext.Viewport.determineOrientation();
		var tabPanel = this.getTabPanel();
		
		if(orientation == "landscape"){
			
			//get all items within productlanding
			var landingItems = indexLanding.getItems();
			
			if(landingItems.items.length > 1){
				if(indexNavigationViewContainer.getHtml() != null){
					indexNavigationViewContainer.removeAll();
					indexNavigationViewContainer.setHtml('<div class="container-bg"></div>');
					indexTitleBar.setTitle('');
				}
			}

			//reset the navigation view
			indexNavigationView.reset();	
			
		}else if(orientation == "portrait"){	
			
			//if exists
			if(indexNavigationViewContainer){
				indexNavigationViewContainer.removeAll();
				indexNavigationViewContainer.setHtml('<div class="container-bg"></div>');
				indexTitleBar.setTitle('');
								
				//reset the navigation view
				indexNavigationView.reset();
				
				//show menu overlay
				KCI.app.getApplication().getController('Index').onMenuButton();
				
			}else{
				//reset the navigation view
				indexNavigationView.reset();
			}
			
		}
		
		//reset home
		this.doGoProductsHome();
		//set tabpanel to 1st panel (home)
		tabPanel.setActiveItem(0);		
	},
	
	/**
	 *
	 */
	doGoContactUsHome: function(){
		var contactUsLanding = this.getContactUsLanding();
		var contactUsNavigationView = this.getContactUsNavigationView();
		var contactUsNavigationViewContainer = this.getContactUsNavigationViewContainer();
		var contactUsTitleBar = this.getContactUsTitleBar();
		var orientation = Ext.Viewport.determineOrientation();
		var tabPanel = this.getTabPanel();

		if(orientation == "landscape"){

			//get all items within productlanding
			var landingItems = contactUsLanding.getItems();

			if(landingItems.items.length > 1){
				if(contactUsNavigationViewContainer.getHtml() != null){
					contactUsNavigationViewContainer.removeAll();
					contactUsNavigationViewContainer.setHtml('<div class="container-bg"></div>');
					contactUsTitleBar.setTitle('');
				}
			}

			//reset the navigation view
			contactUsNavigationView.reset();	

		}else if(orientation == "portrait"){	

			//if exists
			if(contactUsNavigationViewContainer){
				contactUsNavigationViewContainer.removeAll();
				contactUsNavigationViewContainer.setHtml('<div class="container-bg"></div>');
				contactUsTitleBar.setTitle('');

				//reset the navigation view
				contactUsNavigationView.reset();

			}else{
				//reset the navigation view
				contactUsNavigationView.reset();
			}

		}
		
		//reset home
		this.doGoProductsHome();	
		//set tabpanel to 1st panel (home)
		tabPanel.setActiveItem(0);
	},
	
	/**
	 *
	 */
	doGoMoreHome: function(){
		var moreLanding = this.getMoreLanding();
		var moreNavigationView = this.getMoreNavigationView();
		var moreNavigationViewContainer = this.getMoreNavigationViewContainer();
		var moreTitleBar = this.getMoreTitleBar();
		var orientation = Ext.Viewport.determineOrientation();
		var tabPanel = this.getTabPanel();

		if(orientation == "landscape"){

			//get all items within productlanding
			var landingItems = moreLanding.getItems();

			if(landingItems.items.length > 1){
				if(moreNavigationViewContainer.getHtml() != null){
					moreNavigationViewContainer.removeAll();
					moreNavigationViewContainer.setHtml('<div class="container-bg"></div>');
					moreTitleBar.setTitle('');
				}
			}

			//reset the navigation view
			moreNavigationView.reset();	

		}else if(orientation == "portrait"){	

			//if exists
			if(moreNavigationViewContainer){
				moreNavigationViewContainer.removeAll();
				moreNavigationViewContainer.setHtml('<div class="container-bg"></div>');
				moreTitleBar.setTitle('');

				//reset the navigation view
				moreNavigationView.reset();

			}else{
				//reset the navigation view
				moreNavigationView.reset();
			}

		}
		
		//reset home
		this.doGoProductsHome();
		//set tabpanel to 1st panel (home)
		tabPanel.setActiveItem(0);
	},
	
	/**
	 *
	 */
	doShowLoadmask: function(){		
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			indicator: true,
			message: KCI.util.Config.getUpdatingMsg()
		});
	},
	
	/**
	 *
	 */
	doHideLoadmask: function(){
		Ext.Viewport.setMasked(false);
		
		KCI.app.getApplication().getController('Main').doShowDisclaimer();
	},
	
	/**
	 *
	 */
	doLaunchView: function(){
		//show main view
		if(Ext.os.is.Tablet || Ext.os.is.Desktop){
			//Ext.create('KCI.view.tablet.Main');
			Ext.Viewport.add(Ext.create('KCI.view.tablet.Main'));
			
		}
		
		if(Ext.Viewport.getMasked()){
			//remove loading mask
			KCI.app.getApplication().getController('Main').doHideLoadmask();
		}
		
		//call setlistdata functions to load initial set of data
		KCI.app.getApplication().getController('Products').doSetListData();
		KCI.app.getApplication().getController('Conditions').doSetListData();
		KCI.app.getApplication().getController('ContactUs').doSetListData();
		KCI.app.getApplication().getController('More').doSetListData();
		
	},
});