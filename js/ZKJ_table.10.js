(function ($) {
    $.ZKJ_table = function () {
    	var $table = $(".ZKJ-table");
    	if ($table.length!=0)
    	    {
    	    	for (var i=0;i<$table.length;i++)
    	    	    {
                        var $children = $table.eq(i).children();
                        $children.css("float","left");
                        var columns = parseFloat($table.eq(i).attr("data-columns"));
                        var remainder = $children.length%columns;
                        var lines = ($children.length-remainder)/columns;
                        if (remainder!=0)
                            {
                            	lines+=1;
                            }
                        var containerWidth = $table.eq(i).width();
                        for (var a=0;a<$children.length;a+=columns)
                            {   
                            	var getWidth = null;
                                for (var b=0;b<columns;b++)
                                    {
                                        getWidth+=$children.eq(a+b).prop("offsetWidth");
                                    }
                                var marginLeft = (containerWidth-getWidth)/(columns-1);
                                for (var c=1;c<columns;c++)
                                    {
                                    	$children.eq(a+c).css("margin-left",marginLeft.toString()+"px")
                                    }
                            }
                        var getMarginTop = $table.eq(i).attr("data-Y-spacing");
                        $children.css("margin-top",getMarginTop);
                        for (var d=0;d<columns;d++)
                            {
                            	$children.eq(d).css("margin-top","0px")
                            }
                        var getHeight = $children.prop("offsetHeight")*lines+parseFloat(getMarginTop)*(lines-1);
                        if (getHeight>$table.eq(i).height()||$table.eq(i).attr("data-table-height")=="auto")
                            {
                            	$table.eq(i).css("height",getHeight.toString());
                            }
                        if ($table.eq(i).attr("data-cell-width")=="auto")
                            {   
                            	if ($table.eq(i).attr("data-X-spacing")==undefined)
                            	    {   
                            	    	$children.css("margin-left","0px");
                            	    	for (var e=0;e<$children.length;e++)
                            	    	    {   
                            	    	    	var childrenWidth = $table.eq(i).width()/columns;
                            	    	    	$children.eq(e).css("width",childrenWidth.toString()+"px");
                            	    	    	var childrenWidth = childrenWidth-$children.eq(e).prop("offsetWidth")+childrenWidth;
                            	    	    	$children.eq(e).css("width",childrenWidth.toString()+"px");
                            	    	    }
                            	    }
                            	else 
                            	    {
                            	    	var spacingWidth = parseFloat($table.eq(i).attr("data-X-spacing"))*columns;
                            	    	for (var f=0;f<$children.length;f++)
                            	    	    {
                            	    	    	var spacingWidth = parseFloat($table.eq(i).attr("data-X-spacing"))*(columns-1);
                            	    	    	var childrenWidth = ($table.eq(i).width()-spacingWidth)/columns;
                            	    	    	$children.eq(f).css("width",childrenWidth.toString()+"px");
                            	    	    	var childrenWidth = childrenWidth-$children.eq(f).prop("offsetWidth")+childrenWidth;
                            	    	    	$children.eq(f).css("width",childrenWidth.toString()+"px");
                                                if (f%columns!=0)	 
                                                    {
                                                    	$children.eq(f).css("margin-left",$table.eq(i).attr("data-X-spacing"));
                                                    }   
                            	    	    }
                            	    }
                            }
    	    	    }
    	    }
    }
})(jQuery)