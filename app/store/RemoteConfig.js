/**
 *
 */
Ext.define('KCI.store.RemoteConfig', {
    extend: 'Ext.data.Store',

	requires: [
		'KCI.model.Config'
	],

	config: {
		model: 'KCI.model.Config',
		storeId: 'RemoteConfig',
		autoLoad: false,
		
		proxy: {
			type: 'ajax',
			id: 'RemoteConfig',
	        url: KCI.util.Config.getWeb() ? 'data/' + KCI.util.Config.getCONFIG() : KCI.util.Config.getCONFIG(),
			reader: {
				type: 'json',
	            rootProperty: 'config'
	        },
	        listeners: {
	            exception:function(proxy, response){
					console.error('Failure', response);
				}
			}
		}
	}
});