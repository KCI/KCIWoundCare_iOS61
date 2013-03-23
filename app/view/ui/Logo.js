Ext.define('KCI.view.ui.Logo',{
    extend: 'Ext.Button',
	alias: 'widget.logo',
	
	/*
    config: {
		src: 'resources/images/kci-logo.png',
		height: 25,
		width: 74
    }
	*/	
	
	config: {
		iconCls: 'logo',
		cls: 'kci-logo-btn',
		height: 40,
		width: 60,
		pressedCls: "kci-logo-btn-pressed",
		style: 'padding: 0px'
	}
});