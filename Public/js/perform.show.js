
//干事自评表
function Show_GSZP(obj_GSZP,post_func)
{
	
	var strHTML = "";
	strHTML += "<h3>自我评分部分</h3>\n"
	+"			<p class=\"fill_in_tips\">\n"
	+"				<span class=\"till_part\">填写指引：</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请按照自己的真实情况自评\n"
	+"			</p>\n"
	+"			<form method=\"post\" action=\"#\">\n"
	+"				<table class=\"yijibiao\">\n"
	+"					<tr>\n"
	+"						<td colspan=\"2\" scope=\"col\">考核项目</td><td>评价标准</td><td>得分</td>\n"
	+"					</tr>\n"
	+"					<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";

	for(var i = 0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
	{
		strHTML += "<tr>\n"
		+"				<td rowspan=" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].rowspan + " scope=\"row\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].xm + "</p1></td><!--一级项目-->\n";
		for(var j = 0; j < obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
		{		
			var dfStrId = "df_" + i + "_" + j;
			
			if(j !=0)
				strHTML += "<tr>\n";
				
			strHTML +="	<td rowspan=" + 4 + " scope=\"row\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].bz + "</p1></td><!--二级项目-->\n"
			+"				<td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].a + "</p1></td>\n"
			+"				<td rowspan=" + 4 + " scope=\"row\"><input name=\"#\" id=\"" + dfStrId + "\" value = \"" + obj_GSZP.arrDF[i][j] + "\"></td>\n"
			+"			</tr>\n"		
			+"			<tr><td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].b + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].c + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].d + "</p1></td></tr>\n";
			if(j != obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length-1)
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"3\" scope=\"col\"></td></tr><!--空行-->\n";
			}
			else
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";
			}
		}
	}

	strHTML += "<tr><td colspan=\"3\" scope=\"col\">总分</td> <td id=\"zongfen\" class=\"total_score\">" + obj_GSZP.zongfen + "</td></tr>\n"			
	+"				</table>\n";

	{
	strHTML += "			<h3>自我评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请总结本月的工作情况，评价自己的工作状态，说出收获，反映遇到的问题以及和部门内其他人相处的感受，我们会反馈给部长级\n"
	 + "					</p>\n"
	 + "					<textarea id=\"ziwopingjia\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_GSZP.zwpj + "</textarea>	\n"
	 + "					<h3>推优部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请推举一名除自己以外你觉得本月表现最突出的干事，并说明理由，理由会反馈给该干事\n"
	 + "					</p>\n"
	 + "					<p>\n"
	 + "						姓名：\n"
	 + "						<!--同部门的干事-->\n"
	 + "						<select name=\"#\" id=\"tuiyou\">\n"
	 + "						</select>\n"
	 + "					</p>\n"
	 + "					<p>\n"
	 + "						理由：\n"
	 + "						<input id=\"tuiyouliyou\" class=\"perf_textarea\" type=\"text\" name=\"#\" size=\"80\" />\n"
	 + "					<h3>部长评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请你为部长的综合表现打分(满分10分)及填写评价，评价会以匿名形式反馈给该部长\n"
	 + "					</p>\n"
	 + "					<table class=\"erjibiao\" id=\"bzpj\">\n"
	 + "						<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n"
	 + "						<!--正部应该拍前面-->\n"
	 + "					</table>\n"
	 + "					<h3>部门留言板</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请你为部门的整体情况表述意见或建议,匿名形式反馈给部长级\n"
	 + "					</p>\n"
	 + "					<textarea id=\"bumenliuyan\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_GSZP.bumenliuyan + "</textarea>	\n"
	 + " 					<h3>同事留言板</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>你可对你因其工作态度或工作情况不满的干事提出自己的想法，会以匿名形式反馈给该干事\n"
	 + "					</p>\n"
	 + "					<div id=\"liuyanban\"></div>"
	 + "					<button type=\"button\" id=\"add_a_words\" title=\"添加\" class=\"perf_button\">﹢</button>"
	 + "					<!--预留报错位-->\n"
	 + "					<div></div>\n"
	 + "					<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"
	 +"						<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"
	 + "				</form>\n";

	}
	GetObjById("show_more").innerHTML = strHTML;

	/*留言板部分*/
	
	function delete_a_word()
	{
		
		strID=this.id;
		strIndex=strID.replace("delete_liuyan_","");
		
		obj_GSZP.arrTongshiliuyan.splice(strIndex,1);
		reRender();
		
		bind_the_action_handler();
		
	}
	function bind_the_action_handler()
	{
		for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
		{
			GetObjById("liuyan_"+i).value=obj_GSZP.arrTongshiliuyan[i].liuyan;
		}
		for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
		{

			GetObjById("delete_liuyan_"+i).onclick=delete_a_word;
			GetObjById("liuyanban_"+i).onchange=function()
			{
				strID=this.id;
				strIndex=strID.replace("liuyanban_","");
				obj_GSZP.arrTongshiliuyan[strIndex].account=this.value;
				GetObjById("liuyan_"+strIndex).value="";//输入框内容设为空
				obj_GSZP.arrTongshiliuyan[strIndex].liuyan="";
			}
			GetObjById("liuyan_"+i).onchange=function()
			{
				
				strID=this.id;
				strIndex=strID.replace("liuyan_","");
				if(!CheckLegalStr(this.value))
				{
					alert("您的输入含有非法字段，请重新输入!");
					this.value=obj_GSZP.arrTongshiliuyan[strIndex].liuyan;
					return false;
				}
				obj_GSZP.arrTongshiliuyan[strIndex].liuyan=this.value;
				
			}
				
		}
	}
	//同事留言的内容有obj_GSZP.arrTonshiliuyan的数据决定，增加或删除时都重新渲染HTML
	function reRender()
	{
		var strNewHTML=new String();
		for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
		{
			strNewHTML+="<select id=\"liuyanban_"+i+"\">";//id是liuyanban_i
			for(var j=0;j<obj_GSZP.arrTongShi.length;j++)
			{
				strNewHTML+="<option value=\""+obj_GSZP.arrTongShi[j].account+"\""
				if(obj_GSZP.arrTongshiliuyan[i].account==obj_GSZP.arrTongShi[j].account)
				{
					strNewHTML+="selected=\"selected\"";
				}
				strNewHTML+=";>"+obj_GSZP.arrTongShi[j].name+"</option>";
			}
			strNewHTML+="</select><input type=\"text\" size=\"80\" class=\"perf_textarea\" id=\"liuyan_"+i+"\"/><span class=\"onclick\" id=\"delete_liuyan_"+i+"\">删除</span><br />";
		}
		GetObjById("liuyanban").innerHTML=strNewHTML;
	}
	reRender();
	bind_the_action_handler();
	
	GetObjById("add_a_words").onclick=function()
	{
		var strNew=new String();
		//obj_GSZP.arrTongshiliuyan.push({obj_GSZP.arrTongShi[0].account,""});//增加一个
		var i=obj_GSZP.arrTongshiliuyan.length;
		if(i+1>obj_GSZP.arrTongShi.length)
		{
			alert("你的同事总共才"+obj_GSZP.arrTongShi.length+"人，你加那么多干嘛- -");
			return false;
		}
		var newItem={"account":obj_GSZP.arrTongShi[0].account,"liuyan":""};
		obj_GSZP.arrTongshiliuyan.push(newItem);
		
		reRender();
		
		bind_the_action_handler();
	}	
		
	/*部门留言板*/
	GetObjById("bumenliuyan").onchange=function()
	{
		if(CheckLegalStr(this.value))
		{
			obj_GSZP.bumenliuyan=this.value;
		}
		else
		{
			alert("您输入有非法字段，请重新输入");
			this.value=obj_GSZP.bumenliuyan;
		}
	}
	
	var bzpjStrHTML = "<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n";
	for (var i = 0; i < obj_GSZP.arrDBZPJ.length; ++i) 
	{
		var fsStrId = "fenshu" + "_" + i;
		var pjStrId = "pingjia" + "_" + i;
		bzpjStrHTML += "<tr><td>" + obj_GSZP.arrDBZPJ[i].name + "</td><td class=\"normal_input\"><input id=" + fsStrId + " type=\"text\" size=\"5\" class=\"perf_textarea\"/></td><td class=\"normal_input\"><input id=" + pjStrId + " type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n";
	}
	GetObjById("bzpj").innerHTML = bzpjStrHTML;

	if (obj_GSZP.status == 0) //可以提交状态
	{
		//填写各项得分并计算总分
		for(var i=0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
		{
			for(var j=0; j< obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;							
				
				GetObjById(dfStr).onchange = function(e)
				{
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						var arr = strId.split("_");
						
						var dfPre = obj_GSZP.arrDF[arr[1]][arr[2]];//保存更改前的得分
						obj_GSZP.arrDF[arr[1]][arr[2]] = this.value;
						obj_GSZP.zongfen = parseInt(obj_GSZP.zongfen) - parseInt(dfPre) + parseInt(this.value);
						GetObjById("zongfen").innerHTML = obj_GSZP.zongfen;
					}
					else
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
				GetObjById(dfStr).onfocus = function()
				{
					this.style.backgroundColor="white";
					this.style.color = "#79c0be";
				}
				GetObjById(dfStr).onblur = function()
				{
					this.style.backgroundColor="#79c0be";
					this.style.color = "white";
				}
			}
		}
		
		//自我评价
		GetObjById("ziwopingjia").onchange = function()
		{

			if(CheckLegalStr(this.value))
				obj_GSZP.zwpj = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_GSZP.zwpj  = "";
				this.value = "";
			}
		}
		
		//推优部分
		GetObjById("tuiyou").options.length = 0;
		var iIndex = 0;
		for(var i=0; i<obj_GSZP.arrTongShi.length; ++i)
		{
			GetObjById("tuiyou").options[i] = new Option(obj_GSZP.arrTongShi[i].name);
			if(obj_GSZP.TYGS.tygs == obj_GSZP.arrTongShi[i].name)
				iIndex = i;
		}

		GetObjById("tuiyou").selectedIndex = iIndex;
		GetObjById("tuiyouliyou").value = obj_GSZP.TYGS.tyly;
		
		GetObjById("tuiyou").onchange = function()
		{
			if(this.selectedIndex != iIndex)
				GetObjById("tuiyouliyou").value = "请填写......";
			else
				GetObjById("tuiyouliyou").value = obj_GSZP.TYGS.tyly;
				
			obj_GSZP.TYGS.tygs = this.options[this.selectedIndex].text;
			obj_GSZP.TYGS.account = obj_GSZP.arrTongShi[this.selectedIndex].account;
		}
		GetObjById("tuiyouliyou").onchange = function()
		{
			if(CheckLegalStr(this.value))
				obj_GSZP.TYGS.tyly = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_GSZP.TYGS.tyly = "";
				this.value = "";
			}
		}
		
		//部长评价部分
		for(var j = 0; j < obj_GSZP.arrDBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			
			GetObjById(fsStrId).value = obj_GSZP.arrDBZPJ[j].fs;
			GetObjById(pjStrId).value = obj_GSZP.arrDBZPJ[j].pj;
			
			GetObjById(fsStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if (this.value >= 0 && this.value <= 10) 
				{
					obj_GSZP.arrDBZPJ[curIndex[1]].fs = this.value;
				}
				else
				{
					this.value = "";
					alert("*得分不能大于10或小于0，请重新填！");
				}
				
			}
			GetObjById(pjStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if(CheckLegalStr(this.value))
					obj_GSZP.arrDBZPJ[curIndex[1]].pj = this.value;
				else
				{
					alert("您输入有非法字段，请重新输入");	
					obj_GSZP.arrDBZPJ[curIndex[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i=0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
			{
				for(var j=0; j< obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
				{
					var dfStr = "df_" + i + "_" + j;
					if(GetObjById(dfStr).value == "")
						return false;
				}
			}
			
			if(GetObjById("ziwopingjia").value == "")
				return false;
				
			if(GetObjById("tuiyouliyou").value == "")
				return false;
				
			for(var j = 0; j < obj_GSZP.arrDBZPJ.length; ++j)
			{
				var fsStrId = "fenshu" + "_" + j;
				var pjStrId = "pingjia" + "_" + j;
				if(GetObjById(fsStrId).value == "" || GetObjById(pjStrId).value == "")
					return false;
			}
			return true;
		}
		
		GetObjById("save").onclick = function()
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
			}
			post_func(obj_GSZP,posting_func,save_feedback);
		}
		function AllConfirm()
		{
			if( !Finish() )
			{
				alert("提交前不允许留有空白");
				return false;
			}
			
			for (var i = 0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i) 
			{
				for (var j = 0; j <  obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j) 
				{
					if(0==obj_GSZP.arrDF[i][j])
					{
						alert("评分部分第"+(i+1)+"大项第"+(j+1)+"小项分数为零或未填写，不允许这样提交");
						return false;
					}
				}
			}
			
			for(var i = 0; i < obj_GSZP.arrDBZPJ.length; ++i)
			{
				
				if(0==obj_GSZP.arrDBZPJ[i].fs)
				{
					alert("你对"+obj_GSZP.arrDBZPJ[i].name+"部长的评分为0,表酱紫");
					return false;
				}
				if(obj_GSZP.arrDBZPJ[i].pj=="无"||obj_GSZP.arrDBZPJ[i].pj=="")
				{
					if(confirm("你对"+obj_GSZP.arrDBZPJ[i].name+"部长的评价未填写，你确定就这样提交？")==false)
					{
						return false;
					}
				}
				
			}
			if(obj_GSZP.zwpj=="无"||obj_GSZP.zwpj==""||"请填写....."==obj_GSZP.zwpj)
			{
				if(confirm("你的自我评价未填写，你确定就这样提交？")==false)
				{
					return false;
				}
			}
			return true;
		}
		GetObjById("submit").onclick=function()
		{
			
			if(AllConfirm())
			{
				obj_GSZP.hadSubmit=1;
                post_func(obj_GSZP,posting_func,submit_feedback);
			}
		}
	}
	else
	{
		for(var i=0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
		{
			for(var j=0; j< obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;
				GetObjById(dfStr).value = obj_GSZP.arrDF[i][j];
				GetObjById(dfStr).readOnly = true;//设置为只读
			}
		}
		
		
		GetObjById("ziwopingjia").value = obj_GSZP.zwpj;
		GetObjById("ziwopingjia").readOnly = true;
		
		GetObjById("tuiyou").options.length = 0;
		GetObjById("tuiyou").options[0] = new Option(obj_GSZP.TYGS.tygs);
		GetObjById("tuiyouliyou").value = obj_GSZP.TYGS.tyly;
		GetObjById("tuiyouliyou").readOnly = true;
		
		for(var j=0; j<obj_GSZP.arrDBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			GetObjById(fsStrId).value = obj_GSZP.arrDBZPJ[j].fs;
			GetObjById(fsStrId).readOnly = true;
			GetObjById(pjStrId).value = obj_GSZP.arrDBZPJ[j].pj;
			GetObjById(pjStrId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			console.log("ok");
			confirm_feedback(true);
		}
	}	
}

//干事反馈表
function Show_GSKHFK(objGSKHFK,post_func)
{
	
	
	var strHTML = "";
	
	strHTML += "<h3>得分部分</h3>\n"
	+"				<p>总分：" + objGSKHFK.zongfen + "</p>\n"
	+"				<p>该月排名：" + objGSKHFK.paiming + "</p>\n"
	+"				<p>该月优秀干事：" + objGSKHFK.yxgs + "</p>\n"
	+"				<p>所在部门该月得分："+objGSKHFK.bmdf+"</p>"
	+"				<p>所在部门该月排名："+objGSKHFK.bmpm+"</p>"
	+"				<p class=\"fill_in_tips\">\n"
	+"					<span class=\"fill_part\">得分细节</span>\n"
	+"				</p>\n"
	+"				<table class=\"yijibiao\">\n"
	+"					<tr>\n"
	+"						<td>项目</td><td>细则</td><td>得分/加减分</td><td>备注</td>\n"
	+"					</tr>\n"
	+"				<tr>\n"
	+"					<td>干事自评表得分</td><td>满分2分</td><td>" + objGSKHFK.arrDFXZ[0] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>干事考核表得分</td><td>满分5分</td><td>" + objGSKHFK.arrDFXZ[1] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>出勤得分</td><td><p>基本得分1分</p><p>A.例会 大会 拓展（请假-0.2/次，迟到-0.4/次，缺席-0.6/次）</p><p>B.外调（缺席-0.6/次）</p></td><td>" + objGSKHFK.arrDFXZ[2] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>外调加分</td><td><p>基本分0分</p><p>正常参加+0.2/次,推优+0.2/次</p></td><td>" + objGSKHFK.arrDFXZ[3] + "</td><td><p>此外调统计包括人力平时外调各部门干事，司仪、礼仪队的外调，信编拍照外调和人力观察员外调</p></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>推优加分</td><td>0.2/票</td><td>" + objGSKHFK.arrDFXZ[4] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>反馈加分</td><td><p>0.2/次</p><p>在外调反馈表或活动调研问卷中写的意见被活动部门采纳</p></td><td>" + objGSKHFK.arrDFXZ[5] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>其他</td><td></td><td>" + objGSKHFK.arrDFXZ[6] + "</td><td>"+objGSKHFK.qitaliyou+"</td>\n"
	+"				</tr>\n"
	+"			</table>\n";

	strHTML += "<h3>评价部分</h3>\n"
+"				<p class=\"fill_in_tips\">自我评价</p>\n"
+"				<div id=\"assessment\">\n"
+"				<div id=\"assessment\">\n"
+"					<ul>\n"
+"						<li><p class=\"self-assessment\">" + objGSKHFK.zwpj + "</p></li>\n"
+"					</ul>\n"
+"				</div>\n"
+"				</div>\n"
+"				<p class=\"fill_in_tips\">其他干事评价</p>\n"
+"				<ul id=\"entrusted_assessment\">\n";
	for(var i = 0; i < objGSKHFK.qtgspj.length; ++i)
	{
		strHTML += "<li>" + objGSKHFK.qtgspj[i]+ "</li>\n"
	}
	strHTML += "</ul>\n"
+"				<p class=\"fill_in_tips\">部长级评价</p>\n"
+"				<ul id=\"ministerial\">\n";

	for(var i = 0; i < objGSKHFK.bzpj.length; ++i)
	{
		strHTML += "<li>" + objGSKHFK.bzpj[i] + "</li>\n"
	}
	strHTML += "</ul>\n";
	strHTML+="<h3>留言部分</h3>"
			+"<p class=\"fill_in_tips\">同事留言:放弃吧，数据库也不知道是谁留的</p>\n"
			+"<ul>";
	for(var i=0;i<objGSKHFK.liuyan.length;i++)
	{
		strHTML+="<li>"+objGSKHFK.liuyan[i].liuyan+"</li>";
	}
	strHTML += "</ul><input type=\"button\" value=\"确定\" id=\"submit\"  class=\"perf_button\" />\n"
	
	GetObjById("show_more").innerHTML = strHTML;
	
	GetObjById("submit").onclick = function()
	{
		confirm_feedback(true);
	}		
}

//跟进部门出勤统计表new
function Show_GJBMCQTJ(arrGJBMCQTJ,post_func)
{
	console.log(arrGJBMCQTJ);
	$('#show_more').html('');
	for(var i=0;i<arrGJBMCQTJ.length;i++){
		obj = arrGJBMCQTJ[i];
		var title = $('<h3></h3>').html('跟进部门: '+arrDepartName[obj['gjbm']-1]);
		var tips = $('<h3></h3>').html('人数: '+obj['renshu']);
		var form = $('<form></form>');
		var form_id = 'chuqin_form_id_'+obj['gjbm'];
		form.attr('id',form_id);
		var table = $('<table></table>');
		table.addClass('erjibiao');
		var th = $('<tr></tr>');
		var th_alt = ['姓名','请假次数','迟到或早退次数','无故缺席次数'];
		//生成表头
		for(var alt in th_alt){
			th.append($('<td></td>').html(th_alt[alt]));
		}
		table.append(th);
		
		//生成一个输入控件
		function genChuQinInputTd(id,val){
			var td = $('<td></td>');
			td.addClass('normal_input');
			var input = $('<input />');
			input.addClass('perf_textarea').attr('type','text');
			input.addClass('chuqin_input_cls');
			input.attr('id',id).val(val);
			td.append(input);
			return td;
		}
			
		//生成表格
		for(var j=0;j<obj['chuqin'].length;j++){
			chuqin_info = obj['chuqin'][j];
			var tr = $('<tr></tr>');
			//干事名字
			tr.append($('<td></td>').html(chuqin_info['name']));
			//请假次数
			
			var qj_id = ['cq',i,j,'qj'].join('_');
			var td_qj = genChuQinInputTd(qj_id,chuqin_info['qj']);
			tr.append(td_qj);
			//迟到或早退次数
			var ct_id = ['cq',i,j,'ct'].join('_');
			var td_ct = genChuQinInputTd(ct_id,chuqin_info['ct']);
			tr.append(td_ct);
			//无辜缺席次数
			var qx_id = ['cq',i,j,'qx'].join('_');
			var td_qx = genChuQinInputTd(qx_id,chuqin_info['qx']);
			tr.append(td_qx);
			table.append(tr);
		}
		console.log('已经生成表格');
		form.append(table);
		$('#show_more').append(title).append(tips).append(form);
	}
	var submit_btn = $('<input />');
	submit_btn.attr('type','button').attr('id','submit').addClass('perf_button').val('提交');
	$('#show_more').append(submit_btn);
	var status = 1;//不可提交状态
	try{status = arrGJBMCQTJ[0]['status'];}catch(e){}
	if(status == 0){//可以提交状态
		$('.chuqin_input_cls').change(function(){
			var self = $(this);
			var _id = self.attr('id');
			var _val = self.val();
			if(_val=="") _val = "0";
			var tmp_arr = _id.split('_');
			//tmp_arr[0]==='cq'
			var _bm = tmp_arr[1];
			var _person = tmp_arr[2];
			var _info = tmp_arr[3];
			if(CheckLegalStr(_val)){
				arrGJBMCQTJ[_bm]['chuqin'][_person][_info] = _val;
			}else{
				alert("您输入有非法字段，请重新输入");
				arrGJBMCQTJ[_bm]['chuqin'][_person][_info] = "";
				self.val("0");
			}
			
		});
		function Finish(){//判断是否全部完成需要填写的内容
			var flag_fin = true;
			$('.chuqin_input_cls').each(function(i,o){
				if($(o).val()==""){
					flag_fin = false;
				}
			});
			return flag_fin;
		}
		$('#submit').click(function(){
			if(!Finish()){
				alert("您还未完成，请填完再提交");
                return false;
			}
            post_func(arrGJBMCQTJ,posting_func,submit_feedback);
		});
	}else{
		console.log("不可更改状态");
		//不可更改状态, 设置所有input为readonly
		try{
			$('.chuqin_input_cls').prop('readonly', true);
		}catch(e){
			$('.chuqin_input_cls').attr('readonly', true);
		}
		$('#submit').val('确定').click(function(){
			$('#show_more').html('');
		});
	}
	
}

//跟进部门出勤统计表old
function Show_GJBMCQTJ_Old()
{
	
	var obj_GJBMCQTJ = Get_GJBMCQTJ();
	
	var strHTML = "";
	
	strHTML += "<h3>跟进部门：" +  arrDepartName[obj_GJBMCQTJ.gjbm-1] + "</h3>\n"
+"				<h3>人数：" +  obj_GJBMCQTJ.renshu + "</h3>\n"
+"				<form method=\"post\" action=\"#\">\n"
+"					<table class=\"erjibiao\">\n"
+"						<tr><td>姓名</td><td>请假次数</td><td>迟到或早退次数</td><td>无故缺席次数</td>\n";
	
	for(var i = 0; i <  obj_GJBMCQTJ.renshu; ++i)
	{
		strHTML += "<tr>\n"
+"							<td>" + obj_GJBMCQTJ.chuqin[i][0] + "</td>\n"
+"							<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" id=cq_" + i + "_1" + " value=\"" + obj_GJBMCQTJ.chuqin[i][1] + "\" /></td>\n"
+"							<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" id=cq_" + i + "_2" + " value=\"" + obj_GJBMCQTJ.chuqin[i][2] + "\" /></td>\n"
+"							<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" id=cq_" + i + "_3" + " value=\"" + obj_GJBMCQTJ.chuqin[i][3] + "\" /></td>\n"
+"						</tr>\n";
	}
	strHTML += "</table>\n"
+ "					<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"
+"				</form>\n";

	GetObjById("show_more").innerHTML = strHTML;
	
	
	if(obj_GJBMCQTJ.status == 0)//可以提交状态
	{
		for (var i = 0; i < obj_GJBMCQTJ.renshu; ++i) 
		{
			for (var j = 1; j < 4; ++j) 
			{
				var strId = "cq_" + i + "_" + j;
				GetObjById(strId).onchange = function (e) 
				{
					strId = GetId(e);
					var arr = strId.split("_");
					if(this.value=="")
					{
						this.value="0";
					}
					if (CheckLegalStr(this.value))
						obj_GJBMCQTJ.chuqin[arr[1]][arr[2]] = this.value;
					else
					{
						alert("您输入有非法字段，请重新输入");
						obj_GJBMCQTJ.chuqin[arr[1]][arr[2]] = "";
						this.value = "0";
					}
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for (var i = 0; i < obj_GJBMCQTJ.renshu; ++i) 
			{
				for (var j = 1; j < 4; ++j) 
				{
					var strId = "cq_" + i + "_" + j;
					if(GetObjById(strId) == "")
						return false;
				}
			}
			
			return true;
		}
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("您还未完成，请填完再提交");
			}
			else if (Post_GJBMCQTJ(obj_GJBMCQTJ)) 
			{
				alert("提交成功！");
				GetObjById("show_more").innerHTML = "";
			} else {
				alert("*提交失败，请再提交");
			}
		}
	}
	else 
	{
		for (var i = 0; i < obj_GJBMCQTJ.renshu; ++i) 
		{
			for (var j = 1; j < 4; ++j) 
			{
				var strId = "cq_" + i + "_" + j;
				GetObjById(strId).value = obj_GJBMCQTJ.chuqin[i][j];
				GetObjById(strId).readOnly = true;
			}
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function () 
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//调研意见采纳表
function Show_DYYJCN(obj_DYYJCN,post_func)
{
	
	var strHTML = "";
	strHTML += "<form method=\"post\" action=\"#\">\n";
	
	for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
	{
		strHTML += "<h3>" + arrDepartName[obj_DYYJCN.arrObjBM[i].bmmz-1] + "</h3>\n"
+"					<table class=\"erjibiao\">\n"
+"						<tr><td>用户名</td><td>采纳次数</td><td>用户名</td><td>采纳次数</td><td>用户名</td><td>采纳次数</td>\n";
		for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
		{
			var strId = "cnjf_" + i + "_" + j;
			strHTML += "<tr>\n"
			+ " <td>" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name  + "</td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen + "\" /></td>\n";
			++j
			if(j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length )
			{
				strId = "cnjf_" + i + "_" + j;
				strHTML += "<td>" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name  + "</td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen + "\" /></td>\n";
			}
			else
				strHTML += "<td></td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\" \"/></td>\n";
			
			++j
			if(j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length )
			{
				strId = "cnjf_" + i + "_" + j;
				strHTML += "<td>" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name  + "</td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen + "\" /></td>\n";
			}
			else
				strHTML += "<td></td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\" \"/></td>\n";
			
			strHTML += "</tr>\n";
		}
		strHTML += "</table>\n"
	}
	
	strHTML += "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"
			+"</form>\n";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	if(obj_DYYJCN.status == 0)//可填写状态
	{
		for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
		{
			for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
			{
				var strId = "cnjf_" + i + "_" + j;
				GetObjById(strId).onchange = function(e)
				{
					strId = GetId(e);
					var arr = strId.split("_");
					obj_DYYJCN.arrObjBM[arr[1]].arrObjCNJF[arr[2]].jiafen = this.value;
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
			{
				for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
				{
					var strId = "cnjf_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
			
			return true;
		}
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("您还未完成，请填完再提交");
                return false;
			}
            post_func(obj_DYYJCN,posting_func,submit_feedback);
		}
	}
	else//不可填写，只能查看状态
	{
		for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
		{
			for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
			{
				var strId = "cnjf_" + i + "_" + j;
				GetObjById(strId).value = obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen;
				GetObjById(strId).readOnly = true;
			}
		}
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function () 
		{
			confirm_feedback(true);
		}
	}
}

//整体考核结果反馈表
function Show_ZTKHJGFK(obj_ZTKHJGFK,post_func)
{
	
	var strHTML = "";
	strHTML += "<p class=\"fill_in_tips\">优秀部门</p>\n"
			+"	<ol>\n";
	for(var i = 0; i < obj_ZTKHJGFK.arrObjYXBM.length; ++i)
		strHTML += "<li>" + obj_ZTKHJGFK.arrObjYXBM[i].bm + " &emsp;<span>得分：</span>" + obj_ZTKHJGFK.arrObjYXBM[i].df + "</li>\n";
	strHTML += "</ol>\n";
	
	strHTML += "<p class=\"fill_in_tips\">优秀部长</p>\n"
			+"	<ol>\n"
	// Anqur
    var opt = 0;
    var i;
    while (opt < 3) {
        for (i = 0; i < obj_ZTKHJGFK.arrObjYXBZ.length; i++) {
            if (obj_ZTKHJGFK.arrObjYXBZ[i].rank == (opt + 1)) {
                strHTML += "<li>" + obj_ZTKHJGFK.arrObjYXBZ[i].bzmz + "&emsp;<span>所属部门：</span>" + obj_ZTKHJGFK.arrObjYXBZ[i].ssbm + "&emsp;<span>得分：</span>" + obj_ZTKHJGFK.arrObjYXBZ[i].df + "&emsp;<span>票数：</span>" + obj_ZTKHJGFK.arrObjYXBZ[i].ps + "</li>\n";
        		opt += 1;
                break;
           }
        }        
    }
	strHTML += "</ol>\n";
	
	strHTML += "<p class=\"fill_in_tips\">各部门优秀干事</p>\n"
			+"	<ul>\n";
	for(var i = 0; i < obj_ZTKHJGFK.arrObjYXGS.length; ++i)
	{	
		
		strHTML += "<li><span>" + obj_ZTKHJGFK.arrObjYXGS[i].bm + "</span>&emsp;\n"
				+"		<ol>\n";
		
		for(var j = 0; j < obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS.length; ++j)
		{
			
			strHTML += "<li>" + obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS[j].name + "&emsp;<span>得分：</span>" + obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS[j].df + "&emsp;<span>" + obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS[j].ydyxgs + "</span></li>\n"
		}
		strHTML += "</ol>\n"
				+"</li>\n";
	}
	strHTML += "</ul>\n";
	
	strHTML += "<p class=\"fill_in_tips\">各部门外调较多人员</p>\n"
			+"	<ul>\n";
	for(var i = 0; i < obj_ZTKHJGFK.arrObjWDJDRY.length; ++i)
	{
		strHTML += "<li><span>" + obj_ZTKHJGFK.arrObjWDJDRY[i].bm + "</span>&emsp;\n"
				+"		<ol>\n";
		for(var j = 0; j < obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY.length; ++j)
		{
			if(obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY[j].wdcs>=3)
			{
				strHTML += "<li>" + obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY[j].name + "&emsp;<span>外调次数：</span>" + obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY[j].wdcs + "</li>\n";
			}
		}
		strHTML += "</ol>\n"
				+"</li>\n";
	}
	strHTML += "</ul>\n";
	
	strHTML += "<input type=\"button\" value=\"确定\" id=\"submit\"  class=\"perf_button\" />\n";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	GetObjById("submit").onclick = function()
	{
		confirm_feedback(true);
	}		
}

//部长自评表
function Show_BZZP(obj_BZZP,post_func)
{

	var objBZZP_BZ = BZZP_BZ();
	var strHTML = "";
	strHTML += "<h3>自我评分部分</h3>\n"
	+"			<p class=\"fill_in_tips\">\n"
	+"				<span class=\"till_part\">填写指引：</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请按照自己的真实情况自评\n"
	+"			</p>\n"
	+"			<form method=\"post\" action=\"#\">\n"
	+"				<table class=\"yijibiao\">\n"
	+"					<tr>\n"
	+"						<td colspan=\"2\" scope=\"col\">考核项目</td><td>评价标准</td><td>得分</td>\n"
	+"					</tr>\n"
	+"					<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";

	for(var i = 0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
	{
		strHTML += "<tr>\n"
		+"				<td rowspan=" + objBZZP_BZ.arrObj_BZZP[i].rowspan + " scope=\"row\">" + objBZZP_BZ.arrObj_BZZP[i].xm + "</td><!--一级项目-->\n";
		for(var j = 0; j < objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
		{		
			var dfStrId = "df_" + i + "_" + j;
			
			if(j !=0)
				strHTML += "<tr>\n";
				
			strHTML +="	<td rowspan=" + 4 + " scope=\"row\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].bz + "</p1></td><!--二级项目-->\n"
			+"				<td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].a + "</p1></td>\n"
			+"				<td rowspan=" + 4 + " scope=\"row\"><input name=\"#\" id=" + dfStrId + " value=\"" + obj_BZZP.arrDF[i][j] + "\"></td>\n"
			+"			</tr>\n"		
			+"			<tr><td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].b + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].c + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].d + "</p1></td></tr>\n";
			if(j != objBZZP_BZ.arrObj_BZZP[i].arrObj.length-1)
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"3\" scope=\"col\"></td></tr><!--空行-->\n";
			}
			else
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";
			}
		}
	}
	
	strHTML += "<tr><td colspan=\"3\" scope=\"col\">总分</td> <td id=\"zongfen\" class=\"total_score\">" + obj_BZZP.zongfen + "</td></tr>\n"			
	+"		 </table>\n";

	
	strHTML += "			<h3>自我评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请总结本月的工作情况，评价自己的工作状态，说出收获，反映遇到的问题以及和部门内其他人相处的感受，我们会反馈给主管副主席\n"
	 + "					</p>\n"
	 + "					<textarea id=\"ziwopingjia\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_BZZP.zwpj + "</textarea>	\n"
	 + "					<h3>对本部门其他部长级打分及评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请对本部门其他部长级的综合表现打分，满分10分，并且填写评价，我们会把评价反馈给该部长级\n"
	 + "					</p>\n"
	 + "					<table class=\"erjibiao\" id=\"bzpj\">\n"
	 + "						<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n"
	 + "						<!--正部应该拍前面-->\n"
	 + "					</table>\n"
	 + "					<h3>对主管副主席评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">对主管副主席评价部分:</span>请填写对主管副主席的意见或建议，我们会反馈给主管副主席\n"
	 + "					</p>\n"
	 +"						<textarea id=\"dzgfzxpj\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_BZZP.dzgfzxpj + "</textarea>\n";
	 

	strHTML += " 			<h3>对主席团的匿名评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>此处非必填，你可以对主席团的任意成员评价，我们会匿名反馈给该主席团成员\n"
	 + "					</p>\n"
	 + "					<table class=\"erjibiao\" id=\"nmpj\">\n"
	 + "						<tr><td>姓名</td><td>职位</td><td>匿名评价</td>\n"
	 + "						<!--正部应该拍前面-->\n"
	 + "						<tr><td>主席1</td><td>副主席</td><td class=\"normal_input\"><input id=\"pingjia3\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n"
	 + "					</table>\n"
	 + "					<h3>对其他部门部长级的留言板</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请对其他部门部长级以及部门工作的综合表填写建议或意见，我们会把评价反馈给该部长级\n"
	 + "					</p>\n"
	 + "					<div id=\"liuyanban\"></div>"
	 + "					<button type=\"button\" id=\"add_a_words\" title=\"添加\" class=\"perf_button\">﹢</button>"
	 + "					<!--预留报错位-->\n"
	 + "					<div></div>\n"
	 + "					<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
	 +"						<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"
	+ "				</form>\n";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	/*留言板部分*/
	function delete_a_word()
	{
		
		strID=this.id;
		strIndex=strID.replace("delete_liuyan_","");
		
		obj_BZZP.arrTSLY.splice(strIndex,1);
		reRender();
		
		bind_the_action_handler();
		
	}
	function bind_the_action_handler()
	{
		for(var i=0;i<obj_BZZP.arrTSLY.length;i++)
		{
			GetObjById("liuyan_"+i).value=obj_BZZP.arrTSLY[i].liuyan;
		}
		for(var i=0;i<obj_BZZP.arrTSLY.length;i++)
		{
			
			GetObjById("delete_liuyan_"+i).onclick=delete_a_word;
			GetObjById("liuyanban_"+i).onchange=function()
			{
				strID=this.id;
				strIndex=strID.replace("liuyanban_","");
				obj_BZZP.arrTSLY[strIndex].account=this.value;
				GetObjById("liuyan_"+strIndex).value="";//输入框内容设为空
				obj_BZZP.arrTSLY[strIndex].liuyan="";
			}
			GetObjById("liuyan_"+i).onchange=function()
			{
				
				strID=this.id;
				strIndex=strID.replace("liuyan_","");
				if(!CheckLegalStr(this.value))
				{
					alert("您的输入含有非法字段，请重新输入!");
					this.value=obj_BZZP.arrTSLY[strIndex].liuyan;
					return false;
				}
				obj_BZZP.arrTSLY[strIndex].liuyan=this.value;
				
			}
				
		}
	}
	//同事留言的内容有obj_BZZP.arrTSLY的数据决定，增加或删除时都重新渲染HTML
	function reRender()
	{
		var strNewHTML=new String();
		for(var i=0;i<obj_BZZP.arrTSLY.length;i++)
		{
			strNewHTML+="<select id=\"liuyanban_"+i+"\">";//id是liuyanban_i
			for(var j=0;j<obj_BZZP.arrTongShi.length;j++)
			{
				strNewHTML+="<option value=\""+obj_BZZP.arrTongShi[j].account+"\""
				if(obj_BZZP.arrTSLY[i].account==obj_BZZP.arrTongShi[j].account)
				{
					strNewHTML+="selected=\"selected\"";
				}
				strNewHTML+=">"+obj_BZZP.arrTongShi[j].name+"</option>";
			}
			strNewHTML+="</select><input type=\"text\" size=\"80\" class=\"perf_textarea\" id=\"liuyan_"+i+"\"/><span class=\"onclick\" id=\"delete_liuyan_"+i+"\">删除</span><br />";
		}
		GetObjById("liuyanban").innerHTML=strNewHTML;
	}
	reRender();
	bind_the_action_handler();
	
	GetObjById("add_a_words").onclick=function()
	{
		var strNew=new String();
		var i=obj_BZZP.arrTSLY.length;
		if(i+1>obj_BZZP.arrTongShi.length)
		{
			alert("你的同事总共才"+obj_BZZP.arrTongShi.length+"人，你加那么多干嘛- -");
			return false;
		}
		var newItem={"account":obj_BZZP.arrTongShi[0].account,"liuyan":""};
		if(obj_BZZP.arrTSLY=="")
		{
			obj_BZZP.arrTSLY=new Array();
		}
		console.log(obj_BZZP.arrTSLY);
		obj_BZZP.arrTSLY.push(newItem);
		
		reRender();
		
		bind_the_action_handler();
	}	
	/*留言部分完*/
	
	var bzpjStrHTML = "<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n";
	for (var i = 0; i < obj_BZZP.arrDQTBZPJ.length; ++i) 
	{
		var fsStrId = "fenshu" + "_" + i;
		var pjStrId = "pingjia" + "_" + i;
		bzpjStrHTML += "<tr><td>" + obj_BZZP.arrDQTBZPJ[i].name + "</td><td class=\"normal_input\"><input id=" + fsStrId + " type=\"text\" size=\"5\" class=\"perf_textarea\"/></td><td class=\"normal_input\"><input id=" + pjStrId + " type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n";
	}
	GetObjById("bzpj").innerHTML = bzpjStrHTML;
	
	var nmpjStrHTML = "<tr><td>姓名</td><td>职位</td><td>匿名评价</td>\n";
	for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
	{
		nmpjStrHTML += "<tr><td>" + obj_BZZP.arrNMPJ[i].name + "</td><td>" + obj_BZZP.arrNMPJ[i].depart + "</td><td class=\"normal_input\"><input id=" + ("nmpj_"+i) + " type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n";
	}
	GetObjById("nmpj").innerHTML = nmpjStrHTML;
	
	if (obj_BZZP.status == 0) //可以提交状态
	{
		//填写各项得分并计算总分
		for(var i=0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
		{
			for(var j=0; j< objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;							
				
				GetObjById(dfStr).onchange = function(e)
				{
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						var arr = strId.split("_");
						
						var dfPre = obj_BZZP.arrDF[arr[1]][arr[2]];
						obj_BZZP.arrDF[arr[1]][arr[2]] = this.value;
						obj_BZZP.zongfen = parseInt(obj_BZZP.zongfen) - parseInt(dfPre) + parseInt(this.value);
						GetObjById("zongfen").innerHTML = obj_BZZP.zongfen;
					}
					else
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
				GetObjById(dfStr).onfocus = function()
				{
					this.style.backgroundColor="white";
					this.style.color = "#79c0be";
				}
				GetObjById(dfStr).onblur = function()
				{
					this.style.backgroundColor="#79c0be";
					this.style.color = "white";
				}
			}
		}
		
		//自我评价
		GetObjById("ziwopingjia").onchange = function()
		{

			if(CheckLegalStr(this.value))
				obj_BZZP.zwpj = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_BZZP.zwpj = "";
				this.value = "";
			}
		}
		
		//对其他部长评价部分
		for(var j=0; j<obj_BZZP.arrDQTBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			
			GetObjById(fsStrId).value = obj_BZZP.arrDQTBZPJ[j].fs;
			GetObjById(pjStrId).value = obj_BZZP.arrDQTBZPJ[j].pj;		
			
			GetObjById(fsStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if (this.value >= 0 && this.value <= 10) 
				{
					obj_BZZP.arrDQTBZPJ[curIndex[1]].fs = this.value;
				}
				else
				{
					this.value = "";
					alert("*得分不能大于10或小于0，请重新填！");
				}
				
			}
			GetObjById(pjStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if(CheckLegalStr(this.value))
					obj_BZZP.arrDQTBZPJ[curIndex[1]].pj = this.value;
				else
				{
					alert("您输入有非法字段，请重新输入");
					obj_BZZP.arrDQTBZPJ[curIndex[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		//对主管副主席评价
		GetObjById("dzgfzxpj").onchange = function()
		{

			if(CheckLegalStr(this.value))
				obj_BZZP.dzgfzxpj = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_BZZP.dzgfzxpj = "";
				this.value = "";
			}
		}
		
		//对主席团的匿名评价
		for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
		{
			var strId = "nmpj_"+i;
			GetObjById(strId).value = obj_BZZP.arrNMPJ[i].pj;
			GetObjById(strId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if(CheckLegalStr(this.value))
					obj_BZZP.arrNMPJ[curIndex[1]].pj = this.value;
				else
				{
					alert("您输入有非法字段，请重新输入");
					obj_BZZP.arrNMPJ[curIndex[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i=0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
			{
				for(var j=0; j< objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
				{
					var dfStr = "df_" + i + "_" + j;
					if(GetObjById(dfStr) == "")
						return false;
				}
			}
			
			if(GetObjById("ziwopingjia").value == "")
				return false;
			
			for(var j=0; j<obj_BZZP.arrDQTBZPJ.length; ++j)
			{
				var fsStrId = "fenshu" + "_" + j;
				var pjStrId = "pingjia" + "_" + j;
				if(GetObjById(fsStrId).value == "" || GetObjById(pjStrId).value == "")
					return false;
			}
			
			if(GetObjById("dzgfzxpj").value == "")
				return false;
			
			return true;
		}
		
		GetObjById("save").onclick = function()
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
                return false;
			}
            post_func(obj_BZZP,posting_func,save_feedback);
		}
		function AllConfirm()
		{
			if( !Finish() )
			{
				alert("提交前不允许留有空白");
				return false;
			}
			//检查评分有没写完
			
			for (var i = 0; i < obj_BZZP.arrDF.length; ++i) 
			{
				for (var j = 0; j <  obj_BZZP.arrDF[i].length; ++j) 
				{
					if(obj_BZZP.arrDF[i][j]==0)
					{
						alert("您的第"+(i+1)+"项，第"+(j+1)+"小项自评为0，但是我们是不允许0分的，请修改");
						return false;
					}
				}
			}
			//检查自我评价有没写
			
			if(obj_BZZP.zwpj==""||obj_BZZP.zwpj==" "||obj_BZZP.zwpj=="无"||obj_BZZP.zwpj=="请填写.....")
			{
				if(!confirm("您的自我评价还没写，你确定要提交？"))
				{
					return false;
				}
			}
			//检查对本部门其他部长评价有没有写
			
			for(var i=0;i<obj_BZZP.arrDQTBZPJ.length;++i)
			{
				if(obj_BZZP.arrDQTBZPJ[i].fs==0)
				{
					if(!confirm("您对"+obj_BZZP.arrDQTBZPJ[i].name+"的评分为0,你确定这样提交？"))
					{
						return false;
					}
				}
				if(obj_BZZP.arrDQTBZPJ[i].pj==""||obj_BZZP.arrDQTBZPJ[i].pj==" "||obj_BZZP.arrDQTBZPJ[i].pj=="无")
				{
					if(!confirm("您对"+obj_BZZP.arrDQTBZPJ[i].name+"的评价未填,你确定这样提交？"))
					{
						return false;
					}
				}
			}
			
			return true;
			
			
		}
		GetObjById("submit").onclick=function()
		{
			
			if(AllConfirm())
			{
				obj_BZZP.hadSubmit=1;
                post_func(obj_BZZP,posting_func,submit_feedback);
			}
		}
			
		
	}
	else
	{
		for(var i=0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
		{
			for(var j=0; j< objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;
				GetObjById(dfStr).value = obj_BZZP.arrDF[i][j];
				GetObjById(dfStr).readOnly = true;//设置为只读
			}
		}
		
		GetObjById("ziwopingjia").value = obj_BZZP.zwpj;
		GetObjById("ziwopingjia").readOnly = true;
		
		for(var j=0; j<obj_BZZP.arrDQTBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			GetObjById(fsStrId).value = obj_BZZP.arrDQTBZPJ[j].fs;
			GetObjById(fsStrId).readOnly = true;
			GetObjById(pjStrId).value = obj_BZZP.arrDQTBZPJ[j].pj;
			GetObjById(pjStrId).readOnly = true;
		}
		
		//对主席团的匿名评价
		for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
		{
			var strId = "nmpj_"+i;
			GetObjById(strId).value = obj_BZZP.arrNMPJ[i].pj;
			GetObjById(strId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			confirm_feedback(true);
		}
	}
}

//干事考核表
function Show_GSKH(obj_GSKH,post_func)
{
		
	var strHTML = "<div id=\"pjbz\"></div>";
	strHTML += "<h3>评分部分</h3>"
				+"<p class=\"fill_in_tips\">"
					+"<span class=\"till_part\">考核干事部分:</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请为干事评分"
				+"</p>"
				+"<form method=\"post\" action=\"#\">"
					+"<table class=\"erjibiao ganshikaohebiao\">"
					+"<tr>"
							+"<td class=\"blankline\" colspan=\"6\" scope=\"col\"></td>"
						+"</tr>"						
						+"<tr>"
							+"<td></td>"
							+"<td colspan=\"5\" scope=\"col\">工作情况</td>"
						+"</tr>"
						+"<tr>"
							+"<td></td>"
							+"<td>工作量</td>"
							+"<td>工作效率</td>"
							+"<td>工作质量</td>"
							+"<td>工作态度</td>"							
							+"<td>工作能力</td>"
							
						+"</tr>";				
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		strHTML += "<tr>"
						+"<td>" + obj_GSKH.arrGSDF[i].name + "</td>";
		for(var j = 0 ; j < 5; ++j)
		{
			strHTML += "<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_GSKH.arrGSDF[i][("df"+j)] + "\" id =" + ("bzId_"+i+"_"+j) + " size=\"16\"/></td>";
		}
		strHTML += "</tr>";
	}
	
	strHTML +=" <tr>"
			+ "		<td class=\"blankline\" colspan=\"8\" scope=\"col\"></td>"
			+ "	</tr>";
	
	strHTML += "<tr>"
					+"<td></td><td colspan=\"3\" scope=\"col\">工作情况</td>"
					+"<td colspan=\"1\" scope=\"col\">总分(5分制)</td>"
				+"</tr>"
				+"<tr>"
					+"<td></td>"
					+"<td>合作能力</td>"
					+"<td>表达能力</td>"
					+"<td>团队精神</td>"
					+"<td>总分</td>"
				+"</tr>";
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		strHTML += "<tr>"
						+"<td>" + obj_GSKH.arrGSDF[i].name + "</td>";
		for(var j = 5 ; j < 8; ++j)
		{
			strHTML += "<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_GSKH.arrGSDF[i][("df"+j)] + "\" id =" + ("bzId_"+i+"_"+j) + " size=\"16\"/></td>";
		}
		strHTML+="<td id=\"zdf_"+i+"\">"+jisuanzongfen(i).toFixed(3)+"</td>";
		strHTML += "</tr>";
	}
	function jisuanzongfen(i)
	{
		var fs=0;
		for(var j=0;j<8;j++)
		{
			fs+=parseFloat(obj_GSKH.arrGSDF[i][("df"+j)]);
		}
		fs=(fs/80)*5;
		
		return fs;
	}
	strHTML += "</table>";
	
	strHTML += "<h3>评价干事部分</h3>"
				+"<p class=\"fill_in_tips\">"
					+"<span class=\"till_part\">评价干事:</span>根据您对干事的观察与了解，您认为该干事在本时段的工作中哪些地方最让你欣赏或者是哪些地方还需要改进的，请给该干事一个整体的评价和发展建议。"
				+"</p>"					
				+"<table class=\"erjibiao\">"
					+"<tr><td>姓名</td><td>对干事的评价</td>";
					
	for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)
	{
		strHTML += "<tr><td>" + obj_GSKH.arrDGSPJ[i].name + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i) + " type=\"text\" size=\"100\" class=\"perf_textarea\" value=\"" + obj_GSKH.arrDGSPJ[i].pj + "\" /></td></tr>";
	}
	strHTML += "</table>";
	
	strHTML += "<!--预留报错位-->\n"
			+ "	<div></div>\n"
			+ "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
			+"<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n";		
	
	strHTML +="</form>";
	GetObjById("show_more").innerHTML = strHTML;
	
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		for(var j = 0; j < 8; ++j)
		{
			strId = "bzId_" + i + "_" + j;
			GetObjById(strId).onfocus = function(e)
			{
				var xSite = new Array(620, 750, 900, 250, 400);
				
				strId = GetId(e);
				var arrI = strId.split("_");
				GetObjById("pjbz").style.left = xSite[arrI[2]%5] + "px";
				if(arrI[2] == 13)
				{
					GetObjById("pjbz").innerHTML = obj_GSKH.bmts;
				}
				else
				{
					GetObjById("pjbz").innerHTML = obj_GSKH.GSKH_BZ[("str"+arrI[2])];
				}

				
				//GetObjById("pjbz").innerHTML = xCoord + ", " + yCoord;
			}
			GetObjById(strId).onblur = function(e)
			{
				GetObjById("pjbz").innerHTML = "";
			}
		}
	}
	
		
	if(obj_GSKH.status == 0)//可提交状态
	{
		for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
		{
			for (var j = 0; j < 8; ++j) 
			{
				strId = "bzId_" + i + "_" + j;
				GetObjById(strId).onchange = function (e)
				{
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						strId = GetId(e);
						var arrI = strId.split("_");
						obj_GSKH.arrGSDF[arrI[1]][("df" + arrI[2])] = parseFloat(this.value);
						GetObjById("zdf_"+arrI[1]).innerHTML=jisuanzongfen(arrI[1]).toFixed(3);
					} 
					else 
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
			}
		}
		
		for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)//评价干事
		{
			var strId = "pj_" + i;
			GetObjById(strId).onchange = function(e)
			{
				strId = GetId(e);
				var arr = strId.split("_");
				
				if(CheckLegalStr(this.value))
				{
					obj_GSKH.arrDGSPJ[arr[1]].pj = this.value;
					
				}
				else
				{
					alert("您输入有非法字段，请重新输入");
					obj_GSKH.arrDGSPJ[arr[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
			{
				for (var j = 0; j < 8; ++j) 
				{
					strId = "bzId_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
			
			for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)//评价干事
			{
				var strId = "pj_" + i;
				if(GetObjById(strId).value == "")
					return false;
			}
			return true;
		}
		
		function AllConfirm()
		{
			for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
			{
				for (var j = 0; j < 8; ++j) 
				{
					if(obj_GSKH.arrGSDF[i][("df" + j)]==0)
					{
						alert(obj_GSKH.arrGSDF[i].name+"的第"+(j+1)+"项得分为0，必须填写才能提交");
						return false;
					}
				}
				if(obj_GSKH.arrDGSPJ[i].pj=="无"||obj_GSKH.arrDGSPJ[i].pj==""||obj_GSKH.arrDGSPJ[i].pj==" ")
				{
					if(!confirm(obj_GSKH.arrDGSPJ[i].name+"的评价还没写，你确定这样提交？"))
					{
						return false;
					}
				}
			}
			return true;
		}
		
		GetObjById("save").onclick = function () 
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
                return false;
			}
            post_func(obj_GSKH,posting_func,save_feedback);
		}
		GetObjById("submit").onclick=function()
		{
			if(AllConfirm())
			{
				obj_GSKH.hadSubmit=1;
                post_func(obj_GSKH,posting_func,save_feedback);
			}
		}
	}
	else//不可提交状态
	{
		for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
		{
			for (var j = 0; j < 8; ++j) 
			{
				strId = "bzId_" + i + "_" + j;
				GetObjById(strId).value = obj_GSKH.arrGSDF[i][("df" + j)];
				GetObjById(strId).readOnly = true;
			}
		}
		
		for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)//评价干事
		{
			var strId = "pj_" + i;
			GetObjById(strId).value = obj_GSKH.arrDGSPJ[i].pj;
			GetObjById(strId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			confirm_feedback(true);
		}
	}
}

//部长反馈表
function Show_BZFK(obj_BZFK,post_func)
{
	var strInnerHtml = new String();
	strInnerHtml += "<h3>得分部分</h3>\n"
				+"<p>总分："+obj_BZFK.ZongFen+"</p>\n"
				+"<p class=\"fill_in_tips\">\n"
				+"	<span class=\"fill_part\">得分细节</span>\n"
				+"</p>\n"
				+"<table class=\"yijibiao\">\n"
				+"	<tr>\n"
				+"		<td>项目</td><td>细则</td><td>得分/加减分</td><td>备注</td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>部长自评表得分</td><td><p>满分2分<p></td><td>"+obj_BZFK.arrDeFenXiZhe[0]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>部长考核表得分</td><td><p>满分5分<p></td><td>"+obj_BZFK.arrDeFenXiZhe[1]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>干事评分</td><td><p>满分2分，干事打分为10分制，由干事打分*0.2/部门干事人数）</p></td><td>"+obj_BZFK.arrDeFenXiZhe[2]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>其他部长级评分</td><td><p>满分2分，部长打分为10分制，由部长打分*0.2/部门除该部长外部长人数）</p></td><td>"+obj_BZFK.arrDeFenXiZhe[3]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>出勤得分</td>"
                +"          <td>"
                +"              <p>基本得分1分</p>"
                +"              <p>A.例会 大会 拓展（请假-0.2/次，迟到-0.4/次，缺席-0.6/次）</p><p>B.外调（缺席-0.6/次,迟到或早退-0.4/次,请假-0.2/次）</p>"
                +"          </td>"
                +"          <td>"+obj_BZFK.arrDeFenXiZhe[4]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>外调加分</td><td><p>基本分0分</p><p>正常参加+0.2/次,推优+0.2/次</p></td><td>"+obj_BZFK.arrDeFenXiZhe[5]+"</td><td><p>此外调统计包括人力平时外调各部门干事，司仪、礼仪队的外调，信编拍照外调和人力观察员外调</p></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>反馈加分</td><td><p>0.2/次</p><p>在外调反馈表或活动调研问卷中写的意见被活动部门采纳</p></td><td>"+obj_BZFK.arrDeFenXiZhe[6]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>其他</td><td></td><td>"+obj_BZFK.arrDeFenXiZhe[7]+"</td><td>"+obj_BZFK.bzqitaliyou+"</td>\n"
				+"	</tr>\n"
				+"</table>\n"
				
				+"<h3>评价部分</h3>\n"
				+"<p class=\"fill_in_tips\">自我评价</p>\n"
				+"<div id=\"assessment\">\n"
				+"	<ul>\n"
				+"		<li><p class=\"self-assessment\">"+obj_BZFK.ZiWoPingJia+"</p></li>\n"
				+"	</ul>\n"
				+"</div>\n"
				+"<p class=\"fill_in_tips\">干事评价</p>\n"
				+"<ul id=\"entrusted_assessment\">\n";
	for(var i=0;i<obj_BZFK.arrGanShiPingJia.length;i++)
	{
		strInnerHtml += "<li>"+obj_BZFK.arrGanShiPingJia[i]+"</li>";
	}
	strInnerHtml += "</ul>"
					+"<p class=\"fill_in_tips\">其他部长评价</p>"
					+"<ul class=\"ministerial\">";
	for(var i=0;i<obj_BZFK.arrQiTaBuZhanPinJia.length;i++)
	{
		strInnerHtml += "<li>"+obj_BZFK.arrQiTaBuZhanPinJia[i]+"</li>";
	}
	strInnerHtml+="</ul>"
				+"<p class=\"fill_in_tips\">来自其他部门其他部长级的留言</p>"
				+"<ul class=\"ministerial\">";
	if(obj_BZFK.arrLiuYan.length==0)
	{
		strInnerHtml+="<li>木有留言</li>";
	}
	for(var i=0;i<obj_BZFK.arrLiuYan.length;i++)
	{
		strInnerHtml+="<li>"+obj_BZFK.arrLiuYan[i]+"</li>";
	}
	strInnerHtml += "</ul>"
					+"<p class=\"fill_in_tips\">主管副主席评价</p>"
					+"<ul class=\"ministerial\">"
					+"<li>"
					+obj_BZFK.ZhuGuanFuZhuXiPinJia
					+"</li>"
					+"</ul>"
					+"<h3>干事自我评价部分</h3>"
					+"<ul>";
	for(var i=0;i<obj_BZFK.arrGanShiZhiWoPinJia.length;i++)
	{
		strInnerHtml += "<li><p class=\"self-assessment\">"+obj_BZFK.arrGanShiZhiWoPinJia[i].name+"<br />"+obj_BZFK.arrGanShiZhiWoPinJia[i].assess+"</p></li>";
	}
	
	strInnerHtml +="</ul>";
	strInnerHtml+="<h3>干事得分排名</h3><ol>";
	for(var i=0;i<obj_BZFK.arrGanShiDeFengPaiMing.length;i++)
	{
		strInnerHtml+="<li>"+obj_BZFK.arrGanShiDeFengPaiMing[i].name+"&emsp;<span>得分：</span>"+obj_BZFK.arrGanShiDeFengPaiMing[i].score+"</li>";
	}
	strInnerHtml+="</ol>"
					+"<h3>部门情况反馈</h3>"
					+"<p>部门得分："+obj_BZFK.BuMenDeFeng+"</p>"
					+"<p class=\"fill_in_tips\">部门排名：</p>"
					+"<table>";
	for(var i=0;i<obj_BZFK.arrBuMenPaiMing.length;i++)
	{
		strInnerHtml+="<tr><td>"+(i+1)+". </td><td>&emsp;&emsp;"+arrDepartName[obj_BZFK.arrBuMenPaiMing[i].bm-1]+"</td>"
            +"<td><span>得分:</span>"+obj_BZFK.arrBuMenPaiMing[i].df+"</td></tr>";
	}
	strInnerHtml+="</table>"
					+"<p class=\"fill_in_tips\">"
					+"<span class=\"fill_part\">得分细节</span>"
					+"</p>"
					+"<table class=\"yijibiao\">"
					+"	<tr>"
					+"		<td>项目</td><td>细则</td><td>得分/加减分</td><td>备注</td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>主席评分</td><td><p>满分5分<p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[0]+"</td><td></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>主管副主席评分</td><td><p>满分3分<p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[1]+"</td><td></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>部门出勤</td><td><p>基本得分2分</p><p>A例会 大会 拓展（请假-0.2/人次，迟到-0.4/人次，缺席-0.6/人次）</p></td>"
                    +"      <td>"+obj_BZFK.arrBuMenDeFenXiZhe[2]+"</td><td><p>此统计还包括部长级例会的出勤情况（扣分情况与平时例会相同），外调缺席不扣部门出勤分<p></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>违反违规惩戒制度</td><td><p>包括秘书、人力、公关、信编和宣传的违规惩戒制度，具体扣分细则请看总群群共享上的《违规惩戒制度》</p></td>"
                    +"      <td>"+obj_BZFK.arrBuMenDeFenXiZhe[3]
                    +"</td><td><p>"+obj_BZFK.weijiliyou+"</p></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>反馈加分</td><td><p>0.2/人次</p><p>在外调反馈表或活动调研问卷中写的意见被活动部门采纳</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[4]+"</td><td></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>主管副主席推优</td><td><p>0.3/票</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[5]+"</td><td>每位主管副主席推优一个非主管部门</td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>优秀部长加分</td><td><p>0.2</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[6]+"</td><td></td>"
					+"	</tr>"
					+"		<td>其他</td><td></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[7]+"</td><td>"+obj_BZFK.bmqitaliyou+"</td>"
					+"	</tr>"
					+"</table>"
					
					+"<p class=\"fill_in_tips\">主席的部门评价</p>"
					+"<ul class=\"ministerial\">"
					+"	<li><p class=\"self-assessment\">"+obj_BZFK.ZhuXiDeBuMenPinJia+"</p></li>"
					+"</ul>"
					+"<p class=\"fill_in_tips\">主管副主席的部门评价</p>"
					+"<ul class=\"ministerial\">"
					+"	<li><p class=\"self-assessment\">"+obj_BZFK.ZhuGuanFuZhuXiBuMenPinJia+"</p></li>"
					+"</ul>"
					+"<p class=\"fill_in_tips\">干事对部门的评价</p>"
					+"<ul class=\"ministerial\">";
	for(var i=0;i<obj_BZFK.arrBuMenLiuYan.length;i++)
	{
		strInnerHtml+="	<li><p class=\"self-assessment\">"+obj_BZFK.arrBuMenLiuYan[i]+"</p></li>";
	}
	
	strInnerHtml+="</ul>"
				+"<button type=\"button\" id=\"submit\" class=\"perf_button\">确定</button>";
	GetObjById("show_more").innerHTML = strInnerHtml;
	GetObjById("submit").onclick = function()
	{
		confirm_feedback(true);
	}
}

//部长考核表
function Show_BZKH(obj_BZKH,post_func)
{
	
	var strHTML = "<div id=\"pjbz\"></div>";
	strHTML +=" <h3>评分部分</h3>"
			+ "	<p class=\"fill_in_tips\">"
			+ "		<span class=\"till_part\">考核干事部分:</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请为部长评分"
			+ "	</p>"
			+ "	<form method=\"post\" action=\"#\">"
			+ "		<table class=\"erjibiao ganshikaohebiao\">"
			+ "			<tr>"
			+ "				<td></td>"
			+ "				<td></td>"
			+ "				<td colspan=\"3\" scope=\"col\">协作能力</td>"
			+ "				<td colspan=\"2\" scope=\"col\">督导能力</td>"
			+ "			</tr>"
			+ "			<tr>"
			+ "				<td>部门</td>"
			+ "				<td>姓名</td>"
			+ "				<td>沟通能力</td>"
			+ "				<td>合作能力</td>"
			+ "				<td>表达能力</td>"
			+ "				<td>管理能力</td>"
			+ "				<td>领导能力</td>"
			+ "			</tr>";			
	for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
	{
		for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			strHTML += "<tr>";
			if(j == 0)
				strHTML += "<td rowspan=" + obj_BZKH.arrBMBZ[i].arrBZ.length + " scope=\"row\">" + obj_BZKH.arrBMBZ[i].bm + "</td>";
			strHTML += "<td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td>";
			for(var k = 0; k < 5; ++k)
				strHTML += "<td class=\"normal_input\"><input id=" + ("df_"+i+"_"+j+"_"+k) + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)] + "\" size=\"16\"/></td>";
		}
		strHTML += "</tr>";
	}
	
	strHTML +=" <tr>"
			+ "		<td class=\"blankline\" colspan=\"8\" scope=\"col\"></td>"
			+ "	</tr>"
			+ "	<tr>"
			+ "		<td></td>"
			+ "		<td></td>"
			+ "		<td colspan=\"4\" scope=\"col\">工作情况</td>"
			+ "		<td colspan=\"1\" scope=\"col\">总分(5分制)</td>"
			+ "	</tr>"
			+ " <tr>"
			+ "		<td>部门</td>"
			+ "		<td>姓名</td>"
			+ "		<td>工作量</td>"
			+ "		<td>工作方法</td>"
			+ "		<td>工作态度</td>"
			+ "		<td>工作能力</td>"	
			+ "		<td>总分</td>"
			+ "	</tr>";
	for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
	{
		for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			strHTML += "<tr>";
			if(j == 0)
				strHTML += "<td rowspan=" + obj_BZKH.arrBMBZ[i].arrBZ.length + " scope=\"row\">" + obj_BZKH.arrBMBZ[i].bm + "</td>";
			
			strHTML += "<td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td>";
			for(var k = 5; k < 9; ++k)
			{
				strHTML += "<td class=\"normal_input\"><input id=" + ("df_"+i+"_"+j+"_"+k) + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)] + "\" size=\"16\"/></td>";
			}
			strHTML+="<td id=\"zdf_"+i+"_"+j+"\">"+jisuanzongdefen(i,j).toFixed(3)+"</td>";
				
		}
		strHTML += "</tr>";
	}
	
	function jisuanzongdefen(i,j)
	{
		var fs=0;
		for(var k=0;k<9;k++)
		{
			fs+=parseFloat(obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)]);
		}
		fs=(fs/90)*5;
		return fs;
	}
	strHTML += "</table>";
	
	strHTML +=" <h3>评价部长部分</h3>"
			+ "	<p class=\"fill_in_tips\">"
			+ "		<span class=\"till_part\">评价部长:</span>根据您对部长级的观察与了解，您认为该部长级在本时段的工作中哪些地方最让你欣赏或者是哪些地方还需要改进的，请给该部长级一个整体的评价和发展建议。"
			+ "	</p>"
			+ "	<table class=\"erjibiao\">"
			+ "		<tr><td>部门</td><td>姓名</td><td>对部长的评价</td>";
	for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
	{
		for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			if(j == 0)
				strHTML +=" <tr><td rowspan="+ obj_BZKH.arrBMBZ[i].arrBZ.length + " scope=\"row\">" + obj_BZKH.arrBMBZ[i].bm + "</td><td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i+"_"+j) + " value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j].pj + "\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>";
			else
				strHTML += "<tr><td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i+"_"+j) + " value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j].pj + "\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>";
		}
	}
	strHTML += "</table>";
	
	strHTML += "<!--预留报错位-->\n"
			+ "	<div></div>\n"
			+ "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
			+ "<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"	;		
		
	strHTML += "</form>";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	for (var i = 0; i < obj_BZKH.arrBMBZ.length; ++i) 
	{
		for (var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			for (var k = 0; k < 9; ++k) 
			{
				var strId = "df_" + i + "_" + j + "_" + k;
				GetObjById(strId).onfocus = function (e) 
				{
					var xSite = new Array(700, 800, 200, 350, 500, 600);

					strId = GetId(e);
					var arr = strId.split("_");
					GetObjById("pjbz").style.left = xSite[arr[3] % 5] + "px";
					
					GetObjById("pjbz").innerHTML = obj_BZKH.BZKH_BZ[("str" + arr[3])];

					//GetObjById("pjbz").innerHTML = e.clientX +" , "+e.clientY;
				}
				GetObjById(strId).onblur = function (e) 
				{
					GetObjById("pjbz").innerHTML = "";
				}
			}
		}
	}
	
	if(obj_BZKH.status == 0)//可提交状态
	{
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				for (var k = 0; k < 9; ++k) 
				{
					var strId = "df_" + i + "_" + j + "_" + k;
					GetObjById(strId).onchange = function (e) 
					{
						var strId = GetId(e);
						if (this.value >= 0 && this.value <= 10) 
						{
							strId = GetId(e);
							var arr = strId.split("_");
							obj_BZKH.arrBMBZ[arr[1]].arrBZ[arr[2]][("df"+arr[3])] = this.value;
							GetObjById("zdf_"+arr[1]+"_"+arr[2]).innerHTML=jisuanzongdefen(arr[1],arr[2]).toFixed(3);
						}
						else 
						{
							this.value = "";
							alert("*得分不能大于10或小于0，请重新填！");
						}
					}
					
				}
			}
		}
	
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				var strId = "pj_" + i + "_" + j;
				GetObjById(strId).onchange = function (e) 
				{
					strId = GetId(e);
					var arr = strId.split("_");

					if (CheckLegalStr(this.value))
						obj_BZKH.arrBMBZ[arr[1]].arrBZ[arr[2]].pj = this.value;
					else 
					{
						alert("您输入有非法字段，请重新输入");
						obj_BZKH.arrBMBZ[arr[1]].arrBZ[arr[2]].pj = "";
						this.value = "";
					}
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
			{
				for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
				{
					for (var k = 0; k < 9; ++k) 
					{
						var strId = "df_" + i + "_" + j + "_" + k;
						if(GetObjById(strId).value == "")
							return false;
					}
				}
			}
			
			for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
			{
				for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
				{
					var strId = "pj_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
		
			return true;
		}
	
		GetObjById("save").onclick = function () 
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
                return false;
			}
            post_func(obj_BZKH,posting_func,save_feedback);
		}
		function AllConfirm()
		{
			for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
			{
				for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
				{
					for (var k = 0; k < 9; ++k) 
					{
						
						if(0==obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)])
						{
							alert(obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz+"的第"+(j+1)+"项评分未填，必须填写才能提交- -");
							return false;
						}
								
						
					}
					var strPj=obj_BZKH.arrBMBZ[i].arrBZ[j].pj;
					if(strPj=="无"||strPj==""||strPj==" "||strPj=="请填写......")
					{
						if(!confirm(obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz+"的评价未填写，您确定这样提交？"))
						{
							return false;
						}
					}
					
				}
			}
			return true;
		}
		
		GetObjById("submit").onclick=function()
		{
			if(AllConfirm())
			{
				obj_BZKH.hadSubmit=1;
                post_func(obj_BZKH,posting_func,submit_feedback);
			}
		}
		
	}
	else//不可提交状态
	{
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				for (var k = 0; k < 15; ++k) 
				{
					var strId = "df_" + i + "_" + j + "_" + k;					
					GetObjById(strId).value = obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)];	
					GetObjById(strId).readOnly = true;
				}
			}
		}
	
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				var strId = "pj_" + i + "_" + j;
				GetObjById(strId).value = obj_BZKH.arrBMBZ[i].arrBZ[j].pj;
				GetObjById(strId).readOnly = true;
			}
		}
	
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			confirm_feedback(true);
		}
	}
}

