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

// Initialize Snowflake connection
var snowflake = require('snowflake-sdk');
var connection = snowflake.createConnection({
  account: '<your_account_name>',
  username: '<your_username>',
  password: '<your_password>',
  database: '<your_database>',
  schema: '<your_schema>',
  warehouse: '<your_warehouse>'
});

connection.connect(function(err, conn) {
  if (err) {
    console.error('Unable to connect to Snowflake: ' + err.message);
  } else {
    console.log('Connected to Snowflake');
  }
});

// Send page view data to Snowflake
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

  // Insert page view data into Snowflake
  var sql = "INSERT INTO trackPageView (anonymousID, timestamp, referrer, url, campaignName, campaignID, source, medium, channel) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var binds = [anonymousID, timestamp, referrer, window.location.href, campaignName, campaignID, source, medium, channel];
  connection.execute({
    sqlText: sql,
    binds: binds,
    complete: function(err, stmt, rows) {
      if (err) {
        console.error('Error inserting page view data into Snowflake: ' + err.message);
      } else {
        console.log('Inserted page view data into Snowflake');
      }
    }
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

  // Insert button click data into Snowflake
  var sql = "INSERT INTO trackButtonClick (anonymousID, timestamp, referrer, url, campaignName, campaignID, source, medium, channel, buttonID) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var binds = [anonymousID, timestamp, referrer, window.location.href, campaignName, campaignID, source, medium, channel, buttonID];
  connection.execute({
    sqlText: sql,
    binds: binds,
    complete: function(err, stmt, rows) {
      if (err) {
        console.error('Error inserting button click data into Snowflake: ' + err.message);
      } else {
        console.log('Inserted button click data into Snowflake');
      }
    }
  });
});
