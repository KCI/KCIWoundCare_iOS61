/**
 *
 */
Ext.define('KCI.store.DownloadQueue', {
    extend: 'Ext.data.Store',

	requires: [
		'KCI.model.DownloadQueue'
	],

	config: {
		model: 'KCI.model.DownloadQueue',
		storeId: 'DownloadQueue',
		autoLoad: true,
		
		proxy: {
	        type: 'localstorage',
			id: 'DownloadQueue',
	    }
	}
});