//部门考核表
function Show_BMKH(obj_BMKH,post_func)
{
	
	var strHTML = "<div id=\"pjbz\"></div>";
	strHTML +=" <h3>部门评分部分</h3>"
			+ "	<p class=\"fill_in_tips\">"
			+ "		<span class=\"till_part\">部门评分部分：</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请为部门评分"
			+ "	</p>"
			+ "	<form method=\"post\" action=\"#\">"
			+ "		<table class=\"erjibiao ganshikaohebiao\">"
			+ "			<tr>"
			+ "				<td>部门</td>"
			+ "				<td>工作量/工作难度</td>"
			+ "				<td>工作完成效果</td>"
			+ "				<td>工作态度</td>"
			+ "				<td>纪律性</td>"
			//+ "				<td>部门凝聚力</td>"
			//+ "				<td>沟通合作能力</td>"
			//+ "				<td>部门成员表现</td>"
			//+ "			</tr>";
    console.log("部门考核表测试");
	console.log(obj_BMKH.arrBM);	
	for(var i = 0; i < obj_BMKH.arrBM.length; ++i)
	{
		strHTML +=" <tr>"							
				+ "		<td>" + obj_BMKH.arrBM[i].bm + "</td>";
		for(var j = 0; j < 4; ++j)
		{
			strHTML +=" <td class=\"normal_input\"><input id=" + ("df_"+i+"_"+j) + " value=\"" 
            + obj_BMKH.arrBM[i][("df"+j)] + "\" class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"0\" size=\"16\"/></td>";
		}
		strHTML +=" </tr>";
	}
    strHTML+="<tr>"
        +"<td>部门</td>"
        +"<td>部门凝聚力</td>"
        +"<td>沟通合作能力</td>"
        +"<td>部门成员表现</td>"
        +"<td>总分(满分3分)</td>"
        +"</tr>";
    for(var i=0;i<obj_BMKH.arrBM.length;++i)
    {
        strHTML+="<tr>"
            +"<td>"+obj_BMKH.arrBM[i].bm+"</td>";
        for(var j=4;j<7;++j)
        {
            strHTML +=" <td class=\"normal_input\"><input id=" + ("df_"+i+"_"+j) + " value=\"" 
            + obj_BMKH.arrBM[i][("df"+j)] + "\" class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"0\" size=\"16\"/></td>";
        }
        strHTML+="<td id='sum_"+i+"'>"+sum(i).toFixed(3)+"</td></tr>"
    }
	strHTML += "</table>";
	
	strHTML +=" <table class=\"erjibiao\">"
			+ "		<tr><td>部门</td><td>对部门的评价</td>";
	for(var i = 0; i < obj_BMKH.arrBM.length; ++i)
	{
		strHTML += "<tr><td>" + obj_BMKH.arrBM[i].bm + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i) + " value=\"" + obj_BMKH.arrBM[i].pj + "\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>";
	}
	strHTML += "</table>";
	
	strHTML += "<h3>推优部分</h3>\n"
			 + "<p class=\"fill_in_tips\">\n"
			 + "	<span class=\"fill_part\">填写指引：</span>请推选一个本月表现突出的非本人主管部门。\n"
			 + "</p>\n"
			 + "<p>\n"
			 + "	部门：\n"
			 + "	<!--部门-->\n"
			 + "	<select name=\"#\" id=\"tuiyou\">\n"
			 + "	</select>\n"
			 + "</p>\n";
			 //+ "<p>\n"
			// + "	理由：\n"
			 //+ "	<input id=\"tuiyouliyou\" class=\"perf_textarea\" type=\"text\" name=\"#\" size=\"80\" />\n"
			 //+ "</p>";
	
	strHTML += "<!--预留报错位-->\n"
			+ "	<div></div>\n"
			+ "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
			+ "<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"	;					
		
	strHTML += "</form>";
	
	GetObjById("show_more").innerHTML = strHTML;
    
    function sum(i)
    {
        ret=0;
        //7项得分
        for(var j=0;j<7;j++)
        {
            ret+=parseInt(obj_BMKH.arrBM[i][("df"+j)]);
        }
        return (ret*3)/70;
    }
	
	for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
	{
		for (var j = 0; j < 7; ++j) 
		{
			var strId = "df_" + i + "_" + j;
			GetObjById(strId).onfocus = function (e) 
			{
				var xSite = new Array(580, 750, 880, 350, 390, 530, 660);

				strId = GetId(e);
				var arr = strId.split("_");
				GetObjById("pjbz").style.left = xSite[arr[2] %4] + "px";

				GetObjById("pjbz").innerHTML = obj_BMKH.BMKH_BZ[("str" + arr[2])];
			}
			GetObjById(strId).onblur = function (e) 
			{
				GetObjById("pjbz").innerHTML = "";
			}
		}
	}
	
	if(obj_BMKH.status == 0)//可提交状态
	{
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			for (var j = 0; j < 7; ++j) 
			{
				var strId = "df_" + i + "_" + j;
				GetObjById(strId).onchange = function (e) 
				{				
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						strId = GetId(e);
						var arr = strId.split("_");
						obj_BMKH.arrBM[arr[1]][("df" + arr[2])] = this.value;
                        $("#sum_"+arr[1]).html(sum(arr[1]).toFixed(3));
					} 
					else 
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
			}
		}
		
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			var strId = "pj_" + i;
			GetObjById(strId).onchange = function (e) 
			{
				strId = GetId(e);
				var arr = strId.split("_");

				if (CheckLegalStr(this.value))
					obj_BMKH.arrBM[arr[1]].pj = this.value;
				else 
				{
					alert("您输入有非法字段，请重新输入");
					obj_BMKH.arrBM[arr[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		//推优部分
		GetObjById("tuiyou").options.length = 0;
		var iIndex = 0;
		
		for(var i=0; i<obj_BMKH.arrBuMen.length; ++i)
		{
			var iBM=arrDepartName.indexOf(obj_BMKH.arrBuMen[i].name)+1;
			var option=$("<option></option>").val(iBM).html(obj_BMKH.arrBuMen[i].name).appendTo($("#tuiyou"));
			/*
			GetObjById("tuiyou").options[i] = new Option(obj_BMKH.arrBuMen[i].name);
			if(obj_BMKH.TYBM == obj_BMKH.arrBuMen[i].name)
				iIndex = i;
			*/
		}
		
		$("#tuiyou").val(obj_BMKH.TYBM);
        console.log(obj_BMKH.TYBM);
		//GetObjById("tuiyou").selectedIndex = iIndex;
		//GetObjById("tuiyouliyou").value = obj_BMKH.TYBZ.tyly;
		
		GetObjById("tuiyou").onchange = function()
		{
			//if(this.selectedIndex != iIndex)
			//	GetObjById("tuiyouliyou").value = "请填写......";
			//else
			//	GetObjById("tuiyouliyou").value = obj_BMKH.TYBZ.tyly;
				
			obj_BMKH.TYBM = $("#tuiyou").val();
			//obj_BMKH.TYBZ.account = obj_BMKH.arrBuZhang[this.selectedIndex].account;
		}
		/*GetObjById("tuiyouliyou").onchange = function()
		{
			if(CheckLegalStr(this.value))
				obj_BMKH.TYBZ.tyly = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_BMKH.TYBZ.tyly = "";
				this.value = "";
			}
		}*/
		
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
			{
				for (var j = 0; j < 7; ++j) 
				{	
					var strId = "df_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
			
			for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
			{
				var strId = "pj_" + i;
				if(GetObjById(strId).value == "")
					return false;
			}
			
			//if(GetObjById("tuiyouliyou").value == "")
			//	return false;
			
			return true;
		}
		
		GetObjById("save").onclick = function () 
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白！");
                return false;
			}
            post_func(obj_BMKH,posting_func,save_feedback);
		}
		
		function AllConfirm()
		{
			for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
			{
				for (var j = 0; j < 7; ++j) 
				{
					
					if(obj_BMKH.arrBM[i][("df" + j)] ==0)
					{
						
						alert(obj_BMKH.arrBM[i].bm+"的第"+(i+1)+"项评分未填写，请填写了再提交!");
						return false;
					}
					
						
				}
				var strPj=obj_BMKH.arrBM[i].pj;
				if(strPj==""||strPj==" "||strPj=="无")
				{
					if(!confirm(obj_BMKH.arrBM[i].bm+"的评价未填写，您确定就这样提交？"))
					{
						return false;
					}
				}
			}
			return true;
		}
		
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("提交前不允许留有空白！");
				return false;
			}
			if(AllConfirm())
			{
				obj_BMKH.hadSubmit=1;
                post_func(obj_BMKH,posting_func,submit_feedback);
			}
		}
		
	}
	else//不可提交状态
	{
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			for (var j = 0; j < 7; ++j) 
			{
				var strId = "df_" + i + "_" + j;
				GetObjById(strId).value = obj_BMKH.arrBM[i][("df" + j)];
				GetObjById(strId).readOnly = true;
			}
		}
		
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			var strId = "pj_" + i;
			GetObjById(strId).value = obj_BMKH.arrBM[i].pj;
			GetObjById(strId).readOnly = true;
		}
		
		GetObjById("tuiyou").options.length = 0;
		GetObjById("tuiyou").options[0] = new Option(obj_BMKH.TYBM);
		//GetObjById("tuiyouliyou").value = obj_BMKH.TYBZ.tyly;
		//GetObjById("tuiyouliyou").readOnly = true;		
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			confirm_feedback(true);
		}
	}
}

