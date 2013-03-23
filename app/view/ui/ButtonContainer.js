Ext.define('KCI.view.ui.ButtonContainer', {
    extend: 'Ext.Container',
	alias: 'widget.buttonContainer',
	
    config: {
		cls: 'button-container',
		layout: 'fit',
		//styleHtmlContent: true,
		tpl: '<div><h2>{title}</h2></div>'
    },
	initialize: function(){
		this.callParent(arguments);
	}
});