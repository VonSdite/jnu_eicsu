function GetObjById(strId)
{
    return document.getElementById(strId);
}

window.onload=function()
{
    
    initDistri();
	
}

function initDistri()
{
    initArticles();
}

function initcallback()
{
    
}

function initArticles()
{
    function OnlineEditInit()
    {
        //GetObjById("main_input_area").innerHTML="<textarea id=\"article_text\" name=\"article_text\"></textarea>";
        tinymce.init({
			selector: "textarea#main_input_area",
            language_url : "/Public/js/tinymce/langs/zh_CN.js",
			theme: "modern",
			height:"920px",
			width:"920px",
			plugins: [
				"advlist autolink lists link image charmap hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars code",
				"insertdatetime media nonbreaking save table contextmenu directionality",
				"emoticons template paste textcolor colorpicker textpattern"
			],
			toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |media link image| forecolor backcolor emoticons",
			image_advtab: true,
			templates: [
				{title: 'Test template 1', content: 'Test 1'},
				{title: 'Test template 2', content: 'Test 2'}
			],
            //init_instance_callback :"initcallback",
		});
        //TODO:进入到公告或即将到来后再回来，tinymce就不工作了
         $('.form_datetime').datetimepicker({
                //language:  'fr',
                weekStart: 1,
                todayBtn:  1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                //showMeridian: 1,
                language:'zh-CN',
                format:'yyyy-mm-dd hh:ii:ss'
            });
        
    }
    OnlineEditInit();
    /*
    GetObjById("artcle_type_online").onclick=function()
    {
        OnlineEditInit();
    }
    */
    function UploadFileInit()
    {
        
        var str=new String();
        str+="<label for=\"artcle_upload\">文件: </label>"
			+"<input type=\"file\" name=\"uploaded_file\" id=\"uploaded_file\" />"
            +"<br /><br /><br /><br /><br /><br /><br /><br />";
        GetObjById("main_input_area").innerHTML=str;
    }
    /*
    GetObjById("artcle_type_upload").onclick=function()
    {
        UploadFileInit();
    }
    */
        
}

function initAnnouce()
{
    GetObjById("articles").style.backgroundColor="#888888";
	GetObjById("announcement").style.backgroundColor="#242424";
	GetObjById("coming_soon").style.backgroundColor="#888888";
    var str="<p>*填写公告内容，注意不要找过45字<p>"
			+"<form method=\"post\" action=\""+APP+"/News/createAnnouncement"+"\">"
			+"<textarea name=\"gonggao\" id=\"gonggao\"></textarea><br />"
            +"  <button type=\"submit\" id=\"submitbutton\">发表</button>"
            +"  <button type=\"button\" id=\"cancel\">取消</button>"
			+"</form>";
    str+="<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />";
    GetObjById("main").innerHTML=str;
}

function initComing()
{
    
    GetObjById("articles").style.backgroundColor="#888888";
	GetObjById("announcement").style.backgroundColor="#888888";
	GetObjById("coming_soon").style.backgroundColor="#242424"; 
    var strInnerHTML=new String();
    strInnerHTML+="<form method=\"post\" action=\""+APP+"/News/createActivity"+"\">"
				+"<table>"
				+"		<tr>"
				+"			<td>活动名称：</td><td><input type=\"text\" name=\"act_name\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>举办时间：</td><td><input type=\"text\" name=\"act_time\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>活动地点：</td><td><input type=\"text\" name=\"act_address\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>举办部门：</td><td><input type=\"text\" name=\"act_apartment\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>活动口号：</td><td><input type=\"text\" name=\"act_slogan\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>大海报(520x380)：</td><td><input type=\"text\" name=\"act_bigposter\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>小海报(160x200)：</td><td><input type=\"text\" name=\"act_smallposter\"/></td>"
				+"		</tr>"
				+"	</table>"
                +"  <button type=\"submit\" id=\"submitbutton\">发表</button>"
				+"  <button type=\"button\" id=\"cancel\">取消</button>"
				+"</form>";
    GetObjById("main").innerHTML=strInnerHTML;
}
	