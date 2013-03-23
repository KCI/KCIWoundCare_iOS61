Ext.define('KCI.view.tablet.TabPanel',{
    extend: 'KCI.view.ui.TabPanel',
	alias: 'widget.tabletTabPanel',

    config: {
        tabBarPosition: 'bottom',
		items: [
		    {
				xtype: 'tabletProductLanding',
				title: 'Products',
				iconCls: 'home'
			},
			{
				xtype: 'tabletConditionsLanding',
				title: 'Conditions',
				iconCls: 'compass2'
			},
			{
				xtype: 'tabletIndexLanding',
				title: 'Index',
				iconCls: 'bookmarks'
			},
			{
				xtype: 'tabletContactUsLanding',
				title: 'Contact Us',
				iconCls: 'team'
			},
			{
				xtype: 'tabletMoreLanding',
				title: 'More',
				iconCls: 'more'
			}
		]
    }
});