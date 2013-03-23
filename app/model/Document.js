/**
 *
 */
Ext.define('KCI.model.Document', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'xid', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'filename', type: 'string'},
			{name: 'version', type: 'int'},
			{name: 'url', type: 'string'}
        ]
    }
});