//优秀部长评定
function Show_YXBZPD(objYXBZPD,post_func)
{
	var strCheckForm = new String();
	strCheckForm += "<h3>评定本月优秀部长</h3>\n"
				+"<p class=\"fill_in_tips\">请勾选4名你认为本月表现较好的部长级</p>\n"
				+"<form name=\"yxbzpdb\" id=\"yxbzpdb\" action=\"#\" method=\"#\">\n"
				//+"<ol>\n";
				+"<table>";
	for(var i=0;i<objYXBZPD.arrYXBZPDlist.length;i++)
	{
		var strID=objYXBZPD.arrYXBZPDlist[i].account;
		var strName=objYXBZPD.arrYXBZPDlist[i].name;
		var strDepart=objYXBZPD.arrYXBZPDlist[i].depart;
		var strScore=objYXBZPD.arrYXBZPDlist[i].score;
		/*
		strCheckForm += "<li><label for=\""+strID+"\"><input type=\"checkbox\" id=\""+strID+"\" name=\""+strID+"\" value=\""+strID+"\""; 
		if(true == objYXBZPD.arrYXBZPDlist[i].Checked)
		{
			strCheckForm += "checked=\"checked\"";
		}
		strCheckForm +="/>"+strName+"<span>&emsp;部门:</span> "+strDepart+"<span>&emsp;得分:</span> "+strScore+"</label></li>\n";
		*/
		strCheckForm+="<tr><td>"+(i+1)+".</td><td><label for=\""+strID+"\"><input type=\"checkbox\" id=\""+strID+"\" name=\""+strID+"\" value=\""+strID+"\""; 
		if(true == objYXBZPD.arrYXBZPDlist[i].Checked)
		{
			strCheckForm += "checked=\"checked\"";
		}
		strCheckForm +="/>"+strName+"</label></td><td> <span>&emsp;部门:</span> "+strDepart+"</td><td><span>&emsp;得分:</span> "+strScore+"</td></tr>";
	}
	strCheckForm+="</table>";
	if(0==objYXBZPD.status)
	{
		
		strCheckForm+="<button type=\"button\" name=\"youxiubuzhan\" id=\"youxiubuzhan\" class=\"perf_button\">"
					+"	提交\n"
					+"</button>\n";
		document.getElementById("show_more").innerHTML=strCheckForm;
		document.getElementById("youxiubuzhan").onclick = function()
		{
			
			var objYXBZNameList = document.forms["yxbzpdb"];
			var arrIDList = new Array();
			for(var i=0;i<objYXBZPD.arrYXBZPDlist.length;i++)
			{	
				
				if(true == objYXBZNameList.elements[i].checked)
				{
					arrIDList.push(objYXBZNameList.elements[i].name);
					
				}
			}
			if(4 >= arrIDList.length && 0<arrIDList.length)
			{
				post_func(arrIDList,posting_func,submit_feedback);
			}
			else
			{
				alert("你勾选的数量非法");
			}
		}
	}
	else
	{
		strCheckForm+="<button type=\"button\" name=\"youxiubuzhan\" id=\"youxiubuzhan\" class=\"perf_button\">"
					+"	确定\n"
					+"</button>\n";
		GetObjById("show_more").innerHTML=strCheckForm;
		GetObjById("youxiubuzhan").onclick = function()
		{
			confirm_feedback(true);
		}
	}
	
}

