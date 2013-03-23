Ext.define('KCI.view.tablet.products.ProductLanding', {
    extend: 'KCI.view.ui.ProductLanding',
	alias: 'widget.tabletProductLanding',
	
    config: {
        layout: 'hbox',
        cls: "product-landing-tablet",
		items:[
			{
				xtype: 'productNavigationView',
				flex: 1,
				items: [
					{
						xtype: 'productNavigationGroupDataView',
						//data: null,
						//store: null,
						title: 'Products'
					}
				]
			}
		]
    },
	initialize: function(){
		
		this.callParent(arguments);
	}

});