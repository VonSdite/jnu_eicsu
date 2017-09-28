<?php

//绩效考核反馈中, 负责计算各种得分
class PerformBaseCalculator extends JnuEicSuBaseAction
{
    var $info_mgr;
    var $year_last_val;
    var $month_last_val;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->info_mgr=$info_mgr;
        $this->init_last_perform_time();
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