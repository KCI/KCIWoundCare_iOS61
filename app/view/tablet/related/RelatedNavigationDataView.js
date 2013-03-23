var listTemplate = new Ext.XTemplate(
		'<div class="nav-dataview-left">',
			'<tpl for="attachments">',
				'<tpl if="this.typeCheck(mime_type)">',
					'<tpl if="images.non_retina.thumbnail.url">',
						'<img src="{[this.getUri()]}/{images.non_retina.thumbnail.url}" width="{images.non_retina.thumbnail.width}" height="{images.non_retina.thumbnail.height}" />',
					'</tpl>',
				'</tpl>',		
			'</tpl>',
			'<h1>{title}</h1>',
			'<tpl if="subtitle">',
				'<p>{subtitle}</p>',
			'</tpl>',
		'</div>',
		'<div class="nav-dataview-disclosure"></div>',
		'<div class="clear"></div>',
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

Ext.define('KCI.view.tablet.related.RelatedNavigationDataView', {
    extend: 'KCI.view.ui.NavigationDataView',
	alias: 'widget.relatedNavigationDataView',
	
    config: {
		baseCls: 'nav-dataview',
		title: null,
		itemTpl: listTemplate
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});