//主席团反馈表
function Show_ZXTFK(objZXTFK,post_func)
{
	
	var strFeedBack = new String();
	strFeedBack += "<p class=\"fill_int_tips\">部门排名情况</p>\n<ol>";
	for(var i=0;i<objZXTFK.arrSorted.length;i++)
	{
		strFeedBack+="<li>"+arrDepartName[objZXTFK.arrSorted[i].name-1]+"&emsp;<span>得分：</span>"+objZXTFK.arrSorted[i].score;
		if(true == objZXTFK.arrSorted[i].isExc)
		{
			strFeedBack+="<span>&emsp;月度优秀部门</span>";
		}
		strFeedBack+="</li>";
	}
	
	strFeedBack+="</ol>"
			+"<p class=\"fill_in_tips\">优秀部长</p>\n"
			+"<ol>";
	for(var i=0;i<objZXTFK.arrExcMin.length;i++)
	{
		strFeedBack+="<li><span>月度优秀部长：</span>"
					+objZXTFK.arrExcMin[i].name
					+"&emsp;<span>所属部门：</span>"
					+arrDepartName[objZXTFK.arrExcMin[i].depart-1]
					+"&emsp;<span>得分：</span>"
					+objZXTFK.arrExcMin[i].score
					+"</li>";
	}
	strFeedBack+="</ol><p class=\"fill_in_tips\">部长级情况反馈</p>\n"
				+"<ul>";
				
	for(var i=0;i<objZXTFK.arrMinFeedBack.length;i++)
	{
		strFeedBack+="<li><span>"+arrDepartName[objZXTFK.arrMinFeedBack[i].depart-1]+":&emsp;</span>"
					+objZXTFK.arrMinFeedBack[i].minister
					+"<ul><li>自我评价：<br /><p class=\"self-assessment\">"
					+objZXTFK.arrMinFeedBack[i].selfAssess
					+"<p></li><li>对主管副主席的评价：<br /><p class\"self-assessment\">"
					+objZXTFK.arrMinFeedBack[i].feedBack
					+"</p></li></ul></li>";
	}
	strFeedBack+="</ul><p class=\"fill_in_tips\">来自其他部长级的匿名评价</p><ul>\n";
	for(var i=0;i<objZXTFK.arrAnonymity.length;i++)
	{
		var str=objZXTFK.arrAnonymity[i].anonymityFeedBack;
		if(str!=""&&str!=" "&&str!="无")
		{
			strFeedBack+="<li>"+objZXTFK.arrAnonymity[i].anonymityFeedBack+"</li>";
		}
	}
	
	strFeedBack+="</ul><button type=\"button\" id=\"submit\" class=\"perf_button\">确定</button>";
	
	GetObjById("show_more").innerHTML =strFeedBack;		
	GetObjById("submit").onclick = function()
	{
		confirm_feedback(true);
	}	
}

