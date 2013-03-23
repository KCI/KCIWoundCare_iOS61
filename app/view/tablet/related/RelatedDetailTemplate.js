Ext.define('KCI.view.tablet.related.RelatedDetailTemplate', {
    extend: 'KCI.view.ui.DetailTemplate',
	alias: 'widget.relatedDetailTemplate',
	
    config: {
		layout: 'vbox',
		scrollable: 'vertical'
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});