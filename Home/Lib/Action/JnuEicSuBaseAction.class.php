<?php
/*
学生会基础Action类
*/
import('@.ORG.Logger');

class JnuEicSuBaseAction extends Action
{
    var $logger;
    var $log_level;
    var $all_depart_num;
    var $zxt_depart_num;
    var $arr_depart_name;
    var $arr_type_name;
    var $arr_week;
    var $arr_parity;
    var $weiji_type_num;//表示有几种违纪登记表
    var $weiji_type_map;//数字对应违纪登记表的种类
    public function __construct()
    {
        parent::__construct();
        
        $logger = new DbLogger();
        $this->logger = $logger;
        $this->log_level = 0;
        $this->all_depart_num = 11;
        $this->zxt_depart_num = $this->all_depart_num+1;
        $this->arr_depart_name = Array("秘书处","人力资源部","宣传部",
            "信息编辑部","学术部","体育部","JDC","组织部","文娱部",
            "公关部","心理服务部","主席团");
        $this->arr_type_name = Array("干事","人力干事","部长级","主席团");
        $this->arr_week = Array("sun","mon","tue","wed","thu","fri","sat");
        $this->arr_parity = Array(
            "有课"=>3,
            "单周有课"=>2,
            "双周有课"=>1,
            "没课"=>0,
        );
        $this->weiji_type_num = 6;
        $this->weiji_type_map = Array(
            "秘书处制度"=>1,
            "人力资源部制度"=>2,
            "司仪礼仪队制度"=>3,
            "宣传部制度"=>4,
            "信息编辑部制度"=>5,
            "公关部制度"=>6,

        );
    }  
    public function log($info)
    {
        if($this->log_level>0){
            $this->logger->log($info);
        }
    }

    //调用—_encode()函数，将数组进行编码转哈
    public function _encode($arr)
    {
        $na = array();
        foreach ( $arr as $k => $value ) {  
            $na[$this->_urlencode($k)] = $this->_urlencode ($value);  
        }
        //return addcslashes(urldecode(json_encode($na)),"\\r");
        return urldecode(json_encode($na));
    }

    public function _urlencode($elem)
    {
        if(is_array($elem)){
            foreach($elem as $k=>$v){
                $na[$this->_urlencode($k)] = $this->_urlencode($v);
            }
            return $na;
        }
        return urlencode($elem);
    } 

    //每个需要用到判断用户是否登录的地方，都要调用这个方法，每个控制器都有相同的一个
    //判断当前请求是否处于登陆状态
    public function judgelog()
    {
        $judgelog=1;
        session_name('LOGIN');
        session_start();
        if(empty($_SESSION['account'])||empty($_SESSION['random']))
        {
            $judgelog=0;
        }
        else
        {
            $account=$_SESSION['account'];
            $random=$_SESSION['random'];
            $login_model=new Model("Login");
            $login_info=$login_model->where("account=$account and random=$random")->find();
            if(!$login_info)
            {
                //随机数不一样，覆盖掉            
                $judgelog=0;        
            }

        }
        return $judgelog;
    }
    
    //检查登陆状态
    public function login_required()
    {
        $this->log('in login_required');
        //拒绝未登录访问
        session_name('LOGIN');
        session_start();
        if (!$this->judgelog())
            $this->redirect('Login/index');
    }
}

?>