/**
  Script for pop-up (extension icon).
  Sends message when user clicks the button.
*/
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('unloadPost');
  // enable pop-up button:
  checkPageButton.addEventListener('click', function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: 'fillPost'});
    });
  }, false);
}, false);