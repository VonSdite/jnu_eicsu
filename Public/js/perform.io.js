
//干事自评表的考核项目和评分标准
function GSZP_BZ()
{
    function obj_GSZP()
    {   
        function obj_GZNL()
        {
            this.xm = "工作能力";   
            this.rowspan = 14;//跨行的数目
            /*
            function obj_GZNL()
            {
                this.bz = "工作量";
                this.a = "9-10.工作远多于部门内其他干事，需要较多时间完成";
                this.b = "7-8.工作与部门内其他干事差不多，在承受范围之内";
                this.c = "5-6.工作较部门内其他干事少，利用很少时间便可完成";
                this.d = "3-4.几乎没有工作";
            }
            */
            function obj_GZXL()
            {
                this.bz = "工作效率";
                this.a = "9-10.总能提早截止日期较多完成安排下去的任务";
                this.b = "7-8.能够按时完成安排下去的任务，踩着时间点完成";
                this.c = "5-6.要超时才能完成安排下去的任务";
                this.d = "3-4.无法完成安排下去的任务";
            }
            function obj_GZZS()
            {
                this.bz = "工作知识";
                this.a = "9-10.部长级讲过工作知识后各方面均能掌握，极为优秀";
                this.b = "7-8.部长级讲过工作知识后对工作了解较充分，能够理解，运用起来有点生疏";
                this.c = "5-6.部长级讲过工作知识后仍对工作不太了解，需要不断询问和他人不断提醒";
                this.d = "3-4.部长级讲过工作知识后对与工作有关的事情有很多都不了解，也不去询问";
            }
            function obj_YBCLNL()
            {
                this.bz = "应变处理能力";
                this.a = "9-10.遇到情况总能随机应变,首先想办法自己解决，不会立刻求助他人";
                this.b = "7-8.遇到情况一般先求助于他人，偶尔才自己想办法解决";
                this.c = "5-6.遇到情况总是首先求助于他人，不会自己想应变方法，但勉强能解决事情";
                this.d = "3-4.遇到情况不会随机应变，也不问其他人，总把事情搞砸";
            }
        
            this.arrObj = new Array(new obj_GZXL(), new obj_GZZS(),new obj_YBCLNL());
        }
        
        function obj_GZTD()
        {
            this.xm = "工作态度";   
            this.rowspan = 14;//跨行的数目
            function obj_JJX()
            {
                this.bz = "积极性";
                this.a = "9-10.主动向部长级要求工作，对工作充满热情";
                this.b = "7-8.能够接受部长级布置的任务，并有办好的愿望";
                this.c = "5-6.能够接受部长级安排的任务，但缺乏积极性，办事有点拖拉";
                this.d = "3-4.不领会部长级的安排的任务，需要部长级不断催促";
            }
            function obj_ZRG()
            {
                this.bz = "责任感";
                this.a = "9-10.对布置的工作能够极其认真的完成，犯错误能自觉主动对自己的行为及后果负责";
                this.b = "7-8.布置的任务能够完成，犯错在部长级监督下能对自己的行为后果负责";
                this.c = "5-6.布置的任务不一定能负责的完成，对于工作中的失误有时逃避或推卸责任";
                this.d = "3-4.布置的任务敷衍不负责，对于工作中的失误总是逃避或推卸责任";
            }
            function obj_JLX()
            {
                this.bz = "纪律性";
                this.a = "9-10.有良好的纪律意识，严格规范自身，不随意违反其他部门制度，工作作风比较严谨";
                this.b = "7-8.能履行职责，大体上能遵守各项规章制度，不服从命令的事少有发生";
                this.c = "5-6.偶尔会发生不守纪律的事情，但部长提醒后能够改正";
                this.d = "3-4.经常发生不守纪律的事，再三提醒下还会出现问题";
            }
        
            this.arrObj = new Array(new obj_JJX(), new obj_ZRG(), new obj_JLX());
        }
        
        function obj_GTNL()
        {
            this.xm = "沟通能力";
            this.rowspan = 14;//跨行的数目
            function obj_HZNL()
            {
                this.bz = "合作能力";
                this.a = "9-10.能够很好的与他人合作，能提出自己想法，发挥自己的作用，也能接受他人意见";
                this.b = "7-8.愿意与他人合作，但合作中能够相处愉快，但不太主动";
                this.c = "5-6.仅在必要时才与人合作，偶尔会有摩擦，勉强接受与自己不一致的意见";
                this.d = "3-4.排斥与他人合作，十分难以相处";
            }
            function obj_BDNL()
            {
                this.bz = "表达能力";
                this.a = "9-10.能够清晰地表达自己的观点，让别人乐于聆听和理解自己的想法";
                this.b = "7-8.能够表达自己的观点，但需要其他人稍作提示";
                this.c = "5-6.表达自己的观点时存在有人听不懂请求解释的情况，但能解释清楚";
                this.d = "3-4.表达自己观点时太含糊，别人完全听不懂，解释自己的观点时也不够清楚";
            }
            function obj_TDJS()
            {
                this.bz = "团队精神";
                this.a = "9-10.爱护团体，有强烈的团队精神，部门内有活动总是热情参与，也常协助其他同事";
                this.b = "7-8.比较爱护团体，能参与部门活动但偶尔会缺席，与其他同事感情良好";
                this.c = "5-6.团队精神欠缺，偶尔不愿意与部门一起活动，才与部门内其他成员沟通少";
                this.d = "3-4.脱离群众，排斥与部门一起活动，更愿意单独行动，必要时才与他人沟通";
            }
        
            this.arrObj = new Array(new obj_HZNL(), new obj_BDNL(), new obj_TDJS());
        }
        function obj_GRNL()
        {
            this.xm = "工作能力";   
            this.rowspan = 6;//跨行的数目
            
            /*
            function obj_XTNL()
            {
                this.bz = "协调能力";
                this.a = "9-10.能很好地协调本部门工作与其他工作，活动，学习，生活的关系，各方面均衡发展";
                this.b = "7-8.协调能力尚可，基本能完成学习与工作中的任务，但对两者都有点影响";
                this.c = "5-6.协调能力较差，难以兼顾学习、工作与生活，但仍愿意完成任务";
                this.d = "3-4.完全无法兼顾学习、工作与生活，严重影响到工作情绪";
            }
            
            function obj_ZWJDNL()
            {
                this.bz = "自我监督能力";
                this.a = "9-10.无论是否有人监督，都能一丝不苟完成任务，自我监督能力强";
                this.b = "7-8.有人在场时工作热情较高，无人监督时有松懈和下降，但基本维持在较好的状态";
                this.c = "5-6.在没有监督的机制下工作毫无主动性，不自觉";
                this.d = "3-4.不管是否有人监督对工作都缺乏认真度和自觉性";
            }*/
            this.arrObj = new Array(new obj_YBCLNL());
        }       
                
        this.arrObj_GSZP = new Array(new obj_GZNL(), new obj_GZTD(), 
                                    new obj_GTNL());
    }
    
    var objReturn = new obj_GSZP();
    return objReturn;
}


//获取干事自评表数据
function Get_GSZP(show_func,post_func)
{
    var objTemp =  GSZP_BZ();
    
    //从数据库回去数据。注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错
    //ajax请求，接收当前账号的个人信息
    try
    {
        if(debug())
            throw("ajax");
        $.ajax({
            url:URL+"/funcgszp",
            data:{"year":year,"month":month},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                console.log("获取干事自评表数据:\n");
                obj = new obj_GSZP(objTemp,result);
                show_func(obj,post_func);
            }
        });
       
    
    //这里进行请求，判断能否进行填表
    }
    catch(err)
    {
        console.log(err);
        errmsg();
    }

    //考核项目对象
    function obj_GSZP(objGSZPText,json_Get_GSZP)
    {       
        this.objGSZP_BZ = objGSZPText;

        
        
        this.status =  json_Get_GSZP.status;//0;//是否可以提交状态，“0”表示可以提交可以进行填写，“1”表示已提交不能再进行填写  

        this.arrDF = new Array(); //得分数组
        for (var i = 0; i < this.objGSZP_BZ.arrObj_GSZP.length; ++i) 
        {
            this.arrDF[i] = new Array();
            
            for (var j = 0; j <  this.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j) 
            {
                this.arrDF[i][j] = json_Get_GSZP.DF[i*3+j].df;
            }
        }
        
        this.zongfen = json_Get_GSZP.zongfen;//总分       
        
        this.zwpj = TranStr_Get(json_Get_GSZP.zwpj);//自我评价的评语
        this.bumenliuyan=TranStr_Get(json_Get_GSZP.bumenliuyan);//部门留言
        this.arrTongshiliuyan=new Array();
        for(var i=0;i<json_Get_GSZP.arrTongshiliuyan.length;i++)
        {
            this.arrTongshiliuyan[i]=json_Get_GSZP.arrTongshiliuyan[i];
            this.arrTongshiliuyan[i].liuyan=TranStr_Get(json_Get_GSZP.arrTongshiliuyan[i].liuyan);
        }
        if(this.zwpj == "")
        {
            this.zwpj = "请填写.....";
        }
        
        //同事
        function obj_TongShi(TongShi)
        {
            this.name = TongShi.name;
            this.account = TongShi.account;
        }
        this.arrTongShi = new Array();
        for(var i = 0; i < json_Get_GSZP.TongShi.length; ++i)
        {
            this.arrTongShi.push(new obj_TongShi(json_Get_GSZP.TongShi[i]));
        }
        
        function obj_TYGS()
        {
            this.tygs = json_Get_GSZP.TYGS.tygs;//推优干事
            this.account = json_Get_GSZP.TYGS.account;//学号
            this.tyly = TranStr_Get(json_Get_GSZP.TYGS.tyly);//推优理由
        }
        this.TYGS = new obj_TYGS();

        function DBZPJ(name, account, fs, pj) //对本部门部长评价
        {
            this.name = name;
            this.account = account;
            this.fs = fs;
            this.pj = TranStr_Get(pj);
        }
        this.arrDBZPJ = new Array();
        for(var i = 0; i < json_Get_GSZP.DBZPJ.length; ++i)
        {
            this.arrDBZPJ.push(new DBZPJ(json_Get_GSZP.DBZPJ[i].name,
                json_Get_GSZP.DBZPJ[i].account, 
                json_Get_GSZP.DBZPJ[i].fs, 
                TranStr_Get(json_Get_GSZP.DBZPJ[i].pj)));
        }
    }
    
}


