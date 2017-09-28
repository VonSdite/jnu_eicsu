<?php
/*
* @author: dengzuoheng@gmail.com :代码都被我改成这样了, 作者应该得写我名字了...
* @date: 2016/4/27
*/
import('@.Action.PerformActionBase');

class PerformAction extends PerformActionBase
{
    public function __construct()
    {
        parent::__construct();
    }
    
    //绩效考核首页
    public function index()
    {
        $this->log('in the index');
        $this->login_required();
        $this->log('after login_required');
        //个人信息
        $account = $this->account();
        $this->log('after get account');
        $person_model = new Model("Person");
        $person_info = $person_model->where("account=$account")->find();
        $name = $person_info['name'];
        $link = "<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">" . $name . "</a>&nbsp;";
        $link .= "<a class=\"user_info\" id=\"login_info_user_center\" href=\"" . __APP__ . "/Center/index\">个人中心</a>&nbsp;";
        $link .= "<a class=\"user_info\" id=\"login_info_log_out\" href=\"" . __APP__ . "/Login/logout\">注销</a>";
        $this->assign('link', $link);
        $arr1 = $this->arr_depart_name;
        $arr2 = $this->arr_type_name;
        //账号，时间
        $person_model = new Model("Person");
        $person_info = $person_model->where("account=$account")->find();
        $name = $person_info['name'];
        $apartment = $person_info['apartment'];
        $type = $person_info['type'];
        $position = $person_info['position'];
        //获取系统阶段
        $control_model = new Model("Control");
        $control_info = $control_model->where("is_over=0")->find();
        if (empty($control_info)) {
            $stage = "系统阶段：暂无考核";
        } else {
            $stage = "系统阶段：" . $control_info['month'] . "月考核进行中";
        }
        $this->assign('account', $account);
        $this->assign('name', $name);
        $this->assign('apartment', $arr1[$apartment - 1]);
        $this->assign('type', $arr2[$type - 1]);
        $this->assign('position', $position);
        $this->assign('stage', $stage);
        $this->log('going to display');
        $this->display();
    }
    
    //向前端发送用户请求类型
    public function funcqqlx()
    {
        $this->login_required();
        $account = $this->account();
        $data = $this->info_mgr->getUserRequestType($account);
        echo $this->_encode($data);
    }
    
    //向前端发送可选时间
    public function sendTime()
    {
        $this->login_required();
        $arr = $this->info_mgr->getSelectableTime();
        echo $this->_encode($arr);
    }
   
    
    //绩效考核第一阶段，各种评价表

    private function on_data_view($func)
    {
        $year = $this->year();
        $month = $this->month();
        $status = $this->status();
        $account = $this->account();
        $this->log($year.$month.$account);
        return call_user_func($func,$status,$account, $year, $month);
    }

    //干事自评表
    public function funcgszp()
    {  
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_gszp'));
        echo $this->_encode($arr);   
    }
    
