Ext.define('KCI.view.ui.DetailTemplate', {
    extend: 'Ext.Container',
	alias: 'widget.detailTemplate',
	
    config: {
		layout: 'vbox',
		scrollable: 'vertical'
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});