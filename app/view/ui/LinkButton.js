Ext.define('KCI.view.ui.LinkButton', {
    extend: 'Ext.Button',
	alias: 'widget.linkButton',
	
    config: {
		text: 'View',
		title: null,
		url: null,
		description: null,
		action: 'view-link',
		cls: 'link-button',
		iconCls: 'action',
		iconMask: true,
		speedbump: true
    },
	initialize: function(){
		this.callParent(arguments);
	}
});