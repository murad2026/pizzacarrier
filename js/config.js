/*
 * Pizza Carrier — site configuration.
 * Replace each placeholder with the real value. Anything still starting with
 * "YOUR_" is treated as "not configured" and the matching feature stays off.
 * See README.md for where each value comes from.
 */
window.SITE_CONFIG = {
  // Web3Forms access key (web3forms.com, registered to info@carrierforpizza.com)
  WEB3FORMS_ACCESS_KEY: "YOUR_WEB3FORMS_ACCESS_KEY",

  // Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX"
  GA4_MEASUREMENT_ID: "YOUR_GA4_MEASUREMENT_ID",

  // Microsoft Clarity project ID (clarity.microsoft.com → Settings → Overview)
  CLARITY_PROJECT_ID: "YOUR_CLARITY_PROJECT_ID",

  // Tawk.to live chat: from the widget embed code
  // https://embed.tawk.to/<PROPERTY_ID>/<WIDGET_ID>
  TAWK_PROPERTY_ID: "YOUR_TAWK_PROPERTY_ID",
  TAWK_WIDGET_ID: "YOUR_TAWK_WIDGET_ID",

  // Hero video: a YouTube link (https://www.youtube.com/watch?v=...) or a
  // self-hosted MP4 path (e.g. "assets/video/pizza-carrier.mp4").
  // Leave as is to show the "Video coming soon" poster.
  VIDEO_URL: "YOUR_VIDEO_URL"
};
