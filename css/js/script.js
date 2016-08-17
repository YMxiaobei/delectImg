/*创建数据*/
var group = [
                 {person_id:"1", person_name:"范冰冰", face_id:"1", img_path:["img/fanbinbin/fan1.jpg", "img/fanbinbin/fan2.jpg", "img/fanbinbin/fan3.jpg", "img/fanbinbin/fan4.jpg", "img/fanbinbin/fan5.jpg", "img/fanbinbin/fan6.jpg", "img/fanbinbin/fan7.jpg", "img/fanbinbin/fan8.jpg", "img/fanbinbin/fan9.jpg", "img/fanbinbin/fan10.jpg"]},
                 {person_id:"2", person_name:"刘亦菲", face_id:"2", img_path:["img/liuyifei/liu1.jpg", "img/liuyifei/liu2.jpg", "img/liuyifei/liu3.jpg", "img/liuyifei/liu4.jpg", "img/liuyifei/liu5.jpg", "img/liuyifei/liu6.jpg", "img/liuyifei/liu7.jpg", "img/liuyifei/liu8.jpg", "img/liuyifei/liu9.jpg", "img/liuyifei/liu10.jpg"]},
                 {person_id:"3", person_name:"杨紫",face_id:"3", img_path:["img/yangzhi/yang1.jpg","img/yangzhi/yang2.jpg","img/yangzhi/yang3.jpg","img/yangzhi/yang4.jpg","img/yangzhi/yang5.jpg","img/yangzhi/yang6.jpg","img/yangzhi/yang7.jpg","img/yangzhi/yang8.jpg","img/yangzhi/yang9.jpg","img/yangzhi/yang10.jpg"]},
                 {person_id:"4", person_name:"赵丽颖", face_id:"4", img_path:["img/zhaoliyin/zhao1.jpg","img/zhaoliyin/zhao2.jpg","img/zhaoliyin/zhao3.jpg","img/zhaoliyin/zhao4.jpg","img/zhaoliyin/zhao5.jpg","img/zhaoliyin/zhao6.jpg","img/zhaoliyin/zhao7.jpg","img/zhaoliyin/zhao8.jpg","img/zhaoliyin/zhao9.jpg","img/zhaoliyin/zhao10.jpg"]}
             ];
/*数组group包含face_id和对应的图片url*/

/*将要被删除的图片*/
             var group_recicle_bin = [
                 {person_id:"1", person_name:"范冰冰", face_id:"1", img_path:["img/fanbinbin/fan1.jpg,no"]},
                 {person_id:"2", person_name:"刘亦菲", face_id:"2", img_path:["img/liuyifei/liu1.jpg,no"]},
                 {person_id:"3", person_name:"杨紫",face_id:"3", img_path:["img/yangzhi/yang1.jpg,no"]},
                 {person_id:"4", person_name:"赵丽颖", face_id:"4", img_path:["img/zhaoliyin/zhao1.jpg,no"]}
             ];


             var f_Array = [
                 {face_id:"1", book:""},
                 {face_id:"2", book:""},
                 {face_id:"3", book:""},
                 {face_id:"4", book:""}
             ];
             var saveArray = [];
             var re_group = [];
/*count 是为了追踪图片被删除的顺序以辅助回滚功能的实现*/
             var count = 1;
/*state记录按钮的开关状态*/
             var state = {
               preViewOpen: true,
               flold: false,
               now: "1",
               hide_hasSave: false,
               hide_hasCommit: false,
               search_type: "face_id"
             };
/*查询跳转下拉菜单的事件监听函数的绑定*/
             $("#search-type").click(function (event) {

                         $(this).children("div").css("display","block");   
             });   
             $("#search-value-book").click(function () {
                 $(this).children("div").css("display","block");
             });
             $("#search-value-face-id").click(function () {
                  $(this).children("div").css("display","block");       
             });
 /*为跳转按钮绑定事件监听函数：当鼠标放到按钮上时，把该按钮的href属性设定为要跳转到的face_id位置的id值*/             
             $("#goTo").mouseover(function () {
                 var search_value = $("#search-box").prop("value");
                 if (state.search_type=="face_id")
                     {
                         $(this).attr("href","#f"+search_value); 
                     }
                  else if (state.search_type=="书签")
                     {
                         for (var i = 0;i<f_Array.length;i++)
                             {
                                 if (f_Array[i].book==search_value)
                                     {
                                         $(this).attr("href","#f"+f_Array[i].face_id);
                                     }
                             }
                     }
             }); 