//把干事自评表的填写的内容传给服务器
function Post_GSZP(obj_GSZP,success_func)//obj_GSZP为Get_GSZP()定义的对象
{
    //传数据回数据库，注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错
    var arrDFTemp = new Array();
    for (var i = 0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i) 
    {
        for (var j = 0; j <  obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j) 
        {
            arrDFTemp.push({"df":obj_GSZP.arrDF[i][j]});
        }
    }
    
    var arrTongShiTemp = new Array();//同事
    for(var i = 0; i < obj_GSZP.arrTongShi.length; ++i)
    {
        arrTongShiTemp.push({
            "name":obj_GSZP.arrTongShi[i].name, 
            "account":obj_GSZP.arrTongShi[i].account});
    }
    
    var arrDBZPJTemp = new Array();//对部长评价
    for(var i = 0; i < obj_GSZP.arrDBZPJ.length; ++i)
    {
        arrDBZPJTemp.push({
            "name":obj_GSZP.arrDBZPJ[i].name, 
            "account":obj_GSZP.arrDBZPJ[i].account ,
            "fs":obj_GSZP.arrDBZPJ[i].fs, 
            "pj":TranStr_Post(obj_GSZP.arrDBZPJ[i].pj)});
    }
    var arrTSLYTemp=new Array();//同事留言
    for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
    {
        strLiuyanTemp=obj_GSZP.arrTongshiliuyan[i].liuyan;
        if(strLiuyanTemp!=""&&strLiuyanTemp!=" "&&strLiuyanTemp!="无")//空的留言就不要了
        {
            arrTSLYTemp.push({"account":obj_GSZP.arrTongshiliuyan[i].account,"liuyan":TranStr_Post(strLiuyanTemp)});
        }
            
    }
    var json_Post_GSZP = 
    {
        "year" : year,
        "month" : month,
        "status" : obj_GSZP.status,
        "arrDF" : arrDFTemp,//得分数组
        
        "zongfen" : obj_GSZP.zongfen,
        "zwpj" : TranStr_Post(obj_GSZP.zwpj),
        "arrTongShi" : arrTongShiTemp,//同事数组
        "arrTongshiliuyan":arrTSLYTemp,//同事留言
        "bumenliuyan":TranStr_Post(obj_GSZP.bumenliuyan),//部门留言
        "TYGS" :{"tygs":obj_GSZP.TYGS.tygs , "account":obj_GSZP.TYGS.account , "tyly":TranStr_Post(obj_GSZP.TYGS.tyly)},
        "arrDBZPJ" : arrDBZPJTemp, //对本部门部长评价数组
        "hadSubmit":obj_GSZP.hadSubmit,//新增字段，1表示这是点提交按钮来的，所以数据库要存起来
        //如果数据库检查用户没填完必要部分，但是这个字段却显示提交过，则说明存入数据库时有错
    };
    console.log(json_Post_GSZP);
    
    try
    {
        if(debug())
            return true;
        //ajax请求，发送干事自评表
        var obj;
        $.ajax({
            url:URL+"/post_gszp",
            data:json_Post_GSZP,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=result;
                success_func(obj.flagCrud);
            }
        }); 
    }
    catch(err)
    {
        console.log(err);
    }
}


//获取干事考核反馈表数据
function Get_GSKHFK(show_func,post_func)
{

    function obj_GSKHFK(json_Get_GSKHFK) 
    {
        this.zongfen = json_Get_GSKHFK.zongfen; //总分
        this.paiming = json_Get_GSKHFK.paiming; //该月排名
        this.bmpm=json_Get_GSKHFK.bmpm;
        this.bmdf=json_Get_GSKHFK.bmdf;
        this.yxgs = json_Get_GSKHFK.yxgs; //该月优秀干事
        //得分细节
        this.arrDFXZ = new Array(
            json_Get_GSKHFK.DFXJ[0].a, 
            json_Get_GSKHFK.DFXJ[0].b, 
            json_Get_GSKHFK.DFXJ[0].c, 
            json_Get_GSKHFK.DFXJ[0].d, 
            json_Get_GSKHFK.DFXJ[0].e, 
            json_Get_GSKHFK.DFXJ[0].f, 
            json_Get_GSKHFK.DFXJ[0].g);
        
        this.zwpj = TranStr_Get(json_Get_GSKHFK.zwpj); //自我评价
        this.qtgspj = new Array();

        for(var i = 0; i < json_Get_GSKHFK.qtgspj.length; ++i)
        {
            var str = TranStr_Get(json_Get_GSKHFK.qtgspj[i].pj);
            this.qtgspj.push(str);      
        }
        
        this.bzpj = new Array();
        for(var i = 0; i < json_Get_GSKHFK.bzpj.length; ++i)
        {
            var str = TranStr_Get(json_Get_GSKHFK.bzpj[i].bzpj);
            this.bzpj.push(str);
        }
        this.liuyan=new Array();
        for(var i=0;i<json_Get_GSKHFK.liuyan.length;++i)
        {
            this.liuyan[i]={"liuyan":TranStr_Get(json_Get_GSKHFK.liuyan[i].liuyan)};
        }
        this.qitaliyou=TranStr_Get(json_Get_GSKHFK.qitaliyou);
    }

    try
    {
        if(debug())
        {
            throw("ajax");
        }  
        //ajax请求，接收当前账号的个人信息
        var obj;
        $.ajax({
            url:URL+"/jsgskh",
            data:{"year":year,"month":month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                console.log(result);
                obj=new obj_GSKHFK(result);
                show_func(obj,post_func);
            }
        });
    }
    catch(err)
    {
        
        var json_Get_GSKHFK = 
        {
            "zongfen":"100",//总分
            "paiming":"1",//该月排名
            "yxgs":"朱林杰",//该月优秀干事
            "bmpm":1,//所在部门的排名
            "bmdf":1024,//所在部门的得分
            "DFXJ"://得分细节
            [
                {"a":2, "b":4, "c":8, "d":16, "e":32, "f":64, "g":128},
            ],
            
            "zwpj":"自我感觉良好",//自我评价
            "qtgspj"://其他干事评价
            [
                {"pj":"还好"},
                {"pj":"还好"},
                {"pj":"还好"},
                {"pj":"还好"},
                {"pj":"还好"},
                {"pj":"还好"},
                {"pj":"还好"},
                {"pj":"还好"},
                {"pj":"还好"},
                
            ],
            "bzpj"://部长评价
            [
                {"bzpj":"不错"},
                {"bzpj":"不错"},
                {"bzpj":"不错"},
                {"bzpj":"不错"},
            ],
            "liuyan"://留言板部分
            [
                {"liuyan":"   "},
                {"liuyan":" "},
            ],
            "qitaliyou":"其他情况加减分表,如果该干事的加减分的理由",
        };
        errmsg();
    }
}


//获取跟进部门出勤统计表数据
function Get_GJBMCQTJ(show_func,post_func)
{
    try{
        if(debug())
            throw("ajax");
        
        //ajax请求，接收当前账号的个人信息

        $.ajax({
            url:URL+"/jsgjbmcqtj",
            data:{"year":year,"month":month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                console.log(result);
                show_func(result,post_func);
            }
        });
    }catch(err){  
        errmsg();
        show_func([],post_func);
    }
        
}


//把跟进部门统计表填写的内容传给服务器
function Post_GJBMCQTJ(obj_GJBMCQTJ,success_func)//obj_GJBMCQTJ为Get_GJBMCQTJ()定义的对象
{
    //服务器成功接收信息，则返回true，否则返回false
    try
    {
        if(debug())
        {
            return true;
        }
        //ajax请求，发送部长自评表
        var obj;
        console.log(obj_GJBMCQTJ);
        $.ajax({
            url:URL+"/post_gjbmcqtj",
            data:{
                "year":year,
                "month":month,
                "chuqinarr":obj_GJBMCQTJ,
            },
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                success_func(result['flagCrud']);
            }
        });
    }
    catch(err)
    {   
       success_func(false);       
    }
}


//获取调研意见采纳表数据
function Get_DYYJCN(show_func,post_func)
{
    function obj_DYYJCN(json_obj_DYYJCN)
    {
        this.status = json_obj_DYYJCN.status;//是否为课填写提交状态
        this.bmsm = json_obj_DYYJCN.bmsm;//部门数目
        
        function obj_BM(bmmz, bmrs, arrCNJF) //
        {
            this.bmmz = bmmz;//部门名字
            this.bmrs = bmrs; //部门人数
            function obj_CNJF(name, account, jiafen) //每个人的名字和采纳加分组成一个子对象
            {
                this.name = name; //名字
                this.account = account
                this.jiafen = jiafen; //采纳加分
            }
            this.arrObjCNJF = new Array(); //子对象数组
            for (var j = 0; j < this.bmrs; ++j) 
            {
                var objTemp1 = new obj_CNJF(arrCNJF[j].name, arrCNJF[j].account, arrCNJF[j].jiafen);
                this.arrObjCNJF.push(objTemp1);
            }
        }
        
        this.arrObjBM = new Array();
        for(var i = 0; i < json_obj_DYYJCN.arrBM.length; ++i)
        {
            var objTemp = new obj_BM(
                json_obj_DYYJCN.arrBM[i].bmmz, 
                json_obj_DYYJCN.arrBM[i].arrCNJF.length, 
                json_obj_DYYJCN.arrBM[i].arrCNJF);
            this.arrObjBM.push(objTemp);
        }
    }

    try
    {
        if(debug())
        {
            throw("ajax");
        }
        //ajax请求，接收当前账号的个人信息
        
        var obj;
        $.ajax({
            url:URL+"/jsdyyjcn",
            data:{"year":year,"month":month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj = new obj_DYYJCN(result);
                show_func(obj,post_func);
            }
        }); 

    }
    catch(err)
    {

        errmsg();
    }
}


//把调研意见采纳表的填写的内容传给服务器
function Post_DYYJCN(obj_DYYJCN,success_func)//obj_DYYJCN为Get_DYYJCN()定义的对象
{
    //注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错
    var _arrBM = new Array();
    for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
    {   
        var _arrCNJF = new Array();
        for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
        {
            _arrCNJF.push({
                "name":obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name, 
                "account":obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].account, 
                "jiafen":obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen});
        }
        _arrBM.push({"bmmz":obj_DYYJCN.arrObjBM[i].bmmz, "bmrs":obj_DYYJCN.arrObjBM[i].bmrs, "arrCNJF":_arrCNJF});
    }
    
    var json_Post_DYYJCN = 
    {
        "year":year,
        "month":month,
        "status":obj_DYYJCN.status,
        "bmsm":obj_DYYJCN.bmsm,
        "arrBM": _arrBM,
    };
    try{
        if(debug())
        {
            return true;
        }
        
        //ajax请求
        var obj;
        $.ajax({
            url:URL+"/post_dyyjcn",
            data:json_Post_DYYJCN,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                success_func(result.flagCrud);
            }
        });
        
    }
    catch(err){success_func(false);}
}


