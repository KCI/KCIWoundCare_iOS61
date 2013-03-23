Ext.define('KCI.view.ui.EmailButton', {
    extend: 'Ext.Button',
	alias: 'widget.emailButton',
	
    config: {
		text: 'Email',
		title: null,
		url: null,
		description: null,
		caption: null,
		cls: 'email-button',
		action: 'email-document',
		iconCls: 'mail',
		iconMask: true,
		speedbump: null
    },
	initialize: function(){
		this.callParent(arguments);
	}
});