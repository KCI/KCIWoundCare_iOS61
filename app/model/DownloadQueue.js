/**
 *
 */
Ext.define('KCI.model.DownloadQueue', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'lookuppath', type: 'string'},
			{name: 'fulluri', type: 'string'},
			{name: 'fullpath', type: 'string'},
			{name: 'status', type: 'string'}
        ]
    }
});