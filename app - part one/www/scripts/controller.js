 /*
 	Controller.js

 	Ties all app dependencies together, including UI interaction, user management, and data storage.
 */
(function(ctrl){ 

	ctrl.init = function() {
		// initialize kendo mobile app - only line needed to get started
        new kendo.mobile.Application(document.body, { skin: "flat", layout: "drawer-layout" });
		
		// load previous photo if available, otherwise load a stock image
		document.getElementById('curImage').src = localStorage.soloImageSrc || "img/phonegap.png";
	}

	ctrl.takePicture = function() {
		if (navigator.camera) {
			// Use the "cordova-plugin-camera" plugin to access the device's camera
			navigator.camera.getPicture( cameraSuccessSingle, cameraFailCallback, { 
				quality: 100,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType : Camera.PictureSourceType.CAMERA,
				allowEdit : false,
				encodingType: Camera.EncodingType.JPEG,
				correctOrientation: true,
				saveToPhotoAlbum: true
			} );
		} else {
			// load local image
			cameraSuccessSingle("img/no-camera.png", false);
		}
	}

	function cameraSuccessSingle(imageDataPath) {
		// Display newly taken photo and cache on device for later retrieval
		document.getElementById('curImage').src = imageDataPath;
		localStorage.soloImageSrc = imageDataPath;
	}

	function cameraFailCallback(message) {
		// Show the user why the camera failed
		alert('Camera failed because: ' + message);
	}

}(window.controller = window.controller || {}));

controller.init();

// Cordova is ready - begin using plugins here
function onDeviceReady() {
	// Nothing to do for Camera plugin
}

function initialize() {
	// register device ready event - called when Cordova is fully loaded
	document.addEventListener("deviceready", onDeviceReady, false);
}