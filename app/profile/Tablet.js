/**
 *
 */
Ext.define('KCI.profile.Tablet', {
    extend: 'Ext.app.Profile',
    
    //define any additional classes your Profile needs here
    config: {
        views: [
			'Main',
			'TabPanel',
			'products.ProductLanding',
			'products.ProductNavigationView',
			'products.ProductNavigationGroupDataView',
			'products.ProductNavigationDataView',
			'products.ProductNavigationViewContainer',
			'products.ProductTitleBar',
			'products.ProductDetailTemplate',
			'products.ProductCarousel',
			'products.ProductCarouselItem',
			'products.ProductHotSpot',
			'contactus.ContactUsDetailTemplate',
			'contactus.ContactUsLanding',
			'contactus.ContactUsTitleBar',
			'contactus.ContactUsNavigationView',
			'contactus.ContactUsNavigationDataView',
			'contactus.ContactUsNavigationViewContainer',
			'index.IndexDetailTemplate',
			'index.IndexLanding',
			'index.IndexNavigationDataView',
			'index.IndexNavigationView',
			'index.IndexNavigationViewContainer',
			'index.IndexTitleBar',
			'more.MoreDetailTemplate',
			'more.MoreLanding',
			'more.MoreNavigationDataView',
			'more.MoreNavigationView',
			'more.MoreNavigationViewContainer',
			'more.MoreTitleBar',
			'conditions.ConditionsLanding',
			'conditions.ConditionsNavigationView',
			'conditions.ConditionsNavigationDataView',
			'conditions.ConditionsNavigationViewContainer',
			'conditions.ConditionsNavigationGroupDataView',
			'conditions.ConditionsTitleBar',
			'conditions.ConditionsDetailTemplate',
			'conditions.ConditionsModalOverlay',
			'related.RelatedLanding',
			'related.RelatedDetailTemplate',
			'related.RelatedNavigationDataView',
			'related.RelatedNavigationView',
			'related.RelatedNavigationViewContainer',
			'related.RelatedTitleBar'
		],
        models: [],
        stores: [],
        controllers: []
    },
    
    //this profile will be activated if we detect we're running on a Tablet or Desktop
    isActive: function(app) {
        return Ext.os.is.Tablet || Ext.os.is.Desktop //|| Ext.browser.is.IE || Ext.browser.is.Webkit || Ext.browser.is.Gecko || Ext.browser.is.Opera
    },
	launch: function() {
		//Ext.create('KCI.view.tablet.Main'); 
	}
});