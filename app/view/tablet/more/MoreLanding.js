Ext.define('KCI.view.tablet.more.MoreLanding', {
    extend: 'KCI.view.ui.MoreLanding',
	alias: 'widget.tabletMoreLanding',
	
    config: {
        layout: 'hbox',
		items:[
			{
				xtype: 'moreNavigationView',
				flex: 1,
				items: [
					{
						xtype: 'moreNavigationDataView',
						title: 'More'
					}
				]
			},
			{
				xtype: 'moreNavigationViewContainer',
				flex: 2,
				items: [
					{
						xtype: 'moreTitleBar'
					}
				]
			}
		]
    },
	initialize: function(){		
		this.callParent(arguments);
	}

});