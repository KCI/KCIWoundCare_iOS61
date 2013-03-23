Ext.define('KCI.view.Main', {
    extend: 'Ext.Container',
	alias: 'widget.mainView',
	
    config: {
		fullscreen: true,
		layout: 'card',
		style: 'background-color: #CCC',
        html: 'Main Application View'
     },
     initialize: function() {
        this.callParent(arguments);
        console.log('initializing main lander');
        Ext.select('#kci-bottom-right-logo').show();
    }
});