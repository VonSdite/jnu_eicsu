<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/
import('@.Action.PerformInitController');
import('@.Action.PerformRankingController');
import('@.Action.PerformFeedbackController');
import('@.Action.PerformUnsetController');

/*考核进程控制相关操作*/
class PerformStepController extends JnuEicSuBaseAction
{
    var $init_ctrl;
    var $ranking_ctrl;
    var $feedback_ctrl;
    var $unset_ctrl;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->init_ctrl = new PerformInitController($info_mgr);
        $this->ranking_ctrl = new PerformRankingController($info_mgr);
        $this->feedback_ctrl = new PerformFeedbackController($info_mgr);
        $this->unset_ctrl = new PerformUnsetController();
    }
    
    public function handleStep($KSKH, $KSPD, $FBJG, $year, $month)
    {
        $back = false;
        if ($KSKH == 1 && $KSPD == 0 && $FBJG == 0) {
            //开启这次考核
            $back = $this->init_ctrl->initPerform($year,$month);
        }
        //停止考核，进行优秀部长评定
        if ($KSKH == 1 && $KSPD == 1 && $FBJG == 0) {
            $back = $this->ranking_ctrl->startRanking($year,$month);
        }
        //停止优秀部长评定，发布考核结果
        if ($KSKH == 1 && $KSPD == 1 && $FBJG == 1) {
            $back = $this->feedback_ctrl->feedbackAll($year,$month);
        }
        if (false == $back) {
            //生成将要返回的json数组
            $arr = Array(
                "textBack" => 0
            );
        } else {
            //生成将要返回的json数组
            $arr = Array(
                "textBack" => 1
            );
        }
        return $arr;
    }
    
    //函数，判断只读状态还是读写状态,针对优秀部长评定表之前的所有考核表
    public function statusIsStepOne($year, $month)
    {
        //可编辑性：
        $status = 1; //默认为0，表示可以编辑
        //获取时间
        $control_model = new Model("Control");
        $control_info = $control_model->where("year=$year and month=$month")->find();
        if ($control_info['is_over'] == 0 && $control_info['is_yxbz'] == 0)
            $status = 0;
        return $status;
    }
    
    //获取是否可以到了优秀部长评定的步骤
    public function statusIsStepTwo($year, $month)
    {
        //获取授权状态 status	  
        $statu = 1;
        $control_model = new Model("Control");
        $control_info = $control_model->where("year=$year and month=$month")->find();
        if ($control_info['is_over'] == 0 && $control_info['is_yxbz'] == 1)
            $status = 0;
        //账号，时间
    }
    
    //获取未完成情况
    public function checkoutUnfinished($year,$month)
    {
        $person_model = new Model("Person");
        $gszp_model = new Model("Gszp");
        $bzzp_model = new Model("Bzzp");
        $gskh_model = new Model("Gskh");
        $bzkh_model = new Model("Bzkh");
        $bmkh_model = new Model("Bmkh");
        $control_model = new Model("Control");
        //状态，普通考核表能否填
        $statusGSZP = $this->statusIsStepOne($year, $month);
        //状态，现在优秀部长评定表能否提交
        $statusYXBZPD = $this->statusIsStepTwo($year, $month);
        //干事自评表
        $gszp_info = $gszp_model->where("total=0 and (year=$year and month=$month)")->select();
        foreach ($gszp_info as $v) {
            $account = $v['account'];
            $person_info = $person_model->where("account=$account")->find();
            $arrGSZP[] = Array(
                'name' => $person_info['name'],
                'depart' => $person_info['apartment'],
                'hadSubmit' => $v['hadSubmit']
            );
        }
        //部长自评表
        $bzzp_info = $bzzp_model->where("total=0 and (year=$year and month=$month)")->select();
        foreach ($bzzp_info as $v) {
            $account = $v['waccount'];
            $person_info = $person_model->where("account=$account")->find();
            $arrBZZP[] = Array(
                'name' => $person_info['name'],
                'depart' => $person_info['apartment'],
                'hadSubmit' => $v['hadSubmit']
            );
        }
        //干事考核
        $gskh_info = $gskh_model->where("total=0 and (year=$year and month=$month)")->select();
        foreach ($gskh_info as $v) {
            $account = $v['waccount'];
            $gs_account = $v['raccount'];
            $person_info = $person_model->where("account=$account")->find();
            $person_info2 = $person_model->where("account=$gs_account")->find();
            $arrGSKH[] = Array(
                'name' => $person_info['name'] . " - " . $person_info2['name'],
                'depart' => $person_info['apartment'],
                'hadSubmit' => $v['hadSubmit']
            );
        }
        //部长考核表
        $person_info = $person_model->where("type=4")->select();
        foreach ($person_info as $v) {
            $account = $v['account'];
            $bzkh_info = $bzkh_model->where("waccount=$account and total=0 and (year=$year and month=$month)")->select();
            if (!empty($bzkh_info)) {
                $arrBZKH[] = Array(
                    'name' => $v['name'],
                    'hadSubmit' => $bzkh_info[0]['hadSubmit']
                );
            }
        }
        //部门考核表
        $person_info = $person_model->where("type=4")->select();
        foreach ($person_info as $v) {
            $account = $v['account'];
            $bmkh_info = $bmkh_model->where("waccount=$account and total=0 and (year=$year and month=$month)")->select();
            if (!empty($bmkh_info)) {
                $arrBMKH[] = Array(
                    'name' => $v['name'],
                    'hadSubmit' => $bmkh_info[0]['hadSubmit']
                );
            }
        }
        //生成将要返回的json数组
        $arr = Array(
            'statusGSZP' => $statusGSZP,
            'statusYXBZPD' => $statusYXBZPD,
            'arrGSZP' => $arrGSZP,
            'arrBZZP' => $arrBZZP,
            'arrGSKH' => $arrGSKH,
            'arrBZKH' => $arrBZKH,
            'arrBMKH' => $arrBMKH
        );
        return $arr;
    }
    
    //获取进程控制信息
    public function getControlInfo($year,$month)
    {
        $control_model = new Model("Control");
        $control_info = $control_model->where("year=$year and month=$month")->find();
        $KSKH = 0;
        $KSPD = 0;
        $FBJG = 0;
        if (!empty($control_info)) {
            $KSKH = 1;
            if ($control_info['is_yxbz'] == 1)
                $KSPD = 1;
            if ($control_info['is_over'] == 1)
                $FBJG = 1;
        }
        //生成将要返回的json数组
        $arr = Array(
            'KSKH' => $KSKH,
            'KSPD' => $KSPD,
            'FBJG' => $FBJG
        );
        return $arr;
    }
    
    //删除某年某月考核
    public function unsetPerform($year,$month)
    {
        $this->unset_ctrl->unsetPerform($year,$month);
    }
    
    
}

?>