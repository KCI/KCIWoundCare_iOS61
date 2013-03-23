/**
 *
 */
Ext.define('KCI.model.Config', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'xid', type: 'int'},
            {name: 'version', type: 'int'},
            {name: 'type', type: 'string'},
            {name: 'filename', type: 'string'},
            {name: 'url', type: 'string'}
        ]
    }
});