    //干事考核表,暂时忽略部门特色这一节
    public function funcgskh()
    {
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_gskh'));
        
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        
    }
    //部长自评表
    public function funcbzzp()
    {
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_bzzp'));
        echo $this->_encode($arr);
        
    }
    //部长考核表
    public function funcbzkh()
    {
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_bzkh'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        
    }
    //部门考核表
    public function funcbmkh()
    {
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_bmkh'));
        echo $this->_encode($arr);
        
    }
    //调研意见采纳表
    public function jsdyyjcn()
    {
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_dyyjcn'));
        echo $this->_encode($arr);
    }
    //跟进部门出勤统计表
    public function jsgjbmcqtj()
    {
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_gjbmcqtj'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        
        
    }
    //优秀称号限定表
    public function funcyxchxz()
    {
        $this->login_required();
        $status = $this->status();
        $arr = $this->data_viewer->view_yxchxz($status);
        echo $this->_encode($arr);
    }
    //其他情况加减分表
    public function funcqt()
    {
        $this->login_required();
        $arr = $this->on_data_view(array($this->data_viewer,'view_qt'));
        echo $this->_encode($arr);
    }
    //违纪登记
    public function funcbmwg()
    {
        $this->login_required();
        $year = $this->year();
        $month = $this->month();
        $status = $this->status();
        $account = $this->account();
        $type = $_POST['type'];
        $arr = $this->data_viewer->view_bmwg($status, $account, $year, $month,$type);
        echo $this->_encode($arr);
    }
    //优秀部长评定表
    public function funcyxbz()
    {
        $this->login_required();
        $year = $this->year();
        $month = $this->month();
        $account = $this->account();
        $status = $this->step_ctrl->statusIsStepTwo($year,$month);
        $arr = $this->data_viewer->view_yxbz($status, $account, $year, $month);
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE); 
    }
    //查看未完成情况表
    public function funcUnfinished()
    {
        $this->login_required();
        $year = $this->year();
        $month = $this->month();
        $arr = $this->step_ctrl->checkoutUnfinished($year,$month);
        echo $this->_encode($arr);
    }
    //考核进程控制表
    public function funcControl()
    {
        $this->login_required();
        $year = $this->year();
        $month = $this->month();
        
        $arr = $this->step_ctrl->getControlInfo($year,$month);
        echo $this->_encode($arr);
    }
    //接收考核进程控制表的数据
    public function funcGetControl()
    {
        $this->login_required();
        $year = $this->year();
        $month = $this->month();
        $KSKH = $_POST['KHJCKZ']['KSKH'];
        $KSPD = $_POST['KHJCKZ']['KSPD'];
        $FBJG = $_POST['KHJCKZ']['FBJG'];
        //开始一次考核
        $ret = $this->step_ctrl->handleStep($KSKH, $KSPD, $FBJG, $year, $month);
        echo $this->_encode($ret);
        
    }
    
    //下面是与前端通讯的各种反馈表
    //向前端发送干事考核反馈表json数据

    private function on_feedback_view($func)
    {
        $year = $this->year();
        $month = $this->month();
        $account = $this->account();
        return call_user_func($func,$account,$year,$month);
    }

    public function jsgskh()
    {
        $this->login_required();
        $arr = $this->on_feedback_view(array($this->feedback_viewer,'view_gskhfk'));
        echo $this->_encode($arr);
    }
    
    //向前端发送部长反馈表的json数据
    public function jsbzfk()
    {
        $this->login_required();
        $arr = $this->on_feedback_view(array($this->feedback_viewer,'view_bzfk'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
    
    
    //向前端发送整体考核结果反馈表json数据
    public function jsztkhjgfk()
    {
        $this->login_required();
        $arr = $this->on_feedback_view(array($this->feedback_viewer,'view_ztkhjgfk'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
    //向前端发送主席团反馈表json数据
    public function jszxtfk()
    {
        $this->login_required();
        $arr = $this->on_feedback_view(array($this->feedback_viewer,'view_zxtfk'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);	
        
    }
    
    //下面是接收前端发送过来json数据

    private function on_data_process($func)
    {
        $year = $this->year();
        $month = $this->month();
        $account = $this->account();
        return call_user_func($func,$account, $year,$month);
    }

    //接收干事自评表
    public function post_gszp()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_gszp'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
    //接收部长自评表
    public function post_bzzp()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_bzzp'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
    //接收跟进部门出勤统计表
    public function post_gjbmcqtj()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_gjbmcqtj'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);	
    }
    //接收调研意见采纳
    
    public function post_dyyjcn()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_dyyjcn'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);	
    }
    
    //接收干事考核
    public function post_gskh()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_gskh'));
        echo $this->_encode($arr);
    }
    
    //接收部长考核表
    public function post_bzkh()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_bzkh'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);	    
    }
    
    //接收部门考核表的数据
    public function post_bmkh()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_bmkh'));
        echo $this->_encode($arr);
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);	    
    }
    //接收优秀部长评定表的数据
    public function post_yxbz()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_yxbz'));
        echo $this->_encode($arr);
    }
    
    //接收其他情况加减分数据
    public function post_qt()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_qt'));
        echo $this->_encode($arr);
    }
    //接收违纪登记表数据
    public function post_bmwg()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_bmwg'));
        echo $this->_encode($arr);
    }
    //接收优秀称号限定表的数据
    public function post_yxchxz()
    {
        $this->login_required();
        $arr = $this->on_data_process(array($this->data_processor,'process_yxchxz'));
        echo $this->_encode($arr);
    }
    
    //删除某年某月考核
    private function unset_perform()
    {
        $this->login_required();
        $year = $this->year();
        $month = $this->month();
        $this->step_ctrl->unsetPerform($year,$month);
        echo $year . "年" . $month . "月的绩效考核数据删除完毕，可以重新启动该月份的绩效考核</br>";
    }

    public function test()
    {
        $year=2016;
        $month=4;
        $waccount='2015054141';
        $gskh_model = new Model("Gskh");
        //转换分制是线性函数, 应该可以在平均中调换执行顺序, 所以采用数据库的统计查询
        $bzpjdf_avg_raw = $gskh_model->where("(year=$year and month=$month) and raccount=$waccount")->avg('total');
        $bzpjdf = ($bzpjdf_avg_raw/(8*10))*5;
        echo $bzpjdf;
    }
   
}
?>