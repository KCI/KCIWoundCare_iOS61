Ext.define('KCI.view.tablet.conditions.ConditionsDetailTemplate', {
    extend: 'KCI.view.ui.DetailTemplate',
	alias: 'widget.conditionsDetailTemplate',
	
    config: {
		layout: 'vbox',
		scrollable: 'vertical'
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});