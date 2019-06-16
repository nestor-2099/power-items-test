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
    } // When the user scrolls the page, execute myFunction


    window.onscroll = function () {
      stickyMenu();
      scrollFunction();
    }; // Get the navbar


    var navbar = document.getElementById("header"); // Get the offset position of the navbar

    var sticky = navbar.offsetTop; // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

    function stickyMenu() {
      console.log('garou');
      console.log(window.pageYOffset);
      console.log(sticky);

      if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }

    function scrollFunction() {
      console.log('supes');

      if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
        document.getElementById("topBtn").style.display = "block";
      } else {
        document.getElementById("topBtn").style.display = "none";
      }
    }

    document.getElementById("topBtn").onclick = topFunction; // When the user clicks on the button, scroll to the top of the document

    function topFunction() {
      document.body.scrollTop = 0; // For Safari

      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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

  var serviceWorkerController = function serviceWorkerController() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('https://nestor-2099.github.io/power-items-test/sw.js');
    }
  };

  var documentReadyController = function documentReadyController() {
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("loading").classList.add("fadeOut");
      setTimeout(function () {
        document.getElementById('body').removeChild(document.getElementById("loading"));
      }, 1000);
    });
  };

  var init = function init() {
    menuController();
    lazyLoadController();
    serviceWorkerController();
    documentReadyController();
  };

  init();
})();