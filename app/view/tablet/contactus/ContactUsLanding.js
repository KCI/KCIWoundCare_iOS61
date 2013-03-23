Ext.define('KCI.view.tablet.contactus.ContactUsLanding', {
    extend: 'KCI.view.ui.ContactUsLanding',
	alias: 'widget.tabletContactUsLanding',
	
    config: {
        layout: 'hbox',
		items:[
			{
				xtype: 'contactUsNavigationView',
				flex: 1,
				items: [
					{
						xtype: 'contactUsNavigationDataView',
						title: 'Contact Us'
					}
				]
			},
			{
				xtype: 'contactUsNavigationViewContainer',
				flex: 2,
				items: [
					{
						xtype: 'contactUsTitleBar'
					}
				]
			}
		]
    },
	initialize: function(){
		
		this.callParent(arguments);
	}

});