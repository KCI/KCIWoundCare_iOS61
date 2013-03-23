var carouselLastItem = new Ext.XTemplate(
	'<div class="carousel-item">',
		'<div class="featured">',
			'<h1>{title}</h1>',
			'<tpl if="images.retina.full.url">',
				'<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" />',
			'</tpl>',
		'</div>',
		'<div class="content">',
			'{content}',
		'</div>',
		'<div class="carousel-more">',
			'<span class="left"><<< Swipe for Previous Item</span>',
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

var carouselMiddleItem = new Ext.XTemplate(
	'<div class="carousel-item">',
		'<div class="featured">',
			'<h1>{title}</h1>',
			'<tpl if="images.retina.full.url">',
				'<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" />',
			'</tpl>',
		'</div>',
		'<div class="content">',
			'{content}',
		'</div>',
		'<div class="carousel-more">',
			'<span class="left"><<< Swipe for Previous Item</span>',
			'<span class="right">Swipe for Next Item >>></span>',
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

var carouselItem = new Ext.XTemplate(
	'<div class="carousel-item">',
		'<div class="featured">',
			'<h1>{title}</h1>',
			'<tpl if="images.retina.full.url">',
				'<img src="{[this.getUri()]}/{images.retina.full.url}" width="{images.retina.full.width}" height="{images.retina.full.height}" />',
			'</tpl>',
		'</div>',
		'<div class="content">',
			'{content}',
		'</div>',
		'<div class="carousel-more">',
			'<span class="right">Swipe for Next Item >>></span>',
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

Ext.define('KCI.view.tablet.products.ProductCarouselItem',{
    extend: 'KCI.view.ui.CarouselItem',
	alias: 'widget.productCarouselItem',

    config: {
		styleHtmlContent: true,
		tpl: carouselItem,
		baseCls: 'carousel',
		scrollable: 'vertical'
    }
});