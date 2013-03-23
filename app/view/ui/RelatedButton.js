Ext.define('KCI.view.ui.RelatedButton', {
    extend: 'Ext.Button',
	alias: 'widget.relatedButton',
	
    config: {
		text: null,
		action: 'view-related',
		height: 50,
		margin: '10 50 10 50',
		related: null
    },
	initialize: function(){
		this.callParent(arguments);
	}
});