//考核进程控制表
function Show_KHJCKZ(obj_KHJCKZ,post_func)
{
	var strHTML = "";
	strHTML += "<h3>开始本月考核</h3>"
			+"	<p class=\"fill_in_tips\">开始填写：点击后激活本月绩效考核，各项表格除《优秀部长考核表》外可填</p>"
			+"	<button type=\"button\" name=\"kaishikaohe\" id=\"kaishikaohe\" class=\"perf_button\">"
			+"	开始本月考核"
			+"	</button>"
			+"	<hr class=\"perf_hr\" />"
			+"	<h3>开始优秀部长评定</h3>"
			+"	<p class=\"fill_in_tips\">开始优秀部长评定：点击后关闭干事和部长的所有填写性表格，激活《优秀部长评定表》,激活后，除《优秀部长评定表》外所有表格不可填</p>"
			+"	<button type=\"button\" name=\"kaishikaohe\" id=\"yxpzpd\" class=\"perf_button\">"
			+"	开始优秀部长评定"
			+"	</button>"
			+"	<hr class=\"perf_hr\" />"
			+"	<h3>发布结果</h3>"
			+"	<p class=\"fill_in_tips\">发布结果：点击后所有反馈表发布，所有可填表关闭，结束本月考核</p>"
			+"	<button type=\"button\" name=\"kaishikaohe\" id=\"fabujieguo\" class=\"perf_button\">"
			+"	发布结果"
			+"	</button>"
			+"	<hr class=\"perf_hr\" />"
			+"</ul><button type=\"button\" id=\"submit\" class=\"perf_button\">确定</button>";
			
	GetObjById("show_more").innerHTML = strHTML;
	
    function inline_loading(obj){
        $(obj).append(loadingElem());
    }

    function inline_feedback(flag_succeed){
        if(flag_succeed){
            afxTimeInfo=Get_Time();
            alert("成功");
            confirm_feedback(true);
        }
    }

	GetObjById("kaishikaohe").onclick = function()
	{
		if(obj_KHJCKZ.KSKH == 0)
		{
			if(confirm("确定开始本月考核?"))
			{
				obj_KHJCKZ.KSKH = 1;//确定
				var self = this;
                post_func(obj_KHJCKZ,
                    function(){inline_loading(self);},
                    function(flag_succeed){
                        inline_feedback(flag_succeed);
                        if(!flag_succeed){
                            alert("确定开始本月考核失败，请重试");
                        }
                    }
                );
			}
		}
		else
		{
			alert("已经开始了本月份的考核");
		}
	}
	GetObjById("yxpzpd").onclick = function()
	{
		if(obj_KHJCKZ.KSKH == 1 && obj_KHJCKZ.KSPD == 0)
		{
			if(confirm("确定开始优秀部长评定?"))
			{
				obj_KHJCKZ.KSPD = 1;//确定
				var self = this;
                post_func(obj_KHJCKZ,
                    function(){inline_loading(self);},
                    function(flag_succeed){
                        inline_feedback(flag_succeed);
                        if(!flag_succeed){
                            alert("开始优秀部长评定失败，请重试");
                        }
                    }
                );
			}
		}
		else if(obj_KHJCKZ.KSKH == 0)
		{
			alert("还没进行考核，不能开始优秀部长评定");
		}
		else
		{
			alert("已经开始了本月份的优秀部长评定");
		}
	}
	GetObjById("fabujieguo").onclick = function()
	{
		if(obj_KHJCKZ.KSKH == 1 && obj_KHJCKZ.KSPD == 1 && obj_KHJCKZ.FBJG == 0)
		{
			if(confirm("确定发布结果?"))
			{
				obj_KHJCKZ.FBJG = 1;//确定
				var self = this;
                post_func(obj_KHJCKZ,
                    function(){inline_loading(self);},
                    function(flag_succeed){
                        inline_feedback(flag_succeed);
                        if(!flag_succeed){
                            alert("发布结果失败，请重试");
                        }
                    }
                );
			}
		}
		else if(obj_KHJCKZ.KSKH == 0 )
		{
			alert("还没开始考核，不能发布结果");
		}
		else if(obj_KHJCKZ.KSPD == 0)
		{
			alert("还没进行优秀部长评定，不能发布结果");
		}
		else
		{
			alert("已经发布了本月份的考核结果");
		}
	}	
	
	GetObjById("submit").onclick = function()
	{
		confirm_feedback(true);
	}
}


