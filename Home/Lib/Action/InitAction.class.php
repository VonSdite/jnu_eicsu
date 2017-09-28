<?php
/*
 *系统初始化说明：
 1、最基本的数据要求包括：人员信息初始化、空课表、人力干事跟进部门、主席主管部门，如果没能达到这是个要求，不能使用绩效考核和外调
 2、满足了最基本的数据要求之后，根据时间初始化一次绩效考核
 */
import('@.Action.CurdDataHolder');
import('@.Action.SysInitController');
import('@.Action.PersonCrudController');

class InitAction extends JnuEicSuBaseAction
{
    public function __construct()
    {
        parent::__construct();
        
    }
    //管理员登录界面
    public function login()
    {
        $this->display();
    }
    //管理员登录检查
    //check为登录验证界面
    public function check()
    {
        $this->login_required();
        $account = $_POST['user_login_name'];
        $password = $_POST['user_login_pw'];
        $person_model = new Model("Person");
        $flag = 0; //验证不通过即为0
        if ($person_info = $person_model->where("account=$account")->find()) {
            $password_base = $person_info['password'];
            if ($password_base == $password || md5($password_base) == $password) {
                $flag = 1;
            }
        }
        if ($flag == 1) {
            $random = rand(0, 100);
            $random .= rand(0, 100);
            $random .= rand(0, 100);
            //用户账号、随机数同时存入数据库和SESSION中
            $_SESSION['account'] = $account;
            $_SESSION['random'] = $random;
            unset($data);
            $data['account'] = $account;
            $data['random'] = $random;
            $login_model = new Model("Login");
            if ($login_info = $login_model->where("account=$account")->find()) {
                //直接覆盖
                $login_model->where("account=$account")->save($data);
            } else {
                //不存在则增加
                $login_model->data($data)->add();
            }
            
            //判断是否保持登录状态
            if ($_POST['keep_login'] == "keep") {
                setcookie("account", $account, time() + 7 * 24 * 3600); //cookie时间设置为7天，一周时间
                setcookie("password", $password, time() + 7 * 24 * 3600);
                
            } else {
                setcookie("account", "", 0);
                setcookie("password", "", 0);
                
            }
            $this->redirect("Init/index");
        } else
            $this->redirect("Init/login");
    }
    
