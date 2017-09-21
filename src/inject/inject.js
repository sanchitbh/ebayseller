chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			run();
		}
	}, 10);
});

function run() {
	var init = false;
	
	$('h3 > a').each(function(index, link){
		if (!init) { 
			//init = true;
			$.get('https://ydbwo08o5g.execute-api.us-east-1.amazonaws.com/dev/' + link.href, function(data) {
				var div = $(data);
				var feedback = div.find('span.mbg-l')
				var rating = div.find('div#si-fb');
				var box = $('<div></div>').css('display', 'block').css('float', 'right').css('border', '1px solid #ccc').css('padding', '5px');
				box.append(feedback).append(rating);				
				
				$(link).parent().parent().append(box);
				
				if(/100\%/.test(rating.text())){
                    $(link).parent().parent().css('background', '#F1FFF1');
				}
			});
		}
	});
}