/*function:删除数值array中值为item的项*/
             function removeArray(item,array) {
                 for (var i=0;i<array.length;i++)
                     {
                         if (item==array[i])
                             {
                                 array.splice(i,1)
                             }
                     }
             };
/*根据group数组和设定的书签动态创建下拉菜单的项*/
             function createSearchBox () {
                 $("#search-box")[0].value = null;
                 var $search_type = $("#search-type");
                 var $search_value_book = $("#search-value-book");
                 for (var i = 0;i<group.length;i++)
                     {   
                        if (f_Array[i].book!="")
                            {   
                                var $div = $("<div class='option'></div>");
                                $div.attr("data-value",f_Array[i].face_id);
                                $div.text(f_Array[i].book);
                                $search_value_book.append($div);
                            }
                     };
                 var $search_value_face_id = $("#search-value-face-id");
                 for (var a = 0;a<group.length;a++)
                     {   
                         var $div2 = $("<div class='option' data-value=''></div>");
                         $div2.attr("data-value",f_Array[a].face_id);
                         $div2.text("face_id: "+f_Array[a].face_id);
                         $search_value_face_id.append($div2);
                     };
             };
             createSearchBox ();
/*function:根据group动态创建图片列表*/
             function createPerson (person) {
                 var $person_container = $("<div class='person-container'></div>");
                 $person_container.attr("id", "f"+person.face_id);
                 var $person_header = $("<div class='person-header'></div>");
                 var $person_header_left = $("<div class='person-header-left'></div>");
                 var $person_imformation = $("<div class='person-imformation'></div>");
                 var $face_id = $("<div class='face-id'></div>");
                 var $face_id_span = $("<span class='face-id-span'></span>");
                 $face_id.text("face_id: ");
                 $face_id_span.text(person.face_id);
                 $face_id.append($face_id_span);
                 var $img_nb = $("<div class='img-nb'></div>");
                 $img_nb.text("img_nb: ");
                 var $span = $("<span class='nb' data-span-id=''></span>");
                 $span.attr("data-span-id", person.face_id);
                 $span.text((person.img_path.length-1).toString());
                 $img_nb.append($span);
                 $person_imformation.append($face_id).append($img_nb);
                 $person_header_left.append($person_imformation);
                 $person_header.append($person_header_left);
                 var $control = $('<div class="control" data-face-id=""><button class="set-book" data-open="false">书签</button><button class="select-all-btn">全选</button><button class="reverse-selection-btn">反选</button><button class="cancel-selection-btn">取消选择</button><button class="delect-selection-btn">删除选中</button><button class="flold">折起</button><button class="saveThis">完成编辑</button></div>');
                 $control.attr("data-face-id",person.face_id);
                 $person_header.append($control);
                 var $fengjiexian = $('<div class="fengjiexian"></div>');
                 var $person_img_list = $("<ul class='person-img-list' data-face-id=''></ul>");
                 $person_img_list.attr("data-face-id",person.face_id);
                 for (var i=1;i<person.img_path.length;i++)
                     {
                     	var $li = $('<li data-face-id=""></li>');
                     	var $img = $('<img src="" width="100%" height="100%">');
                     	$img.attr("src",person.img_path[i]);
                     	$li.append($img);
                     	$person_img_list.append($li);
                     };
                $person_img_list.append($('<li class="bottom-border"></li>'));
                $person_container.append($person_header);
                $person_container.append($fengjiexian);
                $person_container.append($person_img_list);
                $("#main-content").append($person_container);
                var $book_text = $("<input type='text' class='book-text'>");
                var $commit_book = $('<div class="commit-book"></div>');
                $person_container.append($book_text);
                $person_container.append($commit_book);
                $book_text.attr("data-face-id",person.face_id);
                $commit_book.attr("data-face-id",person.face_id);
                $commit_book.text("确认");
                return $person_container;
             };
