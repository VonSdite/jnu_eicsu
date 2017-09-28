<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/
import('@.Action.PerformGsCalculator');


//绩效考核第二阶段, 处理一些反馈, 准备优秀部长评定
class PerformRankingController extends JnuEicSuBaseAction
{
    var $info_mgr;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->info_mgr=$info_mgr;
    }
    
    //绩效考核第二阶段：生成基本反馈,生成总分和排名
    public function startRanking($year,$month)
    {
        //设置年月
        $authority_model = new Model("Authority");
        $flagInitYxbz = 1;
        //需要满足下面条件:基本成员信息要求、该时间正在考核、系统不存在未结束的考核
        $authority_info = $authority_model->find();
        if ($authority_info['is_init'] != 1)
            $flagInitYxbz = 0;
        $control_model = new Model("Control");
        $control_info = $control_model->where("year=$year and month=$month")->find();
        if (empty($control_info['id']))
            $flagInitYxbz = 0;
        else {
            if ($control_info['is_yxbz'] == 1 || $control_info['is_over'] == 1) {
                $flagInitYxbz = 0;
            }
        }
        $control_info = $control_model->where("is_over=0||is_yxbz=0")->select();
        if (count($control_info) > 1)
            $flagInitYxbz = 0;
        if ($flagInitYxbz == 0) {
            //echo "优秀部长评定初始化不满足开启条件</br>";
            return false;
        }
        //echo "即将进行各项初始化工作，耐心等待</br>";
        try{
            $this->funcfkonegs($year,$month);
        }catch (Exception $e) {
            return false;
        }
        try{
            $this->funcfkonebz($year,$month);
        }catch (Exception $e) {
            return false;
        }
        try{
            $this->funcfktwo($year,$month);
        }catch (Exception $e) {
            return false;
        }
        unset($data);
        $data['is_yxbz'] = 1;
        $control_info = $control_model->where("(year=$year and month=$month)")->save($data);
        return true;
    }
    
    //对该部门的干事总分进行排序, 结果rank存到该干事的gsfk model中
    private function sort_apartment_gsfk($apartment, $year, $month)
    {
        $gsfk_model = new Model("Gsfk");
        $person_model = new Model("Person");
        $person_accounts = $person_model->where("apartment=$apartment and (type=1 or type=2)")->field('account')->select();
        $cond['account'] = array('in',array_map(function($v){return $v['account'];},$person_accounts));
        $cond['year'] = $year;
        $cond['month'] = $month;
        $arr_gsfk_info = $gsfk_model->where($cond)->order('total desc')->select();
        for($rank=1;$rank<=count($arr_gsfk_info);$rank++){
            $account = $arr_gsfk_info[$rank-1]['account'];
            $data['rank'] = $rank;
            $gsfk_model->where("(year=$year and month=$month) and account=$account")->data($data)->save();
            unset($data);
        }
        unset($cond);
    }

    //这是老版本的干事排序, 因性能令人发指被sort_apartment_gsfk取缔
    private function sort_apartment_gsfk_old($apartment,$year,$month)
    {
        $gsfk_model = new Model("Gsfk");
        $person_model = new Model("Person");
        $person_info=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
        $person_info2=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
        //将欠缺的干事排名，优秀干事补上
        foreach ($person_info as $v) {
            $rank = 1;
            $account1 = $v['account'];
            $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and (account=$account1)")->find();
            $total1 = $gsfk_info['total'];
            foreach ($person_info2 as $v2) {
                if ($v2['account'] == $account1)
                    continue;
                $account2 = $v2['account'];
                $gsfk_info2 = $gsfk_model->where("(year=$year and month=$month) and (account=$account2)")->find();
                $total2 = $gsfk_info2['total'];
                if ($total1 < $total2) {
                    $rank++;
                }
                if ($total1 == $total2) {
                    //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
                    //echo $account1."比较：".$account2."结果：".strcmp($account1,$account2)."</br>";
                    if (strcmp($account1, $account2) > 0) //学号小的排在前面  
                        $rank++;
                }
                //echo $account1.":".$total1."比较".$account2.":".$total2."</br>";
            }
            //echo $account1."总分：".$total1."排名:".$rank."</br>";
            $data['rank'] = $rank;
            $gsfk_model->where("(year=$year and month=$month) and account=$account1")->data($data)->save();
        }
    }
    
    //决定每个部门的优秀干事, 
    private function decide_apartment_gsfk_yxgs($apartment,$year,$month,$yxchxz_account_arr)
    {
        $gsfk_model = new Model("Gsfk");
        $cond['year'] = $year;
        $cond['month'] = $month;
        $cond['account'] = array('not in',$yxchxz_account_arr);
        //按rank从1到n排序, 排除优秀称号限制的account,取前面部门数量怎么多的干事, 应该就是各个部门的优秀干事了
        $yxgs_info = $gsfk_model->where($cond)->order('rank asc')->limit($this->all_depart_num)->select();
        foreach ($yxgs_info as $v) {
            $data['yxgs']=1;
            $cond['account']=$v['account'];
            $gsfk_model->where($cond)->data($data)->save();
            unset($data);
        }
        unset($cond);
    }

    //决定每个部门的优秀干事, 老版本
    private function decide_apartment_gsfk_yxgs_old($year,$month)
    {
        //根据排名确定每个部门的优秀干事
        $gsfk_model = new Model("Gsfk");
        $person_model = new Model("Person");
        $yxchxz_model = new Model("Yxchxz");
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $flag = 1; //跳出标志
            $j = 1; //从排名第一的开始算起   
            while ($flag) {
                $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and rank=$j")->select();
                foreach ($gsfk_info as $v) {
                    $gs_account = $v['account'];
                    $person_info = $person_model->where("account=$gs_account")->find();
                    if ($person_info['apartment'] == $i)
                        break;
                }
                //echo "部门".$i."的排名第".$j."的干事是：".$gs_account."</br>";
                //$gs_account=$gsfk_info['account'];
                $yxchxz_info = $yxchxz_model->where("account=$gs_account")->find();
                if (empty($yxchxz_info)) {
                    //echo $gs_account."没有被限制了</br>";
                    unset($data);
                    $data['yxgs'] = 1;
                    $gsfk_model->where("(year=$year and month=$month) and account=$gs_account")->data($data)->save();
                    $flag = 0;
                    //echo "部门".$i."的优秀干事是：".$gs_account."</br>";
                } else {
                    //echo $gs_account."被限制了</br>"; 
                }
                $j++;
                $person_info = $person_model->where("apartment=$i and (type=1 or type=2)")->select();
                if ($j > count($person_info))
                    $flag = 0;
            }
  
        }
    }


    //干事反馈处理
    private function funcfkonegs($year,$month)
    {
        //获取所有干事
        $yxchxz_model = new Model("Yxchxz");
        $person_model = new Model("Person");
        $gsfk_model = new Model("Gsfk");
        $person_info = $person_model->where("type=1 or type=2")->select();
        //计算总分
        $gs_caltor = new PerformGsCalculator($this->info_mgr);
        foreach ($person_info as $v) {
            $waccount = $v['account'];
            //干事考核反馈表
            $this->handle_gsfk($gs_caltor,$waccount, $year, $month);
        }
        
        //排名是部门内的
        for ($j = 1; $j <= $this->all_depart_num; $j++) {
            $this->sort_apartment_gsfk($j,$year,$month);
        }
        unset($data);
        
        $this->decide_apartment_gsfk_yxgs_old($year,$month);
        
        
    }
    //部长反馈处理
    private function funcfkonebz($year,$month)
    {
        //部长反馈表
        $person_model = new Model("Person");
        $bzfk_model = new Model("Bzfk");
        $person_info = $person_model->where("type=3")->select();
        foreach ($person_info as $v) {
            $this->getbzfk($v['account'], $year, $month);
        }
        
        //规矩改了，排名是内部的
        for ($j = 1; $j <= $this->all_depart_num; $j++) {
            $person_info = $person_model->where("type=3 and apartment=$j")->select();
            $person_info2 = $person_model->where("type=3 and apartment=$j")->select();
            //将欠缺的部长排名补上
            foreach ($person_info as $v) {
                $rank = 1;
                $account1 = $v['account'];
                $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and (account=$account1)")->find();
                $total1 = $bzfk_info['total'];
                //echo "tz:".$total1."</br>";
                foreach ($person_info2 as $v2) {
                    if ($v2['account'] == $account1)
                        continue;
                    $account2 = $v2['account'];
                    $bzfk_info2 = $bzfk_model->where("(year=$year and month=$month) and (account=$account2)")->find();
                    $total2 = $bzfk_info2['total'];
                    if ($total1 < $total2) {
                        $rank++;
                    }
                    if ($total1 == $total2) {
                        //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
                        //echo $account1."比较：".$account2."结果：".strcmp($account1,$account2)."</br>";
                        if (strcmp($account1, $account2) > 0) //学号小的排在前面  
                            $rank++;
                    }
                    //echo $account1.":".$total1."比较".$account2.":".$total2."</br>";
                }
                //echo $account1."总分：".$total1."排名:".$rank."</br>";
                $data['rank'] = $rank;
                $bzfk_model->where("(year=$year and month=$month) and account=$account1")->data($data)->save();
            }
        }
        
    }
    
    //优秀部长候选人处理
    private function funcfktwo($year,$month)
    {
        $person_model = new Model("Person");
        $bzfk_model = new Model("Bzfk");
        $yxchxz_model = new Model("Yxchxz");
        $yxbzhx_model = new Model("Yxbzhx");
        
        //为避免重复，要先删后增
        $yxbzhx_model->where("year=$year and month=$month")->delete();
        //总共有11个部门
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            unset($candidate);
            $rank = 1;
            $flag = 1; //跳出循环标志
            //找出该部门排名$rank的部长
            while ($flag) {
                $person_info = $person_model->where("apartment=$i and type=3")->select();
                $bz_sum = count($person_info);
                foreach ($person_info as $person_v) {
                    $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and rank=$rank")->select();
                    foreach ($bzfk_info as $bzfk_v) {
                        if ($bzfk_v['account'] == $person_v['account']) {
                            $bz_account = $person_v['account'];
                            break;
                        }
                    }
                    
                }
                //判断是否出现在限制名单中
                $yxchxz_info = $yxchxz_model->where("account=$bz_account")->find();
                if (empty($yxchxz_info)) {
                    //echo $bz_account."没被限制</br>";
                    $candidate = $bz_account;
                    $flag = 0;
                }
                
                //echo $bz_account."被限制了</br>";
                $rank++;
                if ($rank > $bz_sum)
                    $flag = 0;
            }
            //如果$candidate不为空，说明该部门有优秀部长候选人
            //找到该部门符合条件的候选人并插入数据库表 tbl_yxbzhx;
            $yxbzhx_model = new Model("Yxbzhx");
            
            if (!empty($candidate)) {
                //echo "部门".$i."的优秀部长候选人是：".$candidate."</br>";
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['HX'] = $candidate;
                $yxbzhx_info = $yxbzhx_model->add($data);
                //if($yxbzhx_info)
                //echo $candidate."添加成功</br>";
            }
            //else
            //echo "部门".$i."没有优秀部长候选人</br>";
        }
        //候选人找到之后，就是给每个主席团匹配候选人
        
        //找到所有主席
        //echo "优秀部长评定表初始化开始</br>";
        $person_model = new Model("Person");
        $yxbz_model = new Model("Yxbz");
        $president_model = new Model("President");
        $yxbzhx_model = new Model("Yxbzhx");
        //为避免重复，要先删后增
        $yxbz_model->where("year=$year and month=$month")->delete();
        $yxbzhx_info = $yxbzhx_model->where("year=$year and month=$month")->select();
        //从优秀部长候选中选
        $person_model = $person_model->where("type=4")->select();
        foreach ($person_model as $v) {
            //必须投四个部长
            $i = 1;
            foreach ($yxbzhx_info as $v_hx) {
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $v['account'];
                $data['raccount'] = $v_hx['HX'];
                //被投部长默认为空，方便使用是用empty()判断
                $data['checked'] = 1;
                $yxbz_info = $yxbz_model->add($data);
                //if(!$yxbz_info)
                //echo $data['waccount']."优秀部长评定初始化失败";
                if ($i > 3)
                    break;
                $i++;
            }
        }
        //echo "优秀部长评定表初始化完成</br>";
        
    }

    

    //在干事考核反馈表中，根据传过来干事的account，进行操作
    private function handle_gsfk($gs_caltor,$waccount, $year, $month)
    {
        //自评得分
        $zpdf = $gs_caltor->cal_gskhfk_zpdf($waccount,$year,$month);
        
        //部长评价得分
        $bzpjdf = $gs_caltor->cal_gskhfk_bzpjdf($waccount,$year,$month);

        //外调加分
        $wdjf_info = $gs_caltor->cal_gskhfk_wdjf($waccount,$year,$month);
        $wdjf = $wdjf_info['wdjf'];
        
        //出勤得分
        $cqdf = $gs_caltor->cal_gskhfk_cqdf($waccount,$year,$month,$wdjf_info['wgqx']);
        
        //推优加分
        $tyjf = $gs_caltor->cal_gskhfk_tyjf($waccount,$year,$month);
       
        //调研采纳加分
        $dycnjf = $gs_caltor->cal_gskhfk_dycnjf($waccount,$year,$month);

        //其他
        $qt = $gs_caltor->cal_gskhfk_qt($waccount,$year,$month);

        //计算总分：
        $total = $gs_caltor->cal_gskhfk_total($zpdf, $bzpjdf, $cqdf, $wdjf, $tyjf, $dycnjf, $qt);
        //echo $waccount."的总分是：".$total."</br>";
        //将所有这些信息存入数据库表 tbl_gsfk中
        //排名和优秀干事先留着
        $gsfk_model = new Model("Gsfk");
        unset($data);
        $data = Array(
            'year' => $year,
            'month' => $month,
            'account' => $waccount,
            'total' => $total,
            'zpdf' => $zpdf, //自评得分
            'bzpjdf' => $bzpjdf, //部长评价
            'cqdf' => $cqdf, //出勤得分
            'wddf' => $wdjf, //外调得分
            'tydf' => $tyjf, //推优得分
            'fkdf' => $dycnjf, //反馈得分
            'qtdf' => $qt //其他得分
        );
        //var_dump($data);
        //echo "</br>";
        $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and account=$waccount")->save($data);
        
        //echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    //在部长反馈表，根据传过来的部长的waccount，year 和month进行操作
    private function getbzfk($waccount, $year, $month)
    {
        //计算自评得分
        $bzzp_model = new Model("Bzzp");
        $person_model = new Model("Person");
        $bzkh_model = new Model("Bzkh");
        $president_model = new Model("President");
        $interact_model = new Model("Interact");
        $evaluate_model = new Model("Evaluate");
        $chuqin_model = new Model("Chuqin");
        $resource_model = new Model("Resource");
        $diaoyan_model = new Model("Diaoyan");
        $qt_model = new Model("Qt");
        $control_model = new Model("Control");
        //echo $waccount."的反馈：</br>";
        $bzzp_info = $bzzp_model->where("(year=$year and month=$month) and waccount=$waccount")->find();
        $total = $bzzp_info['total'];
        $total = ($total / (12 * 10)) * 2;
        $zpdf = $total;
        // echo "自评总分:".$total."</br>";
        //找出主管副主席
        $person_info = $person_model->where("account=$waccount")->find();
        $apartment = $person_info['apartment'];
        $fzx_account = $this->info_mgr->getPresidentByApartment($apartment);
        $bzkh_info = $bzkh_model->where("(year=$year and month=$month) and waccount=$fzx_account and raccount=$waccount")->find();
        //计算主管副主席的给分
        //由于部长考核时没有计算总分，这里再计算一次
        $total = $bzkh_info['total'];
        $zxpjdf = $total;
        $zxpjdf = ($zxpjdf / (9 * 10)) * 5;
        // echo "主管副主席评价：".$zxpjdf."</br>";
        //找出所有干事
        $person_info = $person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
        $gsgf = 0; //累计干事给分
        $sum = count($person_info); //干事人数
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and waccount=$gs_account and raccount=$waccount")->find();
            $gsgf = $gsgf + $evaluate_info['df'] * 0.2;
        }
        //echo "总得分：".$gsgf."</br>";
        //echo "人数：".$sum."</br>";
        $gspjdf = $gsgf / $sum;
        //echo "来自干事的平均分：".$gspjdf."</br>";
        //本部门其他部长的评价
        //找出本部门其他部长
        $person_info = $person_model->where("apartment=$apartment and type=3")->select();
        $bzgf = 0;
        $sum = count($person_info) - 1;
        foreach ($person_info as $v) {
            $bz_account = $v['account'];
            if ($bz_account == $waccount)
                continue;
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$waccount")->find();
            $bzgf = $bzgf + $evaluate_info['df'];
        }
        $bzpjdf = $bzgf / $sum;
        $bzpjdf = $bzpjdf * 0.2;
        //echo "总得分：".$bzgf."</br>";
        //echo "人数：".$sum."</br>";
        //echo "来自本部门其他部长平均分：".$bzpjdf."</br>";
        //计算出勤扣分
        //获取出勤情况
        $chuqin_info = $chuqin_model->where("(year=$year and month=$month) and (raccount=$waccount)")->find();
        $qj = $chuqin_info['qj'] * (-0.1);
        $ct = $chuqin_info['ct'] * (-0.2);
        $qx = $chuqin_info['qx'] * (-0.3);
        //获取外调无辜缺席情况
        //获取上次外调时间
        $arrLastTime = $this->info_mgr->getLastPerformTime();
        $yearLast = $arrLastTime['year'];
        $monthLast = $arrLastTime['month'];
        $control_info = $control_model->where("is_over=1")->select();
        if (count($control_info) == 0) {
            $resource_info = $resource_model->where("account=$waccount")->select();
        } else {
            $control_info = $control_model->where("year=$yearLast and month=$monthLast")->find();
            $laststamp = $control_info['beginstamp'];
            $control_info = $control_model->where("is_over=0")->find();
            $thisstamp = $control_info['beginstamp'];
            $resource_info = $resource_model->where("($laststamp<create_time and $thisstamp>create_time) and account=$waccount")->select();
        }
        //echo $waccount."被外调了".count($resource_info)."次</br>";
        //$resource_info=$resource_model->where("(year=$year and month=$month) and account=$waccount")->select();
        $wgqx = 0; //外调无辜缺席次数
        $yb = 0; //外调表现一般次数
        $tc = 0; //外调表现突出次数
        foreach ($resource_info as $v) {
            if ($v['assess'] == 1)
                $wgqx++;
            if ($v['assess'] == 3)
                $yb++;
            if ($v['assess'] == 4)
                $tc++;
        }
        //出勤得分
        $cqdf = 1 + $qj + $ct + $qx - $wgqx * (-0.3);
        if ($cqdf < 0)
            $cqdf = 0;
        //echo "出勤得分：".$cqdf."</br>";
        //echo $waccount."外调无辜缺席次数：".$wgqx."</br>";
        //echo $waccount."外调一般次数：".$yb."</br>";
        //echo $waccount."外调突出次数：".$tc."</br>";
        //$wgqxkf=$wgqx*(-0.1);
        
        //获取外调加分
        $wddf = $yb * 0.1 + $tc * 0.2;
        //反馈加分：调研意见采纳加分
        $diaoyan_info = $diaoyan_model->where("(year=$year and month=$month) and raccount=$waccount")->find();
        $dycn = $diaoyan_info['caina'];
        $dycnjf = $dycn * 0.1;
        $fkdf = $dycnjf;
        //其他
        $qt_info = $qt_model->where("(year=$year and month=$month) and account=$waccount")->find();
        $qtdf = $qt_info['qt'];
        //echo "其他得分是：".$qtdf."</br>";
        //计算总分：
        $total = $zpdf + $zxpjdf + $gspjdf + $bzpjdf + $cqdf + $wddf + $fkdf + $qtdf;
        //echo $waccount."的总分是".$total."</br>";
        //将所有这些信息存入数据库表 tbl_gsfk中
        //排名和优秀部长先留着  
        $data = Array(
            'year' => $year,
            'month' => $month,
            'account' => $waccount,
            'total' => $total,
            'zpdf' => $zpdf,
            'zxpjdf' => $zxpjdf,
            'gspjdf' => $gspjdf,
            'bzpjdf' => $bzpjdf,
            'cqdf' => $cqdf,
            'wddf' => $wddf,
            'fkdf' => $fkdf,
            'qtdf' => $qtdf
        );
        $bzfk_model = new Model("Bzfk");
        $bzfk_model->where("(year=$year and month=$month) and account=$waccount")->save($data);
        //if()
        // echo "添加成功</br>";
    }
    
    
    
}

?>