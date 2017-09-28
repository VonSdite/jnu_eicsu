//
var year;//年份
var month;//月份

var arrDepartName=new Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","JDC","组织部","文娱部","公关部","心理服务部","主席团");
var arrTypeName=new Array("干事","人力干事","部长级","主席团");
var arrWeiJiBiao=new Array("秘书处制度违纪登记表","人力资源部制度违纪登记表","宣传部制度违纪登记表","信息编辑部制度违纪登记表","公关部制度违纪登记表","司仪礼仪队违纪登记表");
var afxTimeInfo;  
var afxUserTableLst;
var afxCurTableIdx=0;

function debug()
{
    return false;
}

function errmsg()
{
    if(!debug())
    {
        alert("AJAX通信错误,请与管理员联系");
        //throw "ajax error";
    }
}

function GetObjById(strId)//根据ID获取对象
{
    return document.getElementById(strId);
}


function GetId(e)//根据鼠标处理事件获取鼠标活动当前的ID
{
    e=e||event;
    var tag=e.srcElement||e.target;
    return tag.id;
}

function ajaxcheck()
{
    try{
        if(debug())
            throw("ajax");
    //写一段代码测试ajax通信是否正常
        var jsonPOST={
        "chstr":"中文",};
        //发送这个字符串,然后后台返回这个字符串到jsonGet,结构一样
        if(jsonPOST.chstr!="中文")
        {
            alert("与服务器通信错误,请联系你的系统管理员");
            throw("ajax error");//抛出错误,干掉js
        }
    }
    catch(err)
    {
        console.log("ajaxcheck:"+err);
        errmsg();
        return true;
    }
}
     
function CheckLegalStr(strCheck)//检查输入的字符串是否含有非法字段
{
    strCheck.toLowerCase();
    var re = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    if(re.test(strCheck))
        return false;
    else
        return true;
}

