Ext.define('KCI.view.tablet.conditions.ConditionsModalOverlay', {
    extend: 'KCI.view.ui.ModalOverlay',
	alias: 'widget.tabletConditionsModalOverlay',
	
    config: {
		layout: 'fit',
		cls: "tablet-conditions-modal-overlay"
    },
	initialize: function(){
		this.callParent(arguments);
	}	
});