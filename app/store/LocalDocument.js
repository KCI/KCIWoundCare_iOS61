/**
 *
 */
Ext.define('KCI.store.LocalDocument', {
    extend: 'Ext.data.Store',

	requires: [
		'KCI.model.Document'
	],
    
	config: {
		model: 'KCI.model.Document',
		storeId: 'LocalDocument',
		autoLoad: true,
		
		proxy: {
	        type: 'localstorage',
			id: 'LocalDocument',
			reader: {
				type: 'json',
	            rootProperty: 'root'
	        }
	    }
	}
});