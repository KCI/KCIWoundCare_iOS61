var defaultTemplate = new Ext.XTemplate(
	'<tpl for="attachments">',
		'<tpl if="this.typeCheck(type, mime_type)">',
			'<tpl if="images.retina.full.url">',
				'<div class="featured">',
					'<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" />',
				'</div>',
			'</tpl>',
		'</tpl>',		
	'</tpl>',
	
	'<div class="content">',
		'{content}',
	'</div>',	
	{
		//Check attachment type
		typeCheck: function(type, mime_type){
			return mime_type == 'image/png';
		},
		getUri: function(){
			return KCI.app.getApplication().getController('Main').doProvideImageUri();
		}
	}
);

var productTemplate = new Ext.XTemplate(
"<div class='featured-product-splash featured-splash-{selector}' id='featured-splash-{[this.makeSelector(values.title)]}'>",

'<tpl for="attachments">', '<tpl if="this.typeCheck(type, mime_type)">', '<tpl if="images.retina.full.url">', '<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" />', "</tpl>", "</tpl>", "</tpl>",

"<h2 class='content-product-title content-product-title-{selector}' id='content-product-title-{[this.makeSelector(values.title)]}'>{landerTitle}</h2>",
"<div class='horizontal-product-indicator horizontal-{selector}' style='position: absolute; top: 348px; width: 100%; height: 14px;'>&nbsp;</div>",
"</div>",
"<div class='content content-{selector}'>",
"{content}",
"</div>",

{

    typeCheck: function(type, mime_type) {
        return type == "featured" && mime_type == "image/png"
    },
    getUri: function() {
        return KCI.app.getApplication().getController('Main').doProvideImageUri();
    },
    makeSelector: function(title) {
       return title.replace(/\s+|\.+|\\|\//g, '-').toLowerCase();
    }
}

);

var productTemplate = new Ext.XTemplate(
	'<tpl for="attachments">',
		'<tpl if="this.typeCheck(type, mime_type)">',
			'<tpl if="images.retina.full.url">',
				'<div class="featured">',
					'<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" />',
				'</div>',
			'</tpl>',
		'</tpl>',		
	'</tpl>',
	
	'<div class="content {selector}">',
		'{content}',
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

Ext.define('KCI.view.ui.DetailPanel', {
    extend: 'Ext.Panel',
	alias: 'widget.detailPanel',
	
    config: {
		styleHtmlContent: true,
		tpl: productTemplate        
    },
	initialize: function(){
		this.callParent(arguments);
	},
	doUpdateTemplate: function(record){
		this.setRecord(record);
	}	
});