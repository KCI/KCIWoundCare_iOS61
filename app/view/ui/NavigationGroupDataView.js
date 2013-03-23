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
		hotspot: '',
		thumbnailFilename: "",
        productLogo: "",
        landerTitle: ""
		
	}
];

var groupListTemplate = new Ext.XTemplate("<div class='product-vertical-indicator-1 {selector}-vertical-indicator-1'>&nbsp;</div><div class='product-vertical-indicator-2 {selector}-vertical-indicator-2'>&nbsp;</div>", '<div class="nav-product-list-item {selector}-bg" id="nav-product-list-item-{[this.makeSelector(values.title)]}">', "<div class='product-template-right-bg' id='{selector}-product-template-right-bg' style='padding-left: 0px; margin-left: 0px;'>", '<tpl for="attachments">', '<tpl if="this.typeCheck(mime_type)">', '<tpl if="images.retina.thumbnail.url">', '<img class="product-subtemplate-thumbnail" src="{[this.getUri()]}/{images.retina.thumbnail.url}" width="{images.retina.thumbnail.width}" height="{images.retina.thumbnail.height}" />', "</tpl>", "</tpl>", "</tpl>", "</div>",

'<tpl for="attachments">', '<tpl if="this.typeCheck(mime_type)">', '<tpl if="images.retina.thumbnail.url">', '<img class="product-lander-flair" style="float: right;" src="{[this.getUri()]}/{images.retina.thumbnail.url}" width="{images.retina.thumbnail.width}" height="{images.retina.thumbnail.height}" />', "</tpl>", "</tpl>", "</tpl>",

"<div class='product-lander-image' id='{selector}-product-lander-image'><img src='{[this.getUri()]}/{productLogo}' /></div>", "<div class='product-list-text'>", "<h2  class='product-carousel-title'>{title}</h2><h4  class='product-carousel-subtitle'>{subtitle}</h4></div>", "</div>", {
    typeCheck: function(mime_type) {
        return mime_type == "image/png"
    },
    getUri: function() {
        return KCI.app.getApplication().getController("Main").doProvideImageUri()
    },
    makeSelector: function(title) {
       return title.replace(/\s+|\.+|\\|\//g, '-').toLowerCase();
    }
});

Ext.define('KCI.view.ui.NavigationGroupDataView', {
    extend: 'Ext.DataView',
	alias: 'widget.navigationGroupDataView',
	
    config: {
		baseCls: 'nav-dataview',
		itemTpl: groupListTemplate,
		data: initData
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});