/*根据被删除的图片创建回收站的图片列表*/
             function createReciclePerson (person) {
             	if (person.img_path.length == 1)
             	    {
             	    	return;
             	    }
             	 var $person_container = $("<div class='person-container' data-face-id=''></div>");
             	 $person_container.addClass("person-container-re");
             	 $person_container.attr("data-face-id",person.face_id);
                 var $person_header = $("<div class='person-header'></div>");
                 var $person_header_left = $("<div class='person-header-left'></div>");
                 var $person_imformation = $("<div class='person-imformation'></div>");
                 var $face_id = $("<div class='face-id'></div>");
                 $face_id.text("face_id: "+person.face_id)
                 var $img_nb = $("<div class='img-nb'></div>");
                 $img_nb.text("img_nb: ");
                 var $span = $("<span class='nb' data-span-id=''></span>");
                 $span.addClass("re-nb");
                 $span.attr("data-span-id", person.face_id);
                 $span.text((person.img_path.length-1).toString());
                 $img_nb.append($span);
                 $person_imformation.append($face_id).append($img_nb);
                 $person_header_left.append($person_imformation);
                 $person_header.append($person_header_left);
                 var $control = $('<div class="control" data-face-id=""><button class="select-all-btn">全选</button><button class="reverse-selection-btn">反选</button><button class="cancel-selection-btn">取消选择</button><button class="re-selection-btn">恢复选中</button><button class="flold">折起</button></div>');
                 $control.attr("data-face-id",person.face_id);
                 $person_header.append($control);
                 var $fengjiexian = $('<div class="fengjiexian"></div>');
                 var $person_img_list = $("<ul class='person-img-list' data-face-id=''></ul>");
                 $person_img_list.addClass("re-container");
                 $person_img_list.attr("data-face-id",person.face_id);
                 for (var i=1;i<person.img_path.length;i++)
                     {
                      var classArray = person.img_path[i].split(",");
                     	var $li = $('<li data-face-id=""></li>');
                      $li.addClass(classArray[1]);
                     	var $img = $('<img src="" width="100%" height="100%">');
                     	$img.attr("src",classArray[0]);
                     	$li.append($img);
                     	$person_img_list.append($li);
                     };
                $person_img_list.append($('<li class="bottom-border"></li>'));
                $person_container.append($person_header);
                $person_container.append($fengjiexian);
                $person_container.append($person_img_list);
                $("#recicle-bin-content").append($person_container);
                return $person_container;
             }
             for (var a=0;a<group.length;a++)
                 {
                 	createPerson(group[a]);
                 };
/*function:刷新图片列表，把被标记为check的图片删除并添加到回收站*/
             function reFlash () {
             	var $check = $(".check");
             	$check.css("display","none");
             	$check.removeClass("check");
             	$check.removeClass("selection");
             	push_recicle_bin($check);
             	$check.addClass("none");
              $check.addClass("D"+count);
              count+=1;
             	for (var i = 0;i<group.length;i++)
             	    {
             	    	var nb = group[i].img_path.length-group_recicle_bin[i].img_path.length;
             	    	var face_id = group[i].face_id;
             	    	$("span[data-span-id="+"'"+face_id+"']").text(nb.toString());
             	    	if (nb==0)
             	    	    {
             	    	    	$("ul[data-face-id="+"'"+face_id+"']").children(".bottom-border").css("display","none")
             	    	    }
             	    }
             };
/*function:刷新回收站的图片列表，把被标记为re的图片移除回收站*/
             function reFlash_re () {
             	var $re = $(".re");
             	$re.css("display","none");
             	$re.removeClass("re");
             	$re.removeClass("selection");
             	remove_recicle_bin($re);
             	for (var i = 0;i<group.length;i++)
             	    {
             	    	var nb = group_recicle_bin[i].img_path.length-1;
             	    	var face_id = group[i].face_id;
             	    	var $span = $("span[data-span-id="+"'"+face_id+"']");
             	    	for (var a=0;a<$span.length;a++)
             	    	    {
             	    	    	if ($span.eq(a).hasClass("re-nb"))
             	    	    	    {
             	    	    	    	$span.eq(a).text(nb.toString());
             	    	    	    }
             	    	    }
             	    	if (nb==0)
             	    	    {
             	    	    	var $div = $("div[data-face-id="+"'"+face_id+"']");
             	    	    	for (var b = 0;b<$div.length;b++)
             	    	    	    {
             	    	    	    	if ($div.eq(b).hasClass("person-container-re"))
             	    	    	    	    {
             	    	    	    	    	$div.eq(b).css("display","none");
             	    	    	    	    }
             	    	    	    }
             	    	    }
             	    }
             }
/*function:把被恢复的图片移除group_re数组*/
             function remove_recicle_bin($re)
                 {   
                 	for (var a=0;a<$re.length;a++)
                 	{   
                 		var $element = $re.eq(a);
                    re_group.push($element.children("img").attr("src"));
                 		for (var i=0;i<group_recicle_bin.length;i++)
                 	    {
                 	    	if (group_recicle_bin[i].face_id==$element.parent().attr("data-face-id"))
                 	    	    { 
                              var L = [];
                 	    	    	for (var b=0;b<group_recicle_bin[i].img_path.length;b++)
                 	    	    	    { 
                                     if (group_recicle_bin[i].img_path[b].split(",")[0]==$element.children("img").attr("src"))
                                        {
                                          L.push(group_recicle_bin[i].img_path[b]);
                                        }
                 	    	    	    };
                              for (var c = 0;c<L.length;c++)
                                  {
                                      removeArray(L[c],group_recicle_bin[i].img_path);
                                  };
                 	    	    }
                 	    }
                 	}
                 };
