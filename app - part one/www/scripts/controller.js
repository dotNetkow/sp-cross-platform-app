 /*
 	Controller.js

 	Ties all app dependencies together, including UI interaction, user management, and data storage.
 */
(function(ctrl){ 

	var imageArray = localStorage.imageArrayCache != null 
			? JSON.parse(localStorage.imageArrayCache) 
			: ["img/buildbot-hero.png", "img/pg.jpeg", "img/devices.png"];

	ctrl.init = function() {
		// initialize kendo mobile app - only line needed to get started
        new kendo.mobile.Application(document.body, { skin: "flat", layout: "drawer-layout" });
		
		// load images into carousel
		document.getElementById('curImage').src = imageArray[0];
		createImageCarousel(imageArray);
		
		// load previous single image
		document.getElementById('soloImage').src = localStorage.soloImageSrc || "img/pg.jpeg";
	}

	ctrl.setNewImage = function (img) {
		$("#curImage").attr("src", img.src);
	}

	// Create a basic image carousel. Clicking on an image thumbnail displays it as the main image selected
	function createImageCarousel(imageArray) {
		$.each(imageArray, function( index, value ) {
		  $("#imageCarousel").append($('<img>', { src:value , onclick:'controller.setNewImage(this)',
		  		style:"margin-left:20px; height:50px; width:50px"}));
		});
	}

	ctrl.takePicture = function(cameraSuccessCallback) {
		if (navigator.camera !== undefined) {
				navigator.camera.getPicture( cameraSuccessCallback, cameraFailCallback, { 
					quality: 100,
	    			destinationType: Camera.DestinationType.FILE_URI,
	    			sourceType : Camera.PictureSourceType.CAMERA,
					allowEdit : false,
					encodingType: Camera.EncodingType.JPEG,
					correctOrientation: true,
					saveToPhotoAlbum: true
	    		} );
		} else {
			// load local file
			cameraSuccessCallback("img/phonegap.png");
		}
	}

	ctrl.takePictureForSingle = function() {
		ctrl.takePicture(cameraSuccessSingle);
	}
	
	ctrl.takePictureForCarousel = function() {
		ctrl.takePicture(cameraSuccessCarousel);
	}

	function cameraSuccessCarousel(imageDataPath) {
		imageArray.unshift(imageDataPath);
		localStorage.imageArrayCache = JSON.stringify(imageArray);

		document.getElementById('curImage').src = imageDataPath;

		$("#imageCarousel").prepend($('<img>', {  src: imageDataPath, onclick:'controller.setNewImage(this)',
		  		style:"margin-left:20px; height:50px; width:50px"}));
	}

	function cameraSuccessSingle(imageDataPath) {
		console.log('camera data: ' + imageDataPath);

		// 1st sent single image
		document.getElementById('soloImage').src = imageDataPath;
		localStorage.soloImageSrc = imageDataPath;
	}

	function cameraFailCallback(message) {
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
