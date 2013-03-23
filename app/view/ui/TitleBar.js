Ext.define('KCI.view.ui.TitleBar', {
    extend: 'Ext.TitleBar',
	alias: 'widget.titleBar',
	
	config: {
		docked: 'top',
		items: [
			{
				xtype: 'logo',
				align: 'right'
			}
		]
	}
});