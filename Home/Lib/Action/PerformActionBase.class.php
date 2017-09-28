<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/
import('@.Action.PerformStepController');
import('@.Action.PerformDataViewer');
import('@.Action.PerformDataProcessor');
import('@.Action.PerformFeedbackViewer');
import('@.Action.PerformInfoManager');

/*初始化perform的各个组件, 以及获取一些数据的快捷方式*/
class PerformActionBase extends JnuEicSuBaseAction
{
    var $step_ctrl;
    var $data_viewer;
    var $data_processor;
    var $feedback_viewer;
    var $info_mgr;
    var $year_last_val;
    var $month_last_val;
    public function __construct()
    {
        parent::__construct();
        $this->info_mgr = new PerformInfoManager();
        $this->step_ctrl = new PerformStepController($this->info_mgr);
        $this->data_viewer = new PerformDataViewer($this->info_mgr);
        $this->data_processor = new PerformDataProcessor($this->info_mgr);
        $this->feedback_viewer = new PerformFeedbackViewer($this->info_mgr);
        $this->year_last_val=0;
        $this->month_last_val=0;
    }
    //当前登录用户的account
    public function account()
    {
        return $_SESSION['account'];
    }
    //当前考核年
    public function year()
    {
        return $_POST['year'];
        
    }
    //当前考核月
    public function month()
    {
        return $_POST['month'];
    }
    //当前考核状态
    public function status()
    {
        return $this->step_ctrl->statusIsStepOne($this->year(),$this->month());
    }

    //初始化上一次考核时间
    public function init_last_perform_time()
    {
        $time_info = $this->info_mgr->getLastPerformTime();
        $this->year_last_val = $time_info['year'];
        $this->month_last_val = $time_info['month'];
    }
    
    //上次考核年, 在调用init_last_perform_time之前不要调用
    public function year_last()
    {
        return $this->year_last_val;
    }
    
    //上次考核月, 在调用init_last_perform_time之前不要调用
    public function month_last()
    {
        return $this->month_last_val;
    }
    
    

}

?>