//获取整体考核结果反馈表数据
function Get_ZTKHJGFK(show_func,post_func)
{
    function obj_ZTKHJGFK(json_Get_ZTKHJGFK)
    {

        function obj_YXBM(bm, df)//优秀部门
        {
            this.bm = arrDepartName[bm-1];//部门名字
            this.df = df;//得分
        }
        this.arrObjYXBM = new Array();//保存优秀部门的数组
        for(var i = 0; i < json_Get_ZTKHJGFK.arrYXBM.length; ++i)
        {
            this.arrObjYXBM.push(new obj_YXBM(json_Get_ZTKHJGFK.arrYXBM[i].bm, json_Get_ZTKHJGFK.arrYXBM[i].df));
        }
        
        // Anqur
        function obj_YXBZ(bzmz, account, ssbm, df, rank, ps)//优秀部长
        {
            this.bzmz = bzmz;//部长名字
            this.account = account;//学号
            this.ssbm = arrDepartName[ssbm-1];//所属部门
            this.df = df;//得分
            this.rank = rank;//排名
            this.ps = ps;//票数
        }
        this.arrObjYXBZ = new Array();//保存优秀部长的数组
        for(var i = 0; i < json_Get_ZTKHJGFK.arrYXBZ.length; ++i)
        {
            // Anqur
            this.arrObjYXBZ.push(new obj_YXBZ(json_Get_ZTKHJGFK.arrYXBZ[i].bm, 
                json_Get_ZTKHJGFK.arrYXBZ[i].account, 
                json_Get_ZTKHJGFK.arrYXBZ[i].ssbm, 
                json_Get_ZTKHJGFK.arrYXBZ[i].df, 
                json_Get_ZTKHJGFK.arrYXBZ[i].rank, 
                json_Get_ZTKHJGFK.arrYXBZ[i].ps));
        }
        
        
        function obj_YXGS(BM)//各部门优秀干事
        {
            this.bm = arrDepartName[BM.bm-1];//部门
            function obj_GBMYXGS(GS)//一个部门优秀干事
            {
                this.name = GS.name;//优秀干事名字
                this.account = GS.account;//学号
                this.df = GS.df;//得分
                if(GS.ydyxgs == 1)//是否为月度优秀干事
                    this.ydyxgs = "月度优秀干事";
                else
                    this.ydyxgs = "";
            }
            this.arrObjGBMYXGS = new Array();//保存一个部门优秀干事的数组
            for(var i = 0; i < BM.GS.length; ++i)
            {
                this.arrObjGBMYXGS.push(new obj_GBMYXGS(BM.GS[i]));
            }
        }
        this.arrObjYXGS = new Array();//保存多个部门优秀干事的数组
        for(var i = 0; i < json_Get_ZTKHJGFK.YXGS.arrBM.length; ++i)
        {
            this.arrObjYXGS.push(new obj_YXGS(json_Get_ZTKHJGFK.YXGS.arrBM[i]));
        }
        
        function obj_WDJDRY(BM)//外调较多人员
        {
            this.bm = arrDepartName[BM.bm-1];//部门
            function obj_GBMWDJDRY(GS)//一个部门外调较多的干事
            {
                this.name = GS.name;//外调干事名字
                this.account = GS.account;//学号
                this.wdcs = GS.wdcs;//外调次数
            }
            this.arrObjGBMWDJDRY = new Array();//保存一个部门w外调较多干事的数组
            for(var i = 0; i < BM.GS.length; ++i)
            {
                this.arrObjGBMWDJDRY.push(new obj_GBMWDJDRY(BM.GS[i]));
            }
        }
        this.arrObjWDJDRY = new Array();//保存多个部门外调较多干事的数组
        for(var i = 0; i < json_Get_ZTKHJGFK.WDJDRY.arrBM.length; ++i)
        {
            this.arrObjWDJDRY.push(new obj_WDJDRY(json_Get_ZTKHJGFK.WDJDRY.arrBM[i]));
        }       
    }
    try{
        if(debug())
            throw("ajax");
         
        //ajax请求，接收当前账号的个人信息
        
        var obj;
        $.ajax({
            url:URL+"/jsztkhjgfk",
            data:{"year":year,"month":month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=new obj_ZTKHJGFK(result);
                show_func(obj,post_func);
            }
        });     
    }
    catch(err)
    {   
        errmsg();
    }
}


//部长自评表的考核项目和评分标准
function BZZP_BZ()
{
    function obj_BZZP()
    {   
        function obj_GZQK()
        {
            this.xm = "工作情况";   
            this.rowspan =14;//跨行的数目
            function obj_GZL()
            {
                this.bz = "工作量";
                this.a = "9-10.工作远多于其他部门或本部门内其他部长，难度较大，需要较多时间完成";
                this.b = "7-8.工作与部门内其他部长相当，在承受范围之内";
                this.c = "5-6.工作较部门内其他部长少，利用很少时间便可完成";
                this.d = "3-4.几乎没有工作";
            }
            
            function obj_GZTD()
            {
                this.bz = "工作态度";
                this.a = "9-10.对工作能够极其积极且认真负责的完成，犯错误能自觉主动对自己的行为及后果负责";
                this.b = "7-8.布置的任务能够完成，积极度一般，犯错能在其他人监督下对自己的行为后果负责";
                this.c = "5-6.布置的任务不一定能认真负责的完成，对于工作中的失误有时逃避或推卸责任";
                this.d = "3-4.布置的任务敷衍不负责，对于工作中的失误总是逃避或推卸责任";
            }
            function obj_GZFF()
            {
                this.bz = "工作方法";
                this.a = "9-10.在工作中逐渐自主创新找到新方法并取得良好的成效，有突破";
                this.b = "7-8.按照固有方式按部就班并认真完成，效果较好";
                this.c = "5-6.按照固有方式完成但效率不高";
                this.d = "3-4.没能找到合适的方法使工作效率降低";
            }
            
            
            this.arrObj = new Array(new obj_GZL(),  new obj_GZTD(),new obj_GZFF());
        }
        
        function obj_GZNL()
        {
            this.xm= "工作能力";    
            this.rowspan = 10;//跨行的数目
            function obj_FXWTNL()
            {
                this.bz = "发现问题能力";
                this.a = "9-10.能够不断的正确的思考分析问题，并能及时发现存在的问题";
                this.b = "7-8.能分析绝大多数问题，也能发现问题但不太及时";
                this.c = "5-6.分析问题过于简单，发现问题花费时间较长，经常无法发现";
                this.d = "3-4.分析问题过于死板，没条理，无法发现存在的问题";
            }
            function obj_JJWTNL()
            {
                this.bz = "解决问题能力";
                this.a = "9-10.在发现问题后能主动、及时、效率高、效果好的解决问题，并能继续高质量的完成工作";
                this.b = "7-8.不能十分及时解决问题，有点手忙脚乱，但在他人的提醒下能够解决，效果尚可";
                this.c = "5-6.解决问题不及时，手忙脚乱，较难想到解决的办法";
                this.d = "3-4.完全找不到解决办法，导致了比较严重的后果";
            }
            
            this.arrObj = new Array(new obj_FXWTNL(), new obj_JJWTNL());
        }
        
        function obj_XZNL()
        {
            this.xm = "协作能力";
            this.rowspan = 14;//跨行的数目           
            function obj_GTNL()
            {
                this.bz = "沟通能力";
                this.a = "9-10.沟通能力很强，经常与干事、其他部长级和主管副主席进行有效的沟通，效果很好";
                this.b = "7-8.愿意与上级和下级沟通，沟通效果尚可";
                this.c = "5-6.不乐于与人沟通，仅在必要沟通时才会沟通，效果一般";
                this.d = "3-4.沟通合作能力差，不肯与人合作，完全封闭自我";
            }
            function obj_FGNL()
            {
                this.bz = "分工合作能力";
                this.a = "9-10.能有各自明确合力的分工，合作时能够共同出色的完成任务，也能很乐意的接受他人意见，完成工作效率高";
                this.b = "7-8.愿意与他人合作，虽分工欠合理但合作中能够相处愉快，一开始可能有分歧最终也能统一，工作完成效果一般";
                this.c = "5-6.仅在必要时才与人合作，分工混乱且不均，合作中会有摩擦，勉强接受与自己不一致的意见，导致工作效率降低";
                this.d = "3-4.排斥与他人合作，分工情况严重不均，完全无视他人意见，固执己见，十分难以相处，导致工作效率低，效果差";
            }
            
            function obj_GZQX()
            {
                this.bz = "工作情绪";
                this.a = "9-10.生活中导致的不良情绪极少带到工作和部门活动中，在部门成员面前总是保持较好的状态";
                this.b = "7-8.生活中的不良情绪偶尔会带到工作中来，导致工作效率欠佳，但仍能够较好完成工作";
                this.c = "5-6.不良情绪容易影响到部门工作，工作效率降低，甚至影响到其他同事的情绪";
                this.d = "3-4.不良情绪总是对自己造成极大的影响，严重影响到整个部门的运作";
            }
            this.arrObj = new Array(new obj_GTNL(), new obj_FGNL(), new obj_GZQX());
        }
        
        function obj_GLNL()
        {
            this.xm = "管理能力";
            this.rowspan = 19;//跨行的数目
            function obj_FPGZNL()
            {
                this.bz = "分配工作能力";
                this.a = "9-10.给干事工作布置合理，每个人都有比较平均的任务，完成效果好";
                this.b = "7-8.给干事工作布置欠合理，有的忙有的闲，但工作能够正常完成";
                this.c = "5-6.没有合理分配工作，导致工作勉强完成，而且完成效果欠佳";
                this.d = "3-4.工作分配严重不合理，导致有的干事无法完成工作，效果很差";
            }
            function obj_DDNL()
            {
                this.bz = "督导能力";
                this.a = "9-10.常与干事督导与调练，乐于主动帮助干事，经常给予指导性意见";
                this.b = "7-8.肯应干事要求帮助干事，但缺乏主动性";
                this.c = "5-6.仅在必要时才进行督导，导致干事的工作中出现了较多错误";
                this.d = "3-4.从不督导干事，甚至拒绝干事的督导要求";
            }
            function obj_BMGQ()
            {
                this.bz = "部门感情";
                this.a = "9-10.经常组织部门一起活动，没有特殊事务不会缺席，部门内感情很好，其乐融融，有归属感";
                this.b = "7-8.会组织部门一起活动，但有时因为情绪等原因会缺席活动，部门感情尚可";
                this.c = "5-6.部门一起活动的情况少，懒于组织部门活动，部门感情淡薄";
                this.d = "3-4.部门基本没有一起出去活动过，部门内所有人工作热情很低，怨言重";
            }
            function obj_LDNL()
            {
                this.bz = "领导能力";
                this.a = "9-10.能有效组织整个部门积极高效的完成工作，领导执行力强 ";
                this.b = "7-8.能组织部门活动、工作，有一定的领导及执行力 ";
                this.c = "5-6.组织部门成员进行工作有一定难度，缺乏领导力 ";
                this.d = "3-4.很难领导部门成员进行工作，执行力弱 ";
            }
            this.arrObj = new Array(new obj_FPGZNL(), new obj_DDNL(),
                                        new obj_BMGQ(), new obj_LDNL());
        }
        
        this.arrObj_BZZP = new Array(new obj_GZQK(), new obj_GZNL(), 
                                    new obj_XZNL(), new obj_GLNL());

    }
    
    var objReturn = new obj_BZZP();
    return objReturn;
}


