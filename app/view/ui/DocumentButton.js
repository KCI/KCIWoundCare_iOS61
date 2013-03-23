Ext.define('KCI.view.ui.DocumentButton', {
    extend: 'Ext.Button',
	alias: 'widget.documentButton',
	//action: 'view-document',
		
    config: {
		text: 'View',
		title: null,
		url: null,
		description: null,
		caption: null,
		cls: 'document-button',
		action: 'view-document',
		iconCls: 'action',
		iconMask: true,
		speedbump: null,
    },
	initialize: function(){
		this.callParent(arguments);
	}
});