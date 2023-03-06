// Get or generate a unique anonymous ID for each visitor
var anonymousID = localStorage.getItem('anonymousID');
if (!anonymousID) {
  anonymousID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  localStorage.setItem('anonymousID', anonymousID);
}

// Get the UTM parameters from the query string
function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// Send page view data to tracking service or log to console
function trackPageView() {
  // Get the current timestamp
  var timestamp = new Date().toISOString();

  // Get the referrer page
  var referrer = document.referrer;

  // Get UTM parameters from URL if they exist
  var campaignName = getParameterByName('utm_campaign');
  var campaignID = getParameterByName('utm_campaign_id');
  var source = getParameterByName('utm_source');
  var medium = getParameterByName('utm_medium');
  var channel = getParameterByName('utm_channel');

  // Log the page view data to the console or send it to your tracking service
  console.log('Page view:', {
    anonymousID: anonymousID,
    timestamp: timestamp,
    referrer: referrer,
    url: window.location.href,
    campaignName: campaignName,
    campaignID: campaignID,
    source: source,
    medium: medium,
    channel: channel
  });
}

// Fire trackPageView() on each page load
window.onload = function() {
  trackPageView();
  trackButtonClick('my_button_1');
  trackButtonClick('My_Button2');
}

// Track button clicks by CSS ID
function trackButtonClick(buttonID) {
  var button = document.getElementById(buttonID);
  if (button) {
    button.addEventListener('click', function() {
      // Log the button click to the console or send it to your tracking service
      console.log('Button click:', {
        anonymousID: anonymousID,
        timestamp: new Date().toISOString(),
        buttonID: buttonID
      });
    });
  } else {
    console.log('Button not found: ' + buttonID);
  }
}