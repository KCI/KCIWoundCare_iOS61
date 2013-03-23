Ext.define('KCI.view.phone.TabPanel',{
    extend: 'KCI.view.ui.TabPanel',
	alias: 'widget.phoneTabPanel',

    config: {
        tabBarPosition: 'bottom',
		items: [
		    {
				xtype: 'phoneProductLanding'
			},
		    {
				title: 'Conditions',
				iconCls: 'info'
			},
			{
				title: 'Index',
				iconCls: 'download'
			},
			{
				title: 'Contact Us',
				iconCls: 'bookmarks'
			},
			{
				title: 'More',
				iconCls: 'more'
			}
		]
    }
});