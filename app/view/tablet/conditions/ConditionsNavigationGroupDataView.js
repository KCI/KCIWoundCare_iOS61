var groupListTemplate = new Ext.XTemplate(
	'<div class="nav-conditions-list-item">',
		'<div class="nav-group">',
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

Ext.define('KCI.view.tablet.conditions.ConditionsNavigationGroupDataView', {
    extend: 'KCI.view.ui.NavigationGroupDataView',
	alias: 'widget.conditionsNavigationGroupDataView',
	
    config: {
		baseCls: 'nav-groupdataview',
		itemTpl: groupListTemplate
    },
	initialize: function(){		
		this.callParent(arguments);
	}
});