//获取部长自评表数据
function Get_BZZP(show_func,post_func)
{
    
    var objBZZP =  BZZP_BZ();
            
    function obj_BZZP(json_Get_BZZP) 
    {
        this.zongfen = json_Get_BZZP.zongfen;//总分
        this.status = json_Get_BZZP.status;//是否为可提交状态
        this.arrDF = new Array(); //得分数组
        var iCount = 0;
        for (var i = 0; i < objBZZP.arrObj_BZZP.length; ++i) 
        {
            this.arrDF[i] = new Array();
            for (var j = 0; j <  objBZZP.arrObj_BZZP[i].arrObj.length; ++j) 
            {
                this.arrDF[i][j] = json_Get_BZZP.arrDF[iCount++].df;
            }
        }

        this.zwpj = TranStr_Get(json_Get_BZZP.zwpj); //自我评价
        if(this.zwpj == "")
        {
            this.zwpj = "请填写.....";
        }
        
        function DQTBZPJ(BZ) //对本部门其他部长评价
        {
            this.name = BZ.name;
            this.account = BZ.account;
            this.fs = BZ.fs;
            this.pj = TranStr_Get(BZ.pj);
        }
        this.arrDQTBZPJ = new Array();
        for(var i = 0; i < json_Get_BZZP.DQTBZPJ.sum; ++i)
        {
            this.arrDQTBZPJ.push(new DQTBZPJ(json_Get_BZZP.DQTBZPJ.arrBZ[i]));
        }

        this.dzgfzxpj = TranStr_Get(json_Get_BZZP.dzgfzxpj); //对主管副主席评价
        if(this.dzgfzxpj == "")
        {
            this.dzgfzxpj = "请填写.....";
        }
        
        //匿名评价
        function obj_NMPJ(person)
        {
            this.name = person.name;
            this.account = person.account;
            this.depart = person.depart;
            this.pj = TranStr_Get(person.pj);
        }
        this.arrNMPJ = new Array();
        for(var i = 0; i < json_Get_BZZP.NMPJ.length; ++i)
        {
            this.arrNMPJ.push(new obj_NMPJ(json_Get_BZZP.NMPJ[i]));
        }
        this.arrTSLY=json_Get_BZZP.TongShiliuYan;
        for(var i=0;i<this.arrTSLY.length;i++)
        {
            this.arrTSLY[i].liuyan=TranStr_Get(this.arrTSLY[i].liuyan);
        }
        this.arrTongShi=json_Get_BZZP.TongShi;
    }
    try{
        if(debug())
            throw("ajax");
         
        //ajax请求，接收当前账号的个人信息
        var obj;
        $.ajax({
            url:URL+"/funcbzzp",
            data:{"year":year,"month":month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=new obj_BZZP(result);
                show_func(obj,post_func);
            }
        }); 
    }catch(e){
        errmsg();
    }
}


//把部长自评表的填写的内容传给服务器
function Post_BZZP(obj_BZZP,success_func)//obj_BZZP为Get_BZZP()定义的对象
{
    var _arrDF = new Array();
    for (var i = 0; i < obj_BZZP.arrDF.length; ++i) 
    {
        for (var j = 0; j <  obj_BZZP.arrDF[i].length; ++j) 
        {
            _arrDF.push({"df" : obj_BZZP.arrDF[i][j]});
        }
    }
    
    var _arrBZ = new Array();
    for(var i = 0; i < obj_BZZP.arrDQTBZPJ.length; ++i)
    {
        _arrBZ.push({
            "name":obj_BZZP.arrDQTBZPJ[i].name, 
            "account":obj_BZZP.arrDQTBZPJ[i].account, 
            "fs" : obj_BZZP.arrDQTBZPJ[i].fs,
            "pj" : TranStr_Post(obj_BZZP.arrDQTBZPJ[i].pj),});
    }
    
    var _arrNMPJ = new Array();
    for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
    {
        _arrNMPJ.push({
            "name":obj_BZZP.arrNMPJ[i].name, 
            "account":obj_BZZP.arrNMPJ[i].account, 
            "depart":obj_BZZP.arrNMPJ[i].depart, 
            "pj":TranStr_Post(obj_BZZP.arrNMPJ[i].pj)});
    }
    var _arrTSLY=new Array();
    for(var i=0;i<obj_BZZP.arrTSLY.length;++i)
    {
        if(obj_BZZP.arrTSLY[i].liuyan!=""&&obj_BZZP.arrTSLY[i].liuyan!=" "&&obj_BZZP.arrTSLY[i].liuyan!="无")
        {
            _arrTSLY.push({"account":obj_BZZP.arrTSLY[i].account,"liuyan":TranStr_Post(obj_BZZP.arrTSLY[i].liuyan)});
        }
    }
    var json_Post_BZZP = 
    {
        "year" : year,
        "month" : month,
        "hadSubmit":obj_BZZP.hadSubmit,
        "zongfen" : obj_BZZP.zongfen, //总分
        "status" : obj_BZZP.status, //是否为可提交状态
        "arrDF" : _arrDF,//得分数组
        "zwpj" : TranStr_Post(obj_BZZP.zwpj), //自我评价
        "DQTBZPJ" : //对本部门其他部长评价
        {
            "sum" : obj_BZZP.arrDQTBZPJ.length, //部长人数
            "arrBZ" : _arrBZ,//部长数组
        },
        "dzgfzxpj" : TranStr_Post(obj_BZZP.dzgfzxpj), //对主管副主席评价    
        "NMPJ"://对主席团成员的匿名评价
        {
            "sum":obj_BZZP.arrNMPJ.length,//人数
            "arrNMPJ":_arrNMPJ,
        },
        "TSLY":_arrTSLY,
    };
    console.dir(json_Post_BZZP);
    //服务器成功接收信息，则返回true，否则返回false
    try{
        if(debug())
            return true;
        //ajax请求，发送部长自评表
        console.log('going to post bzzp data');
        var obj;
        $.ajax({
            url:URL+"/post_bzzp",
            data:json_Post_BZZP,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                console.log(result);
                success_func(result.flagCrud);
            }
        });
    }catch(err){success_func(false);}
}


//干事考核表的考核项目和评分标准
function GSKH_BZ()
{
    function objGSKH()
    {       
    
        this.str0 = 
        "<div id=\"gzl\">"
            +"<p><h3  style=\"text-align:center\">工作量</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.工作远多于部门内其他干事，需要较多时间完成</p>"
            + "<p>7-8.工作与部门内其他干事差不多，在承受范围之内</p>"
            + "<p>5-6.工作较部门内其他干事少，利用很少时间便可完成</p>"
            + "<p>3-4.几乎没有工作</p>"
        + "</div>";
        
        this.str1 = 
        "<div id=\"gzxl\">"
            +"<p><h3  style=\"text-align:center\">工作效率</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.总能提早截止日期较多完成安排下去的任务</p>"
            + "<p>7-8.能够按时完成安排下去的任务，踩着时间点完成</p>"
            + "<p>5-6.要超时才能完成安排下去的任务</p>"
            + "<p>3-4.无法完成安排下去的任务</p>"
        + "</div>";
        
        this.str2= 
        "<div id=\"gzzl\">"
            +"<p><h3  style=\"text-align:center\">工作质量</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.出色地完成各项任务，并有一定的突破，工作过程中无纰漏和失误，完成质量很高</p>"
            + "<p>7-8.能够顺利按要求完成任务，质量一般，存在一些细节性的失误和漏洞</p>"
            + "<p>5-6.工作或任务内容有一小部分未能完成，存在一定的失误，需要不断修改</p>"
            + "<p>3-4.工作完成情况较差，出现较严重的错误</p>"
        + "</div>";
        
        this.str3=
        "<div id=\"gzzl\">"
            +"<p><h3  style=\"text-align:center\">工作态度</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.对待工作积极性高，主动要求工作，并且能认真热情的完成；责任感强，犯错时敢作敢担当；纪律性强，严格规范自身，工作严谨</p>"
            + "<p>7-8.对待工作积极性一般，能接受布置的任务；责任感一般，犯错时能在监督下承担自己的责任；纪律性一般，大体遵守规章制度</p>"
            + "<p>5-6.对待工作积极性低，能接受布置的任务但办事拖拉；责任感弱，犯错时会逃避或推卸；纪律性弱，偶尔不守纪律，但提醒后能改正</p>"
            + "<p>3-4.对待工作积极性过低，完成任务时需不断催促；责任感过低，做事敷衍，犯错逃避或推卸责任；纪律性过低，经常不守纪律，再三提醒仍出错</p>"
        + "</div>";
        this.str4 = 
        "<div id=\"jjx\">"
            +"<p><h3  style=\"text-align:center\">工作能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能很好理解部长级交代的任务，并能在上级经验中加入自己的思考和看法，有创新既灵活又高效率，在遇事能随机应变，首想自己解决而非寻求帮助。</p>"
            + "<p>7-8.能明白部长级交代的任务但仍需询问提醒，工作时中规中矩无新意也能顺利完成，偶尔有新意，在遇事时首想寻求帮助，偶尔自己解决。</p>"
            + "<p>5-6.未能及时理解部长级交代的任务需不断询问提醒，工作时不按照指导爱擅作主张，无想法，只在被问时才偶尔有点想法，遇事时总求助他人，勉强解决问题。</p>"
            + "<p>3-4.不理解部长级交代的任务且在不断提醒后仍态度懒散，工作时自作主张导致失误，基本没有创新，被动下也无新想法，遇事时不会随机应变，也不寻求帮助。</p>"
        + "</div>";
        this.str5 = 
        "<div id=\"hznl\">"
            +"<p><h3  style=\"text-align:center\">合作能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能够很好的与他人合作，能提出自己想法，发挥自己的作用，也能接受他人意见</p>"
            + "<p>7-8.愿意与他人合作，但合作中能够相处愉快，但不太主动</p>"
            + "<p>5-6.仅在必要时才与人合作，偶尔会有摩擦，勉强接受与自己不一致的意见</p>"
            + "<p>3-4.排斥与他人合作，十分难以相处</p>"
        + "</div>";
        
        this.str6 = 
        "<div id=\"bdnl\">"
            +"<p><h3  style=\"text-align:center\">表达能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能够清晰地表达自己的观点，让别人乐于聆听和理解自己的想法</p>"
            + "<p>7-8.能够表达自己的观点，但需要其他人稍作提示</p>"
            + "<p>5-6.表达自己的观点时存在有人听不懂请求解释的情况，但能解释清楚</p>"
            + "<p>3-4.表达自己观点时太含糊，别人完全听不懂，解释自己的观点时也不够清楚</p>"
        + "</div>";
        
        this.str7 = 
        "<div id=\"tdjs\">"
            +"<p><h3  style=\"text-align:center\">团队精神</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.爱护团体，有强烈的团队精神，部门内有活动总是热情参与，也常协助其他同事</p>"
            + "<p>7-8.比较爱护团体，能参与部门活动但偶尔会缺席，与其他同事感情良好</p>"
            + "<p>5-6.团队精神欠缺，偶尔不愿意与部门一起活动，才与部门内其他成员沟通少</p>"
            + "<p>3-4.脱离群众，排斥与部门一起活动，更愿意单独行动，必要时才与他人沟通</p>"
        + "</div>";
        
    }
    
    var objReturn = new objGSKH();
    return objReturn;
}


