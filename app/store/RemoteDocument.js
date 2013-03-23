/**
 *
 */
Ext.define('KCI.store.RemoteDocument', {
    extend: 'Ext.data.Store',
    
	requires: [
		'KCI.model.Document'
	],
	
	config: {
		model: 'KCI.model.Document',
		storeId: 'RemoteDocument',
		autoLoad: false,
		
		proxy: {
	        type: 'ajax',
			id: 'RemoteDocument', 
	        url: KCI.util.Config.getDOCUMENTS(),
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