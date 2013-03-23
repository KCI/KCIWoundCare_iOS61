Ext.define('KCI.view.ui.NavigationViewContainer', {
    extend: 'Ext.navigation.View',
	alias: 'widget.navigationViewContainer',
	
    config: {
		navigationBar: {
			hidden: true
		} 
    },
	initialize: function(){
		this.callParent(arguments);
	}
});