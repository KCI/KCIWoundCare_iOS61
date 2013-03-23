/**
 *
 */
Ext.define('KCI.store.LocalImage', {
    extend: 'Ext.data.Store',

	requires: [
		'KCI.model.Image'
	],
 
	config: {
		model: 'KCI.model.Image',
		storeId: 'LocalImage',
		autoLoad: true,
		
		proxy: {
	        type: 'localstorage',
			id: 'LocalImage',
			reader: {
				type: 'json',
	            rootProperty: 'root'
	        }
	    }
	}
});