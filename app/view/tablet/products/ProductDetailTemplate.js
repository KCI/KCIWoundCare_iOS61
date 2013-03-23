Ext.define('KCI.view.tablet.products.ProductDetailTemplate', {
    extend: 'KCI.view.ui.DetailTemplate',
	alias: 'widget.productDetailTemplate',
	
    config: {
		layout: 'vbox',
		scrollable: 'vertical',
		baseCls: 'productDetail'
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});