//其他情况加减分 new
function Show_QTQKJJF(arrQTQKJJF,post_func)
{
	$('#show_more').html('');
	try{
	for(var i=0;i<arrQTQKJJF.length;i++){
		var obj = arrQTQKJJF[i];
		var title = $('<h3></h3>');
		title.html('跟进部门: ' + arrDepartName[obj['gjbm']-1]);
		var table = $('<table></table>');
		var th_alt = ['姓名','职位','加减分','理由'];
		var th = $('<tr></tr>');
		for(var alt in th_alt){
			var td = $('<td></td>');
			td.html(th_alt[alt]);
			th.append(td);
		}
		table.append(th);
		// 部长干事加减分
		for(var j=0;j<obj['persons'].length;j++){
			var person = obj['persons'][j];
			var tr = $('<tr></tr>');
			var td_name = $('<td></td>').html(person['name']).css('min-width','6em');
			var td_depart = $('<td></td>').html(arrTypeName[person['depart']-1]).css('min-width','4em');
			var td_jiajianfen = $('<td></td>').addClass('normal_input');
			//加减分
			var input_jiajianfen = $('<input />').attr({
				'id':['jiajianfen',i,j].join('_'),
				'type':'text',
				'size':'5'}).addClass('perf_textarea qt_input_cls').val(person['jiajianfen']);
			input_jiajianfen.change(function(){
				var self = $(this);
				var tmp_arr = self.attr('id').split('_');
				var _attr = tmp_arr[0];
				var _bm = tmp_arr[1];
				var _person = tmp_arr[2];
				var _val = self.val();
				if(_val=="") _val = 0;
				arrQTQKJJF[_bm]['persons'][_person][_attr]=_val;
			});
			td_jiajianfen.append(input_jiajianfen);
			//理由
			var td_liyou = $('<td></td>').addClass('normal_input');
			var input_liyou = $('<input />').attr({
				'id':['liyou',i,j].join('_'),
				'type':'textarea',
				'size':'80'}).addClass('perf_textarea qt_input_cls').val(person['liyou']);
			input_liyou.change(function(){
				var self = $(this);
				var tmp_arr = self.attr('id').split('_');
				var _attr = tmp_arr[0];
				var _bm = tmp_arr[1];
				var _person = tmp_arr[2];
				var _val = self.val();
				if(!CheckLegalStr(_val)){
					alert("您输入有非法字段，请重新输入");	
					self.val('');
				}else{
					arrQTQKJJF[_bm]['persons'][_person][_attr]=_val;
				}
			});
			td_liyou.append(input_liyou);
			tr.append(td_name).append(td_depart).append(td_jiajianfen).append(td_liyou);
			table.append(tr);
		}
		//部门加减分
		var bm_info = obj['bmjjf'];
		var tr_bmjjf = $('<tr></tr>');
		var td_bm_name = $('<td></td>').html(arrDepartName[bm_info['name']-1]).css('min-width','6em');
		var td_bm_type = $('<td></td>').html('').css('min-width','4em');
		var td_bm_jjf = $('<td></td>').addClass('normal_input');
		//加减分
		var input_bm_jjf = $('<input />').attr({
			'id':'jiajianfen_'+i,
			'type':'text',
			'size':'5'}).addClass('perf_textarea qt_input_cls').val(bm_info['jiajianfen']);
		input_bm_jjf.change(function(){
			var self = $(this);
			var tmp_arr = self.attr('id').split('_');
			var _attr = tmp_arr[0];
			var _bm = tmp_arr[1];
			var _val = self.val();
			if(_val=="") _val = 0;
			arrQTQKJJF[_bm]['bmjjf'][_attr]=_val;
		});
		td_bm_jjf.append(input_bm_jjf);
		//理由
		var td_bm_liyou = $('<td></td>').addClass('normal_input');
		var input_bm_liyou = $('<input />').attr({
			'id':'liyou_'+i,
			'type':'textarea',
			'size':'80'}).addClass('perf_textarea qt_input_cls').val(bm_info['liyou']);
		input_bm_liyou.change(function(){
			var self = $(this);
			var tmp_arr = self.attr('id').split('_');
			var _attr = tmp_arr[0];
			var _bm  =tmp_arr[1];
			var _val = self.val();
			if(!CheckLegalStr(_val)){
				alert("您输入有非法字段，请重新输入");	
				self.val('');
			}else{
				arrQTQKJJF[_bm]['bmjjf'][_attr]=_val;
			}
		});
		td_bm_liyou.append(input_bm_liyou);
		tr_bmjjf.append(td_bm_name).append(td_bm_type).append(td_bm_jjf).append(td_bm_liyou);
		table.append(tr_bmjjf);
		$('#show_more').append(title).append(table);
	}
	var submit_btn = $('<input />').attr({'type':'button','id':'submit'}).addClass('perf_button').val('提交');
	$('#show_more').append(submit_btn);
	var status = 1;
	try{status = arrQTQKJJF[0]['status'];}catch(e){}
	if(status == 0){//可填写状态
		function Finish(){
			var flag_fin = true;
			$('.qt_input_cls').each(function(i,o){
				if($(o).val()==""){
					flag_fin = false;
				}
			});
			return true;
		}
		$('#submit').click(function(){
			
			if( !Finish() ){
				alert("您还未完成，请填完再提交");
                return false;
			}
            post_func(arrQTQKJJF,posting_func,submit_feedback);
		});
	}else{
		//不可更改状态, 设置所有input为readonly
		try{
			$('.qt_input_cls').prop('readonly', true);
		}catch(e){
			$('.qt_input_cls').attr('readonly', true);
		}
		$('#submit').val('确定').click(function(){
			$('#show_more').html('');
		});
	}
	}catch(err){
		console.log(err);
	}
}
		
			


