Ext.define('KCI.view.tablet.conditions.ConditionsNavigationView', {
    extend: 'KCI.view.ui.NavigationView',
	alias: 'widget.conditionsNavigationView',
	
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