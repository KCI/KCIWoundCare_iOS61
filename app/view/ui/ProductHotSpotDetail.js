var hotSpotDetailTemplate = new Ext.XTemplate(
		'<div class="hotspot-detail">',
			'<div class="hotspot-detail-img">',
				'<img src="{[this.getUri()]}/{images.non_retina.full.url}" width="{images.non_retina.full.width}" height="{images.non_retina.full.height}" />',
			'</div>',
			'<strong>{title}</strong>',
		'</div>',
		'<div class="clear"></div>',
		'<div>',
			'{content}',
		'</div>',
		{
			getUri: function(){
				return KCI.app.getApplication().getController('Main').doProvideImageUri();
			}
		}
);

Ext.define('KCI.view.ui.ProductHotSpotDetail', {
    extend: 'Ext.Panel',
	alias: 'widget.productHotSpotDetail',
	
    config: {
		styleHtmlContent: true,
		tpl: hotSpotDetailTemplate
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});