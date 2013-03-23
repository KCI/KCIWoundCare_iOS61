Ext.define('KCI.view.tablet.more.MoreDetailTemplate', {
    extend: 'KCI.view.ui.DetailTemplate',
	alias: 'widget.moreDetailTemplate',
	
    config: {
		layout: 'vbox',
		scrollable: 'vertical'
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});