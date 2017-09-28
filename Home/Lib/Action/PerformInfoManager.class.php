<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/
/*管理考核各种信息, 比较杂*/
class PerformInfoManager extends JnuEicSuBaseAction
{
    public function __construct()
    {
        parent::__construct();
    }
    //获取上次考核时间
    public function getLastPerformTime()
    {
        //获取最后一次考核的时间
        $control_model = new Model("Control");
        $control_info = $control_model->where("is_over=1")->select();
        $tempyear = $control_info[0]['year'];
        $tempmonth = $control_info[0]['month'];
        $tempstamp = mktime(1, 1, 1, $tempmonth, 1, $tempyear);
        //echo "asdf".$tempmonth;
        for ($i = 0; $i < count($control_info); $i++) {
            if ($tempstamp > mktime(1, 1, 1, $control_info[$i]['month'], 1, $control_info[$i]['year']))
                continue;
            else {
                $tempyear = $control_info[$i]['year'];
                $tempmonth = $control_info[$i]['month'];
                $tempstamp = mktime(1, 1, 1, $tempmonth, 1, $tempyear);
            }
        }
        $arrLastTime = Array(
            'year' => $tempyear,
            'month' => $tempmonth
        );
        return $arrLastTime;
    }
    
    //从POST数据获取时间
    public function getTimeFromPost()
    {
        $year = $_POST['year'];
        $month = $_POST['month'];
        /* 	$year=2014;
        $month=10; */
        $arr = Array(
            'month' => $month,
            'year' => $year
        );
        return $arr;
    }
    
    //获取部门的主管副主席
    public function getPresidentByApartment($apartment)
    {
        $president_model = new Model("President");
        $president_info = $president_model->select();
        for ($k = 0; $k < count($president_info); $k++) {
            // FIXED: dengzuoheng@gmail.com 2016/4/11 17:56 改变了检查逻辑
            $tmparr_zgbm = explode("|", $president_info[$k]['apartment']);
            if (in_array($apartment, $tmparr_zgbm)) {
                return $president_info[$k]['account'];
                
            }
        }
    }

    //获取优秀称号限制的所有account
    public function yxchxzAllAccount()
    {
        $yxchxz_model = new Model("Yxchxz");
        $arr = $yxchxz_model->field('account')->select();
        $arr = array_values($arr);
        return $arr;
    }
    
    public function getSelectableTime()
    {
        //已经考核过的
        $control_model = new Model("Control");
        $control_info = $control_model->where()->select();
        //自评
        for ($i = 0; $i < count($control_info); $i++) {
            $evaluation[] = Array(
                'year' => $control_info[$i]['year'],
                'month' => $control_info[$i]['month']
            );
        }
        
        //反馈：所有跑过优秀部长的记录
        $control_info = $control_model->where("is_over=1")->select();
        for ($i = 0; $i < count($control_info); $i++) {
            $feedback[] = Array(
                'year' => $control_info[$i]['year'],
                'month' => $control_info[$i]['month']
            );
        }
        //控制：已经考核过的+可能的下一个考核
        
        $control_info = $control_model->select();
        for ($i = 0; $i < count($control_info); $i++) {
            $control[] = Array(
                'year' => $control_info[$i]['year'],
                'month' => $control_info[$i]['month']
            );
        }
        
        if (count($control_info) == 0) {
            $month = date("n");
            $year = date("Y");
            for ($k = 0; $k < 3; $k++) {
                $control[] = Array(
                    'year' => $year,
                    'month' => $month
                );
                if ($month == 1) {
                    $year--;
                    $month = 12;
                } else {
                    $month--;
                }
                
            }
            
        }
        
        
        else {
            //获取最后一次考核的时间
            $control_info = $control_model->select();
            $tempyear = $control_info[0]['year'];
            $tempmonth = $control_info[0]['month'];
            $tempstamp = mktime(1, 1, 1, $tempmonth, 1, $tempyear);
            //echo "asdf".$tempmonth;
            for ($i = 0; $i < count($control_info); $i++) {
                if ($tempstamp > mktime(1, 1, 1, $control_info[$i]['month'], 1, $control_info[$i]['year']))
                    continue;
                else {
                    $tempyear = $control_info[$i]['year'];
                    $tempmonth = $control_info[$i]['month'];
                    $tempstamp = mktime(1, 1, 1, $tempmonth, 1, $tempyear);
                }
            }
            $year = $tempyear;
            $month = $tempmonth;
            //echo "asdf".$tempmonth;
            
            $control_info = $control_model->where("is_over=0")->select();
            for ($k = 0; $k < 5; $k++) {
                if (count($control_info) != 0)
                    break;
                if ($month == 12) {
                    $year++;
                    $month = 1;
                } else {
                    $month++;
                }
                $control[] = Array(
                    'year' => $year,
                    'month' => $month
                );
            }
        }
        
        //优秀部长：跑过优秀部长的记录
        $control_info = $control_model->where("is_yxbz=1")->select();
        for ($i = 0; $i < count($control_info); $i++) {
            $excellent[] = Array(
                'year' => $control_info[$i]['year'],
                'month' => $control_info[$i]['month']
            );
        }
        
        $arr = Array(
            'evaluation' => $evaluation,
            'feedback' => $feedback,
            'control' => $control,
            'excellent' => $excellent
        );
        return $arr;
    }
    
    public function getUserRequestType($account)
    {
        $person_model = new Model("Person");
        $bmwgfzr_model = new Model("Bmwgfzr");
        $person_info = $person_model->where("account=$account")->find();
        $type = $person_info['type'];
        if ($type == 3 && $person_info['apartment'] == 2) {
            $typejson = "RLBZ";
        } else {
            $arr = Array(
                "YBGS",
                "RLGS",
                "BZJ",
                "ZXT"
            );
            $typejson = $arr[$type - 1];
        }
        //是否负责违纪登记
        $bmwgfzr_info = $bmwgfzr_model->where("account=$account")->select();
        if (count($bmwgfzr_info) != 0) {
            foreach ($bmwgfzr_info as $v) {
                $weiji[] = Array(
                    'table' => $v['type'] - 1
                );
            }
        }
        $data = Array(
            'account' => $account,
            'type' => $typejson,
            'weiji' => $weiji
        );
        return $data;
    }
    
    
}

?>