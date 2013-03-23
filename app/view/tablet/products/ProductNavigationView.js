Ext.define('KCI.view.tablet.products.ProductNavigationView', {
    extend: 'KCI.view.ui.NavigationView',
	alias: 'widget.productNavigationView',
	
    config: {	
		navigationBar: {
			items: [
				{
					xtype: 'logo',
					align: 'right'
				}
			]
		}
    },
	initialize: function(){
		this.callParent(arguments);
	}
});