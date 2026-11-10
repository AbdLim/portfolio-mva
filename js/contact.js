// contact.js - front-end validation for the contact form.
// There is no backend: a valid form is NOT sent anywhere.
(function () {
  "use strict";

  var EMAIL_PLACEHOLDER = "aaladan453@gmail.com";

  var form = document.getElementById("contact-form");
  if (!form) {
    return; // Not the contact page
  }

  var feedback = document.getElementById("form-feedback");
  var submitButton = document.getElementById("submit-btn");

  var fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    message: document.getElementById("message"),
  };

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var DIGITS_ONLY = /^\d+$/;

  // Returns an error message, or "" if the value is valid
  function validateField(name, value) {
    var trimmed = value.trim();

    if (trimmed === "") {
      var labels = {
        name: "your full name",
        email: "your email address",
        phone: "your phone number",
        message: "a message",
      };
      return "Please enter " + labels[name] + ".";
    }
    if (name === "email" && !EMAIL_PATTERN.test(trimmed)) {
      return "Please enter a valid email address, like name@example.com.";
    }
    if (name === "phone" && !DIGITS_ONLY.test(trimmed)) {
      return "Phone number must contain digits only (no letters, spaces or symbols).";
    }
    return "";
  }

  function showError(name, message) {
    var input = fields[name];
    var errorEl = document.getElementById(name + "-error");
    errorEl.textContent = message;
    input.classList.toggle("is-invalid", message !== "");
    if (message) {
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  }

  function validateAll() {
    var firstInvalid = null;
    Object.keys(fields).forEach(function (name) {
      var message = validateField(name, fields[name].value);
      showError(name, message);
      if (message && !firstInvalid) {
        firstInvalid = fields[name];
      }
    });
    return firstInvalid; // null means everything is valid
  }

  function showFeedback(type, content) {
    feedback.className = "form-feedback form-feedback--" + type;
    feedback.replaceChildren(content);
    feedback.hidden = false;
    feedback.focus();
  }

  function buildSuccessMessage() {
    var wrapper = document.createElement("div");

    var text = document.createElement("p");
    text.textContent =
      "Your message has passed validation. This demo form does not currently send messages to a server.";
    wrapper.appendChild(text);

    var mailto = document.createElement("p");
    mailto.style.marginTop = "0.5rem";
    var link = document.createElement("a");
    var subject = encodeURIComponent(
      "Message from " + fields.name.value.trim(),
    );
    var body = encodeURIComponent(
      fields.message.value.trim() + "\n\nPhone: " + fields.phone.value.trim(),
    );
    link.href =
      "mailto:" + EMAIL_PLACEHOLDER + "?subject=" + subject + "&body=" + body;
    link.textContent = "Open in your email app instead";
    mailto.appendChild(link);
    wrapper.appendChild(mailto);

    return wrapper;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // never let the browser submit the form
    feedback.hidden = true;

    var firstInvalid = validateAll();
    if (firstInvalid) {
      var error = document.createElement("p");
      error.textContent = "Please fix the highlighted fields and try again.";
      showFeedback("error", error);
      firstInvalid.focus();
      return;
    }

    // Brief loading state so the interaction feels responsive
    submitButton.disabled = true;
    submitButton.textContent = "Checking...";
    setTimeout(function () {
      showFeedback("success", buildSuccessMessage());
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = "Send message";
    }, 500);
  });

  // Validate a field when the user leaves it, and clear errors as they fix them
  Object.keys(fields).forEach(function (name) {
    fields[name].addEventListener("blur", function () {
      if (
        fields[name].value !== "" ||
        fields[name].classList.contains("is-invalid")
      ) {
        showError(name, validateField(name, fields[name].value));
      }
    });
    fields[name].addEventListener("input", function () {
      if (fields[name].classList.contains("is-invalid")) {
        showError(name, validateField(name, fields[name].value));
      }
    });
  });
})();
