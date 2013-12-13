// Custom fonts
window.onload = function() {
	document.getElementsByTagName('html')[0].setAttribute('class','wf-loading');
	setTimeout(function(){
		document.getElementsByTagName('html')[0].setAttribute('style', 'opacity: 1');
	}, 2000);
};

$LAB.setGlobalDefaults({BasePath: '//localhost:4000'});

$LAB.script('//use.typekit.net/piz7avs.js')
.wait(function(){
	try{Typekit.load();}catch(e){}
});

// JQuery /w fallback + main.js
function loadJquery(scripts,idx) {
	function fallback() {
		clearTimeout(timeout);
		if (typeof jQuery === 'undefined') {
			if (idx < scripts.length-1) loadJquery(scripts,idx+1); 
		} else {
			//load scripts that depend on jquery
			$LAB.script("/javascripts/main.js?rel=1386976938450");
		}
	}
	
	if (idx == null) idx = 0;   
	$LAB.script(scripts.src[idx]).wait(fallback);
	var timeout = setTimeout(fallback,1000);
}

loadJquery({  
	src: [
		"//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",
		"/javascripts/libs/jquery.min.js"
	]
});

// Google Analytics
$LAB
.script('//www.google-analytics.com/ga.js')
.wait(function(){
	var _gaq = [['_setAccount', 'UA-46285165-1'], ['_trackPageview']];
});
