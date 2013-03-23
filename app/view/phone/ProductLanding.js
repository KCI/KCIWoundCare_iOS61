Ext.define('KCI.view.phone.ProductLanding', {
    extend: 'KCI.view.ui.ProductLanding',
	alias: 'widget.phoneProductLanding',
	
    config: {
        layout: 'hbox',
		title: 'Products',
		iconCls: 'home',
		items:[
			{
				xtype: 'navigationView',
				flex: 1,
				items: [
					{
						xtype: 'navigationDataView',
						store: 'LocalContent',
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