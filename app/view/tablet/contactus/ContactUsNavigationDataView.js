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
			typeCheck: function(type, mime_type){
				return type == 'featured' && mime_type == 'image/png';
			},
			getUri: function(){
				return KCI.app.getApplication().getController('Main').doProvideImageUri();
			}
		}
);

Ext.define('KCI.view.tablet.contactus.ContactUsNavigationDataView', {
    extend: 'KCI.view.ui.NavigationDataView',
	alias: 'widget.contactUsNavigationDataView',
	
    config: {
		baseCls: 'nav-dataview',
		itemTpl: listTemplate
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});