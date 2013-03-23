/**
 *
 */
Ext.define('KCI.store.LocalConfig', {
    extend: 'Ext.data.Store',

	requires: [
		'KCI.model.Config'
	],

    config: {
		model: 'KCI.model.Config',
		storeId: 'LocalConfig',
		autoLoad: true,
		
		proxy: {
	        type: 'localstorage',
			id: 'LocalConfig',
			reader: {
				type: 'json',
	            rootProperty: 'config'
	        }
	    }
	}
});