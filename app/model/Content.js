/**
 *
 */
Ext.define('KCI.model.Content', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'xid', type: 'int'},
			{name: 'parent', type: 'int'},
			{name: 'type', type: 'string'},
			{name: 'group', type: 'string'},
			{name: 'status', type: 'string'},
			{name: 'selector', type: 'string'},
			{name: 'order', type: 'int'},
            {name: 'landerTitle', type: 'string'},
			{name: 'title', type: 'string'},
			{name: 'content', type: 'auto'},
			{name: 'date', type: 'string'},
			{name: 'modified', type: 'date', dateFormat: 'Y-m-d H:i:s'},
			{name: 'tags', type: 'string'},
			{name: 'subtitle', mapping: 'custom_fields.mp_subtitle'},
			{name: 'navigation', mapping: 'custom_fields.mp_navigation'},
			{name: 'related', mapping: 'custom_fields.mp_related'},
			{name: 'link', mapping: 'custom_fields.mp_link'},
			{name: 'attachments'},
			{name: 'carousel'},
			{name: 'hotspot'},
            {name: 'thumbnailFilename', mapping:'custom_fields.mp_thumbnailFilename'},
            {name: 'productLogo', mapping: 'custom_fields.mp_productLogo'}
        ]
    }
});