//获取时间
function Get_Time()
{
    try{
        if(debug())
        {
            throw("ajax");
        }
        //ajax获取时间代码
        //填充一个json_Get_Times,格式如下:
            var obj;
            $.ajax({
                url:URL+"/sendTime",
                data:{"year":year,"month":month},
                async:false,
                dataType:"json",
                type:"POST",
                success:function(result){obj=result;}
            });
            json_Get_Times=obj;
            console.log("获取时间");
            console.log(obj);
    }
    catch(err){
        var json_Get_Times = 
        {
            
            "evaluation":
            [
                {"year":"2014", "month":"4"},
                {"year":"2014", "month":"5"},
                {"year":"2014", "month":"12"},
                {"year":"2014", "month":"1"},
                {"year":"2014", "month":"2"},
                {"year":"2014", "month":"3"},
                {"year":"2013", "month":"12"},
                {"year":"2013", "month":"6"},
                {"year":"2013", "month":"8"},
                {"year":"2012", "month":"3"},
                {"year":"2012", "month":"5"},
                
            ],
            "feedback":
            [
                {"year":"2014", "month":"4"},
                {"year":"2011", "month":"4"},
                {"year":"2014", "month":"5"},
                
            ],
            "control":
            [
                {"year":"2014", "month":"4"},
                {"year":"2010", "month":"4"},
                {"year":"2010", "month":"2"},
                {"year":"2014", "month":"5"},
                
            ],
            "excellent":
            [
                {"year":"2014", "month":"4"},
                {"year":"2015", "month":"1"},
                {"year":"2014", "month":"5"},
                
            ],
        };
        errmsg();
    }//catch
    //排序谓词
    function ymcmp(lhs,rhs)
    {
        if( (lhs.year*12+lhs.month)> (rhs.year*12+rhs.month))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    //格式化年月格式
    function ymformat(arrym)
    {
        var ret=new Array();
        for(var i=0;i<arrym.length;++i)
        {
            if((function(yhs){
                for(var j=0;j<ret.length;j++)
                {
                    if(ret[j].year==yhs)
                    {
                        return true;
                    }
                }
                return false;
            })(arrym[i].year)==false)
            {
                ret.push({"year":arrym[i].year,"arrMonth":(function(){
                    var arrm=new Array();
                    for(var j=0;j<arrym.length;j++)
                    {
                        if(arrym[j].year==arrym[i].year)
                        {
                            arrm.push(arrym[j].month);
                        }
                    }
                    return arrm;
                })()});
            }
        }
        return ret;
    }
            
    try{json_Get_Times.evaluation.sort(ymcmp);}catch(e){json_Get_Times.evaluation=new Array();}  
    try{json_Get_Times.feedback.sort(ymcmp);}catch(e){json_Get_Times.feedback=new Array();}  
    try{json_Get_Times.control.sort(ymcmp);}catch(e){json_Get_Times.control=new Array();}  
    try{json_Get_Times.excellent.sort(ymcmp);}catch(e){json_Get_Times.excellent=new Array();}  
    
    var Times = 
    {
        "evaluation":ymformat(json_Get_Times.evaluation),
        "feedback":ymformat(json_Get_Times.feedback),
        "control":ymformat(json_Get_Times.control),
        "excellent":ymformat(json_Get_Times.excellent),
        /*[
            {
                "year":
                "arrMonth":
                [
                
                ],
            },
        ],*/
        
    };
    return Times;
}

//把字符串的一些特殊字符转化再存入数据库
function TranStr_Post(str)
{
    //&hh&表示换行符，&kg&表示空格符
    str = str.toString().replace(new RegExp('([\n])', 'g'), "&hh&");//转换换行
    str = str.toString().replace(new RegExp(" ", 'g'), "&kg&");//转换空格
    return str
}


//把从数据库获取的字符串转化后再显示
function TranStr_Get(str)
{
    str = str.toString().replace(new RegExp("&hh&", 'g'), "\n");//转换为换行符，显示换行
    str = str.toString().replace(new RegExp("&kg&", 'g'), " ");//转换为空格符，显示空格
    return str;
}


//部门转为对应的数字
function TranTextToDig(text)
{
    arrDepartName.indexOf(text);
}


//对应的数字转成相应的部门
function TranDigToText(iBuMen)
{
    
    var text = arrDepartName[iBuMen-1];
    return text;
}


//获取当前用户需要的各种考核表
function GetTable()
{
    try{
         if(debug())
            throw("ajax");
        //测试用数据
        //四种用户：YBGS RLGS BZJ ZXT
        //GetObjById("login_info_user_id").text;
        //请求数据
    
        var obj;
        $.ajax({
            url:URL+"/funcqqlx",//请求用户类型
            data:{"year":year,"month":month},
            async:false,
            dataType:"json",
            type:"POST",
            success:function(result){obj=result;}
        });     
        var arr=obj;
        
    }
    catch(err){
    
        var arr=
        {
          "account":"2012052308",
          "type":"YBGS",
          "weiji":[{"table":"0"},{"table":"1"},{"table":"2"},{"table":"3"},{"table":"4"},{"table":"5"}],
        };
        errmsg();
    }
    
    /*
    var arrCeShiTable = new Array("干事自评表","干事考核反馈表","跟进部门出勤统计表","调研意见采纳表",
                              "整体考核结果反馈表","部长自评表","干事考核表","部长反馈表",
                              "部长考核表","部门考核表","优秀部长评定表","主席团反馈表", 
                              "考核进程控制表",  "其他情况加减分", "优秀评定限制表");
    var arrYBGS = new Array("干事自评表","干事考核反馈表");
    var arrRLGS = new Array("干事自评表","干事考核反馈表","跟进部门出勤统计表","调研意见采纳表","整体考核结果反馈表");
    var arrBZJ = new Array("整体考核结果反馈表","部长自评表","干事考核表","部长反馈表");
    var arrZXT = new Array("部长考核表","部门考核表","优秀部长评定表","主席团反馈表","整体考核结果反馈表");
    */
    
    var arrCeShiTable = new Array("干事自评表","干事考核反馈表","跟进部门出勤统计表","调研意见采纳表",
                              "整体考核结果反馈表","部长自评表","干事考核表","部长反馈表",
                              "部长考核表","部门考核表","优秀部长评定表","主席团反馈表", "考核进程控制表","其他情况加减分",
                              "优秀评定限制表","查看未完成情况");
    
    var arrYBGS = new Array("干事自评表","干事考核反馈表");
    var arrRLGS = new Array("干事自评表","跟进部门出勤统计表","其他情况加减分","调研意见采纳表","干事考核反馈表","整体考核结果反馈表");
    var arrRLBZ = new Array("查看未完成情况","优秀评定限制表","部长自评表","干事考核表","整体考核结果反馈表","部长反馈表","考核进程控制表");
    var arrBZJ = new Array("部长自评表","干事考核表","部长反馈表","整体考核结果反馈表");
    var arrZXT = new Array("部长考核表","部门考核表","优秀部长评定表","整体考核结果反馈表","主席团反馈表");
    
    var arrWeiJi=new Array();
    for(var i=0;i<arr.weiji.length;++i)
    {
        arrWeiJi.push(arrWeiJiBiao[arr.weiji[i].table]);
    }
    if(debug())
    {
        //console.log(arrCeShiTable.concat(arrWeiJi));
        return arrCeShiTable.concat(arrWeiJi);
    }
    else
    {
        switch(arr.type)
        {
            case "BZJ": 
                afxUserTableLst=arrBZJ.concat(arrWeiJi);
                return afxUserTableLst;
            case "YBGS": 
                afxUserTableLst=arrYBGS.concat(arrWeiJi);
                return afxUserTableLst;
            case "RLGS": 
                afxUserTableLst=arrRLGS.concat(arrWeiJi);
                return afxUserTableLst;
            case "ZXT": 
                afxUserTableLst=arrZXT.concat(arrWeiJi);
                return afxUserTableLst;
            case "RLBZ":
                afxUserTableLst=arrRLBZ.concat(arrWeiJi);
                return afxUserTableLst;
        };
    }
    
}

//初始化绩效考核系统
function PerformInit()
{
    console.log('start init perform system');
    ajaxcheck();
    AutoHideHead();
    afxTimeInfo=Get_Time();
    var arrTable = GetTable();
    $("#table_name").html(arrTable[0]);
        
    ActiveTableButton();
    SelectTime(0);
}



//根据选择时间显示内容
function SelectTime(iCurShowFunction)
{
    
    var btnText = afxUserTableLst[iCurShowFunction];
    
    function TimeType(btnText)
    {
        switch(btnText)
        {
            case "干事自评表":           
            case "跟进部门出勤统计表":
            case "调研意见采纳表":         
            case "部长自评表":
            case "干事考核表":           
            case "部长考核表":
            case "部门考核表":
            case "优秀评定限制表":                     
            case "其他情况加减分":
            case "秘书处制度违纪登记表":
            case "人力资源部制度违纪登记表":
            case "宣传部制度违纪登记表":
            case "信息编辑部制度违纪登记表":
            case "公关部制度违纪登记表":
            case "司仪礼仪队违纪登记表":
            case "查看未完成情况":
                return "evaluation";
            
            case "主席团反馈表":  
            case "部长反馈表":
            case "整体考核结果反馈表":
            case "干事考核反馈表":
                return "feedback"
            
            case "考核进程控制表":           
                return "control";

            case "优秀部长评定表":
                return "excellent";
        }
    }
    var timeType = TimeType(btnText);
    var time=afxTimeInfo[timeType];
    console.log(time);
    $("#year").html("");
    $("#month").html("");
    
    for(var i=0;i<time.length;i++)
    {
        $("<option></option>",{
            "value":time[i].year,"text":time[i].year,
        }).appendTo($("#year"));
    }
    
    try{
        //尝试设置数组的第一个值为默认年份
        $("#year").val(time[0].year);
        for(var i=0;i<time[0].arrMonth.length;i++)
        {
            $("<option></option>",{
                "value":time[0].arrMonth[i],"text":time[0].arrMonth[i],
            }).appendTo($("#month"));
        }
        try{
            //尝试设置月份
            $("#month").val(time[0].arrMonth[0]);
        }catch(errmonth){
            console.log("默认月份设置出错,请注意!");
        }
    }catch(erryear){
        console.log("默认年份出错,请注意!");
    }
    
    $("#year").change(function(){
        $("#month").html("");
        btnx=afxUserTableLst[afxCurTableIdx];
        time=afxTimeInfo[TimeType(btnx)];
        var index=$(this).prop("selectedIndex");
        for(var i=0;i<time[index].arrMonth.length;i++)
        {
            $("<option></option>",{
                "value":time[index].arrMonth[i],"text":time[index].arrMonth[i],
            }).appendTo($("#month"));
        }
        try{
            //尝试设置默认月份
            $("#month").val(time[index].arrMonth[0]);
        }catch(errmonth){
             console.log("默认月份设置出错,请注意!");
        }
    });
    
    $("#OK_button").get()[0].onclick=function(){
        year=$("#year").val();
        month=$("#month").val();
        var arrShowFunc = ArrShowTable();
        console.log("执行第"+iCurShowFunction+"个函数");
        //各种回调
        var i = iCurShowFunction;
        var func_clj = arrShowFunc[i];
        //调用获取数据的函数, 获取数据的函数回调show, show回调发送数据的函数
        try{
            (function(){
                $("#show_more").html("").append(loadingElem());
                func_clj["get"](
                    func_clj["show"],
                    function(obj,start_func,success_func){
                        try{
                            start_func();
                            func_clj["post"](obj,success_func);
                        }catch(e){
                            console.log(e);
                        }
                        
                    });
            })();
        }catch(err){
            console.log(err);
        }
        //arrShowFunc[iCurShowFunction]();
        
    };  
}

function nullPostFunc(obj,start_func,success_func){success_func(true);}

function ArrShowTable()
{
    var arrTable = afxUserTableLst;
    var arrShowFunction = new Array();//存放显示各种表格函数的数组
    
    for(var i=0; i<arrTable.length; ++i)
    {
        switch(arrTable[i])
        {
            case "干事自评表":
            arrShowFunction.push({"show":Show_GSZP,"get":Get_GSZP,"post":Post_GSZP});
            break;
            case "干事考核反馈表":
            arrShowFunction.push({"show":Show_GSKHFK,"get":Get_GSKHFK,"post":nullPostFunc});
            break;
            case "跟进部门出勤统计表":
            arrShowFunction.push({"show":Show_GJBMCQTJ,"get":Get_GJBMCQTJ,"post":Post_GJBMCQTJ});
            break;
            case "调研意见采纳表":
            arrShowFunction.push({"show":Show_DYYJCN,"get":Get_DYYJCN,"post":Post_DYYJCN});
            break;
            case "整体考核结果反馈表":
            arrShowFunction.push({"show":Show_ZTKHJGFK,"get":Get_ZTKHJGFK,"post":nullPostFunc});
            break;
            case "部长自评表":
            arrShowFunction.push({"show":Show_BZZP,"get":Get_BZZP,"post":Post_BZZP});
            break;
            case "干事考核表":
            arrShowFunction.push({"show":Show_GSKH,"get":Get_GSKH,"post":Post_GSKH});
            break;
            case "部长反馈表":
            arrShowFunction.push({"show":Show_BZFK,"get":Get_BZFK,"post":nullPostFunc});
            break;
            case "部长考核表":
            arrShowFunction.push({"show":Show_BZKH,"get":Get_BZKH,"post":Post_BZKH});
            break;
            case "部门考核表":
            arrShowFunction.push({"show":Show_BMKH,"get":Get_BMKH,"post":Post_BMKH});
            break;
            case "优秀部长评定表":
            arrShowFunction.push({"show":Show_YXBZPD,"get":Get_YXBZPD,"post":Post_YXBZPD});
            break;
            case "主席团反馈表":
            arrShowFunction.push({"show":Show_ZXTFK,"get":Get_ZXTFK,"post":nullPostFunc});
            break;
            case "考核进程控制表":
            arrShowFunction.push({"show":Show_KHJCKZ,"get":Get_KHJCKZ,"post":Post_KHJCKZ});
            break;
            case "其他情况加减分":
            arrShowFunction.push({"show":Show_QTQKJJF,"get":Get_QTQKJJF,"post":POST_QTQKJJF});
            break;  
            case "优秀评定限制表":
            arrShowFunction.push({"show":Show_YXPDXZ,"get":Get_YXPDXZ,"post":Post_YXPDXZ});
            break;  
            case "查看未完成情况":
            arrShowFunction.push({"show":Show_CKWWCQK,"get":Get_CKWWCQK,"post":nullPostFunc});
            break;
            case "秘书处制度违纪登记表":
            arrShowFunction.push({
                "show":(function(obj,post_func){Show_WJDJ(0,obj,post_func);}),
                "get":(function(show_func,post_func){Get_WJDJ(0,show_func,post_func);}),
                "post":(function(obj,start_func,success_func){Post_WJDJ(obj,0,start_func,success_func);})
            });
            break;
            case "人力资源部制度违纪登记表":
            arrShowFunction.push({
                "show":(function(obj,post_func){Show_WJDJ(1,obj,post_func);}),
                "get":(function(show_func,post_func){Get_WJDJ(1,show_func,post_func);}),
                "post":(function(obj,start_func,success_func){Post_WJDJ(obj,1,start_func,success_func);})
            });
            break;
            case "宣传部制度违纪登记表":
            arrShowFunction.push({
                "show":(function(obj,post_func){Show_WJDJ(2,obj,post_func);}),
                "get":(function(show_func,post_func){Get_WJDJ(2,show_func,post_func);}),
                "post":(function(obj,start_func,success_func){Post_WJDJ(obj,2,start_func,success_func);})
            });
            break;
            case "信息编辑部制度违纪登记表":
            arrShowFunction.push({
                "show":(function(obj,post_func){Show_WJDJ(3,obj,post_func);}),
                "get":(function(show_func,post_func){Get_WJDJ(3,show_func,post_func);}),
                "post":(function(obj,start_func,success_func){Post_WJDJ(obj,3,start_func,success_func);})
            });
            break;
            case "公关部制度违纪登记表":
            arrShowFunction.push({
                "show":(function(obj,post_func){Show_WJDJ(4,obj,post_func);}),
                "get":(function(show_func,post_func){Get_WJDJ(4,show_func,post_func);}),
                "post":(function(obj,start_func,success_func){Post_WJDJ(obj,4,start_func,success_func);})
            });
            break;
            case "司仪礼仪队违纪登记表":
            arrShowFunction.push({
                "show":(function(obj,post_func){Show_WJDJ(5,obj,post_func);}),
                "get":(function(show_func,post_func){Get_WJDJ(5,show_func,post_func);}),
                "post":(function(obj,start_func,success_func){Post_WJDJ(obj,5,start_func,success_func);})
            });
            break;
        }
    }
    return arrShowFunction;
}

