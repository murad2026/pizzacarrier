/* Pizza Carrier — site behaviour (no framework, no build step). */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var params = new URLSearchParams(window.location.search);
  var SRC = (params.get("src") || "").slice(0, 60);

  function isSet(v) {
    return typeof v === "string" && v.trim() !== "" && v.indexOf("YOUR_") !== 0;
  }

  /* ---------- Analytics (GA4) ---------- */
  var gaReady = false;
  function loadGA() {
    if (!isSet(CFG.GA4_MEASUREMENT_ID)) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CFG.GA4_MEASUREMENT_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", CFG.GA4_MEASUREMENT_ID);
    gaReady = true;
  }
  function track(name, data) {
    if (gaReady && typeof window.gtag === "function") window.gtag("event", name, data || {});
  }

  /* ---------- Live chat (Tawk.to) ---------- */
  function loadTawk() {
    if (!isSet(CFG.TAWK_PROPERTY_ID) || !isSet(CFG.TAWK_WIDGET_ID)) return;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://embed.tawk.to/" + encodeURIComponent(CFG.TAWK_PROPERTY_ID) + "/" + encodeURIComponent(CFG.TAWK_WIDGET_ID);
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);
  }

  /* ---------- Hero video ---------- */
  function youTubeId(url) {
    var m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : null;
  }
  function setupVideo() {
    var frame = document.getElementById("video-frame");
    var play = document.getElementById("video-play");
    var label = document.getElementById("video-label");
    if (!frame || !play) return;
    var url = CFG.VIDEO_URL;

    if (!isSet(url)) {
      play.setAttribute("aria-disabled", "true");
      play.setAttribute("aria-label", "Video coming soon");
      play.querySelector(".video-play-icon").hidden = true;
      return;
    }
    label.textContent = "Watch the video";
    play.addEventListener("click", function () {
      var yt = youTubeId(url);
      var el;
      if (yt) {
        el = document.createElement("iframe");
        el.src = "https://www.youtube-nocookie.com/embed/" + yt + "?autoplay=1&rel=0&playsinline=1";
        el.title = "Setting up a Pizza Carrier";
        el.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        el.allowFullscreen = true;
      } else {
        el = document.createElement("video");
        el.src = url;
        el.controls = true;
        el.autoplay = true;
        el.playsInline = true;
        el.setAttribute("aria-label", "Setting up a Pizza Carrier");
      }
      frame.replaceChildren(el);
      track("video_play", { src: SRC || "direct" });
    });
  }

  /* ---------- Visitors from the flyer QR code (?src=flyer) ---------- */
  function setupFlyer() {
    if (SRC !== "flyer") return;
    document.body.classList.add("is-flyer");
    var v = document.getElementById("video");
    if (v) v.scrollIntoView({ block: "center" });
    track("flyer_visit", { src: "flyer" });
  }

  /* ---------- Forms (Web3Forms) ---------- */
  function fieldError(input, msg) {
    var id = input.id + "-err";
    var existing = document.getElementById(id);
    if (!msg) {
      input.removeAttribute("aria-invalid");
      if (existing) existing.remove();
      var desc = (input.getAttribute("aria-describedby") || "").replace(id, "").trim();
      if (desc) input.setAttribute("aria-describedby", desc); else input.removeAttribute("aria-describedby");
      return;
    }
    input.setAttribute("aria-invalid", "true");
    if (!existing) {
      existing = document.createElement("p");
      existing.className = "field-error";
      existing.id = id;
      var host = input.closest(".field") || input.closest(".check") || input.parentNode;
      host.appendChild(existing);
      input.setAttribute("aria-describedby", ((input.getAttribute("aria-describedby") || "") + " " + id).trim());
    }
    existing.textContent = msg;
  }

  function messageFor(input) {
    var v = input.validity;
    if (v.valueMissing) {
      if (input.type === "checkbox") return "Please confirm to continue.";
      if (input.tagName === "SELECT") return "Please choose an option.";
      return "This field is required.";
    }
    if (v.typeMismatch && input.type === "email") return "Please enter a valid email address.";
    if (v.patternMismatch && input.name === "zip") return "Please enter a 5-digit ZIP code.";
    if (v.rangeUnderflow || v.badInput || v.stepMismatch) return "Please enter a whole number of 1 or more.";
    return "Please check this field.";
  }

  function validate(form) {
    var firstBad = null;
    var inputs = form.querySelectorAll("input, select, textarea");
    Array.prototype.forEach.call(inputs, function (el) {
      if (el.type === "hidden" || el.closest(".hp") || el.closest("[hidden]")) { fieldError(el, null); return; }
      if (el.checkValidity()) { fieldError(el, null); }
      else { fieldError(el, messageFor(el)); if (!firstBad) firstBad = el; }
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function radioGroupsValid(form) {
    // Required radio groups on the feedback page
    var ok = true, first = null;
    form.querySelectorAll("fieldset[data-required]").forEach(function (fs) {
      var checked = fs.querySelector("input:checked");
      var err = fs.querySelector(".field-error");
      if (!checked) {
        ok = false;
        if (!err) { err = document.createElement("p"); err.className = "field-error"; fs.appendChild(err); }
        err.textContent = "Please choose an option.";
        if (!first) first = fs.querySelector("input");
      } else if (err) { err.remove(); }
    });
    if (first) first.focus();
    return ok;
  }

  function send(payload) {
    return fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().then(function (j) { if (!r.ok || !j.success) throw new Error(j.message || "Send failed"); return j; });
    });
  }

  function formToObject(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = typeof v === "string" ? v.trim() : v; });
    return data;
  }

  var ERROR_TEXT = "Something went wrong and your request wasn’t sent. Please try again, or call 781.888.2946 or email info@carrierforpizza.com.";

  /* Order / Test Drive form */
  function setupOrderForm() {
    var form = document.getElementById("order-form");
    if (!form) return;
    var submit = document.getElementById("order-submit");
    var errorBox = document.getElementById("order-error");
    var success = document.getElementById("order-success");
    var cases = document.getElementById("f-cases");
    var feedback = document.getElementById("f-feedback");

    form.elements.src.value = SRC;
    form.elements.page_url.value = window.location.href;

    function mode() { return form.querySelector('input[name="mode"]:checked').value; }

    function applyMode(m) {
      var isOrder = m === "order";
      form.querySelectorAll('[data-only="order"]').forEach(function (el) { el.hidden = !isOrder; });
      form.querySelectorAll('[data-only="testdrive"]').forEach(function (el) { el.hidden = isOrder; });
      cases.required = isOrder;
      feedback.required = !isOrder;
      form.elements.form_type.value = isOrder ? "Order" : "Test Drive";
      submit.textContent = isOrder ? "Send my order" : "Request my Free Test Drive";
      fieldError(cases, null);
      fieldError(feedback, null);
    }

    form.querySelectorAll('input[name="mode"]').forEach(function (r) {
      r.addEventListener("change", function () { applyMode(mode()); });
    });

    // Buttons/links elsewhere on the page that pick a mode (data-mode)
    document.querySelectorAll("a[data-mode]").forEach(function (a) {
      a.addEventListener("click", function () {
        var target = form.querySelector('input[name="mode"][value="' + a.getAttribute("data-mode") + '"]');
        if (target && !success.hidden) return;
        if (target) { target.checked = true; applyMode(target.value); }
      });
    });

    applyMode(mode());

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errorBox.hidden = true;
      if (!validate(form)) return;

      var d = formToObject(form);
      if (d.website) return; // honeypot filled → silently drop

      var isOrder = mode() === "order";
      var place = d.city + ", " + d.state;
      var n = parseInt(d.cases, 10) || 1;
      var subject = isOrder
        ? "[ORDER] " + n + " case" + (n === 1 ? "" : "s") + " — " + d.pizzeria_name + " — " + place
        : "[TEST DRIVE] " + d.pizzeria_name + " — " + place;

      if (!isSet(CFG.WEB3FORMS_ACCESS_KEY)) {
        errorBox.textContent = ERROR_TEXT;
        errorBox.hidden = false;
        if (window.console) console.warn("Web3Forms access key is not set in js/config.js");
        return;
      }

      var payload = {
        access_key: CFG.WEB3FORMS_ACCESS_KEY,
        subject: subject,
        from_name: "carrierforpizza.com",
        replyto: d.email,
        "Request type": isOrder ? "Order" : "Free Test Drive (50 carriers)",
        "Pizzeria name": d.pizzeria_name,
        "Contact name": d.name,
        Phone: d.phone,
        Email: d.email,
        "Shipping address": d.street + ", " + d.city + ", " + d.state + " " + d.zip,
        Comment: d.comment || "—",
        "Came from": d.src || "direct",
        "Page URL": d.page_url,
        botcheck: ""
      };
      if (isOrder) payload["Number of cases"] = String(n);
      else payload["Agreed to share feedback"] = "Yes";

      submit.disabled = true;
      var label = submit.textContent;
      submit.textContent = "Sending…";

      send(payload).then(function () {
        document.getElementById("order-success-title").textContent = isOrder
          ? "Thank you! Your order request is in."
          : "Thank you! Your Test Drive request is in.";
        document.getElementById("order-success-text").textContent = isOrder
          ? "We’ll contact you to confirm the shipping cost and next steps."
          : "We’ll contact you to confirm shipping.";
        form.hidden = true;
        success.hidden = false;
        success.focus();
        track(isOrder ? "order_submit" : "test_drive_submit", { src: d.src || "direct", cases: isOrder ? n : undefined });
      }).catch(function () {
        errorBox.textContent = ERROR_TEXT;
        errorBox.hidden = false;
        errorBox.scrollIntoView({ block: "center" });
      }).then(function () {
        submit.disabled = false;
        submit.textContent = label;
      });
    });
  }

  /* Feedback form (/feedback/) */
  function setupFeedbackForm() {
    var form = document.getElementById("feedback-form");
    if (!form) return;
    var submit = form.querySelector('button[type="submit"]');
    var errorBox = document.getElementById("feedback-error");
    var success = document.getElementById("feedback-success");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errorBox.hidden = true;
      var okFields = validate(form);
      var okRadios = radioGroupsValid(form);
      if (!okFields || !okRadios) return;
      var d = formToObject(form);
      if (d.website) return;

      if (!isSet(CFG.WEB3FORMS_ACCESS_KEY)) {
        errorBox.hidden = false;
        if (window.console) console.warn("Web3Forms access key is not set in js/config.js");
        return;
      }
      submit.disabled = true;
      send({
        access_key: CFG.WEB3FORMS_ACCESS_KEY,
        subject: "[FEEDBACK] " + d.pizzeria_name,
        from_name: "carrierforpizza.com",
        replyto: d.email,
        "Pizzeria name": d.pizzeria_name,
        Email: d.email,
        "Did pizzas stay level?": d.level,
        "Was it easy for staff/customers? (1–5)": d.ease,
        "Will you order a case?": d.order_intent,
        Comments: d.comments || "—",
        botcheck: ""
      }).then(function () {
        form.hidden = true;
        success.hidden = false;
        success.focus();
        track("feedback_submit", { order_intent: d.order_intent });
      }).catch(function () {
        errorBox.hidden = false;
      }).then(function () { submit.disabled = false; });
    });
  }

  /* ---------- Init ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  loadGA();
  setupVideo();
  setupOrderForm();
  setupFeedbackForm();
  setupFlyer();
  window.addEventListener("load", loadTawk);
})();
