/**
  Function that handles clicks on 'postButton'
  and informs content script about that.
*/
(function () {
	var postButton = document.getElementById('postButton');
	postButton.addEventListener('click', function() {
		var newPost = new CustomEvent('postButtonTriggered', {
			detail: {
			    topic: document.getElementById('postTopic').value,
			    body: document.getElementById('postBody').value
			}
		});
		
		document.dispatchEvent(newPost);
	});
}());