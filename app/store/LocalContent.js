/**
 *
 */
Ext.define('KCI.store.LocalContent', {
    extend: 'Ext.data.Store',

	requires: [
		'KCI.model.Content'
	],

	config: {
		model: 'KCI.model.Content',
		storeId: 'LocalContent',
		autoLoad: true,
		
		proxy: {
	        type: 'localstorage',
			id: 'LocalContent',
			reader: {
				type: 'json',
				rootProperty: 'pages'
			}
	    }
	}
});