//获取干事考核表数据
function Get_GSKH(show_func,post_func)
{
    //部门特色，要从服务器获取
        
        var arrBMTS=new Array();
        //秘书
        arrBMTS[0]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">秘书处职能</h3></p>"
                    +"<p>评价标准:</p>"
                    +"<p>文档制作能力、细致认真程度、协调应急能力</p>"          
                    +"<p>（每一项必须评，每项3.333333分，请直接写出以总分为10分的分数）</p>"
                    +"</div>";
        //人力
        arrBMTS[1]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">人力职能</h3></p>"
                    +"<p>评价标准:</p>"
                    +"<p>软件使用（包括excel，ppt，word）</p>"  
                    +"<p>撰写能力（写策划的能力和发短信内容）</p>"
                    +"</div>";
        //宣传
        arrBMTS[2]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">宣传部职能</h3></p>"
                    +"<p>立宣制作:</p>"
                    +"<p>9-10.立宣的制作方面很有想法，可行性很好</p>"          
                    +"<p>7-8.立宣的制作想法，可行性基本ok</p>"
                    +"<p>5-6.立宣制作方面很有想法，但可行性不足</p>"
                    +"<p>3-4.立宣的制作基本没什么想法，跟着别人想法走</p>"
                    +"<p>电宣制作:</p>"
                    +"<p>9-10.能熟练地运用PS制作电宣，作品效果很好</p>"          
                    +"<p>7-8.电宣制作基本ok，基本符合活动部门要求</p>"
                    +"<p>5-6.电宣制作想法很好，但制作欠佳</p>"
                    +"<p>3-4.电宣方面训练不够，作品欠佳</p>"
                    +"<p>（立宣制作和电宣制作每项5分，请直接写出以总分为10分的分数）</p>"
                    +"</div>";  
        //信编
        arrBMTS[3]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">信编职能</h3></p>"
                    +"<p>评价说明:</p>"
                    +"<p>撰写新闻稿能力，拍照能力，制作视频能力</p>"          
                    +"<p>（请部长级选择自己了解的一项进行打分，直接写出以总分为10分的分数）</p>"
                    +"</div>";  
        //学术        
        arrBMTS[4]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
                    +"<p>评价说明:</p>"
                    +"<p>您的部门没有设置部门特色评分项，请填写为0</p>"          
                    +"</div>";
        //体育
        arrBMTS[5]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
                    +"<p>评价说明:</p>"
                    +"<p>您的部门没有设置部门特色评分项，请填写为0</p>"          
                    +"</div>";
        //KSC
        arrBMTS[6]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">交流会表现得分</h3></p>"
                    +"<p>评价说明:</p>"
                    +"<p>根据小干事在交流会上学习的参与积极性以及会后任务题的完成度打分</p>"          
                    +"<p>（满分10分）</p>"
                    +"</div>";
        //组织部
        arrBMTS[7]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
                    +"<p>活动方面:</p>"
                    +"<p>9-10.主动要求任务，对办活动充满热情，并认真负责地完成，并且对活动提出宝贵建议</p>"
                    +"<p>7-8.偶尔会提出自己的想法，会负责完成任务</p>"
                    +"<p>5-6.觉得无所谓，偶尔不愿意工作，但还是会完成自己的任务，不会提出自己的想法</p>"
                    +"<p>3-4.完全被动型，觉得很麻烦，有种被迫去做的感觉</p>"
                    +"<p>处理团务:</p>"
                    +"<p>9-10.每次都很认真完成任务，并细心、有耐心地尽自己的职责，乐于接受任务</p>"              
                    +"<p>7-8.会负责任地完成任务，工作效果良好</p>"
                    +"<p>5-6.欠缺耐心，有时候不想完成任务，属于被动型</p>"
                    +"<p>3-4.觉得团务很麻烦，完全不想完成任务，被催了才会去做</p>"
                    +"<p>（处理团务和活动方面每项5分，请直接写出以总分为10分的分数）</p>"
                    +"</div>";
        //文娱
        arrBMTS[8]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">与部门内其他人联系情况</h3></p>"
                    +"<p>9-10.多，积极</p>"
                    +"<p>7-8.还行</p>"
                    +"<p>5-6.比较少</p>"
                    +"<p>3-4.很少</p>"
                    +"</div>";  

        //公关
        arrBMTS[9]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
                    +"<p>评价说明:</p>"
                    +"<p>您的部门没有设置部门特色评分项，请填写为0</p>"          
                    +"</div>";
        //心服
        arrBMTS[10]="<div id=\"bmts\">"
                    +"<p><h3  style=\"text-align:center\">心服职能</h3></p>"
                    +"<p>评价说明:</p>"
                    +"<p>心理知识</p>"          
                    +"<p>（满分10分）</p>"
                    +"</div>";      

    var obj_BZ = GSKH_BZ();
    function obj_GSKH(json_Get_GSKH)
    {
        this.GSKH_BZ = obj_BZ;
        
        this.status = json_Get_GSKH.status;//是否为可提交状态       
        this.bmts = arrBMTS[json_Get_GSKH.apartment-1];//部门特色
        
        function obj_GSDF(GSDF)
        {   
            this.name = GSDF.name;//干事名字
            this.account = GSDF.account;//学号
            this.df0 = GSDF.df0;//工作方法
            this.df1 = GSDF.df1;//理解能力
            this.df2 = GSDF.df2;//创新能力
            this.df3 = GSDF.df3;//应变处理能力
            this.df4 = GSDF.df4;//合作能力
            this.df5 = GSDF.df5;//表达能力
            this.df6 = GSDF.df6;//团队精神
            this.df7 = GSDF.df7;//工作量
            this.df8 = GSDF.df8;//工作效率
            this.df9 = GSDF.df9;//工作质量
            this.df10 = GSDF.df10;//积极性
            this.df11 = GSDF.df11;//责任感
            this.df12 = GSDF.df12;//纪律性
            this.df13 = GSDF.df13;//部门特色
        }
        this.arrGSDF = new Array();
        for(var i = 0; i < json_Get_GSKH.arrGSDF.length; ++i)
        {
            this.arrGSDF.push(new obj_GSDF(json_Get_GSKH.arrGSDF[i]));
        }
        
        function obj_DGSPJ(DGSPJ)
        {
            this.name = DGSPJ.name;//干事名字
            this.account = DGSPJ.account;//学号
            this.pj = TranStr_Get(DGSPJ.pj);//对干事的评价
        }
        this.arrDGSPJ = new Array();
        for(var i = 0; i < json_Get_GSKH.arrDGSPJ.length; ++i)
        {
            this.arrDGSPJ.push(new obj_DGSPJ(json_Get_GSKH.arrDGSPJ[i]));
        }
    }
    
    //ajax请求，接收当前账号的个人信息
    try
    {
        if(debug())
            throw("ajax");
            
        var obj;
        $.ajax({
            url:URL+"/funcgskh",
            data:{'year':year,'month':month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=new obj_GSKH(result);
                show_func(obj,post_func);
            }
        });     
    }catch(err){
        var strBMTS=new String();
        errmsg();
    }
}


//把干事考核表的填写的内容传给服务器
function Post_GSKH(obj_GSKH,success_func)//obj_GSKH为Get_GSKH()定义的对象
{
    var _arrGSDF = new Array();
    for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
    {
        _arrGSDF.push({
            "name" : obj_GSKH.arrGSDF[i].name, //干事名字
            "account": obj_GSKH.arrGSDF[i].account,//学号
            "df0" : obj_GSKH.arrGSDF[i].df0, //工作方法
            "df1" : obj_GSKH.arrGSDF[i].df1, //理解能力
            "df2" : obj_GSKH.arrGSDF[i].df2, //创新能力
            "df3" : obj_GSKH.arrGSDF[i].df3, //应变处理能力
            "df4" : obj_GSKH.arrGSDF[i].df4, //合作能力
            "df5" : obj_GSKH.arrGSDF[i].df5, //表达能力
            "df6" : obj_GSKH.arrGSDF[i].df6, //团队精神
            "df7" : obj_GSKH.arrGSDF[i].df7, //工作量
            "df8" : obj_GSKH.arrGSDF[i].df8, //工作效率
            "df9" : obj_GSKH.arrGSDF[i].df9, //工作质量
            "df10" : obj_GSKH.arrGSDF[i].df10, //积极性
            "df11" : obj_GSKH.arrGSDF[i].df11, //责任感
            "df12" : obj_GSKH.arrGSDF[i].df12, //纪律性
            "df13" : obj_GSKH.arrGSDF[i].df13, //部门特色
        }
      );
    }
    
    var _arrDGSPJ = new Array();
    for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
    {
        _arrDGSPJ.push({
            "name" : obj_GSKH.arrDGSPJ[i].name,
            "account":obj_GSKH.arrDGSPJ[i].account, 
            "pj" : TranStr_Post(obj_GSKH.arrDGSPJ[i].pj)});
    }
    
    var json_Post_GSKH = 
    {
        "year" : year,
        "month" : month,
        "status" : obj_GSKH.status, //是否为可提交状态
        "hadSubmit":obj_GSKH.hadSubmit,
        //"bmts" : strBMTS, //部门特色，要从服务器获取
        "GSDF" : //干事得分
        {
            "sum" : obj_GSKH.arrGSDF.length, //干事人数
            "arrGSDF" : _arrGSDF,//得分数组
        },
        
        "DGSPJ" : //对干事评价
        {
            "sum" : obj_GSKH.arrGSDF.length,//干事人数
            "arrDGSPJ" :_arrDGSPJ,
        },
    };
    
    try 
    {
        if(debug())
            return true;
    
        //ajax请求
        var obj;
        $.ajax({
            url:URL+"/post_gskh",
            data:json_Post_GSKH,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=result;
                success_func(obj.flagCrud);
            }
        }); 
    }
    catch(err)
    {
        console.log(err);
        success_func(false);
    }
}


