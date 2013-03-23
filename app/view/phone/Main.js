Ext.define('KCI.view.phone.Main', {
    extend: 'KCI.view.Main',
	alias: 'widget.mainPhoneView',
	
    config: {
		items: [
			{
				xtype: 'phoneTabPanel'
			}
        ]
    }
});