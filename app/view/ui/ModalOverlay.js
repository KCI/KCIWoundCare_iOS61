Ext.define('KCI.view.ui.ModalOverlay', {
    extend: 'Ext.Panel',
	alias: 'widget.modalOverlay',
	
    config: {
		//layout: 'fit',
		floating: true,
		centered: true,
		modal: true,
		hideOnMaskTap: true,
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