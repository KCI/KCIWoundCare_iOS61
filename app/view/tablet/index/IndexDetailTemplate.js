Ext.define('KCI.view.tablet.index.IndexDetailTemplate', {
    extend: 'KCI.view.ui.DetailTemplate',
	alias: 'widget.indexDetailTemplate',
	
    config: {
		layout: 'vbox',
		scrollable: 'vertical'
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});