/*把被删除的图片push进re_group数组*/
             function push_recicle_bin($check) {
             	for (var i = 0;i<$check.length;i++)
             	    {
                        var $element = $check.eq(i).parent();
                        var $li = $check.eq(i);
                        for (var a = 0;a<group_recicle_bin.length;a++)
                            {
                            	if ($element.attr("data-face-id")==group_recicle_bin[a].face_id)
                            	    {
                            	    	group_recicle_bin[a].img_path.push($li.children("img").attr("src")+",D"+count);
                            	    }
                            }
             	    }
             };
/*function:实现回滚功能*/
             function back () {
                 count-=1;
                 var $element = $(".D"+count);
                 $element.removeClass("none");
                 $element.css("display","block");
                 for (var b = 0;b<group_recicle_bin.length;b++)
                     {  
                          var L = [];
                         for (var c = 1;c<group_recicle_bin[b].img_path.length;c++)
                            {    
                                if (group_recicle_bin[b].img_path[c].split(",")[1]==("D"+count))
                                    {
                                        L.push(group_recicle_bin[b].img_path[c]);
                                    }
                            }
                        
                        for (var d = 0;d<L.length;d++)
                            {
                                removeArray(L[d],group_recicle_bin[b].img_path);
                            } 
                     };
                 for (var i = 0;i<group.length;i++)
                  {
                    var nb = group[i].img_path.length-group_recicle_bin[i].img_path.length;
                    var face_id = group[i].face_id;
                    $("span[data-span-id="+"'"+face_id+"']").text(nb.toString());
                    if (nb<=5)
                        {
                            $("span[data-span-id="+"'"+face_id+"']").css("background-color","#49be91");
                        };
                    if (nb>5)
                        {
                          $("span[data-span-id="+"'"+face_id+"']").css("background-color","#fb5f50");
                        }
                    if (nb==0)
                        {
                          $("ul[data-face-id="+"'"+face_id+"']").children(".bottom-border").css("display","none")
                        }
                  }
             };
