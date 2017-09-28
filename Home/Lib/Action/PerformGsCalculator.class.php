<?php
import('@.Action.PerformBaseCalculator');
//绩效考核反馈中, 负责计算干事的各种得分
class PerformGsCalculator extends PerformBaseCalculator
{
    public function __construct($info_mgr)
    {
        parent::__construct($info_mgr);
    }

    public function cal_gskhfk_bzpjdf($waccount,$year,$month)
    {
        $gskh_model = new Model("Gskh");
        //转换分制是线性函数, 应该可以在平均中调换执行顺序, 所以采用数据库的统计查询
        $bzpjdf_avg_raw = $gskh_model->where("(year=$year and month=$month) and raccount=$waccount")->avg('total');
        $bzpjdf = ($bzpjdf_avg_raw/(8*10))*5;
        return $bzpjdf;
    }

    //干事考核反馈中, 计算部长评价得分, 老版本
    public function cal_gskhfk_bzpjdf_old($Waccount,$year,$month)
    {
        $person_model = new Model("Person");
        $gskh_model = new Model("Gskh");
        $person_info = $person_model->where("account=$waccount")->find();
        $apartment = $person_info['apartment'];
        $person_info = $person_model->where("apartment=$apartment and type=3")->select();
        $bzpjdf = 0; //部长评价得分
        $sum = count($person_info);
        foreach ($person_info as $v) {
            
            $bz_account = $v['account'];
            $gskh_info = $gskh_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$waccount")->find();
            //计算部长评价得分
            $total = $gskh_info['total'];
            $total = ($total / (8 * 10)) * 5;
            $bzpjdf += $total;
        }
        $bzpjdf = $bzpjdf / $sum;
        return $bzpjdf;
    }

    //干事考核反馈中, 计算外调加分, 因为外调缺席影响出勤得分, 这里要返回复杂结构
    public function cal_gskhfk_wdjf($waccount,$year,$month)
    {
        $resource_model = new Model("Resource");
        $control_model = new Model("Control");
        //获取上次考核时间
        $yearLast = $this->year_last();
        $monthLast = $this->month_last();
        $control_info = $control_model->where("is_over=1")->select();
        if (count($control_info) == 0) {
            $resource_info = $resource_model->where("account=$waccount")->select();
        } else {
            $control_info = $control_model->where("year=$yearLast and month=$monthLast")->find();
            $laststamp = $control_info['beginstamp'];
            $control_info = $control_model->where("is_over=0")->find();
            $thisstamp = $control_info['beginstamp'];
            $resource_info = $resource_model->where("($laststamp<create_time and $thisstamp>create_time)and account=$waccount")->select();
        }
        //获取外调无辜缺席情况
        // echo $waccount."外调次数为".count($resource_info)."</br>";
        //$resource_info=$resource_model->where("(year=$year and month=$month) and account=$waccount")->select();
        $wgqx = 0; //外调无辜缺席次数
        $yb = 0; //外调表现一般次数（也就是正常出席）
        $tc = 0; //外调表现突出次数（也就是推优）
        
        foreach ($resource_info as $v) {
            if ($v['assess'] == 1)
                $wgqx++;
            if ($v['assess'] == 3)
                $yb++;
            if ($v['assess'] == 4)
                $tc++;
        }
        $wdjf = ($yb * 0.1 + $tc * 0.2) * 2.0;
        $data = Array(
            'yb'=>$yb,
            'tc'=>$tc,
            'wgqx'=>$wgqx,
            'wdjf'=>$wdjf
        );
        return $data;
    }

    //干事考核反馈中, 计算出勤得分, 因为外调缺席影响出勤得分, 这里要传入外调缺席次数
    public function cal_gskhfk_cqdf($waccount,$year,$month,$wdqx)
    {
        $chuqin_model = new Model("Chuqin");
        //获取出勤情况
        $chuqin_info = $chuqin_model->where("(year=$year and month=$month) and raccount=$waccount")->find();
        $qj = $chuqin_info['qj'] * (-0.1);
        $ct = $chuqin_info['ct'] * (-0.2);
        $qx = $chuqin_info['qx'] * (-0.3);
        /**
         * AnqurVanillapy (Anqur) 20151011
         *  As told, the scores of employee redeployment (wdjf),
         *   attendance (cqdf) and survey (dycnjf) should be multiplied by
         *   2, except for employee recommandation in monthly assessment.
         */
        
        //出勤扣分
        
        // Anqur
        // $cqdf=1+$qj+$ct+$qx+$wgqx*(-0.3);
        $cqdf = 1 + $qj * 2.0 + $ct * 2.0 + $qx * 2.0 + $wdqx * (-0.3) * 2.0;
        if ($cqdf < 0)
            $cqdf = 0;
        return $cqdf;
    }

    //干事考核反馈中, 计算推优加分
    public function cal_gskhfk_tyjf($waccount,$year,$month)
    {
        //干事推优加分
        $tuiyou_model = new Model("Tuiyou");
        $tuiyou_info = $tuiyou_model->where("(year=$year and month=$month) and raccount=$waccount and (wtype=1 or wtype=2)")->select();
        //echo $waccount."被推优次数：".count($tuiyou_info)."</br>";
        $tycs = count($tuiyou_info); //被推优次数
        $tyjf = $tycs * 0.2;
        return $tyjf;
    }

    //干事考核反馈中, 计算调研采纳加分
    public function cal_gskhfk_dycnjf($waccount,$year,$month)
    {
        $diaoyan_model = new Model("Diaoyan");
        //反馈加分：调研意见采纳加分
        $diaoyan_info = $diaoyan_model->where("(year=$year and month=$month) and raccount=$waccount")->find();
        if (!empty($diaoyan_info)) {
            $dycn = $diaoyan_info['caina'];
        } else {
            $dycn = 0;
        }
        // Anqur
        // $dycnjf=$dycn*0.1;
        $dycnjf = ($dycn * 0.1) * 2.0;
        return $dycnjf;

    }

    //干事考核反馈中, 计算其他情况加减分
    public function cal_gskhfk_qt($waccount,$year,$month)
    {
        $qt_model = new Model("Qt");
        $qt_info = $qt_model->where("(year=$year and month=$month) and account=$waccount")->find();
        $qt = $qt_info['qt'];
    }

    //干事考核反馈中, 计算自评得分
    public function cal_gskhfk_zpdf($waccount,$year,$month)
    {
        $gszp_model = new Model("Gszp");
        $gszp_info = $gszp_model->where("(year=$year and month=$month) and account=$waccount")->find();
        $total = $gszp_info['total'];
        $zpdf = ($total / (9 * 10)) * 2;
        return $zpdf;
    }

    //干事考核反馈中, 计算总得分
    public function cal_gskhfk_total($zpdf, $bzpjdf, $cqdf, $wdjf, $tyjf, $dycnjf, $qt)
    {
        return $zpdf + $bzpjdf + $cqdf + $wdjf + $tyjf + $dycnjf + $qt;
    }
}

?>