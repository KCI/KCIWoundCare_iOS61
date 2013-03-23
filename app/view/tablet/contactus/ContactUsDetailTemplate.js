Ext.define('KCI.view.tablet.contactus.ContactUsDetailTemplate', {
    extend: 'KCI.view.ui.DetailTemplate',
	alias: 'widget.contactUsDetailTemplate',
	
    config: {
		layout: 'vbox',
		scrollable: 'vertical'
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});