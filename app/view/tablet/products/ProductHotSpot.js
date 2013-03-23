var hotSpotTemplate = new Ext.XTemplate('<tpl for="attachments">', '<tpl if="this.typeCheck(type, mime_type)">', '<tpl if="images.retina.full.url">', '<div class="featured hotspot featured-hotspot">', '<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" usemap="#Map" />', "</div>", "</tpl>", "</tpl>", "</tpl>", '<div class="content">', '<p align="center">Tap a red hot spot to view more information.</p>', "{content}", "</div>", 
{
    //Check attachment type
	typeCheck: function(type, mime_type){
		return type == 'hotspot' && mime_type == 'image/png';
	},
	getUri: function(){
		return KCI.app.getApplication().getController('Main').doProvideImageUri();
	}
});

var hotSpotDefaultTemplate = new Ext.XTemplate('<tpl for="attachments">', '<tpl if="this.typeCheck(type, mime_type)">', '<tpl if="images.retina.full.url">', '<div class="featured hotspot featured-hotspot">', '<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" usemap="#Map" />', "</div>", "</tpl>", "</tpl>", "</tpl>", '<div class="content">', '<p align="center">Tap a hot spot to view more information.</p>', "{content}", "</div>", 
{
    
   //Check attachment type
	typeCheck: function(type, mime_type){
		return type == 'hotspot' && mime_type == 'image/png';
	},
	getUri: function(){
		return KCI.app.getApplication().getController('Main').doProvideImageUri();
	}
    
});

Ext.define('KCI.view.tablet.products.ProductHotSpot', {
    extend: 'Ext.Container',
	alias: 'widget.tabletProductHotSpot',
	
    config: {
        layout: 'card',
		tpl: hotSpotTemplate
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});