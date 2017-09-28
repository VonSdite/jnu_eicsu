<?php
class CurdDataHolder
{
    var $curd_ctrl;
    var $sys_init_ctrl;
    public function __construct()
    {
        $this->curd_ctrl = new PersonCrudController();
        $this->sys_init_ctrl = new SysInitController();
    }  
    //Imp层主要是为了增加提示信息, 一般不干什么正事
    private function removePersonImp($account)
    {
        if(0==$this->curd_ctrl->removePerson($account)){
            echo "成功删除用户".$account."</br>";
        }else{
            echo "删除用户失败".$account."</br>";
        }   
    }

    private function modifyAccountImp($account_old, $account_new)
    {
        $this->curd_ctrl->modifyAccount($account_old, $account_new);
    }

    private function addPersonWithFeedback($account,$name,$type,$apartment,&$flagInitPerson)
    {
        $this->curd_ctrl->addPerson($account,$name,$type,$apartment,$flagInitPerson);
    }

    private function addPersonImp($account, $name, $type,$apartment)
    {
        $flagInitPerson=1;
        $this->addPersonWithFeedback($account,$name,$type,$apartment,$flagInitPerson);
        if($flagInitPerson==1)
        {
            echo "成功添加".$account."-".$name."</br>";
            $this->sys_init_ctrl->initKKBTable();
        }else if($flagInitPerson==0)
        {
            echo "添加".$account."-".$name."失败</br>";
        }
    }

    //人员信息初始化：主席团，部长级，人力干事, 初始化系统
    private function sysInitImp()
    {
        //按照格式添加数据,参数分别为：账号，名字，类型，标志参数
        //类型1代表非人力干事,2代表人力干事,3代表部长级,4代表主席团
        //部门1秘书处    2人力资源部      3宣传部        4信息编辑部
        //5学术部  6体育部        7KSC联盟  8组织部        9文娱部    
        //10公关部 11心理服务部 12主席团
        $person_model=new Model("Person");
        $authority_model=new Model("Authority");
        $timetable_model=new Model("Timetable");
        $rlgj_model=new Model("Rlgj");
        $president_model=new Model("Rlgj");
        $bmwgfzr_model=new Model("Bmwgfzr");
        echo "成员信息初始化开始</br>";
        $flagInitPerson=1;
        $person_info=$person_model->where("account!=0")->select();
        if(count($person_info)>0)
        {
            $flagInitPerson=2;
            echo "数据库表tbl_person已有数据，成员添加失败</br>";
            return;
        }
        $this->sysInitHere($flagInitPerson);
        echo "成员信息初始化完成</br>";
        if($flagInitPerson==1)
        {
            echo "本次成员信息初始化成功</br>";
            unset($data);
            $data['is_init']=1;
            $authority_model->where("id>0")->data($data)->save();
            $this->sys_init_ctrl->initKKBTable();
            $this->sys_init_ctrl->initRlgj();
            $this->sys_init_ctrl->initZxzg();
            $this->sys_init_ctrl->initBmwgfzr();
        }
        else if($flagInitPerson==0)
        {
            $person_model->where("account!=0")->delete();
            $timetable_model->where("account!=0")->delete();
            $rlgj_model->where("account!=0")->delete();
            $president_model->where("account!=0")->delete();
            $bmwgfzr_model->where("account!=0")->delete();
            echo "本次成员信息初始化失败</br>";
        }

    }

    public function globalSysInit()
    {
        $this->sysInitImp();
    }

    //把要删的人的学号写在这里, 执行函数时会把他们删掉
    public function removePersonHere()
    {
        $this->removePersonImp("2016052563");
        $this->removePersonImp("2016052452");
        $this->removePersonImp("2016053296");
        $this->removePersonImp("2016053290");
        // $this->removePersonImp("2016054294");
        // $this->removePersonImp("2016052636");
        // $this->removePersonImp("2016054298");
        // $this->removePersonImp("2015053424");
        // $this->removePersonImp("2015053416");
        // $this->removePersonImp("2015054139");
        // $this->removePersonImp("2015053547");
        // $this->removePersonImp("2015052242");
        // $this->removePersonImp("2015053464");
        // $this->removePersonImp("2015053402");
        // $this->removePersonImp("2015052341");
        // $this->removePersonImp("2015052433");
        // $this->removePersonImp("2015052249");
        // $this->removePersonImp("2015053526");
        // $this->removePersonImp("2015053430");
    }

