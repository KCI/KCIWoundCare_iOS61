/**
 *
 */
Ext.define('KCI.store.RemoteImage', {
    extend: 'Ext.data.Store',
    
	requires: [
		'KCI.model.Image'
	],

	config: {
		model: 'KCI.model.Image',
		storeId: 'RemoteImage',
		autoLoad: false,
		
		proxy: {
	        type: 'ajax',
			id: 'RemoteImage', 
	        url: KCI.util.Config.getIMAGES(),
			reader: {
				type: 'json',
	            rootProperty: 'root'
	        },
			timeout: 6000,
	        listeners: {
	            exception:function(proxy, response){
					console.error('Failure', response.responseText);
				}
			}
	    }
	}
});