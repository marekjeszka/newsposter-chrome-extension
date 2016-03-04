/**
  Content script that is responsible for:
  - handling event that is created when post is created
    and storing values in local Chrome storage
  - handling message that is generated in pop-up
    and filling out values on FB
*/
(function (chrome) {
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = chrome.extension.getURL('inject.js');
	var headElement = document.getElementsByTagName('head')
	if (headElement) {
		headElement[0].appendChild(js);
	}
	
	document.addEventListener('postButtonTriggered', function(e) {
		chrome.storage.local.set({'topic': e.detail.topic, 'body': e.detail.body});
	});
	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.command == 'fillPost') {
				var topic;
				var body;
				storageGetEnded = function() {
					if (topic && body) {
						document.getElementsByTagName('input').namedItem('event_name').value = topic;
						document.getElementsByTagName('textarea')[0].value = body;
					}
				};
				chrome.storage.local.get('topic', function(result) {
					topic = result.topic;
					storageGetEnded();
				});
				chrome.storage.local.get('body', function(result) {
					body = result.body;
					storageGetEnded();
				});				
			}
	});
}(chrome));