//获取部长反馈表数据
function Get_BZFK(show_func,post_func)
{
    //此函数返回的是一个对象，对象的成员是总分，得分细项的数组，自我评价，干事评价数组，其他部长评价数组
    //主管副主席，干事自我评价数组
    //部门得分，部门排名，部门得分细则数组、主席的部门评价，主管副主席的部门评价
    
    function classBZFK(json_BZFK)
    {
        this.ZongFen = json_BZFK.ZongFen;
        this.arrDeFenXiZhe = new Array(
            json_BZFK.arrDeFenXiZhe.a, 
            json_BZFK.arrDeFenXiZhe.b, 
            json_BZFK.arrDeFenXiZhe.c, 
            json_BZFK.arrDeFenXiZhe.d, 
            json_BZFK.arrDeFenXiZhe.e, 
            json_BZFK.arrDeFenXiZhe.f, 
            json_BZFK.arrDeFenXiZhe.g, 
            json_BZFK.arrDeFenXiZhe.h);
        //这是得分细则数组，共8项，具体对应参考该表格
        this.ZiWoPingJia = TranStr_Get(json_BZFK.ZiWoPingJia);//自我评价
        
        
        this.arrQiTaBuZhanPinJia = new Array();//其他部长评价数组
        for(var i = 0; i < json_BZFK.QiTaBuZhanPinJia.arrQiTaBuZhanPinJia.length; ++i)
        {
            var str = TranStr_Get(json_BZFK.QiTaBuZhanPinJia.arrQiTaBuZhanPinJia[i].pj);
            this.arrQiTaBuZhanPinJia.push(str);
        }
        this.ZhuGuanFuZhuXiPinJia =  TranStr_Get(json_BZFK.ZhuGuanFuZhuXiPinJia);//主管副主席评价
        
        function classGanShi(GSZP)
        {
            this.name = GSZP.name;//干事姓名
            this.account = GSZP.account;//学号
            this.assess = TranStr_Get(GSZP.assess);//干事自我评价
        }
        
        var arrGSZP = new Array();
        for(var i=0;i<json_BZFK.GSZP.arrGSZP.length;i++)
        {
            arrGSZP[i]=new classGanShi(json_BZFK.GSZP.arrGSZP[i]);
        }
        
        this.arrGanShiPingJia = new Array( );//干事评价数组
        for(var i = 0; i < json_BZFK.GanShiPingJia.arrGanShiPingJia.length; ++i)
        {
            var str = TranStr_Get(json_BZFK.GanShiPingJia.arrGanShiPingJia[i].gspj);
            this.arrGanShiPingJia.push(str);
        }
        this.arrLiuYan=new Array();
        
        for(var i=0;i<json_BZFK.LiuYan.length;i++)
        {
            var str=TranStr_Get(json_BZFK.LiuYan[i].liuyan);
            if(str==""||str=="无"||str==" ")
            {
                continue;
            }
            else
            {
                this.arrLiuYan.push(str);
            }
        }
        this.arrBuMenLiuYan=new Array();
        for(var i=0;i<json_BZFK.BuMenLiuYan.length;i++)
        {
            var str=TranStr_Get(json_BZFK.BuMenLiuYan[i].liuyan);
            if(str==""||str=="无"||str==" ")
            {
                continue;
            }
            else
            {
                this.arrBuMenLiuYan.push(str);
            }
        }
        this.arrGanShiZhiWoPinJia = arrGSZP;//干事自我评价数组
        this.arrGanShiDeFengPaiMing = json_BZFK.arrGSPM//干事排名
        this.BuMenDeFeng = json_BZFK.BuMenDeFeng;//部门得分
        this.arrBuMenPaiMing = json_BZFK.BuMenPaiMing;//部门排名
        this.arrBuMenDeFenXiZhe = new Array(
            json_BZFK.arrBuMenDeFenXiZhe.a, 
            json_BZFK.arrBuMenDeFenXiZhe.b, 
            json_BZFK.arrBuMenDeFenXiZhe.c, 
            json_BZFK.arrBuMenDeFenXiZhe.d, 
            json_BZFK.arrBuMenDeFenXiZhe.e, 
            json_BZFK.arrBuMenDeFenXiZhe.f, 
            json_BZFK.arrBuMenDeFenXiZhe.g,
            json_BZFK.arrBuMenDeFenXiZhe.h);
        //这是部门得分细则数组，共八项，具体参看表格
        this.ZhuGuanFuZhuXiBuMenPinJia = TranStr_Get(json_BZFK.ZhuGuanFuZhuXiBuMenPinJia);//主管副主席的部门评价
        this.ZhuXiDeBuMenPinJia = TranStr_Get(json_BZFK.ZhuXiDeBuMenPinJia);//主席的部门评价
        //其他情况加减分表,理由,部长自己的
        if(json_BZFK.bzqitaliyou==""||json_BZFK.bzqitaliyou==" "||json_BZFK.bzqitaliyou=="无")
        {
            json_BZFK.bzqitaliyou="";
        }
        this.bzqitaliyou=json_BZFK.bzqitaliyou;
        //其他情况加减分表,理由,部门的
        this.bmqitaliyou=json_BZFK.bmqitaliyou;
        //违纪理由
        this.weijiliyou=json_BZFK.weijiliyou;
    }
    try
    {
        if(debug())
            throw("ajax");
        //ajax请求，接收当前账号的个人信息
        var obj;
        $.ajax({
            url:URL+"/jsbzfk",
            data:{"year":year,"month":month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=new classBZFK(result);
                show_func(obj,post_func);
            }
        });     
    }
    catch(err)
    {
        errmsg();
    }   
}


//部长考核表的考核项目和评分标准
function BZKH_BZ()
{
    function objBZKH()
    {       
    
        this.str0 = 
        "<div id=\"gtnl\">"
            +"<p><h3  style=\"text-align:center\">沟通能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.沟通能力很强，能够经常与上级和下级进行有效的沟通，效果很好</p>"
            + "<p>7-8.愿意与上级和下级沟通，沟通效果尚可</p>"
            + "<p>5-6.不乐于与人沟通，仅在必要沟通时才会沟通，效果一般</p>"
            + "<p>3-4.沟通合作能力差，不肯与人合作，完全封闭自我</p>"
        + "</div>";
        
        this.str1 = 
        "<div id=\"hznl\">"
            +"<p><h3  style=\"text-align:center\">合作能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能够很好的与他人合作，能提出自己想法，发挥自己的作用，也能接受他人意见</p>"
            + "<p>7-8.愿意与他人合作，但合作中能够相处愉快，但不太主动</p>"
            + "<p>5-6.仅在必要时才与人合作，偶尔会有摩擦，勉强接受与自己不一致的意见</p>"
            + "<p>3-4.排斥与他人合作，十分难以相处</p>"
        + "</div>";
        
        this.str2 = 
        "<div id=\"bdnl\">"
            +"<p><h3  style=\"text-align:center\">表达能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能够清晰地表达自己的观点，让别人乐于聆听和理解自己的想法</p>"
            + "<p>7-8.能够表达自己的观点，但需要其他人稍作提示</p>"
            + "<p>5-6.表达自己的观点时存在有人听不懂请求解释的情况，但能解释清楚</p>"
            + "<p>3-4.表达自己观点时太含糊，别人完全听不懂，解释自己的观点时也不够清楚</p>"
        + "</div>";
        
        this.str3 = 
        "<div id=\"jjwtnl\">"
            +"<p><h3  style=\"text-align:center\">管理能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能很好地管理部门事务和干事工作，有条理性，恰到好处，使工作能井然有序进行。</p>"
            + "<p>7-8.能较好地管理部门事务和干事工作，有少许纰漏导致少许失序，但工作亦能较好进行。</p>"
            + "<p>5-6.能一般地管理部门失误和干事工作，纰漏略多，失误略多，工作未能较好进行。</p>"
            + "<p>3-4.太放任管理部门事务和干事工作不管，导致失误多，工作效果差，无法完成任务。</p>"
        + "</div>";
        
        this.str4 = 
        "<div id=\"lddnl\">"
            +"<p><h3  style=\"text-align:center\">领导能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能有效组织整个部门积极高效的完成工作，领导执行力强 </p>"
            + "<p>7-8.能组织部门活动、工作，有一定的领导及执行力 </p>"
            + "<p>5-6.组织部门成员进行工作有一定难度，缺乏领导力 </p>"
            + "<p>3-4.很难领导部门成员进行工作，执行力弱 </p>"
        + "</div>";
        
        this.str5 = 
        "<div id=\"gzl\">"
            +"<p><h3  style=\"text-align:center\">工作量</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.工作远多于其他部门或本部门内其他部长，难度较大，需要较多时间完成</p>"
            + "<p>7-8.工作与部门内其他部长相当，在承受范围之内</p>"
            + "<p>5-6.工作较部门内其他部长少，利用很少时间便可完成</p>"
            + "<p>3-4.几乎没有工作</p>";
        + "</div>";
        
        this.str6 = 
        "<div id=\"wcqk\">"
            +"<p><h3  style=\"text-align:center\">工作方法</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.在工作中逐渐自主创新找到新方法并取得良好的成效，有突破</p>"
            + "<p>7-8.按照固有方式按部就班并认真完成，效果较好</p>"
            + "<p>5-6.按照固有方式完成但效率不高</p>"
            + "<p>3-4.没能找到合适的方法使工作效率降低</p>"
        + "</div>";
        
        this.str7 = 
        "<div id=\"gzff\">"
            +"<p><h3  style=\"text-align:center\">工作态度</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.对工作能够极其积极认真负责的完成，犯错误能自觉主动对自己的行为及后果负责</p>"
            + "<p>7-8.布置的任务能够完成，积极度一般，犯错能在其他人监督下对自己的行为后果负责</p>"
            + "<p>5-6.布置的任务不一定能认真负责的完成，对于工作中的失误有时逃避或推卸责任</p>"
            + "<p>3-4.布置的任务敷衍不负责，对于工作中的失误总是逃避或推卸责任</p>"
        + "</div>";
        
        this.str8 = 
        "<div id=\"tcnl\">"
            +"<p><h3  style=\"text-align:center\">工作能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.善于统筹规划，大局与细节并重，细心认真，能不断正确思考分析问题并时常能有新想法，及时发现并较好地解决问题给部门带来利益，遇事能随机应变，自行解决不求他人</p>"
            + "<p>7-8.能顺利完成任务，细节方面有瑕疵，效果尚可，能思考问题，偶尔能主动提出新想法，但难以较好的解决问题，遇事时先求助他人，偶尔自行解决</p>"
            + "<p>5-6.统筹能力不够，细节照顾不够，任务未能顺利完成，难以发现问题，基本无创新思想，发现问题亦需花费不少时间解决，遇事时求助他人不求自己，勉强完成任务</p>"
            + "<p>3-4.基本未完成任务，细节忽略较多，无法发现问题，待提醒后亦未几时解决问题，无创新能力，无想法，遇事不随机应变，不求助亦不自助</p>"
        + "</div>";
        
    }
    
    var objReturn = new objBZKH();
    return objReturn;
}


