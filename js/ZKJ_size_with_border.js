(function ($) {
    $.ZKJ_size_with_border = function () {
         var width_objects = $("*[data-ZKJ-wwb]");
         var height_objects = $("*[data-ZKJ-hwb]");
         for (var i = 0;i<width_objects.length;i++)
             {   
                 var data_ZKJ_wwb = width_objects.eq(i).attr("data-ZKJ-wwb").split(" ");
                 width_objects.eq(i).css("width",data_ZKJ_wwb[0]);
                 var border_width = width_objects.eq(i)[0].offsetWidth-width_objects.eq(i).innerWidth();
                 if (border_width!=0)
                     {   
                     	 if (data_ZKJ_wwb[0].indexOf("px")!=-1)
                     	     {
                     	         var css_width = (parseFloat(data_ZKJ_wwb[0])-border_width).toString()+"px";
                                 width_objects.eq(i).css("width",css_width);	
                     	     }
                     	  else if (data_ZKJ_wwb[0].indexOf("%")!=-1)
                     	  	 {   
                     	  	     var wwb = parseFloat(data_ZKJ_wwb[0]);
                     	  	     if (data_ZKJ_wwb[1]==undefined)
                     	  	     var css_width = ((width_objects.eq(i).parent().width()*(wwb/100)-border_width)/width_objects.eq(i).parent().width()*100).toString()+"%";
                     	  	     else
                     	  	     var css_width = (((width_objects.eq(i).parent().width()+parseFloat(data_ZKJ_wwb[1]))*(wwb/100)-border_width)/(width_objects.eq(i).parent().width()+parseFloat(data_ZKJ_wwb[1]))*100).toString()+"%";
                     	  	     width_objects.eq(i).css("width",css_width);
                     	  	 }
                         
                     }
                 
             }
         for (var i = 0;i<height_objects.length;i++)
             {
                 var data_ZKJ_hwb = height_objects.eq(i).attr("data-ZKJ-hwb").split(" ");
                 height_objects.eq(i).css("height",data_ZKJ_hwb[0]);
                 var border_height = height_objects.eq(i)[0].offsetHeight-height_objects.eq(i).innerHidth();
                 if (border_height!=0)
                     {   
                     	 if (data_ZKJ_hwb[0].indexOf("px")!=-1)
                     	     {
                     	         var css_height = (parseFloat(data_ZKJ_hwb[0])-border_height).toString()+"px";
                                 height_objects.eq(i).css("height",css_height);	
                     	     }
                     	  else if (data_ZKJ_hwb[0].indexOf("%")!=-1)
                     	  	 {   
                     	  	     var hwb = parseFloat(data_ZKJ_hwb[0]);
                     	  	     if (data_ZKJ_hwb[1]==undefined)
                     	  	     var css_height = ((height_objects.eq(i).parent().height()*(hwb/100)-border_height)/height_objects.eq(i).parent().height()*100).toString()+"%";
                     	  	     else
                     	  	     var css_height = (((height_objects.eq(i).parent().height()+parseFloat(data_ZKJ_hwb[1]))*(hwb/100)-border_height)/(height_objects.eq(i).parent().height()+parseFloat(data_ZKJ_hwb[1]))*100).toString()+"%";
                     	  	     height_objects.eq(i).css("height",css_height);
                     	  	 }
                         
                     }
                
             }
    }
})(jQuery)