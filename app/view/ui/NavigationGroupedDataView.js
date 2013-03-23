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
//'<div class="{selector}-bg">',
//    	'<div class="nav-group-left">',
//	        '<tpl for="attachments">',
//	            '<tpl if="this.typeCheck(type, mime_type)">',
//	                '<tpl if="images.non_retina.thumbnail.url">',
//						'<img src="{[this.getUri()]}/{images.non_retina.thumbnail.url}" width="{images.non_retina.thumbnail.width}" height="{images.non_retina.thumbnail.height}" />',
//					'</tpl>',
//	            '</tpl>',
//	        '</tpl>',
//	    '</div>',
//	    '<div class="nav-group-right">',
//	        '<h2>{title}</h2>',
//	        '<tpl if="subtitle">',
//	            '<p>{subtitle}</p>',
//	        '</tpl>',
//	    '</div>',
//	    '<div class="clear"></div>',
//	'</div>',
//	'<div style="background-color:#aaa; padding:1px; border-style:solid;  border-color:#aaa; border-width:1px; border-radius:5px; height:80px" >',
//background: -moz-linear-gradient(top, #fff, #eee);
//    background: -webkit-linear-gradient(top, #fff, #eee);
//    background: -o-linear-gradient(top, #fff,#eee);
//    background: linear-gradient(top, #fff, #eee);
var groupedListTemplate = new Ext.XTemplate(
	'<div style="background: linear-gradient(top, #fff, #bbb); background: -moz-linear-gradient(top, #fff, #bbb); background: -webkit-linear-gradient(top, #fff, #bbb); border:1px double #bbb; border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px; height:80px" >',
    	'<div class="nav-group-left">',
	        '<tpl for="attachments">',
	            '<tpl if="this.typeCheck(type, mime_type)">',
	                '<tpl if="images.non_retina.thumbnail.url">',
						'<img src="{[this.getUri()]}/{images.non_retina.thumbnail.url}" width="{images.non_retina.thumbnail.width}" height="{images.non_retina.thumbnail.height}" />',
					'</tpl>',
	            '</tpl>',
	        '</tpl>',
	    '</div>',
	    '<div class="nav-group-right">',
	        '<h2>{title}</h2>',
	        '<tpl if="subtitle">',
	            '<p>{subtitle}</p>',
	        '</tpl>',
	    '</div>',
	'</div>',
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

var groupListTemplate = new Ext.XTemplate(
	'<div class="{selector}-bg">',
			'<div class="nav-group-left">',
				'<tpl if="subtitle">',
					'<h2>{subtitle}</h2>',
				'</tpl>',
			'</div>',
			'<div class="nav-group-right">',
				'<tpl for="attachments">',
					'<tpl if="this.typeCheck(mime_type)">',
						'<tpl if="images.retina.thumbnail.url">',
							'<img src="{[this.getUri()]}/{images.retina.thumbnail.url}" width="{images.retina.thumbnail.width}" height="{images.retina.thumbnail.height}" />',
						'</tpl>',
					'</tpl>',		
				'</tpl>',
				'<h1>{title}</h1>',
			'</div>',
			'<div class="clear"></div>',
		'</div>',
		{
			//Check attachment type
			typeCheck: function(mime_type){
				return mime_type == 'image/png';
			},
			getUri: function(){
				return KCI.app.getApplication().getController('Main').doProvideImageUri();
			}
		}
);

Ext.define('KCI.view.ui.NavigationGroupedDataView', {
    extend: 'Ext.DataView',
    alias: 'widget.navigationGroupedDataView',

    config: {
        baseCls: 'nav-groupeddataview',
        itemTpl: groupedListTemplate,
		data: initData
    },
    initialize: function(){
        this.callParent(arguments);
    }
});
