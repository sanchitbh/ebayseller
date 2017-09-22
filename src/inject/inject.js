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
			var parent = $(link).parent().parent();
			//init = true;				
			$.get('https://ydbwo08o5g.execute-api.us-east-1.amazonaws.com/dev/' + link.href, function(data) {
				console.log(data);
				var feedback = $('<div></div>').html(data.feedback);
				var rating = $('<div></div>').html(data.rating);
				var box = $('<div></div>').css('display', 'block').css('float', 'right').css('border', '1px solid #ccc').css('padding', '5px');
				box.append(feedback).append(rating);				
				
				parent.append(box);
				
				if (/100\%/.test(rating.text())){
                    parent.css('background', '#F1FFF1');
				} else {
					parent.addClass('no100');
				}
			});
		}
	});

	var a = $('a:contains("Buy It Now")').first();
	var b = a.clone().attr('href', '#').text('Hide bad sellers').click(function() {
		$('.no100').slideUp();
	});
	
	a.after(b);
}