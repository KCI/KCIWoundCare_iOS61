Ext.define('KCI.view.tablet.more.MoreNavigationViewContainer', {
    extend: 'KCI.view.ui.NavigationViewContainer',
	alias: 'widget.moreNavigationViewContainer',
	
    config: {
		navigationBar: {
			hidden: true
		},
		html: '<div class="container-bg"></div>'
    },
	initialize: function(){
		this.callParent(arguments);
	}
});