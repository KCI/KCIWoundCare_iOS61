Ext.define('KCI.view.tablet.contactus.ContactUsNavigationViewContainer', {
    extend: 'KCI.view.ui.NavigationViewContainer',
	alias: 'widget.contactUsNavigationViewContainer',
	
    config: {
		navigationBar: {
			hidden: true
		},
		html: '<div class="container-bg"></div>' 
    },
	initialize: function(){
		this.callParent(arguments);
	}
});