/*用事件委托实现各按钮的功能*/
             $(window).click(function (event) {
                 if ($(event.target).parent().parent().hasClass("person-img-list"))
                     {  
                     	if (!($(event.target).parent().hasClass("selection"))) 
                     	    {
                     	    	$(event.target).parent().addClass("selection");
                     	    }
                     	else
                     	    {
                     	    	$(event.target).parent().removeClass("selection");
                     	    }
                     };//实现点击图片选中或取消选中功能
                 if ($(event.target).hasClass("option"))
                     {
                         var value = $(event.target).attr("data-value");
                         $(event.target).parent().children(".option").css("display","none");
                         if ($(event.target).parent().attr("id")=="search-value-face-id")
                             {
                                 $("#search-box").prop("value",value.toString());
                                 $("#txt2").text($(event.target).text());
                             };
                          if ($(event.target).parent().attr("id")=="search-value-book")
                             {
                                 $("#search-box").prop("value",$(event.target).text());
                             };
                     };//实现查询跳转下拉菜单项功能:点击相应的face_id或书签后，search_box会被赋予相应的值是face_id将把box的value设为相应的face id值，是书签则把value设为书签名
                  if (event.target.id=="search-type-face-id"||event.target.id=="search-type-book")
                             {  
                                if (event.target.id=="search-type-face-id")
                                    {
                                        state.search_type = "face_id";
                                    }
                                else if (event.target.id=="search-type-book")
                                    {
                                        state.search_type = "书签";
                                    }
                                $("#txt").text($(event.target).text());
                                $(event.target).parent().children("div").css("display","none");
                             }//点击搜索模式下来菜单项后，把搜索模式设为相应的模式，跳转功能主要根据box的value值和搜索模式决定要跳转的位置。
                 if ($(event.target).hasClass("select-all-btn"))
                     {
                     	var face_id = $(event.target).parent().attr("data-face-id");
                     	var $ul = $("*[data-face-id="+"'"+face_id+"']").has("img");
                     	$ul.children("li").has("img").addClass("selection");
                     };//选取所有按钮，点击后将全选本组图片。
                 if ($(event.target).hasClass("reverse-selection-btn"))
                     {
                     	var face_id = $(event.target).parent().attr("data-face-id");
                     	var $ul = $("*[data-face-id="+"'"+face_id+"']").has("img");
                     	var $li = $ul.children(".selection");
                     	$ul.children("li").has("img").addClass("selection");
                     	$li.removeClass("selection");
                     };//反选按钮
                 if ($(event.target).hasClass("cancel-selection-btn"))
                     {
                     	var face_id = $(event.target).parent().attr("data-face-id");
                     	var $ul = $("*[data-face-id="+"'"+face_id+"']").has("img");
                     	$ul.children(".selection").removeClass("selection");
                     };//取消选择按钮
                 if ($(event.target).hasClass("delect-selection-btn"))
                     {
                     	var face_id = $(event.target).parent().attr("data-face-id");
                     	var $ul = $("*[data-face-id="+"'"+face_id+"']").has("img");
                     	$ul.children(".selection").addClass("check");
                     	reFlash();
                     };//删除选中按钮
                 if ($(event.target).hasClass("flold"))
                     {
                         var face_id = $(event.target).parent().attr("data-face-id");
                         var $ul = $("ul[data-face-id="+"'"+face_id+"']");
                         if ($ul.hasClass("floldup"))
                             {
                             	$ul.removeClass("floldup");
                             	$(event.target).text("折起");
                              $(event.target).parent().parent().parent().css("height","auto");
                              $(event.target).parent().parent().parent().css("overflow","");
                             }
                         else
                             {
                             	$ul.addClass("floldup");
                             	$(event.target).text("展开");
                              $(event.target).parent().parent().parent().css("height","122px");
                              $(event.target).parent().parent().parent().css("overflow","hidden"); 
                              if ($(event.target).parent().parent().parent().hasClass("hasCommit"))
                                  {
                                      $(event.target).parent().parent().parent().children(".commit-btn").css("display","none");
                                  }
                             };
                     };//折起本组按钮，主要通过将把包含图片的ul元素的display设为none实现
                 if ($(event.target).hasClass("re-selection-btn"))
                     {
                     	var face_id = $(event.target).parent().attr("data-face-id");
                     	var $ul = $("ul[data-face-id="+"'"+face_id+"']");
                     	for (var i=0;i<$ul.length;i++)
                     	    {
                                if ($ul.eq(i).hasClass("re-container"))
                                    {
                                    	$ul.eq(i).children(".selection").addClass("re");
                                    }
                     	    }
                     	 reFlash_re();
                     };//回收站的恢复按钮
                 if ($(event.target).hasClass("saveThis"))
                     {    
                          var face_id = $(event.target).parent().attr("data-face-id");
                          var $person_container = $("#f"+face_id);
                          if ($person_container.hasClass("hasSave"))
                              {
                                  return;
                              };
                          if ($person_container.hasClass("hasCommit"))
                              {
                                  $person_container.removeClass("hasCommit");
                              }
                          $person_container.addClass("hasSave");
                          if (state.hide_hasSave)
                              {
                                  $person_container.css("display","none");
                              }
                          saveArray.push("f"+face_id);
                     };//完成编辑按钮
                 if ($(event.target).hasClass("set-book"))
                     {
                          var face_id = $(event.target).parent().attr("data-face-id");
                          var $book_text = $(".book-text");
                          var $commit_book = $(".commit-book");
                          for (var i = 0;i<$book_text.length;i++)
                              {
                                  if ($book_text.eq(i).attr("data-face-id")==face_id)
                                      {   
                                          if ($(event.target).attr("data-open")=="true")
                                              {
                                                  $book_text.eq(i).css("display","none");
                                              } 
                                          else if ($(event.target).attr("data-open")=="false")
                                              {
                                                  $book_text.eq(i).css("display","block");
                                              }
                                      }
                              };
                          for (var a = 0;a<$book_text.length;a++)
                              {
                                  if ($commit_book.eq(a).attr("data-face-id")==face_id)
                                      {   

                                          if ($(event.target).attr("data-open")=="true")
                                              {
                                                  $commit_book.eq(a).css("display","none");
                                                  $(event.target).attr("data-open","false");
                                              } 
                                          else if ($(event.target).attr("data-open")=="false")
                                              {
                                                  $commit_book.eq(a).css("display","block");
                                                  $(event.target).attr("data-open","true");
                                              }
                                      }
                              };
                     };//设置书签按钮
                  if ($(event.target).hasClass("commit-book"))
                     {   
                         var $book_text = $(".book-text");
                         var face_id = $(event.target).attr("data-face-id");
                         for (var i = 0;i<$book_text.length;i++)
                             {   
                                 if ($book_text.eq(i).attr("data-face-id")==face_id)
                                     {   
                                         var book_value = $book_text.eq(i).prop("value");
                                         for (var a =0;a<f_Array.length;a++)
                                             {   
                                                 if (book_value==f_Array[a].book)
                                                     {
                                                         alert("失败：该书签名已经存在或书签名为空");
                                                         $book_text.eq(i).attr("value","");
                                                         return;
                                                     }
                                             };
                                          for (var b = 0;b<f_Array.length;b++)
                                              {
                                                  if (f_Array[b].face_id==face_id)
                                                      {    
                                                          
                                                          $book_text.eq(i).css("display","none");
                                                   $(event.target).css("display","none");
                                                   if (book_value=="")
                                                    {return};
                                                   f_Array[b].book = book_value;
                                                   $("#search-value-book").children(".option").remove();
                                                   $("#search-value-face-id").children(".option").remove();
                                                      };
                                                   
                                              }
                                          createSearchBox ();
                                     }
                             }
                     };//书签设置完成后点击的确认按钮
                 if (event.target.id=="overall-control-scrollTop"||$(event.target).parent()[0].id=="overall-control-scrollTop")
                     {
                     	window.scrollTo(0,0);
                     };//侧边控制栏：回到页面顶部按钮
                 if (event.target.id=="overall-control-delect"||$(event.target).parent()[0].id=="overall-control-delect")
                     {
                     	var $li = $(".selection");
                     	$li.addClass("check");
                     	reFlash();
                     };//侧边控制栏：删除所有被选中的图片
                 if (event.target.id=="overall-control-hide-hasSave"||$(event.target).parent()[0].id=="overall-control-hide-hasSave")
                     {    
                          if (!state.hide_hasSave)
                              {
                                  $(".hasSave").css("display","none");
                                  $(".commiting").css("display","none");
                                  $("#overall-control-hide-hasSave span").text("显示已编辑");
                                  state.hide_hasSave = true;
                              }
                           else
                             {
                                  $(".hasSave").css("display","block");
                                  $(".commiting").css("display","block");
                                  $("#overall-control-hide-hasSave span").text("隐藏已编辑");
                                  state.hide_hasSave = false;    
                             }
                     };//侧边控制栏：filter：隐藏被标记为完成编辑的组
                 if (event.target.id=="overall-control-hide-hasCommit"||$(event.target).parent()[0].id=="overall-control-hide-hasCommit")
                     {  
                         if (!state.hide_hasCommit)
                             {
                                  $(".hasCommit").css("display","none");
                                  $("#overall-control-hide-hasCommit span").text("显示已已完成");
                                  state.hide_hasCommit = true;
                             }
                          else
                             {
                                  $(".hasCommit").css("display","block");
                                  $("#overall-control-hide-hasCommit span").text("隐藏已完成");
                                  state.hide_hasCommit = false;
                             }
                     };//侧边控制栏：filter：隐藏被标记为完成的组
                 if (event.target.id=="overall-control-cancelSelectionBtn"||$(event.target).parent()[0].id=="overall-control-cancelSelectionBtn")
                     {
                     	var $selection = $(".selection");
                     	$selection.removeClass("selection");
                     };//侧边控制栏：取消所有的选中
                 if (event.target.id=="overall-control-openOrClosePreview"||$(event.target).parent()[0].id=="overall-control-openOrClosePreview")
                     {
                     	if (state.preViewOpen)
                     	    {
                     	    	state.preViewOpen = false;
                     	    	$("#overall-control-openOrClosePreview span").text("打开预览")
                     	    }
                     	 else if (!state.preViewOpen)
                     	    {
                     	    	state.preViewOpen = true;
                     	    	$("#overall-control-openOrClosePreview span").text("关闭预览")
                     	    }
                     };//侧边控制栏：打开或关闭大图预览
                 if (event.target.id=="overall-control-floldup"||$(event.target).parent()[0].id=="overall-control-floldup")
                     {  
                     	if (!state.flold)
                     	    {
                     	    	$ul = $(".person-img-list");
                     	    	$ul.addClass("floldup");
                     	    	state.flold = true;
                     	    	$("#overall-control-floldup span").text("展开所有");
                     	    	$(".flold").text("展开")
                     	    }
                     	 else if (state.flold)
                     	    {
                     	    	$ul = $(".person-img-list");
                     	    	$ul.removeClass("floldup");
                     	    	state.flold = false;
                     	    	$("#overall-control-floldup span").text("折起所有");
                     	    	$(".flold").text("折起");
                     	    }

                     };//侧边控制栏：这起或展开所有的组
                 if (event.target.id=="to-recicle-bin"||$(event.target).parent()[0].id=="to-recicle-bin")
                     {   
                     	 if (state.now=="2")
                     	     {
                     	     	return
                     	     };
                     	 for (var i = 0;i<group_recicle_bin.length;i++)
                     	     {
                     	     	createReciclePerson(group_recicle_bin[i]);
                     	     }
                     	 state.now = "2";
                     };//顶部nav：进入回收站并即时创建回站收的图片列表
                 if (event.target.id=="to-main"||$(event.target).parent()[0].id=="to-main")
                     {   
                     	 if (state.now=="1")
                     	     {
                     	     	return
                     	     };
                     	 $("#recicle-bin-content").empty();
                     	 $none = $(".none");
                     	 for (var i=0;i<$none.length;i++)
                     	     {
                     	     	for (var a=0;a<re_group.length;a++)
                     	     	    {
                     	     	    	if($none.eq(i).children("img").attr("src")==re_group[a])
                     	     	    	    {
                     	     	    	    	$none.eq(i).css("display","block");
                     	     	    	    	$none.eq(i).removeClass("none");
                     	     	    	    	reFlash();
                                        $none.eq(i).parent().children(".bottom-border").css("display","block");
                     	     	    	    }
                     	     	    }
                     	     }
                     	 re_group.splice(0,re_group.length);
                     	 state.now = "1";
                     };//顶部nav：回到主页并把被恢复的图片的display由none改为block
                  if (event.target.id=="save")
                    {    
                        tipBlock('注意：保存后，被标记为完成编辑的face_id组里被删除的图片将无法恢复。点击"确定"继续保存，点击"取消"可以取消保存',"400px","100px", function () {
                             $container = $(".hasSave");
                        for (var i = 0;i<saveArray.length;i++)
                            {   
                                var $ul = $container.eq(i).children(".person-img-list");
                                var $bottom_border = $ul.children(".bottom-border");
                                $bottom_border.css("display","none");
                                var $recommend = $("<div class='recommend-container'></div>");
                                var $recommend_title = $("<div class='recommend-title'>请选出以下几组人脸中与上面人脸属于同一个人的一组或多组，并点击相应的face_id。选完后点击右下的完成按钮完成该组的编辑。</div>");
                                $recommend.append($recommend_title);
                                var $nav_container = $("<div class='recommend-nav-container'></div>");
                                var $nav_mark = $("<span class='nav-mark'></span>");
                                var index = Math.floor(Math.random()*group.length);;
                                var b = index;
                                var $nav = $("<div class='recommend-face-id ZKJ-nav' data-nav-name='n1' data-nav-group='r1' data-open-style='border-top:2px solid #5abdf4;border-left:1px solid #5abdf4;border-right:1px solid #5abdf4;border-bottom:1px solid white' data-nav-check='true' data-nav-open='mouseover'></div>");
                                $nav_container.append($nav);
                                $nav.text("face_id: "+group[index].face_id);
                                $nav.append($nav_mark);
                                var index = Math.floor(Math.random()*group.length);
                                var c = index;
                                var $nav = $("<div class='recommend-face-id ZKJ-nav' data-nav-name='n2' data-nav-group='r1' data-open-style='border-top:2px solid #5abdf4;border-left:1px solid #5abdf4;border-right:1px solid #5abdf4;border-bottom:1px solid white' data-nav-open='mouseover'></div>");
                                $nav_container.append($nav);
                                $nav.text("face_id: "+group[index].face_id);
                                var $nav_mark = $("<span class='nav-mark'></span>");
                                $nav.append($nav_mark);
                                var index = Math.floor(Math.random()*group.length);
                                var d = index;
                                var $nav = $("<div class='recommend-face-id ZKJ-nav' data-nav-name='n3' data-nav-group='r1' data-open-style='border-top:2px solid #5abdf4;border-left:1px solid #5abdf4;border-right:1px solid #5abdf4;border-bottom:1px solid white' data-nav-open='mouseover'></div>");
                                var $nav_mark = $("<span class='nav-mark'></span>");
                                $nav_container.append($nav);
                                $nav.text("face_id: "+group[index].face_id);
                                $nav.append($nav_mark);
                                $recommend.append($nav_container);
                                var $recommend_cell = $("<ul class='recommend-cell person-img-list ZKJ-page' data-nav-name='n1'></ul>");
                                for (var a=0;a<group[b].img_path.length;a++)
                                    {
                                        var $li = $("<li></li>");
                                        var $img = $("<img width='100%' height='100%'>");
                                        $img.attr("src",group[b].img_path[a]);
                                        $li.append($img);
                                        $recommend_cell.append($li);
                                    };
                                $recommend.append($recommend_cell);
                                var $recommend_cell = $("<ul class='recommend-cell person-img-list ZKJ-page' data-nav-name='n2'></ul>");
                                for (var a=0;a<group[c].img_path.length;a++)
                                    {
                                        var $li = $("<li></li>");
                                        var $img = $("<img height='100%' width='100%'>");
                                        $img.attr("src",group[c].img_path[a]);
                                        $li.append($img);
                                        $recommend_cell.append($li);
                                    };
                                $recommend.append($recommend_cell);
                                var $recommend_cell = $("<ul class='recommend-cell person-img-list ZKJ-page' data-nav-name='n3'></ul>");
                                for (var a=0;a<group[d].img_path.length;a++)
                                    {
                                        var $li = $("<li></li>");
                                        var $img = $("<img height='100%' width='100%'>");
                                        $img.attr("src",group[d].img_path[a]);
                                        $li.append($img);
                                        $recommend_cell.append($li);
                                    };
                                $recommend.append($recommend_cell);
                                var $recommend_bottom = $("<div class='recommend-bottom'></div>");
                                $recommend.append($recommend_bottom);
                                $container.eq(i).append($recommend);
                                var $commit_btn = $("<div class='commit-btn'>完成</div>");
                                $container.eq(i).append($commit_btn);
                                $commit_btn.click(function () {
                                    $(this).parent().removeClass("commiting");
                                    $(this).parent().addClass("hasCommit");
                                    $(".hasCommit").children(".person-header").children(".control").children(".flold").click();
                                    var $recommend =  $(this).parent().children(".recommend-container");
                                    for (var i = 0;i<$recommend.length;i++)
                                        {
                                            $recommend.eq(i).remove();
                                        };
                                    $(this).parent().children(".person-img-list").children(".bottom-border").css("display","block");
                                    $(this).parent().children(".person-img-list").children(".bottom-border").css("background-color","#49be91");
                                    if (state.hide_hasCommit)
                                        {
                                            $(this).parent().css("display","none");
                                        }
                                })
                                $.ZKJ_nav_page();
                                $container.eq(i).removeClass("hasSave");
                                $container.eq(i).addClass("commiting");
                            }
                            $(".recommend-face-id").click(function () {
                                    $(this).children(".nav-mark").css("display","block");
                                });
                        }, function(){return});      
                    };//保存按钮：先弹出提示框，若选择yes，则在被标记为完成编辑的的组的底部生成多组图片，让操作员选择新生成的图片中，哪些组的图片与被编辑的那组图片是属于同一个人的。若点击no则什么事也不会发生
                    if ($(event.target).parent().attr("id") == "search-value-book"||$(event.target).parent().attr("id") == "search-value-face-id")
                        {    
                            if (state.search_type=="face_id")
                                {   
                                    $("#search-box").prop("value",$(event.target).prop("value"));    
                                }
                            else if (state.search_type=="书签")
                                {   
                                    $("#search-box").prop("value",$(event.target).text())
                                } 
                        }//向search box赋相应的value值
             });
             $(window).hover(function (event) {
                 if (!state.preViewOpen)
                     {
                         return;
                     };
                 if($(event.target).parent().parent().hasClass("person-img-list"))
                     {   
                         var $src = $(event.target).attr("src");
                         var $preView = $("#preView");
                         $preView.children("img").attr("src",$src);
                         $preView.css("display","block");         
                     }
             },
             function (event) {
                 if (!state.preViewOpen)
                     {
                         return;
                     };
                 if ($(event.target).parent().parent().hasClass("person-img-list"))
                     {
                        var $preView = $("#preView");
                        $preView.css("display","none");
                     };
             });
/*绑定快捷键*/
             $(window).keydown(function (event) {
                 if (event.ctrlKey)
                     {    
                         if (event.keyCode==88)
                             {
                                 $("#overall-control-delect").click();
                             };
                         if (event.keyCode==90)
                             {
                                 back();
                             }; 
                     }
                     if (event.keyCode==27)
                             {
                                 $("#overall-control-cancelSelectionBtn").click();
                             };
             });
             $.ZKJ_nav_page(); 