/**
 * @class KCI.util.Config
 * App configuration 
 * @singleton
 */
Ext.define('KCI.util.Config', {
    singleton : true,

    config : {
		/**
		 * @cfg {boolean} debug
		 * True, to send output to console
		 */
        debug : true,

		/**
		 * @cfg {boolean} about
		 * True, to send environment information to console
		 */
		about: false,
		
		/**
		 * @cfg {boolean} web
		 * True, for Web app. False for Hybrid app
		 */
		web: false,
		
		/**
		 * @cfg {boolean} hybrid
		 * True, for Hybrid app. False for Web App
		 */
		hybrid: true,
		
		/**
		 * @cfg {string} CDN
		 * URL to CDN
		 */
		CDN: "http://722fdc7429dc14d8e5ec-de9c8a9d5e84d164e0ff2e125e267277.r11.cf2.rackcdn.com",
		
		/**
		 * @cfg {string} POSTER
		 * Default poster image to use for videos
		 */
		POSTER: 'image_video_320x240.png',
		
		/**
		 * @cfg {string} CONFIG
		 * Filename of app configuration file
		 */
		CONFIG: 'config12.json',
		
		/**
		 * @cfg {string} CONTENT
		 * Filename of content file
		 */
		CONTENT: 'content8.json',
		
		/**
		 * @cfg {string} DOCUMENTS
		 * Filename of document manifest file
		 */
		DOCUMENTS: 'manifest-documents2.json',
		
		/**
		 * @cfg {string} IMAGES
		 * Filename of image manifest file
		 */
		IMAGES: 'manifest-images5.json',
		
		/**
		 * @cfg {string} VIDEOS
		 * Filename of video manifest file
		 */
		VIDEOS: 'manifest-videos2.json',
		
		/**
		 * @cfg {string} NEWS
		 * filename of RSS News feed
		 * @deprecated
		 * RSS is no longer a function of the app platform. Perhaps a future release.
		 */
		NEWS: 'rss.xml',
		
		/**
		 * @cfg {string} GAIDWEB
		 * Google Analytics Web ID//'UA-30386396-1',
		 */
		GAIDWEB: 'UA-38366364-2', 
		
		/**
		 * @cfg {string} GAIDHYBRID
		 * Google Analytics Hybrid ID//'UA-31181890-1',
		 */
		GAIDHYBRID: 'UA-38366364-1', 
		
		/**
		 * @cfg {string} IMAGEASSETS
		 * Local relative path to image assets
		 */
		IMAGEASSETS: 'assets/images',
		
		/**
		 * @cfg {string} DOCUMENTASSETS
		 * Local relative path to document assets
		 */
		DOCUMENTASSETS: 'assets/documents',
		
		/**
		 * @cfg {string} VIDEOASSETS
		 * Local relative path to video assets
		 */
		VIDEOASSETS: 'assets/videos',
		
		/**
		 * @cfg {null} LOCALDATA
		 * Dynamically populated by Hybrid controller
		 */
		LOCALDATA: null,
		
		/**
		 * @cfg {null} LOCALASSETS
		 * Dynamically populated by Hybrid controller
		 */
		LOCALASSETS: null,
		
		/**
		 * @cfg {boolean} UPDATED
		 * Update status. Returns true after successful Hybrid update
		 */
		UPDATED: false,
		
		/**
		 * @cfg {Number} FAILCOUNT
		 * How many times the update process has failed
		 */
		FAILCOUNT: 0,
		
		/**
		 * @cfg {string} documentSpeedBumpMsg
		 * Document speedbump message
		 */
		documentSpeedBumpMsg: 'You are leaving the app to view this document, are you sure?',
		
		/**
		 * @cfg {string} linkSpeedBumpMsg
		 * link speedbump message
		 */
		linkSpeedBumpMsg: 'You are leaving the app to view this website, are you sure?',
		
		/**
		 * @cfg {string} updateMsg
		 * Update message
		 */
		updateMsg: 'The content has been updated. Reload now?',
		
		/**
		 * @cfg {string} disclaimerMsg
		 * Initial speedbump msg shown when app finishes loading
		 */
		disclaimerMsg: '<p align=\"center\">This app is intended for healthcare professionals only. If you are not a healthcare professional, please consult your doctor for information regarding KCI products.</p>',
		
		/**
		 * @cfg {string} emailBodyMsg
		 * Message included in emails
		 */
		emailBodyMsg: 'Please follow this link: ',
		
		/**
		 * @cfg {string} updatingMsg
		 * The loading/updating message
		 */
		updatingMsg: 'Please wait while the app is updated. This may take a few moments!'
    },

	/**
	 *
	 */
    constructor : function(config) {
        this.initConfig(config);
        this.callParent([config]);
    }
});