//获取部长考核表数据
function Get_BZKH(show_func,post_func)
{

    function obj_BZKH(json_BZKH)
    {
        this.status = json_BZKH.status;//是否为可提交状态
        
        this.BZKH_BZ = new BZKH_BZ();
        
        function obj_BMBZ(BM)
        {
            this.bm = TranDigToText(BM.bm);//部门名字
            function obj_BZ(BZ)
            {
                this.bzmz = BZ.bzmz;//部长名字
                this.account = BZ.account;//学号
                this.pj = TranStr_Get(BZ.pj);//评价
                this.df0 = BZ.df0;//工作量
                this.df1 = BZ.df1;//完成情况
                this.df2 = BZ.df2;//工作方法
                this.df3 = BZ.df3;//沟通能力
                this.df4 = BZ.df4;//合作能力
                this.df5 = BZ.df5;//表达能力
                this.df6 = BZ.df6;//发现/解决问题能力
                this.df7 = BZ.df7;//统筹能力
                this.df8 = BZ.df8;//创新能力
                this.df9 = BZ.df9;//应变处理能力
                this.df10 = BZ.df10;//责任感
                this.df11 = BZ.df11;//纪律性
                this.df12 = BZ.df12;//监督能力
                this.df13 = BZ.df13;//领导能力
                this.df14 = BZ.df14;//部门感情
            }
            this.arrBZ = new Array();
            for(var i = 0; i < BM.arrBZ.length; ++i)
            {
                this.arrBZ.push(new obj_BZ(BM.arrBZ[i]));
            }
        }
        this.arrBMBZ = new Array();
        for(var i = 0; i < json_BZKH.BMBZ.arrBM.length; ++i)
        {
            this.arrBMBZ.push(new obj_BMBZ(json_BZKH.BMBZ.arrBM[i]));
        }   
        this.hadSubmit=json_BZKH.BMBZ.hadSubmit;
    }
    //ajax请求，接收当前账号的个人信息
    try
    {
        if(debug())
            throw("ajax");
        var obj;
        $.ajax({
            url:URL+"/funcbzkh",
            data:{'year':year,'month':month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                console.log('got bzkh data');
                console.dir(result);
                obj=new obj_BZKH(result);
                show_func(obj,post_func);
            }
        }); 
    }
    catch(err)
    {
        errmsg();
    }
}


//把部长考核表的填写的内容传给服务器
function Post_BZKH(obj_BZKH,success_func)//obj_BZKH为Get_BZKH()定义的对象
{
    var _arrBM = new Array();
    for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
    {
        var _arrBZ = new Array();
        for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
        {
            _arrBZ.push({
                "bzmz" : obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz, //部长名字
                "account": obj_BZKH.arrBMBZ[i].arrBZ[j].account,//学号
                "pj" : TranStr_Post(obj_BZKH.arrBMBZ[i].arrBZ[j].pj),
                "df0" : obj_BZKH.arrBMBZ[i].arrBZ[j].df0, //工作量
                "df1" : obj_BZKH.arrBMBZ[i].arrBZ[j].df1, //完成情况
                "df2" : obj_BZKH.arrBMBZ[i].arrBZ[j].df2, //工作方法
                "df3" : obj_BZKH.arrBMBZ[i].arrBZ[j].df3, //沟通能力
                "df4" : obj_BZKH.arrBMBZ[i].arrBZ[j].df4, //合作能力
                "df5" : obj_BZKH.arrBMBZ[i].arrBZ[j].df5, //表达能力
                "df6" : obj_BZKH.arrBMBZ[i].arrBZ[j].df6, //发现/解决问题能力
                "df7" : obj_BZKH.arrBMBZ[i].arrBZ[j].df7, //统筹能力
                "df8" : obj_BZKH.arrBMBZ[i].arrBZ[j].df8, //创新能力
                "df9" : obj_BZKH.arrBMBZ[i].arrBZ[j].df9, //应变处理能力
                "df10" : obj_BZKH.arrBMBZ[i].arrBZ[j].df10, //责任感
                "df11" : obj_BZKH.arrBMBZ[i].arrBZ[j].df11, //纪律性
                "df12" : obj_BZKH.arrBMBZ[i].arrBZ[j].df12, //监督能力
                "df13" : obj_BZKH.arrBMBZ[i].arrBZ[j].df13, //领导能力
                "df14" : obj_BZKH.arrBMBZ[i].arrBZ[j].df14, //部门感情
            });
        }
        _arrBM.push({"bm" : TranTextToDig(obj_BZKH.arrBMBZ[i].bm), "bzrs" : obj_BZKH.arrBMBZ[i].arrBZ.length, "arrBZ" :_arrBZ});
    }
    
    var json_Post_BZKH = 
    {
        "year" : year,
        "month" : month,
        "status":obj_BZKH.status,//是否为可提交状态
        "hadSubmit":obj_BZKH.hadSubmit,
        "BMBZ":
        {
            "bmsm":obj_BZKH.arrBMBZ.length,//部门数目
            "arrBM":_arrBM,
        }           
    };

    
    
    //服务器成功接收信息，则返回true，否则返回false
    try
    {
        
        if(debug())
            return true;
        //ajax请求
        var obj;
        $.ajax({
            url:URL+"/post_bzkh",
            data:json_Post_BZKH,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=result;
                success_func(obj.status);
            }
        }); 
    }
    catch(err){success_func(false);}
}


//部门考核表的考核项目和评分标准
function BMKH_BZ()
{
    function objBMKH()
    {       
        this.str0 = 
        "<div id=\"gznd\">"
            +"<p><h3  style=\"text-align:center\">工作量/工作难度</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.工作量远高于其他部门，工作难度也很大</p>"
            + "<p>7-8.工作量与其他部门相当，工作难度适中</p>"
            + "<p>5-6.工作量较其他部门较少，不太有难度</p>"
            + "<p>3-4.工作量远少于其他部门，能够很轻松的完成</p>"
        + "</div>";
                
        this.str1 = 
        "<div id=\"gzwcxg\">"
            +"<p><h3  style=\"text-align:center\">工作完成效果</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.很满意，完成的超出预期，效果很好，各方面反响都比较热烈</p>"
            + "<p>7-8.基本满意，能够顺利完成，虽有些细节没有注意，也达到预期效果，反响较好</p>"
            + "<p>5-6.基本完成，但许多细节没有注意，也稍微不及预想效果，反响一般</p>"
            + "<p>3-4.基本未完成，犯了比较严重的错误，远不及预期效果，反响较差</p>"
        + "</div>";
        
        this.str2 = 
        "<div id=\"gztd\">"
            +"<p><h3  style=\"text-align:center\">工作态度</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.各成员都能积极完成工作，并对工作认真负责</p>"
            + "<p>7-8.各成员能按要求完成工作，但积极性一般</p>"
            + "<p>5-6.有部分成员对工作不够热心，不能很好地配合部门工作</p>"
            + "<p>3-4.整个部门做事松散，不能及时有序的完成工作要求</p>"
        + "</div>";
        
        this.str3 = 
        "<div id=\"jlx\">"
            +"<p><h3  style=\"text-align:center\">纪律性</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.部门内所有成员都有良好的纪律意识，严格规范自身，不随意违反制度，工作作风严谨</p>"
            + "<p>7-8.能履行职责，成员大体上能遵守各项规章制度，但有个别分子作风比较随意</p>"
            + "<p>5-6.偶尔有成员会发生不守纪律的事情，给部门或兄弟部门带来不便，但在他人提醒下能够改正</p>"
            + "<p>3-4.成员经常发生不守纪律的事，他人再三提醒下还会出现问题，不愿改正</p>";
        + "</div>";
        
        this.str4 = 
        "<div id=\"bmnjl\">"
            +"<p><h3  style=\"text-align:center\">部门凝聚力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.部门成员团结一致，奋发向上，所有成员感情很好，其乐融融，有归属感</p>"
            + "<p>7-8.部门感情较好，部门成员能按要求工作，也较有热情</p>"
            + "<p>5-6.部门成员合作中有时分歧且不能及时解决，导致工作热情降低，内部感情淡薄</p>"
            + "<p>3-4.部门成员无法合作，所有人工作热情很低，怨言重，而且十分松散</p>"
        + "</div>";

        this.str5 = 
        "<div id=\"gthznl\">"
            +"<p><h3  style=\"text-align:center\">沟通合作能力</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.能跟其他兄弟部门很好的沟通交流合作，尊重其他部门工作，相处十分和谐，合作效果很好</p>"
            + "<p>7-8.跟兄弟部门合作效果尚可，偶尔发生分歧，但最终能共同完成任务</p>"
            + "<p>5-6.跟兄弟部门合作时有分歧且不能及时解决，导致关系较差，影响了合作关系</p>"
            + "<p>3-4.跟兄弟部门成员完全无法合作，以本部门为中心，完全不顾其他部门</p>"
        + "</div>";
        
        this.str6 = 
        "<div id=\"bmcybx\">"
            +"<p><h3  style=\"text-align:center\">部门成员表现</h3></p>"
            +"<p>评价标准:</p>"
            + "<p>9-10.部长级能发挥应有的带头作用，干事能够听从部长级的安排，部门内工作进行的有条不紊</p>"
            + "<p>7-8.部长级能够管理部门，但干事偶尔有不听从部长级安排的行为，但部门运作尚能进行</p>"
            + "<p>5-6.部长级难以发挥其作用，干事不听从部长级安排，影响部门运作</p>"
            + "<p>3-4.部长级完全无法管理整个部门，干事作风十分随意，严重影响部门运作</p>"
        + "</div>";
    }
    
    var objReturn = new objBMKH();
    return objReturn;
}


//获取部门考核表数据
function Get_BMKH(show_func,post_func)
{
    
    function obj_BMKH(json_BMKH)
    {
        this.status = json_BMKH.status;//是否为可提交状态
        
        this.BMKH_BZ = new BMKH_BZ();
        
        function obj_BM(BM)
        {
            this.bm = arrDepartName[BM.bm-1]; //部门名字
            this.pj = TranStr_Get(BM.pj);
            this.df0 = BM.df0; //工作量/工作难度
            this.df1 = BM.df1; //工作完成效果
            this.df2 = BM.df2; //工作态度
            this.df3 = BM.df3; //纪律性
            this.df4 = BM.df4; //部门凝聚力
            this.df5 = BM.df5; //沟通合作能力
            this.df6 = BM.df6; //部门成员表现
        }
        this.arrBM = new Array();
        for(var i = 0; i < json_BMKH.BM.arrBM.length; ++i)
        {
            this.arrBM.push(new obj_BM(json_BMKH.BM.arrBM[i]));
        }
        
        this.arrBuMen = new Array();
        for(var i = 0; i < json_BMKH.BuMen.length; ++i)
        {
            this.arrBuMen.push({"name":TranDigToText(json_BMKH.BuMen[i].name)});
        }

        this.TYBM = json_BMKH.TYBM;
        this.hadSubmit=json_BMKH.hadSubmit;
    }
    try
    {
        if(debug())
            throw("ajax");
        //ajax请求，接收当前账号的个人信息
    
        var obj;
        $.ajax({
            url:URL+"/funcbmkh",
            data:{'year':year,'month':month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=new obj_BMKH(result);
                show_func(obj,post_func);
            }
        });     
    }
    catch(err)
    {
        errmsg();
    }
}


