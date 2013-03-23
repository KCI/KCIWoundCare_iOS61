/**
* @class Ext.application
* Main application class
*/
Ext.application({
	name: 'KCI',
	
	/**
	* @property
	* Model dependencies
	*/
    models: [
		'Content', 
		'Config',
		'DownloadQueue',
		'Image',
		'Document'
	],

	/**
	* @property
	* Store dependencies
	*/
	stores: [
		'LocalContent', 
		'RemoteContent', 
		'LocalConfig', 
		'RemoteConfig',
		'DownloadQueue',
		'LocalImage',
		'RemoteImage',
		'LocalDocument',
		'RemoteDocument'
	],
	
	/**
	* @property
	* Supported Profiles
	*/
    profiles: ["Tablet", "Phone"],

	/**
	* @property
	* Controller dependencies
	*/
    controllers: [
		'Updates', 
		'Related', 
		'Products', 
		'More', 
		'Main', 
		'Index', 
		'Hybrid', 
		'ContactUs', 
		'Conditions'
	],

	/**
	* @property
	* Require classes
	*/
    requires: [
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Container',
        'Ext.TitleBar',
        'Ext.TabPanel',
        'Ext.navigation.View',
		'Ext.data.Store',
        'Ext.data.proxy.JsonP',
        'Ext.DataView',
        'Ext.Video',
        'Ext.Carousel',
        'Ext.Button',
		'Ext.data.reader.Xml',
		'Ext.Img',
		'KCI.util.Config',
		'Ext.data.proxy.LocalStorage',
		'Ext.data.identifier.Uuid',
		'Ext.LoadMask',
		'Ext.util.DelayedTask'
    ],

	/**
	* @property
	* View dependencies
	*/
    views: [
		'Main',
		'ui.TitleBar',
		'ui.TabPanel',
		'ui.ProductLanding',
		'ui.NavigationViewContainer',
		'ui.NavigationView',
		'ui.NavigationDataView',
		'ui.NavigationGroupDataView',
		'ui.DetailPanel',
		'ui.DocumentButton',
		'ui.EmailButton',
		'ui.ButtonContainer',
		'ui.LinkButton',
		'ui.RelatedButton',
		'ui.DetailTemplate',
		'ui.Carousel',
		'ui.CarouselItem',
		'ui.ContactUsLanding',
		'ui.ModalOverlay',
        'ui.ConditionsLanding',
        'ui.IndexLanding',
        'ui.MoreLanding',
        'ui.NavigationGroupedDataView',
		'ui.MenuOverlay',
		'ui.ProductHotSpotDetail',
		'ui.Logo',
		'ui.ActionSheet'
	],

	/**
	* @property
	* Icons
	*/
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon-72.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon-72@2x.png'
    },

    isIconPrecomposed: true,

	/**
	* @property
	* Startup images
	*/
    startupImage: {
        '320x460': 'resources/startup/Default.png',
        '640x920': 'resources/startup/Default@2x.png',
        '768x1004': 'resources/startup/Default-Portrait~ipad.png',
        '748x1024': 'resources/startup/Default-Landscape~ipad.png',
        '1536x2008': 'resources/startup/Default-Portrait@2x~ipad.png',
        '1496x2048': 'resources/startup/Default-Landscape@2x~ipad.png'
    },

	/**
	* @method launch
	* Main app launch
	*/
    launch: function() {
        if (KCI.app.getApplication().getController("Hybrid").checkConnection() == true) {
            KCI.app.getApplication().getController("Main").doShowLoadmask();
        }
        else
        {
            Ext.Msg.alert("No Network Connection", "In order to receive content updates, you must be connected to the Internet. If this is your first time loading the application, no content will be available.");
        }

		if(KCI.util.Config.getAbout() == true){
			//echo environment to console
			this.environmentDetection();
		}

		//App specific launch
		if(KCI.util.Config.getWeb() == true){
			//launch update 
			KCI.app.getApplication().getController('Updates').doConfigUpdate();

		}else if(KCI.util.Config.getHybrid() && KCI.app.getApplication().getController('Hybrid').cordovaCheck()){
		
			if(KCI.util.Config.getLOCALDATA() == null){
				KCI.app.getApplication().getController('Hybrid').doResolveConfig();
			}

			//setup childbrowser
			childbrowser = ChildBrowser.install();
	        if(childbrowser != null){
	            //childbrowser.onOpenExternal = function(){console.log("open external");};
	            //childbrowser.onCloseBrowser = function(){console.log("close browser");};
	            childbrowser.onLocationChange = function(){console.log("loc changed");};
	        }

		}

        // Initialize the main view
        //Ext.Viewport.add(Ext.create('KCI.view.Main'));
    },

	/**
	* @method onUpdated
	* Called when app has been updated. Prompts user to reload app.
	*/
    onUpdated: function() {
        Ext.Msg.confirm(
            "Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    },

	/**
	* @method environmentDetection
	* Outputs environment information to console. Includes HTML5, Cordova and Sencha Touch.
	*/
	environmentDetection: function(){
        //Cordova Device Information
        if(this.getApplication().getController('Hybrid').cordovaCheck()){
	        console.log('--------------------------------------');
	        console.log('Cordova Environment Detection');
	        console.log('--------------------------------------');
	        console.log('Device Name: ' + device.name);
	        console.log('Device Cordova: ' + device.cordova);
	        console.log('Device Platform: ' + device.platform);
	        console.log('Device UUID: ' + device.uuid);
	        console.log('Device Version: ' + device.version);
	        console.log('--------------------------------------');
        }

        console.log('Sencha Touch Environment Detection');        
        console.log('--------------------------------------');        
		console.log('OS: ' + Ext.os.name + ', Version: ' + Ext.os.version);
		console.log('Browser: ' + Ext.browser.name + ', Engine: ' + Ext.browser.engineName + ', Engine Version: ' + Ext.browser.engineVersion);
		console.log('User Agent: ' + Ext.browser.userAgent);
		console.log('Sencha Touch: ' + Ext.version);
        console.log('--------------------------------------');        
        console.log('Feature Detection:');        
		console.log('--------------------------------------');

		//feature detection
		if(Ext.feature.has.Audio)console.log('Audio');
		if(Ext.feature.has.Canvas)console.log('Canvas');
		if(Ext.feature.has.ClassList)console.log('ClassList');
		if(Ext.feature.has.CreateContextualFragment)console.log('CreateContextualFragment');
		if(Ext.feature.has.Css3dTransforms)console.log('Css3dTransforms');
		if(Ext.feature.has.CssAnimations)console.log('CssAnimations');
		if(Ext.feature.has.CssTransforms)console.log('CssTransforms');
		if(Ext.feature.has.CssTransitions)console.log('CssTransitions');
		if(Ext.feature.has.DeviceMotion)console.log('DeviceMotion');
		if(Ext.feature.has.Geolocation)console.log('Geolocation');
		if(Ext.feature.has.History)console.log('History');
		if(Ext.feature.has.Orientation)console.log('Orientation');
		if(Ext.feature.has.OrientationChange)console.log('OrientationChange');
		if(Ext.feature.has.Range)console.log('Range');
		if(Ext.feature.has.SqlDatabase)console.log('SqlDatabase');
		if(Ext.feature.has.Svg)console.log('Svg');
		if(Ext.feature.has.Touch)console.log('Touch');
		if(Ext.feature.has.Video)console.log('Video');
		if(Ext.feature.has.Vml)console.log('Vml');
		if(Ext.feature.has.WebSockets)console.log('WebSockets');
		console.log('--------------------------------------');
	}
});
