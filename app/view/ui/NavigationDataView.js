var initData = [
	{
		xid: 0,
		parent: 0,
		type: '',
		group: '',
		status: '',
		selector: '',
		order: '',
		title: 'No Records',
		content: '',
		modified: '',
		tags: '',
		subtitle: '',
		navigation: '',
		related: '',
		link: '',
		attachments: '',
		carousel: '',
		hotspot: ''
		
	}
];

var listTemplate = new Ext.XTemplate(
		'<tpl for="attachments">',
			'<tpl if="this.typeCheck(type, mime_type, group)">',
				'<tpl if="images.retina.thumbnail.url">',
					'<img src="{[this.getUri()]}/{images.retina.thumbnail.url}" width="{images.retina.thumbnail.width}" height="{images.retina.thumbnail.height}" />',
				'</tpl>',
			'</tpl>',		
		'</tpl>',
		'<h1>{title}</h1>',
		'<tpl if="subtitle">',
			'<p>{subtitle}</p>',
		'</tpl>',
		'<div class="nav-dataview-disclosure">',
		'</div>',
		{
			//Check attachment type
			typeCheck: function(type, mime_type, group){
				return type == 'featured' && mime_type == 'image/png' && group == 'true';
			},
			getUri: function(){
				return KCI.app.getApplication().getController('Main').doProvideImageUri();
			}
		}
);

Ext.define('KCI.view.ui.NavigationDataView', {
    extend: 'Ext.DataView',
	alias: 'widget.navigationDataView',
	
    config: {
		baseCls: 'nav-dataview',
		itemTpl: listTemplate,
		data: initData
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});