//把部门考核表的填写的内容传给服务器
function Post_BMKH(obj_BMKH,success_func)//obj_BMKH为Get_BMKH()定义的对象
{
    var _arrBM = new Array();
    for(var i = 0; i < obj_BMKH.arrBM.length; ++i)
    {
        _arrBM.push(
                        {
                            "bm":arrDepartName.indexOf(obj_BMKH.arrBM[i].bm)+1, //部门名字
                            "pj":obj_BMKH.arrBM[i].pj,
                            "df0":obj_BMKH.arrBM[i].df0, //工作量/工作难度
                            "df1":obj_BMKH.arrBM[i].df1, //工作完成效果
                            "df2":obj_BMKH.arrBM[i].df2, //工作态度
                            "df3":obj_BMKH.arrBM[i].df3, //纪律性
                            "df4":obj_BMKH.arrBM[i].df4, //部门凝聚力
                            "df5":obj_BMKH.arrBM[i].df5, //沟通合作能力
                            "df6":obj_BMKH.arrBM[i].df6, //部门成员表现
                        }
                    );
    }
    /*
    var _arrBuMen = new Array();
    for(var i = 0; i < obj_BMKH.arrBuMen.length; ++i)
    {
        _arrBuMen.push({"name":TranTextToDig(obj_BMKH.arrBuMen[i].name)});
    }
    */
    var json_Post_BMKH = 
    {
        "year" : year,
        "month" : month,
        "status":obj_BMKH.status,//是否为可提交状态
        "hadSubmit":obj_BMKH.hadSubmit,
        "BM":
        {
            "sum":obj_BMKH.arrBM.length,//部门数目
            "arrBM":_arrBM,
        },
        //"BuMen":_arrBuMen,
        "TYBM":obj_BMKH.TYBM,//推优部门
    };
    console.log(json_Post_BMKH);
    try{
        if(debug())
            return true;
    //服务器成功接收信息，则返回true，否则返回false
    
        //ajax请求
        var obj;
        $.ajax({
            url:URL+"/post_bmkh",
            data:json_Post_BMKH,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                console.log('success');
                success_func(result.flagCrud);
            }
        });
    }
    catch(err){success_func(false);}
}


//获取优秀部长评定表数据
function Get_YXBZPD(show_func,post_func)
{
    try
    {
        if(debug())
            throw("ajax");
        //ajax请求，接收当前账号的个人信息
        
        var obj;
        $.ajax({
            url:URL+"/funcyxbz",
            data:{'year':year,'month':month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=result;
                var json_YXBZPD = obj;
                for(var i=0;i<json_YXBZPD.arrYXBZPDlist.length;i++)
                {
                    var index=json_YXBZPD.arrYXBZPDlist[i].depart;
                    json_YXBZPD.arrYXBZPDlist[i].depart=arrDepartName[index-1];
                }
                show_func(json_YXBZPD,post_func);
            }
        }); 
        
    }
    catch(err)
    {
        
        errmsg();
    }
}


//获取主席团反馈表数据
function Get_ZXTFK(show_func,post_func)
{
    //这就是最后要返回的类了
    function classZXTFK()
    {
        this.arrSorted=new Array();
        this.arrExcMin = new Array();
        this.arrMinFeedBack = new Array();
        this.arrAnonymity = new Array();
    }
    try
    {
        console.log("主席团反馈");
        console.log(year+"+"+month);
        if(debug())
            throw("ajax");
        var obj;
        $.ajax({
            url:URL+"/jszxtfk",
            data:{"year":year,"month":month},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                var json_ZXTFK = result;
                var objZXTFK=new classZXTFK;
                objZXTFK.arrSorted=json_ZXTFK.classSortDepart.arrSorted;
                objZXTFK.arrExcMin =json_ZXTFK.ExcMinster;
                objZXTFK.arrMinFeedBack=json_ZXTFK.classSituation.arrMinFeedBack;
                objZXTFK.arrAnonymity=json_ZXTFK._arrAnonymity;
                for(var i = 0; i < objZXTFK.arrMinFeedBack.length; ++i)
                {
                    objZXTFK.arrMinFeedBack[i].selfAssess = TranStr_Get(objZXTFK.arrMinFeedBack[i].selfAssess);
                    objZXTFK.arrMinFeedBack[i].feedBack = TranStr_Get(objZXTFK.arrMinFeedBack[i].feedBack);
                }
                for(var i = 0; i < objZXTFK.arrAnonymity.length; ++i)
                {
                    objZXTFK.arrAnonymity[i].anonymityFeedBack = TranStr_Get(objZXTFK.arrAnonymity[i].anonymityFeedBack);
                }
                show_func(objZXTFK,post_func);
            }
        }); 
        
    }
    catch(err)
    {
        errmsg();
    }
    
}


//发送优秀部长评定表的结果
function Post_YXBZPD(arrIDlist,success_func)
{   
    //arrIDlist是一组学号（ID），学号对应的就是被推选为优秀部长的
    console.log(arrIDlist);
    var jsonArr=new Array();
    
    for(var i=0;i<arrIDlist.length;i++)
    {
        var jsonID={"account":arrIDlist[i]};
        jsonArr[i]=jsonID;
    }
    var jsonPost={
    "year" : year,
    "month" : month,
    "arrIDlist":jsonArr};
    /*
    var json={
    "arrIDlist":
    [
        {"account":"2012052207"},
        {"account":"2013052207"},
    ],
    };
    
    */
    console.log(jsonPost);
    try
    {
        if(debug())
            return true;
        
    //发送成功返回true，失败返回false
        //ajax请求
        
        var obj;
            $.ajax({
            url:URL+"/post_yxbz",
            data:jsonPost,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=result;
                success_func(obj.flagCrud);
            }
        });
    }
    catch(err){
        success_func(false);
    }
}


//获取考核进程控制表的数据
function Get_KHJCKZ(show_func,post_func)
{
        //ajax请求
        
    var obj;
        $.ajax({
        url:URL+"/funcControl",
        data:{"year":year,"month":month},
        async:true,
        dataType:"json",
        type:"POST",
        success:function(result){show_func(result,post_func);}
    }); 
        
/*  var json_Get_KHJCKZ = 
    {
        "KSKH":0,//开始本月考核
        "KSPD":0,//开始优秀部长评定
        "FBJG":0,//发布结果
    }; */

}


//发送考核进程控制表的数据回数据库
function Post_KHJCKZ(obj_KHJCKZ,success_func)
{
    console.log(obj_KHJCKZ);
    console.log('going to post khjckz data');
    $.ajax({
        url:URL+"/funcGetControl",
        data:{"year":year,"month":month,"KHJCKZ":obj_KHJCKZ},
        async:true,
        dataType:"json",
        type:"POST",
        success:function(result){success_func(result.textBack);}
    }); 
}


//获取其他情况加减分数据
function Get_QTQKJJF(show_func,post_func)
{
    try
    {
        if(debug())
            throw("ajax");
    //ajax请求

        var obj;
        $.ajax({
            url:URL+"/funcqt",
            data:{'year':year,'month':month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=result;
                if (obj==null) obj=[];
                for(var i=0;i<obj.length;i++){
                    var persons = obj[i]['persons'];
                    for(var j = 0; j < persons.length; ++j){
                        persons[j]['liyou'] = TranStr_Get(persons[j]['liyou']);
                    }
                }
                show_func(obj,post_func);
            }
        }); 
    }catch(err){
        console.log(err);
        errmsg();
    }
}


//发送其他情况加减分数据
function POST_QTQKJJF(obj_QTQKJJF,success_func)
{
    obj_QTQKJJF.year = year;
    obj_QTQKJJF.month = month;
    try
    {
        if(debug())
            throw("ajax");
        //发送成功返回true，失败返回false
            //ajax请求
        var obj;
        $.ajax({
            url:URL+"/post_qt",
            data:{
                'year':year,
                'month':month,
                'personsarr':obj_QTQKJJF,
            },
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                obj=result;
                success_func(obj.flagCrud);
            }
        });
    }
    catch(err)
    {
        console.log(err);
    }
}


//获取优秀评定限制表数据
function Get_YXPDXZ(show_func,post_func)
{
    try
    {
        if(debug())
            throw("ajax");
        
        //ajax请求
        var obj;
        $.ajax({
            url:URL+"/funcyxchxz",
            data:{'year':year,'month':month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                show_func(result,post_func);
            }
        });   
    }
    catch(err)
    {
        errmsg();
    }
}


//发送优秀评定限制表
function Post_YXPDXZ(obj_YXPDXZ,success_func)
{
    //应该可以直接传obj_YXPDXZ对象回去，因为这个就是json对象格式的，可以不用进行下面的转换
    obj_YXPDXZ.year = year;
    obj_YXPDXZ.month = month;
    
    var json_Post_YXPDXZ = obj_YXPDXZ;

    try
    {
        if(debug())
            return true;
    //ajax请求
        console.log('即将发送优秀评定限制数据');
        console.log(json_Post_YXPDXZ);
        $.ajax({
            url:URL+"/post_yxchxz",
            data:json_Post_YXPDXZ,
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                console.log(result);
                success_func(true);
            }
        });
    }
    catch(err)
    {
        console.log(err);
    }
}

//获取未完成情况数据
function Get_CKWWCQK(show_func,post_func)
{
    try
    {
        if(debug())
            throw("ajax");
        //ajax代码
        //ajax请求
        var obj;
        $.ajax({
            url:URL+"/funcUnfinished",
            data:{'year':year,'month':month,},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                show_func(result,post_func);
            }
        }); 
    }
    catch(err)
    {
        errmsg();
    }
            
}
//获取违纪登记表数据
function Get_WJDJ(iType,show_func,post_func)
{
    
    //iType是指表的种类,比如0表示秘书处制度违纪登记表
    try
    {
        if(debug())
            throw("ajax");
        //ajax代码
        
        var obj;
        $.ajax({
            url:URL+"/funcbmwg",
            data:{'year':year,'month':month,'type':iType+1},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){show_func(result,post_func)}
        }); 
    }
    catch(err)
    {
        errmsg();
    }
}
//将违纪登记表数据发送到服务器
function Post_WJDJ(obj,iType,success_func)
{
    try
    {
        if(debug())
            return true;
        //ajax代码,obj是获取的时候一样的格式
        var back;
        $.ajax({
            url:URL+"/post_bmwg",
            data:{'arrBMWG':obj,'type':iType+1,'year':year,'month':month},
            async:true,
            dataType:"json",
            type:"POST",
            success:function(result){
                success_func(result.flagCrud);
            }
        }); 
    }
    catch(err)
    {
        console.log(err);
    }
}