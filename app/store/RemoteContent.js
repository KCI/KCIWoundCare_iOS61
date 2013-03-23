/**
 *
 */
Ext.define('KCI.store.RemoteContent', {
    extend: 'Ext.data.Store',

	requires: [
		'KCI.model.Content'
	],

	config: {
		model: 'KCI.model.Content',
		storeId: 'RemoteContent',
		autoLoad: false,
		
		proxy: {
			type: 'ajax',
			id: 'RemoteContent',
	        url: KCI.util.Config.getWeb() ? 'data/' + KCI.util.Config.getCONTENT() : KCI.util.Config.getCONTENT(),
			reader: {	
				type: 'json',
	            rootProperty: 'pages'
			},
	        listeners: {
	            exception:function(proxy, response){
					console.error('Failure', response);
				}
			}
		}
	}
});