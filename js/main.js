// main.js - behaviour shared by every page: mobile menu, footer year, video fallback.
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  var menuToggle = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  function setMenu(open) {
    navLinks.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      setMenu(!navLinks.classList.contains("is-open"));
    });

    // Close the menu after choosing a link
    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });

    // Close with the Escape key and return focus to the button
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Reset when the viewport grows to desktop width
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) {
        setMenu(false);
      }
    });
  }

  // About page: show a friendly message if the video file is missing
  var video = document.getElementById("intro-video");
  var fallback = document.getElementById("video-fallback");

  if (video && fallback) {
    var source = video.querySelector("source");

    function showVideoFallback() {
      video.hidden = true;
      fallback.classList.add("is-visible");
    }

    if (source) {
      source.addEventListener("error", showVideoFallback);
    }
    video.addEventListener("error", showVideoFallback);
  }
})();
