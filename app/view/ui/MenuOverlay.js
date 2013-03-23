Ext.define('KCI.view.ui.MenuOverlay', {
    extend: 'Ext.Panel',
	alias: 'widget.menuOverlay',
	
    config: {
		layout: 'fit',
		modal: true,
		hideOnMaskTap: true,
		width: 320,
		height: 400,
		showAnimation: {
			type: 'popIn',
			duration: 250,
			easing: 'ease-out'
		},
		hideAnimation: {
			type: 'popOut',
			duration: 250,
			easing: 'ease-out'
		}    
    },
	initialize: function(){
		this.callParent(arguments);
	}
});