Ext.define('KCI.view.tablet.related.RelatedLanding', {
    extend: 'Ext.Container',
	alias: 'widget.tabletRelatedLanding',
	
    config: {
        layout: 'hbox',
		fullscreen: true,
		items:[
			{
				xtype: 'relatedNavigationView',
				flex: 1,
				items: [
					{
						xtype: 'relatedNavigationDataView',
						title: null
					}
				]
			},
			{
				xtype: 'relatedNavigationViewContainer',
				flex: 2,
				items: [
					{
						xtype: 'relatedTitleBar'
					}
				]
			}
		]
    },
	initialize: function(){
		this.callParent(arguments);
        this.callParent(arguments);
        Ext.select('#kci-bottom-right-logo').hide();
	}

});