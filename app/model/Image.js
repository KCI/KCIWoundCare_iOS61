/**
 *
 */
Ext.define('KCI.model.Image', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'xid', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'filename', type: 'string'},
			{name: 'version', type: 'string'},
			{name: 'url', type: 'string'}
        ]
    }
});