    //把增加的人的学号等信息写在这里, 执行函数时会把他们添加到系统
    public function addPersonHere()
    {
        // $this->addPersonImp("2015052288","王晓腾",3,11);
        // $this->addPersonImp("2016052636","林嘉南",1,6);
        // $this->addPersonImp("2015052288","王晓腾",1,1);
    }

    //把要修改学号的人的新旧学号写在这里, 执行函数的时候把他们修改了
    public function modifyAccountHere()
    {
        // $this->modifyAccountImp("2013050549","2014050549");
    }

    //全局初始化的数据放在这里
    public function sysInitHere(&$flagInitPerson)
    {
        //添加主席团成员
        $this->addPersonWithFeedback("2014052553","陈少锋",4,12,$flagInitPerson);
        $this->addPersonWithFeedback("2014052984","俞静",4,12,$flagInitPerson);
        $this->addPersonWithFeedback("2014052988","朱键楠",4,12,$flagInitPerson);
        $this->addPersonWithFeedback("2014052457","孔智生",4,12,$flagInitPerson);
        $this->addPersonWithFeedback("2014052409","罗宝敏",4,12,$flagInitPerson);
        $this->addPersonWithFeedback("2014052992","章琬苓",4,12,$flagInitPerson);

        //添加秘书处部长级
        $this->addPersonWithFeedback("2015052342","叶敬南",3,1,$flagInitPerson);
        $this->addPersonWithFeedback("2015053529","王婧",3,1,$flagInitPerson);
        //添加秘书处成员
        $this->addPersonWithFeedback("2016054279","刘凌毅",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016054275","刘丽萍",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016052600","曾志豪",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016053288","梁淑曼",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016052511","黄靖雯",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016052441","梁晓曼",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016052530","卢仕铭",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016054239","杨雪婷",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016052606","刘焕森",1,1,$flagInitPerson);
        $this->addPersonWithFeedback("2016052581","石志超",1,1,$flagInitPerson);

        //添加人力资源部部长级
        $this->addPersonWithFeedback("2015052416","范昊东",3,2,$flagInitPerson);
        $this->addPersonWithFeedback("2015052394","谢智贤",3,2,$flagInitPerson);
        $this->addPersonWithFeedback("2015056952","莫希文",3,2,$flagInitPerson);
        //添加人力资源部干事
        $this->addPersonWithFeedback("2016052349","吴焕维",2,2,$flagInitPerson);
        $this->addPersonWithFeedback("2016052585","郭育城",2,2,$flagInitPerson);   
        $this->addPersonWithFeedback("2016052443","叶楚荣",2,2,$flagInitPerson);
        $this->addPersonWithFeedback("2016052591","薛国伦",2,2,$flagInitPerson);
        $this->addPersonWithFeedback("2016054284","曾琭媛",2,2,$flagInitPerson);  
        $this->addPersonWithFeedback("2016054264","李建燐",2,2,$flagInitPerson);   
        $this->addPersonWithFeedback("2016052568","陆庆霖",2,2,$flagInitPerson);
        $this->addPersonWithFeedback("2016052376","张泽锋",2,2,$flagInitPerson);
        $this->addPersonWithFeedback("2016053294","卢怡禾",2,2,$flagInitPerson);  
        $this->addPersonWithFeedback("2016053306","谭心屿",2,2,$flagInitPerson);  
        $this->addPersonWithFeedback("1234567803","   ",2,2,$flagInitPerson);  
        
        //添加宣传部部长级
        $this->addPersonWithFeedback("2015054141","马博",3,3,$flagInitPerson);
        $this->addPersonWithFeedback("2015052261","姚洁",3,3,$flagInitPerson);
        $this->addPersonWithFeedback("2015053501","郭舒馨",3,3,$flagInitPerson);
        $this->addPersonWithFeedback("2015053442","洪超然",3,3,$flagInitPerson);
        //添加宣传部成员
        $this->addPersonWithFeedback("2016052595","周弈",1,3,$flagInitPerson);
        $this->addPersonWithFeedback("2016052518","谢文丽",1,3,$flagInitPerson);
        
        $this->addPersonWithFeedback("2016052603","王彦琴",1,3,$flagInitPerson);
        $this->addPersonWithFeedback("2016053307","马小迪",1,3,$flagInitPerson);
        $this->addPersonWithFeedback("2016054266","曾蓉",1,3,$flagInitPerson);
        $this->addPersonWithFeedback("2016052353","刘睿",1,3,$flagInitPerson);
        $this->addPersonWithFeedback("2016053308","李松峰",1,3,$flagInitPerson);
        $this->addPersonWithFeedback("2016052614","李曼菁",1,3,$flagInitPerson);
        $this->addPersonWithFeedback("2016052362","伍子俊",1,3,$flagInitPerson);
        
        //添加信息编辑部部长级
        $this->addPersonWithFeedback("2015053516","王毅林",3,4,$flagInitPerson);
        $this->addPersonWithFeedback("2015053409","桂春垚",3,4,$flagInitPerson);
        $this->addPersonWithFeedback("2015050333","涂真",3,4,$flagInitPerson);
        //添加信息编辑部成员
        $this->addPersonWithFeedback("2016052566","巩浩琛",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016050219","范宏亮",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016052394","黄振宁",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016052319","李可晴",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016054280","梁康宁",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016052617","吴轩宇",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016052458","肖卓宇",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016054241","杨艳",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016054289","叶雨欣",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016054269","吴心怡",1,4,$flagInitPerson);
        $this->addPersonWithFeedback("2016054268","童逆寒",1,4,$flagInitPerson);
        
        //添加学术部部长级
        $this->addPersonWithFeedback("2015052250","黄学林",3,5,$flagInitPerson);
        $this->addPersonWithFeedback("2015052253","梁慧蓝",3,5,$flagInitPerson);
        $this->addPersonWithFeedback("2015052359","李赞",3,5,$flagInitPerson);
        //添加学术部成员
        $this->addPersonWithFeedback("2016052509","蓝卓杰",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052316","林民耀",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052594","黎永熙",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052333","温添金",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052339","黄夏",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052485","罗振豪",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052573","冯冬秀",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016054295","刘欣",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052309","覃筱茜",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016052325","骆颖莹",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016054276","刘菊蓉",1,5,$flagInitPerson);
        $this->addPersonWithFeedback("2016053286","李妍如",1,5,$flagInitPerson);
        
        //添加体育部部长级
        $this->addPersonWithFeedback("2015052437","蔡宗辉",3,6,$flagInitPerson);
        $this->addPersonWithFeedback("2015053484","袁紫薇",3,6,$flagInitPerson);
        $this->addPersonWithFeedback("2015052337","黎新智",3,6,$flagInitPerson);
        $this->addPersonWithFeedback("2015053486","陈蓉",3,6,$flagInitPerson);
        //添加体育部成员
        $this->addPersonWithFeedback("2016052628","严文宇",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016054320","庞博",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052636","林嘉南",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016050225","陈子瑶",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016054312","赵望雪",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052439","关世裕",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052396","袁伟聪",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052393","林志翰",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052529","沈德",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052552","黄宏俊",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052510","郭家瑜",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016054277","唐倩",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052302","郭泽钊",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052340","向铭",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052588","李林烁",1,6,$flagInitPerson);
        $this->addPersonWithFeedback("2016052368","张镇",1,6,$flagInitPerson);
        
        // //添加JDC部长级
        // $this->addPersonWithFeedback("2014050378","周杉杉",3,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2014052575","杨立舜",3,7,$flagInitPerson);
        $this->addPersonWithFeedback("1234567802","  ",3,7,$flagInitPerson);
        //添加JDC成员
        $this->addPersonWithFeedback("1234567801"," ",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015053468","丁文倩",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015052264","郑棉鑫",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015052282","王壁鸿",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015052380","肖进祥",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015050323","苗克怡",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015053485","钟明",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015054137","张竞予",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015052420","沈文锐",1,7,$flagInitPerson);
        // $this->addPersonWithFeedback("2015053526","许明军",1,7,$flagInitPerson);
        
        //添加组织部长级
        $this->addPersonWithFeedback("2015053418","张子睿",3,8,$flagInitPerson);
        $this->addPersonWithFeedback("2015052273","单嘉栋",3,8,$flagInitPerson);
        $this->addPersonWithFeedback("2015052274","陈晓红",3,8,$flagInitPerson);
        //添加组织部成员
        $this->addPersonWithFeedback("2016052631","许程",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016054288","李艳松",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016052414","叶俊杰",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016054306","曹琦",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016054292","邵鹃鹃",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016054287","汪强",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016052500","吴振恒",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016054286","王璐",1,8,$flagInitPerson);
        $this->addPersonWithFeedback("2016052312","董树威",1,8,$flagInitPerson);
        
        //添加文娱部长级
        $this->addPersonWithFeedback("2015054103","陈申",3,9,$flagInitPerson);
        $this->addPersonWithFeedback("2015052404","黄浩贤",3,9,$flagInitPerson);
        $this->addPersonWithFeedback("2015052305","李立楷",3,9,$flagInitPerson);
        $this->addPersonWithFeedback("2015050331","王子怡",3,9,$flagInitPerson);
        //添加文娱部成员
        $this->addPersonWithFeedback("2016054309","李锐",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016052599","王健",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016054225","林晴",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016054258","石玲",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016052604","冉芸锋",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016054249","李煜炳",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016050217","宋雪松",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016052433","陈嘉涛",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016052404","罗晓宇",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016054310","肖燕",1,9,$flagInitPerson);
        $this->addPersonWithFeedback("2016054265","谭笑",1,9,$flagInitPerson);
        
        //添加公关部长级
        $this->addPersonWithFeedback("2015052397","王和钰",3,10,$flagInitPerson);
        $this->addPersonWithFeedback("2015053406","何菁菁",3,10,$flagInitPerson);
        $this->addPersonWithFeedback("2015053546","查宽",3,10,$flagInitPerson);
        //添加公关部成员
        $this->addPersonWithFeedback("2016052334","陈佳宏",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016054270","李家玮",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016052311","刘成",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016052523","邓展菲",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016052520","陈钦浩",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016053303","吴洪亮",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016052361","冯思健",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016054317","闫鹏",1,10,$flagInitPerson);
        $this->addPersonWithFeedback("2016054282","普俊峰",1,10,$flagInitPerson);
        
        //添加心理服务部部长级
        $this->addPersonWithFeedback("2015052332","黄柠",3,11,$flagInitPerson);
        $this->addPersonWithFeedback("2015052288","王晓腾",3,11,$flagInitPerson);
        //添加心理服务部成员
        $this->addPersonWithFeedback("2016054305","王希",1,11,$flagInitPerson);
        $this->addPersonWithFeedback("2016052586","林榕发",1,11,$flagInitPerson);
        $this->addPersonWithFeedback("2016053293","李雅勤",1,11,$flagInitPerson);
        $this->addPersonWithFeedback("2016052473","蔡子灏",1,11,$flagInitPerson);
        $this->addPersonWithFeedback("2016054255","杨书涵",1,11,$flagInitPerson);
        $this->addPersonWithFeedback("2016052374","黄博浩",1,11,$flagInitPerson);
        $this->addPersonWithFeedback("2016057452","赵书辰",1,11,$flagInitPerson);
    }

    
};

?>
