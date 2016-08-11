function tipBlock (string, width, height, callback_yes, callback_no) {
	var $container = $("<div></div>");
	var $tipBlock = $("<div></div>");
	var $button_yes = $("<button>确认</button>");
	var $button_no = $("<button>取消</button>");
	$container.css({
		"width": "100%",
		"height": "100%",
		"position": "fixed",
		"background": "rgba(0,0,0,0.8)",
		"z-index": "10000",
		"top": "0px"
	});
	$tipBlock.css({
		"width": width,
		"height": height,
		"background": "white",
		"position": "absolute",
		"left": "0",
		"right": "0",
		"top": "0",
		"bottom": "0",
		"margin": "auto",
		"padding": "20px",
		"font-size": "14px",
		"line-height": "22px"
	});
	$button_yes.css({
	    "width": "50px",
	    "height": "20px",
	    "position": "absolute",
	    "bottom": "20px",
	    "right": "20px"
	});
	$button_no.css({
		"width": "50px",
		"height": "20px",
		"position": "absolute",
		"bottom": "20px",
		"right": "100px"
	});
	$tipBlock.text(string);
	$tipBlock.append($button_yes);
	$tipBlock.append($button_no);
	$container.append($tipBlock);
	$("body").append($container);
	$button_yes.click(callback_yes);
	$button_no.click(callback_no);
	$button_yes.click(function(){
		$container.remove()
	});
	$button_no.click(function(){
		$container.remove()
	})
}