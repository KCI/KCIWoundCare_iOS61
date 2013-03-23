Ext.define('KCI.view.tablet.index.IndexLanding', {
    extend: 'KCI.view.ui.IndexLanding',
	alias: 'widget.tabletIndexLanding',
	
    config: {
        layout: 'hbox',
		items:[
			{
				xtype: 'indexNavigationView',
				flex: 1,
				items: [
					{
						xtype: 'indexNavigationDataView',
						title: 'Index'
					}
				]
			},
			{
				xtype: 'indexNavigationViewContainer',
				flex: 2,
				items: [
					{
						xtype: 'indexTitleBar'
					}
				]
			}
		]
    },
	initialize: function(){
		
		this.callParent(arguments);
	}

});