//其他情况加减分old
function Show_QTQKJJF_Old()
{
	var obj_QTQKJJF = Get_QTQKJJF();

	var strHTML = "";
	
	strHTML += "<h3>跟进部门：" + arrDepartName[obj_QTQKJJF.gjbm-1]  + "</h3>";
	
	strHTML +="<table class=\"erjibiao\">"
			+ "		<tr><td>姓名</td><td>职位</td><td>加减分</td><td>理由</td>";
	for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
	{
		strHTML += "<tr><td>" + obj_QTQKJJF.persons[i].name + "</td><td>" + arrTypeName[obj_QTQKJJF.persons[i].depart-1] + "</td>"
				+  "<td class=\"normal_input\"><input id=\"" + ("jiajianfen_"+i) + "\" type=\"text\" size=\"5\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.persons[i].jiajianfen + "\" /></td>"
				+  "<td class=\"normal_input\"><input id=\"" + ("liyou_"+i) + "\" type=\"texteara\" size=\"80\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.persons[i].liyou + "\" /></td></tr>\n";
	}
	strHTML += "<tr><td>" + arrDepartName[obj_QTQKJJF.bmjjf.name-1] + "</td><td></td>"
			+  "<td class=\"normal_input\"><input id=\"" + ("bmjjf") + "\" type=\"text\" size=\"5\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.bmjjf.jiajianfen + "\" /></td>"
				+  "<td class=\"normal_input\"><input id=\"" + ("liyou") + "\" type=\"texteara\" size=\"80\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.bmjjf.liyou + "\" /></td></tr>\n";
	
	strHTML += "</table>";
	
	strHTML += "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	

	
	GetObjById("show_more").innerHTML = strHTML;
	
	if(obj_QTQKJJF.status == 0)//可填写状态
	{
		for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
		{
			var jjfId = "jiajianfen_"+i;//加减分Id
			var liyouId = "liyou_"+i;//理由Id
			GetObjById(jjfId).onchange = function(e)
			{
				jjfId = GetId(e);
				var iJjf = jjfId.split("_");
				obj_QTQKJJF.persons[iJjf[1]].jiajianfen = this.value;
			}
			GetObjById(liyouId).onchange = function(e)
			{
				liyouId = GetId(e);
				var iLiyou = liyouId.split("_");
				if( !CheckLegalStr(this.value) )
				{
					this.value = "";
					alert("您输入有非法字段，请重新输入");					
				}
				obj_QTQKJJF.persons[iLiyou[1]].liyou = this.value;
			}
		}
		GetObjById("bmjjf").onchange = function()
		{
			obj_QTQKJJF.bmjjf.jiajianfen = this.value;
		}
		GetObjById("liyou").onchange = function()
		{
			if( !CheckLegalStr(this.value) )
			{
				this.value = "";
				alert("您输入有非法字段，请重新输入");					
			}
			obj_QTQKJJF.bmjjf.liyou = this.value;
		}
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
			{
				var jjfId = "jiajianfen_"+i;//加减分Id
				var liyouId = "liyou_"+i;//理由Id
				if(GetObjById(jjfId).value == "")
					return false;
				if(GetObjById(liyouId).value == "")
					return false;
			}
			if(GetObjById("bmjjf").value == "")
				return false;
			if(GetObjById("liyou").value == "")
				return false;
			
			return true;
		}
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("您还未完成，请填完再提交");
			}
			else if (POST_QTQKJJF(obj_QTQKJJF)) 
			{
				alert("提交成功！");
				GetObjById("show_more").innerHTML = "";
			} 
			else 
			{
				alert("*提交失败，请再提交");
			}
		}
	}
	else//不可填写状态
	{
		for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
		{
			var jjfId = "jiajianfen_"+i;//加减分Id
			var liyouId = "liyou_"+i;//理由Id
			GetObjById(jjfId).readOnly = true;
			GetObjById(liyouId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//优秀评定限制表
function Show_YXPDXZ(obj_YXPDXZ,post_func)
{
	console.log(obj_YXPDXZ);
	var strHTML = "<br /><h2>各部门部长和干事优秀评定限制</h2>";
	
	for(var i = 0; i < obj_YXPDXZ.arrDepart.length; ++i)
	{
		strHTML += "<h3>" + arrDepartName[obj_YXPDXZ.arrDepart[i].depart-1] + "</h3>"
				+  "<label><input type=\"checkbox\" id=\"" + ("quanxuan_"+i) + "\" />全选</label><br />"; 
		
		for(var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j)
		{
			if(j%5 == 0)
				strHTML += "<br />";
			strHTML += "<label>"
					+  "<input type=\"checkbox\" id=\"" + ("xuanze_"+i+"_"+j) + "\" />" + obj_YXPDXZ.arrDepart[i].arrPersons[j].name
					+  "</label>"; 
			strHTML += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
		}
	}
	
	strHTML += "<br /><br /><h2>部门优秀评定限制</h2>";
	strHTML += "<label><input type=\"checkbox\" id=\"" + ("quanxuan") + "\" />全选</label><br />"; 
	for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
	{
		if(i%5 == 0)
			strHTML += "<br />";
		strHTML += "<label>"
				+  "<input type=\"checkbox\" id=\"" + ("xuanze_"+i) + "\" />" + arrDepartName[obj_YXPDXZ.arrBMPD[i].depart-1]
				+  "</label>"; 
		strHTML += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	}
	
	strHTML += "<br /><input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
	
	GetObjById("show_more").innerHTML = strHTML;
	
	
	if (obj_YXPDXZ.status == 0) //可填写状态
	{
		var iChoose = new Array();//记录选中的个数
		for (var i = 0; i < obj_YXPDXZ.arrDepart.length; ++i) 
		{
			var isAllChoose = true; //标志是否全选中
			iChoose[i] = 0;//new Array();
			for (var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j) 
			{
				var xuanzeId = "xuanze_" + i + "_" + j;
				//GetObjById(xuanzeId).checked = obj_YXPDXZ.arrDepart[i].arrPersons[j].check;
				GetObjById(xuanzeId).checked=parseInt(obj_YXPDXZ.arrDepart[i].arrPersons[j].check);
				
				if (GetObjById(xuanzeId).checked == false)
					isAllChoose = false;
				else
					iChoose[i]++;

				GetObjById(xuanzeId).onclick = function (e) 
				{
					xuanzeId = GetId(e);
					var arr = xuanzeId.split("_");
					obj_YXPDXZ.arrDepart[arr[1]].arrPersons[arr[2]].check = this.checked? 1:0;
					if(this.checked == false)
					{
						GetObjById("quanxuan_"+arr[1]).checked = false;
						iChoose[arr[1]]--;
					}
					else
					{
						iChoose[arr[1]]++;
						if(iChoose[arr[1]] == obj_YXPDXZ.arrDepart[arr[1]].arrPersons.length)
							GetObjById("quanxuan_"+arr[1]).checked = true;
					}
				}
			}

			var quanxuanId = "quanxuan_" + i;
			if (isAllChoose == true)
			{
				GetObjById(quanxuanId).checked = true;
			}
			GetObjById(quanxuanId).onclick = function (e) 
			{
				quanxuanId = GetId(e);
				var arr = quanxuanId.split("_");
				for (var k = 0; k < obj_YXPDXZ.arrDepart[arr[1]].arrPersons.length; ++k) 
				{
					if(this.checked)
					{
						obj_YXPDXZ.arrDepart[arr[1]].arrPersons[k].check = 1;
						GetObjById(("xuanze_" + arr[1] + "_" + k)).checked = this.checked;
					}
					else
					{
						obj_YXPDXZ.arrDepart[arr[1]].arrPersons[k].check = 0;
						GetObjById(("xuanze_" + arr[1] + "_" + k)).checked = this.checked;
					}
					
				}
			}
		}
		
		var iChooseDepart = 0;//记录选择的部门的个数
		for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
		{
			if(obj_YXPDXZ.arrBMPD[i].check == 1)
				iChooseDepart++;
			var xuanzeId = "xuanze_"+i;
			if(obj_YXPDXZ.arrBMPD[i].check == 1)
				GetObjById(xuanzeId).checked = true;
			else
				GetObjById(xuanzeId).checked = false;
			
			GetObjById(xuanzeId).onclick = function(e)
			{
				var xuanzeId = GetId(e);
				var arr = xuanzeId.split("_");
				if(this.checked == true)
				{
					iChooseDepart++;
					obj_YXPDXZ.arrBMPD[arr[1]].check = 1;
					if(iChooseDepart == obj_YXPDXZ.arrBMPD.length)
						GetObjById("quanxuan").checked = true;
				}
				else
				{
					iChooseDepart--;
					GetObjById("quanxuan").checked = false;
					obj_YXPDXZ.arrBMPD[arr[1]].check = 0;
				}
				
			}
		}
		
		if(iChooseDepart == obj_YXPDXZ.arrBMPD.length)
			GetObjById("quanxuan").checked = true;
		
		GetObjById("quanxuan").onclick = function(e)
		{
		
			for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
			{
				GetObjById(("xuanze_"+i)).checked = this.checked;
				
				obj_YXPDXZ.arrBMPD[i].check = this.checked? 1:0;
			}
		}
		
		GetObjById("submit").onclick = function () 
		{
            post_func(obj_YXPDXZ,posting_func,submit_feedback);
		}
	}
	else//不可填写状态
	{
		for (var i = 0; i < obj_YXPDXZ.arrDepart.length; ++i) 
		{
			var isAllChoose = true; //标志是否全选中
			for (var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j) 
			{
				var xuanzeId = "xuanze_" + i + "_" + j;
				GetObjById(xuanzeId).checked = parseInt(obj_YXPDXZ.arrDepart[i].arrPersons[j].check);
				GetObjById(xuanzeId).disabled = "disabled";
				
				if (GetObjById(xuanzeId).checked == false)
					isAllChoose = false;
			}
			
			var quanxuanId = "quanxuan_" + i;
			if (isAllChoose == true)
			{
				GetObjById(quanxuanId).checked = true;
			}
			GetObjById(quanxuanId).disabled = "disabled";
		}
		
		var iChooseDepart = 0;
		for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
		{
			if(obj_YXPDXZ.arrBMPD[i].check == true)
				iChooseDepart++;
			var xuanzeId = "xuanze_"+i;
			GetObjById(xuanzeId).checked = parseInt(obj_YXPDXZ.arrBMPD[i].check);
			GetObjById(xuanzeId).disabled = "disabled";
		}
		if(iChooseDepart == obj_YXPDXZ.arrBMPD.length)
		{
			GetObjById("quanxuan").checked = true;
		}
		GetObjById("quanxuan").disabled = "disabled";
		
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function()
		{
			confirm_feedback(true);
		}
	}
}

//查看未完成情况
function Show_CKWWCQK(obj_CKWWCQK,post_func)
{
	var strHtml=new String();
	strHtml+="<h3>干事自评表未填写</h3>\n"
			+"<p class=\"fill_in_tips\">未填写干事自评表的名单</p>\n"
			+"<table class=\"erjibiao\" >"
			+"<tr><td>干事姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td><td>姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrGSZP.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrGSZP[i].name+"</td>"
				+"<td>"+arrDepartName[obj_CKWWCQK.arrGSZP[i].depart-1]+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrGSZP[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusGSZP==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	strHtml+="</table><h3>部长自评表未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写部长自评表的名单</p>\n"
			+"<table class=\"erjibiao\">"
			+"<tr><td>部长姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td><td>姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrBZZP.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrBZZP[i].name+"</td>"
				+"<td>"+arrDepartName[obj_CKWWCQK.arrBZZP[i].depart-1]+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrBZZP[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusGSZP==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	strHtml+="</table><h3>干事考核表未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写干事考核表的名单</p>\n"
			+"<table class=\"erjibiao\">"
			+"<tr><td>部长姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td><td>部长姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrGSKH.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrGSKH[i].name+"</td>"
				+"<td>"+arrDepartName[obj_CKWWCQK.arrGSKH[i].depart-1]+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrGSKH[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusGSZP==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	
	strHtml+="</table><h3>部长考核表未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写部长考核表的名单</p>"
			+"<table class=\"erjibiao\">"
			+"<tr><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrBZKH.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrBZKH[i].name+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrBZKH[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusGSZP==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	strHtml+="</table><h3>部门考核未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写部门考核表的名单</p>"
			+"<table class=\"erjibiao\">"
			+"<tr><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrBMKH.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrBMKH[i].name+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrBMKH[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusGSZP==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}	
	strHtml+="</table><input type=\"button\" value=\"确定\" id=\"submit\"  class=\"perf_button\" />\n"	
	GetObjById("show_more").innerHTML =strHtml;
	GetObjById("submit").onclick=function()
	{
		confirm_feedback(true);
	}
	
}

//各种违纪表
function Show_WJDJ(iType,objWJDJ,post_func)
{
    var strHTML=new String();
    for(var i=0;i<objWJDJ.arrWJDJB.length;i++)
    {
        strHTML+="<h3>"+arrDepartName[objWJDJ.arrWJDJB[i].bm-1]+"</h3>"
        +"<p class=\"fill_in_tips\"><span class=\"fill_part\">填写指引:</span>"
        +"请填写"+arrDepartName[objWJDJ.arrWJDJB[i].bm-1]+"的违纪情况,多个理由请用'|'隔开"
        +"</p>"
        +"<h4>违纪扣分:</h4>"
        +"<input id=\"df_"+objWJDJ.arrWJDJB[i].bm+"\" class=\"perf_textarea\" type=\"text\" name=\"#\" size=\"10\" />"
        +"<h4>理由:</h4>"
        +"<textarea id=\"ly_"+objWJDJ.arrWJDJB[i].bm+"\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\"></textarea>";
    }
    strHTML+= "<br /><input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n";
    
    $("#show_more").hide().html(strHTML);
    
    //填充value绑定消息相应
    for(var i=0;i<objWJDJ.arrWJDJB.length;i++)
    {
        $("#df_"+objWJDJ.arrWJDJB[i].bm).val(objWJDJ.arrWJDJB[i].kf).change(
            function(){
                var val=$(this).val();
                var index=-1;
                var strID=new String($(this).attr("id"));
                strID=strID.replace("df_","");
                console.log(strID);
                //查找匹配索引
                for(var j=0;j<objWJDJ.arrWJDJB.length;j++)
                {
                    if(objWJDJ.arrWJDJB[j].bm==strID)//找到匹配部门
                    {
                        index=j;
                        break;
                    }
                }
                console.log(val);
                if(val<=0&&val>=-100)
                {
                    objWJDJ.arrWJDJB[j].kf=$(this).val();   
                }
                else
                {
                    alert("您填写的内容含有非法字符,请重新填写");
                    $(this).val(objWJDJ.arrWJDJB[index].kf);
                    if($(this).val()=="")
                    {
                        $(this).val("0");
                        objWJDJ.arrWJDJB[index].kf="0";
                    }
                }
            });
        $("#ly_"+objWJDJ.arrWJDJB[i].bm).val(objWJDJ.arrWJDJB[i].ly).change(
            function(){
                var val=$(this).val();
                var index=-1;
                var strID=new String($(this).attr("id"));
                strID=strID.replace("ly_","");
                console.log(strID);
                //查找匹配索引
                for(var j=0;j<objWJDJ.arrWJDJB.length;j++)
                {
                    if(objWJDJ.arrWJDJB[j].bm==strID)
                    {
                        index=j;
                        break;
                    }
                }
                
                if(CheckLegalStr(val))
                {
                    
                    objWJDJ.arrWJDJB[index].ly=$(this).val();
                }
                else 
                {
                    alert("您填写的内容含有非法字符,请重新填写");
                    $(this).val(objWJDJ.arrWJDJB[index].ly);
                    if($(this).val()=="")
                    {
                        $(this).val("null");
                        objWJDJ.arrWJDJB[index].ly="null";
                    }
                }
            });
    }
    if(objWJDJ.status==0)
    {
    
        $("#submit").click(function(){
            post_func(objWJDJ,posting_func,submit_feedback);
        });
    }
    else
    {
        $("#submit").val("确定").click(function(){
            confirm_feedback(true);
        });
        
        $("#show_more input,#show_more textarea").attr("readonly",true);
        
    }
    //其他操作
    $("h4").css("margin","0");
    
    $("#show_more").slideDown();            

}

