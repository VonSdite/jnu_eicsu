<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/
/*考核第三阶段, 生成各种反馈*/
class PerformFeedbackController extends JnuEicSuBaseAction
{
    var $info_mgr;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->info_mgr=$info_mgr;
    }
    
    //绩效考核第三阶段，根据主席团的评优结果，生成最终的优秀部长
    public function feedbackAll($year,$month)
    {;
        $flagInitYxbz = 1;
        $authority_model = new Model("Authority");
        //需要满足下面条件:基本成员信息要求、该时间正在考核、系统不存在未结束的考核
        $authority_info = $authority_model->find();
        if ($authority_info['is_init'] != 1)
            $flagInitYxbz = 0;
        $control_model = new Model("Control");
        $control_info = $control_model->where("year=$year and month=$month")->find();
        if (empty($control_info['id']))
            $flagInitYxbz = 0;
        else {
            if ($control_info['is_yxbz'] == 0 || $control_info['is_over'] == 1) {
                $flagInitYxbz = 0;
            }
        }
        $control_info = $control_model->where("is_over=0||is_yxbz=0")->select();
        if (count($control_info) > 1)
            $flagInitYxbz = 0;
        if ($flagInitYxbz == 0) {
            //echo "优秀部长评定不满足开启条件</br>";
            return false;
        }
        $this->funcfkthree($year,$month);
        $this->funcfkfour($year,$month);
        $this->funcfkfive($year,$month);
        unset($data);
        $data['is_over'] = 1;
        $control_info = $control_model->where("(year=$year and month=$month)")->save($data);
        return true;
    }
    
    //优秀部长处理
    private function funcfkthree($year,$month)
    {
        //从tbl_yxbzhx中找出十个候选人,从tbl_yxbz中统计所有主席团的评优结果
        $yxbzhx_model = new Model("Yxbzhx");
        $yxbz_model = new Model("Yxbz");
        $bzfk_model = new Model("Bzfk");
        $yxbzhx_info = $yxbzhx_model->where("year=$year and month=$month")->select();
        foreach ($yxbzhx_info as $v_hx) {
            $bz_account = $v_hx['HX'];
            $yxbz_info = $yxbz_model->where("(year=$year and month=$month) and raccount=$bz_account and checked=1")->select();
            // echo $bz_account."被评优了：".count($yxbz_info)."次</br>";
            //将各个候选人的得票存起来
            //$arr=Array(
            $arr[$bz_account] = count($yxbz_info);
            //'total'=>count($yxbz_info),
            //);
            
        }
        arsort($arr);
        //var_dump($arr);
        //将学号、票数、考核分数、综合排名合为一体
        foreach ($arr as $k => $v) {
            $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and account=$k")->find();
            $info[] = Array(
                'account' => $k,
                'ps' => $v,
                'total' => $bzfk_info['total'],
                'rank' => 1
            );
        }
        //重写排名
        for ($i = 0; $i < count($info); $i++) {
            $rank = 1;
            for ($j = 0; $j < count($info); $j++) {
                if ($info[$i]['account'] == $info[$j]['account'])
                    continue;
                if ($info[$i]['ps'] < $info[$j]['ps'])
                    $rank++;
                if ($info[$i]['ps'] == $info[$j]['ps']) {
                    if ($info[$i]['total'] < $info[$j]['total'])
                        $rank++;
                    if ($info[$i]['total'] == $info[$j]['total']) {
                        //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
                        if (strcmp($info[$i]['account'], $info[$j]['account']) > 0) //学号小的排在前面  
                            $rank++;
                    }
                }
            }
            $info[$i]['rank'] = $rank;
        }
        /*    //检测输出
        for($k=0;$k<count($info);$k++)
        {
        echo $info[$k]['account']." ".$info[$k]['ps']." ".$info[$k]['total']."  ".$info[$k]['rank']."</br>";
        } */
        //从$info中取出前三名
        for ($k = 0; $k < count($info); $k++) {
            if ($info[$k]['rank'] == 1)
                $account1 = $info[$k]['account'];
            if ($info[$k]['rank'] == 2)
                $account2 = $info[$k]['account'];
            if ($info[$k]['rank'] == 3)
                $account3 = $info[$k]['account'];
        }
        //echo "三名优秀部长分别是：".$account1." ".$account2."   ".$account3;
        //将三名优秀部长存入tbl_bzfk中
        // Anqur
        $data['yxbz'] = 1;
        $bzfk_model->where("(year=$year and month=$month) and account=$account1")->data($data)->save();
        $data['yxbz'] = 2;
        $bzfk_model->where("(year=$year and month=$month) and account=$account2")->data($data)->save();
        $data['yxbz'] = 3;
        $bzfk_model->where("(year=$year and month=$month) and account=$account3")->data($data)->save();
        
    }
    
    //优秀部门处理
    private function funcfkfour($year,$month)
    {

        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $this->getbmfk($i, $year, $month);
        }
        $bmfk_model = new Model("Bmfk");
        $yxchxz_model = new Model("Yxchxz");
        //给部门进行排名
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $rank = 1;
            $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and apartment=$i")->find();
            $total = $bmfk_info['total'];
            for ($j = 1; $j <= $this->all_depart_num; $j++) {
                if ($i == $j)
                    continue;
                $bmfk_info2 = $bmfk_model->where("(year=$year and month=$month) and apartment=$j")->find();
                $total2 = $bmfk_info2['total'];
                if ($total < $total2)
                    $rank++;
                if ($total == $total2) {
                    if ($i > $j)
                        $rank++;
                }
            }
            //一个部门跑完，将排名存起来
            //echo "部门".$i."的总分是".$total."排名是：".$rank."</br>";
            unset($data);
            $data['rank'] = $rank;
            $bmfk_model->where("(year=$year and month=$month) and apartment=$i")->data($data)->save();
            
        }
        
        //找到两个优秀部门，从排名高的开始
        $bmfk_model = new Model("Bmfk");
        $yxchxz_model = new Model("Yxchxz");
        //将优秀部门清空
        unset($data);
        $data['yxbm'] = 0;
        $bmfk_model->where("year=$year and month=$month")->data($data)->save();
        $j = 0;
        for ($k = 1; $k <= $this->all_depart_num; $k++) {
            //找到排名第一的
            $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and rank=$k")->find();
            $apartment = $bmfk_info['apartment'];
            //判断是否在限制表里面
            $yxchxz_info = $yxchxz_model->where("account=$apartment")->find();
            if (!empty($yxchxz_info))
                continue;
            
            unset($data);
            $data['yxbm'] = 1;
            $bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->data($data)->save();
            $j++;
            if ($j > 1)
                break;
        }
    }
    //外调次数及其排名处理
    private function funcfkfive($year,$month)
    {
        $resource_model = new Model("Resource");
        $person_model = new Model("Person");
        $wdcs_model = new Model("Wdcs");
        $control_model = new Model("Control");
        //按部门处理
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $person_info = $person_model->where("apartment=$i and (type=1 or type=2)")->select();
            foreach ($person_info as $v) {
                $gs_account = $v['account'];
                //获取上次外调时间
                $arrLastTime = $this->info_mgr->getLastPerformTime();
                $yearLast = $arrLastTime['year'];
                $monthLast = $arrLastTime['month'];
                $control_info = $control_model->where("is_over=1")->select();
                if (count($control_info) == 0) {
                    $resource_info = $resource_model->where("account=$gs_account")->select();
                } else {
                    $control_info = $control_model->where("year=$yearLast and month=$monthLast")->find();
                    $laststamp = $control_info['beginstamp'];
                    $control_info = $control_model->where("is_over=0")->find();
                    $thisstamp = $control_info['beginstamp'];
                    $resource_info = $resource_model->where("$laststamp<create_time and $thisstamp>create_time and account=$gs_account")->select();
                }
                //$resource_info=$resource_model->where("(year=$year and month=$month) and account=$gs_account")->select();
                $wdcs = count($resource_info);
                //echo $gs_account."本月被外调了".$wdcs."次</br>";
                $data['wdcs'] = $wdcs;
                $wdcs_model->where("(year=$year and month=$month) and account=$gs_account")->data($data)->save();
            }
        }
        //生成排名，也是按部门来
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $person_info = $person_model->where("apartment=$i and (type=1 or type=2)")->select();
            $person_info2 = $person_model->where("apartment=$i and (type=1 or type=2)")->select();
            foreach ($person_info as $v) {
                $rank = 1;
                $gs_account = $v['account'];
                $wdcs_info = $wdcs_model->where("(year=$year and month=$month) and account=$gs_account")->find();
                $wdcs = $wdcs_info['wdcs'];
                foreach ($person_info2 as $v2) {
                    $gs_account2 = $v2['account'];
                    $wdcs_info2 = $wdcs_model->where("(year=$year and month=$month) and account=$gs_account2")->find();
                    $wdcs2 = $wdcs_info2['wdcs'];
                    if ($wdcs < $wdcs2)
                        $rank++;
                    if ($wdcs == $wdcs2) {
                        //按学号大小排名          //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，///相等返回0
                        if (strcmp($gs_account, $gs_account2) > 0) //学号小的排在前面   
                            $rank++;
                    }
                }
                //echo $gs_account."被外调".$wdcs."次，部门内排".$rank."</br>";
                unset($data);
                $data['rank'] = $rank;
                $wdcs_model->where("(year=$year and month=$month) and account=$gs_account")->data($data)->save();
            }
        }
    }
    
    private function getbmfk($apartment, $year, $month)
    {
        
        $person_model = new Model("Person");
        $bmkh_model = new Model("Bmkh");
        $interact_model = new Model("Interact");
        $president_model = new Model("President");
        $chuqin_model = new Model("Chuqin");
        $bzfk_model = new Model("Bzfk");
        $diaoyan_model = new Model("Diaoyan");
        $bmty_model = new Model("Bmty");
        $bmwg_model = new Model("Bmwg");
        $qt_model = new Model("Qt");
        $control_model = new Model("Control");
        $resource_model = new Model("Resource");
        //主席评价
        $president_info = $president_model->where("is_sub='n'")->find();
        $zx_account = $president_info['account'];
        //echo "主席是：".$zx_account;
        $bmkh_info = $bmkh_model->where("(year=$year and month=$month) and (waccount=$zx_account and rapartment=$apartment)")->find();
        $total = $bmkh_info['DF1'] + $bmkh_info['DF2'] + $bmkh_info['DF3'] + $bmkh_info['DF4'] + $bmkh_info['DF5'] + $bmkh_info['DF6'] + $bmkh_info['DF7'];
        $total = ($total / (7 * 10)) * 5;
        $zxpjdf = $total;
        //echo "部门：".$apartment."的主席给分是：".$total."</br>";
        //主管副主席评价得分
        $fzx_account = $this->info_mgr->getPresidentByApartment($apartment);
        $bmkh_info = $bmkh_model->where("(year=$year and month=$month) and (waccount=$fzx_account and rapartment=$apartment)")->find();
        $total = $bmkh_info['DF1'] + $bmkh_info['DF2'] + $bmkh_info['DF3'] + $bmkh_info['DF4'] + $bmkh_info['DF5'] + $bmkh_info['DF6'] + $bmkh_info['DF7'];
        $total = ($total / (7 * 10)) * 3;
        $zgpjdf = $total;
        //echo "部门：".$apartment."的主管副主席给分是：".$total."</br>";
        //出勤扣分,包括基本的出勤情况和外调无故缺席。
        //获取上次外调时间
        $wgqx = 0; //外调无辜缺席次数
        $arrLastTime = $this->info_mgr->getLastPerformTime();
        $yearLast = $arrLastTime['year'];
        $monthLast = $arrLastTime['month'];
        $control_info = $control_model->where("is_over=1")->select();
        $person_info = $person_model->where("apartment=$apartment")->select();
        if (count($control_info) == 0) {
            foreach ($person_info as $person_v) {
                $account = $person_v['account'];
                $resource_info = $resource_model->where("account=$account")->select();
                foreach ($resource_info as $v) {
                    if ($v['assess'] == 1)
                        $wgqx++;
                }
            }
        } else {
            $control_info = $control_model->where("year=$yearLast and month=$monthLast")->find();
            $laststamp = $control_info['beginstamp'];
            $control_info = $control_model->where("is_over=0")->find();
            $thisstamp = $control_info['beginstamp'];
            foreach ($person_info as $person_v) {
                $account = $person_v['account'];
                $resource_info = $resource_model->where("($laststamp<create_time and $thisstamp>create_time)and account=$account")->select();
                foreach ($resource_info as $v) {
                    if ($v['assess'] == 1)
                        $wgqx++;
                }
            }
        }
        //获取外调无辜缺席情况
        // echo $waccount."外调次数为".count($resource_info)."</br>";
        //$resource_info=$resource_model->where("(year=$year and month=$month) and account=$waccount")->select();
        
        //获取出勤情况
        // BUG: dengzuoheng@gmail.com 2016/4/10 23:00: find只会返回一条结果, 此处应该为select
        $chuqin_info = $chuqin_model->where("(year=$year and month=$month) and (rapartment=$apartment)")->select();
        // FIXED: dengzuoheng@gmail.com 2016/4/10 23:10: 修改了这里的逻辑
        $qj = 0;
        $ct = 0;
        $qx = 0;
        foreach ($chuqin_info as $c) {
            $qj += $c['qj'];
            $ct += $c['ct'];
            $qx += $c['qx'];
        }
        $qj = -0.1 * $qj;
        $ct = -0.2 * $ct;
        $qx = -0.3 * $qx;
        
        //出勤得分
        $cqdf = 2 + $qj + $ct + $qx + $wgqx * (-0.1);
        //echo "出勤得分：".$cqdf."</br>";
        if ($cqdf < 0)
            $cqdf = 0;
        //主席团推优得分
        $tuiyou_model = new Model("Tuiyou");
        $tuiyou_info = $tuiyou_model->where("(year=$year and month=$month) and raccount=$apartment")->select();
        $tydf = count($tuiyou_info);
        $tydf = $tydf * 0.3;
        //echo $apartment."的主席团推优得分是：".$tydf."</br>";
        //$tydf=0;
        //优秀部长加分
        //找出本部门部长
        $person_info = $person_model->where("apartment=$apartment and type=3")->select();
        $yxbz = 0;
        foreach ($person_info as $v) {
            $bz_account = $v['account'];
            //echo "部长：".$bz_account."</br>";
            $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and account=$bz_account")->find();
            //echo "该部长是否为优秀：".$bzfk_info['yxbz']."</br>";
            //var_dump($bzfk_info);
            if ($bzfk_info['yxbz'] > 0) //BUG:dengzuoheng@gmail.com , 2016/4/11 14:57 yxbz字段不仅为1, 还可以是2,3, 此处应为>0
                
            //FIXED: dengzuoheng@gmail.com , 2016/4/11 15:10 : 这里改成了>0
                {
                //echo "优秀部长：".$bz_account."</br>";
                $yxbz = 0.2;
            }
        }
        //获取反馈加分，包括部长和干事
        $fkdf = 0;
        $person_info = $person_model->where("apartment=$apartment")->select();
        foreach ($person_info as $v) {
            $raccount = $v['account'];
            $diaoyan_info = $diaoyan_model->where("(year=$year and month=$month) and raccount=$raccount")->find();
            $fkdf = $fkdf + $diaoyan_info['caina'];
        }
        $fkdf = $fkdf * 0.1;
        //违规扣分
        $bmwg_info = $bmwg_model->where("(year=$year and month=$month) and apartment=$apartment")->select();
        if (count($bmwg_info) > 0) {
            foreach ($bmwg_info as $v) {
                $wgkf = $wgkf + $v['wgkf'];
            }
            //$wgkf=-$bmwg_info['wgkf'];
        } else {
            $wgkf = 0;
        }
        //其他
        $qt_info = $qt_model->where("(year=$year and month=$month) and account=$apartment")->find();
        $qt = (float) $qt_info['qt'];
        //echo $apartment."的其他得分是：".$qt."</br>";
        
        //将所有这些信息存入数据库表
        $total = $zxpjdf + $zgpjdf + $cqdf + $tydf + $wgkf + $fkdf + $qt + $yxbz;
        $bmfk_model = new Model("Bmfk");
        $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->find();
        $id = (int) $bmfk_info['id'];
        unset($data);
        $data['id'] = $id;
        $data['year'] = $year;
        $data['month'] = $month;
        $data['total'] = $total;
        $data['apartment'] = $apartment;
        $data['zxpjdf'] = $zxpjdf;
        $data['zgpjdf'] = $zgpjdf;
        $data['cqdf'] = $cqdf;
        $data['wgkf'] = (float) $wgkf;
        $data['fkdf'] = $fkdf;
        $data['tydf'] = $tydf;
        $data['qtdf'] = $qt;
        $data['yxbz'] = (float) $yxbz;
        
        //echo $apartment."的优秀部长是：".$data['yxbz']."</br>";
        
        
        //var_dump($data);
        $bmfk_info = $bmfk_model->save($data);
        
        
        
        
    }
    
    
}

?>