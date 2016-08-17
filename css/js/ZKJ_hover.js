(function ($) {
    $.fn.ZKJ_hover = function () {
    	var thearguments = arguments[0];
    	var $this = this;
    	return this.each(function () {
    	    $(this).hover(function () {
    	    	if (thearguments instanceof Array)
    	    	    {
    	    	        for (var i = 0;i<thearguments.length;i++)
    	    	            {   if (thearguments[i].selector=="this")
    	    	            	    {
    	    	            	    	$this[0].style.cssText = thearguments[i].csstext;
    	    	            	    }
    	    	            	else
    	    	            	    {
    	    	            	    	 var $elements = $(thearguments[i].selector);
    	    	                         for (var a = 0;a<$elements.length;a++)
    	    	                             {
                                                 $elements.eq(a)[0].style.cssText = thearguments[i].csstext;
    	    	                             }
    	    	            	    }
    	    	            }	
    	    	    }
    	    	else if ((typeof thearguments)=="string")
    	    	    {
                        $this[0].style.cssText = thearguments;
    	    	    }
    	    },
    	    function () {
    	    	if (thearguments instanceof Array)
    	    	    {
    	    	        for (var i = 0;i<thearguments.length;i++)
    	    	            {   if (thearguments[i].selector=="this")
    	    	            	    {
    	    	            	    	$this[0].style.cssText = "";
    	    	            	    }
    	    	            	else
    	    	            	    {
    	    	            	    	 var $elements = $(thearguments[i].selector);
    	    	                         for (var a = 0;a<$elements.length;a++)
    	    	                             {
                                                 $elements.eq(a)[0].style.cssText = "";
    	    	                             }
    	    	            	    }    
    	    	            }
    	    	    }
    	    	else if ((typeof thearguments)=="string")
    	    	    {
                        $this[0].style.cssText = "";
    	    	    }
    	    })
    	})
    }
})(jQuery)