    //管理界面
    public function index()
    {
        $this->login_required();
        $person_model = new Model("Person");
        $bz_account = $_SESSION['account'];
        $person_info = $person_model->where("account=$bz_account")->find();
        if ($person_info['apartment'] != 2 || $person_info['type'] != 3)
            $this->redirect("Index/index");
        //如果没有满足最基本的人员要求，拒绝访问
        $authority_model = new Model("Authority");
        $authority_info = $authority_model->find();
        if ($authority_info['is_init'] == 1)
            $this->display();
        else {
            $this->redirect("Index/index");
        }
    }
    //向前端发送主席主管部门,人力跟进部门，违规登记负责人信息
    public function getJsonAdmin()
    {
        $person_model = new Model("Person");
        $president_model = new Model("President");
        $rlgj_model = new Model("Rlgj");
        $bmwgfzr_model = new Model("Bmwgfzr");
        //主席团
        $person_info = $person_model->where("type=4")->select();
        foreach ($person_info as $v) {
            $account = $v['account'];
            $name = $v['name'];
            $president_info = $president_model->where("account=$account")->find();
            $presidentArr = explode("|", $president_info['apartment']);
            for ($i = 0; $i < count($presidentArr); $i++) {
                $department[] = Array(
                    'num' => $presidentArr[$i]
                );
            }
            $arrZXT[] = Array(
                'account' => $account,
                'name' => $name,
                'department' => $department
            );
            unset($department);
        }
        //人力干事跟进
        $person_info = $person_model->where("type=2 and apartment=2")->select();
        foreach ($person_info as $v) {
            $account = $v['account'];
            $name = $v['name'];
            $rlgj_info = $rlgj_model->where("account=$account")->select();
            $department = Array();
            for ($i = 0; $i < count($rlgj_info); $i++) {
                $department[] = Array(
                    'num' => $rlgj_info[$i]['apartment']
                );
            }
            $arrRLGS[] = Array(
                'account' => $account,
                'name' => $name,
                'department' => $department
            );
            unset($department);
        }
        
        //指定主席
        $president_info = $president_model->where("is_sub='n'")->find();
        if (empty($president_info['account'])) {
            $person_info = $person_model->where("type=4")->find();
            $chairmanAccount = $person_info['account'];
            $chairmanName = $person_info['name'];
        } else {
            $chairmanAccount = $president_info['account'];
            $person_info = $person_model->where("account=$chairmanAccount")->find();
            $chairmanName = $person_info['name'];
        }
        $chairman = Array(
            'account' => $chairmanAccount,
            'name' => $chairmanName
        );
        
        //违规登记负责人
        $bmwgfzr_info = $bmwgfzr_model->where("type=1")->find();
        $MSWJDJR = $bmwgfzr_info['account'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=2")->find();
        $RLWJDJR = $bmwgfzr_info['account'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=3")->find();
        $XCWJDJR = $bmwgfzr_info['account'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=4")->find();
        $XBWJDJR = $bmwgfzr_info['account'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=5")->find();
        $GGWJDJR = $bmwgfzr_info['account'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=6")->find();
        $SYLYWJDJR = $bmwgfzr_info['account'];
        $person_info = $person_model->where("type!=4")->select();
        foreach ($person_info as $v) {
            $allStudentName[] = Array(
                'account' => $v['account'],
                'name' => $v['name']
            );
        }
        $arr = Array(
            'arrZXT' => $arrZXT,
            'arrRLGS' => $arrRLGS,
            'chairman' => $chairman,
            "MSWJDJR" => $MSWJDJR, //秘书处违纪登记人
            "RLWJDJR" => $RLWJDJR, //人力制度违纪登记人
            "XCWJDJR" => $XCWJDJR, //宣传部违纪登记人
            "XBWJDJR" => $XBWJDJR, //信编
            "GGWJDJR" => $GGWJDJR, //公关
            "SYLYWJDJR" => $SYLYWJDJR, //司仪礼仪队
            "allStudentName" => $allStudentName //把所有成员的账号和姓名给我		
        );
        echo $this->_encode($arr);
    }
    //接收前端信息，整理主席主管部门，人力跟进部门，违规登记负责人。
    public function postJsonAdmin()
    {
        $person_model = new Model("Person");
        $president_model = new Model("President");
        $rlgj_model = new Model("Rlgj");
        $bmwgfzr_model = new Model("Bmwgfzr");
        $flagCrud = 1;
        $chairman = $_POST['chairman'];
        $arrZXT = $_POST['arrZXT'];
        $arrRLGS = $_POST['arrRLGS'];
        $jsonWJDJ = $_POST['jsonWJDJ'];
        //主席
        unset($data);
        $data['is_sub'] = 'y';
        $president_info = $president_model->where("account!=0")->save($data);
        unset($data);
        $data['is_sub'] = 'n';
        $president_info = $president_model->where("account=$chairman")->save($data);
        if (false == $president_info) {
            $flagCrud = 0;
            $this->log("指定主席失败");
        }
        //主席主管部门
        for ($i = 0; $i < count($arrZXT); $i++) {
            unset($data);
            $zxt_account = $arrZXT[$i]['account'];
            for ($k = 0; $k < count($arrZXT[$i]['arrZGBM']); $k++) {
                $apartmentArr .= "|" . $arrZXT[$i]['arrZGBM'][$k]['num'];
            }
            $data['apartment'] = $apartmentArr;
            $president_info = $president_model->where("account=$zxt_account")->save($data);
            if (false === $president_info) {
                $flagCrud = 0;
                $this->log("主席主管部门分配失败");
            }
            unset($apartmentArr);
        }
        //人力跟进部门,
        $rlgj_model->where("account!=0")->delete();
        $arrRLGS = $_POST['arrRLGS'];
        for ($i = 0; $i < count($arrRLGS); $i++) {
            unset($data);
            $data['account'] = $arrRLGS[$i]['account'];
            for ($k = 0; $k < count($arrRLGS[$i]['department']); $k++) {
                $data['apartment'] = $arrRLGS[$i]['department'][$k]['num'];
                $rlgj_info = $rlgj_model->add($data);
                if (false == $rlgj_info) {
                    $flagCrud = 0;
                    $this->log("指定人力跟进部门失败");
                }
            }
        }
        //违规登记负责人
        $jsonWJDJ = $_POST['jsonWJDJ'];
        $data['account'] = $jsonWJDJ['MSWJDJR'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=1")->save($data);
        $data['account'] = $jsonWJDJ['RLWJDJR'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=2")->save($data);
        $data['account'] = $jsonWJDJ['XCWJDJR'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=3")->save($data);
        $data['account'] = $jsonWJDJ['XBWJDJR'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=4")->save($data);
        $data['account'] = $jsonWJDJ['GGWJDJR'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=5")->save($data);
        $data['account'] = $jsonWJDJ['SYLYWJDJR'];
        $bmwgfzr_info = $bmwgfzr_model->where("type=6")->save($data);
        $arr = Array(
            'flagCrud' => $flagCrud,
            'status' => $jsonWJDJ
        );
        echo $this->_encode($arr);
    }
    
    //要初始化系统时, 把这个改成公有方法, 记得修改CurdDataHolder里的数据
    private function globalSysInit()
    {
        $curd_data_holder = new CurdDataHolder();
        $curd_data_holder->globalSysInit();
    }
    
    //增加成员入口
    public function addPerson()
    {
        $curd_data_holder = new CurdDataHolder();
        $curd_data_holder->addPersonHere();
    }
    //修改账号入口
    public function modifyAccount()
    {
        $curd_data_holder = new CurdDataHolder();
        $curd_data_holder->modifyAccountHere();
    }
    //删除成员入口
    public function removePerson()
    {
        $curd_data_holder = new CurdDataHolder();
        $curd_data_holder->removePersonHere();
    }
    
    //时间获取函数
    private function funcsettime()
    {
        //$year=2014;//$_POST['year'];
        //$month=9;//$_POST['month'];
        $_POST['year'];
        $_POST['month'];
        $arr = Array(
            'year' => $year,
            'month' => $month
        );
        return $arr;
    }
    /*  //删除某年某月绩效考核
    public function unsetPerform()
    {
    $arr=$this->funcsettime();
    $year=$arr['year'];
    $month=$arr['month'];	
    $control_model=new Model("Control");
    $gszp_model=new Model("Gszp");
    $interact_model=new Model("Interact");
    $tuiyou_model=new Model("Tuiyou");
    $evaluate_model=new Model("Evaluate");	
    $bzzp_model=new Model("Bzzp");
    $gskh_model=new Model("Gskh");
    $bzkh_model=new Model("Bzkh");
    $bmkh_model=new Model("Bmkh");
    $wdcs_model=new Model("Wdcs");
    $chuqin_model=new Model("Chuqin");
    $diaoyan_model=new Model("Diaoyan");
    $qt_model=new Model("Qt");
    $gsfk_model=new Model("Gsfk");
    $bzfk_model=new Model("Bzfk");
    $bmfk_model=new Model("Bmfk");
    $yxchxz_model=new Model("Yxchxz");
    $bmwg_model=new Model("Bmwg");
    //干事部分
    $gszp_model->where("year=$year and month=$month")->delete();
    $interact_model->where("year=$year and month=$month")->delete();
    $tuiyou_model->where("year=$year and month=$month")->delete();
    $evaluate_model->where("year=$year and month=$month")->delete();
    $control_model->where("year=$year and month=$month")->delete();
    //部长部分
    $bzzp_model->where("year=$year and month=$month")->delete();
    $gskh_model->where("year=$year and month=$month")->delete();
    //主席部分
    $bzkh_model->where("year=$year and month=$month")->delete();
    $bmkh_model->where("year=$year and month=$month")->delete();
    //外调次数
    $wdcs_model->where("year=$year and month=$month")->delete();
    //出勤统计
    $chuqin_model->where("year=$year and month=$month")->delete();
    //调研采纳
    $diaoyan_model->where("year=$year and month=$month")->delete();
    //其他情况
    $qt_model->where("year=$year and month=$month")->delete();
    //反馈
    $gsfk_model->where("year=$year and month=$month")->delete();
    $bzfk_model->where("year=$year and month=$month")->delete();
    $bmfk_model->where("year=$year and month=$month")->delete();
    //优秀称号限制
    $yxchxz_model->where("year=$year and month=$month")->delete();
    //部门违规
    $bmwg_model->where("year=$year and month=$month")->delete();
    echo $year."年".$month."月的绩效考核数据删除完毕，可以重新启动该月份的绩效考核</br>";
    }
    
    */
    
}

?>
