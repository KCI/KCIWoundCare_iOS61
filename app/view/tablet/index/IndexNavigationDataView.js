var indexData = [
	{
		xid: 0,
		parent: 0,
		index: true,
		type: 'video',
		group: '',
		status: '',
		selector: '',
		order: '',
		title: 'Videos A-Z',
		content: '',
		modified: '',
		tags: '',
		subtitle: '',
		navigation: 'Index',
		related: '',
		link: '',
		attachments: [],
		carousel: '',
		hotspot: ''
	},
	{
		xid: 0,
		parent: 0,
		index: true,
		type: 'product',
		group: '',
		status: '',
		selector: '',
		order: '',
		title: 'Products A-Z',
		content: '',
		modified: '',
		tags: '',
		subtitle: '',
		navigation: 'Index',
		related: '',
		link: '',
		attachments: [],
		carousel: '',
		hotspot: ''
	}
];
//
//'<table>',
//  '<tr>',
//  '<td>',
//    '</td>',
//  '<td>',
//    '</td>',
//  '</tr>',
//  '</table>',
//
var listTemplate = new Ext.XTemplate(
		'<div class="nav-dataview-left">',
'<table>',
  '<tr>',
    '<td>',		
			'<tpl for="attachments">',
				'<tpl if="this.typeCheck(type, mime_type)">',
					'<tpl if="images.non_retina.thumbnail.url">',
						'<div class="nav-dataview-img">',
							'<img src="{[this.getUri()]}/{images.non_retina.thumbnail.url}" width="{images.non_retina.thumbnail.width}" height="{images.non_retina.thumbnail.height}" />',
						'</div>',
					'</tpl>',
				'</tpl>',		
			'</tpl>',
    '</td>',
    '<td>',			
			'<div class="nav-dataview-title">',
				'<h1>{title}</h1>',
				'<tpl if="subtitle">',
					'<span>{subtitle}</span>',
				'</tpl>',
			'</div>',
			'<div class="clear"></div>',
    '</td>',
  '</tr>',
  '</table>',
		'</div>',
		'<div class="nav-dataview-disclosure"></div>',
		'<div class="clear"></div>',
		{
			//Check attachment type
			typeCheck: function(type, mime_type){
				return type == 'featured' && mime_type == 'image/png';
			},
			getUri: function(){
				return KCI.app.getApplication().getController('Main').doProvideImageUri();
			}
		}
);

Ext.define('KCI.view.tablet.index.IndexNavigationDataView', {
    extend: 'KCI.view.ui.NavigationDataView',
	alias: 'widget.indexNavigationDataView',
	
    config: {
		baseCls: 'nav-dataview',
		itemTpl: listTemplate,
		data: indexData
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});