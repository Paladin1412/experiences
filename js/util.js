//https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
	// launch fullscreen
	function launchFullScreen(elem) {
	  if (!elem.fullscreenElement &&    // alternative standard method
	      !elem.mozFullScreenElement && !elem.webkitFullscreenElement && !elem.msFullscreenElement ) {  // current working methods
  		var requestFullScreen = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
  		requestFullScreen.call(elem);
	  }
	}
