"use strict";

(function () {
  var menuController = function menuController() {
    function w3_open() {
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    }

    function w3_close() {
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }

    document.getElementById("menu-btn").onclick = w3_open;
    var classnameClose = document.getElementsByClassName("menu-close");

    for (var i = 0; i < classnameClose.length; i++) {
      classnameClose[i].addEventListener('click', w3_close, false);
    }
  };

  var lazyLoadController = function lazyLoadController() {
    var bLazy = new Blazy({
      breakpoints: [{
        width: 420,
        // Max-width
        src: 'data-src-small'
      }],
      success: function success(element) {
        setTimeout(function () {
          // We want to remove the loader gif now.
          // First we find the parent container
          // then we remove the "loading" class which holds the loader image
          var parent = element.parentNode;
          parent.className = parent.className.replace(/\bloading\b/, '');
        }, 200);
      }
    });
  };

  var serviceWorkerController = function(){
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../sw.js');
    }    
  }

  var init = function() {
    menuController();
    lazyLoadController();
    serviceWorkerController();
  };

  init();
})();