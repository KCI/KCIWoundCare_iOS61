Ext.define('KCI.view.tablet.conditions.ConditionsLanding', {
    extend: 'KCI.view.ui.ConditionsLanding',
	alias: 'widget.tabletConditionsLanding',
	
    config: {
        layout: 'hbox',
		items:[
			{
				xtype: 'conditionsNavigationView',
				flex: 1,
				items: [
					{
						xtype: 'conditionsNavigationGroupDataView',
						title: 'Conditions'
					}
				]
			}
		]
    },
	initialize: function(){
		
		this.callParent(arguments);
	}

});