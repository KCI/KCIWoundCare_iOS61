Ext.define('KCI.view.tablet.index.IndexNavigationViewContainer', {
    extend: 'KCI.view.ui.NavigationViewContainer',
	alias: 'widget.indexNavigationViewContainer',
	
    config: {
		html: '<div class="container-bg"></div>'
    },
	initialize: function(){
		this.callParent(arguments);
	}
});