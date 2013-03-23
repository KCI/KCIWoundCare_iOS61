Ext.define('KCI.view.ui.ActionSheet', {
    extend: 'Ext.ActionSheet',
	alias: 'widget.actionSheet',
	
    config: {
		zIndex: 20
    },
	initialize: function(){
		this.callParent(arguments);
	}
});