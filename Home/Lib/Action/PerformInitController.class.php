<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/

//绩效考核第一阶段, 各种初始化
class PerformInitController extends JnuEicSuBaseAction
{
    var $info_mgr;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->info_mgr = $info_mgr;
    }
    
    //考核系统初始化阶段一
    public function initPerform($year,$month)
    {

        $control_model = new Model("Control");
        $control_info = $control_model->where("year=$year and month=$month")->find();
        //根据tbl_authority判断，若时间已经存在拒绝访问
        //干事自评表，部长自评表，干事自评表，部长考核表，部门考核表
        //开始一次绩效考核需要满足下面的条件：基本成员信息要求、该时间未考核过、系统不存在未结束的考核
        $authority_model = new Model("Authority");
        $flagInitPerform = 1;
        $authority_info = $authority_model->find();
        if ($authority_info['is_init'] != 1)
            $flagInitPerform = 0;
        $control_model = new Model("Control");
        $control_info = $control_model->where("year=$year and month=$month")->find();
        if (!empty($control_info['id']))
            $flagInitPerform = 0;
        $control_info = $control_model->where("is_over=0||is_yxbz=0")->select();
        if (count($control_info) > 0)
            $flagInitPerform = 0;
        if ($flagInitPerform == 0) {
            //echo "本次考核不满足开启条件</br>";
            return false;
        }
        //echo "即将进行各项初始化工作，耐心等待</br>";
        unset($data);
        $data['year'] = $year;
        $data['month'] = $month;
        $data['beginstamp'] = time();
        $control_info = $control_model->add($data);
        $this->funcyjjh($year,$month);
        $this->funcinitbmty($year,$month);
        $this->funcinitwdcs($year,$month);
        $this->funcinitchuqin($year,$month);
        $this->funcinitdiaoyan($year,$month);
        $this->funcinitqtqk($year,$month);
        $this->funcinitgsfk($year,$month);
        $this->funcinitbzfk($year,$month);
        $this->funcinitbmfk($year,$month);
        $this->funcinityxchxz($year,$month);
        $this->funcinitbmwg($year,$month);
        return true;
        //echo "完毕</br>";
    }
    
    //绩效考核初始化第一阶段，包括：干事自评表，部长自评表，干事考核表，部长考核表，部门考核表
    private function funcyjjh($year,$month)
    {
        //一键激活数据库表，包括：
        $person_model = new Model("Person");
        $gszp_model = new Model("Gszp");
        $interact_model = new Model("Interact");
        $tuiyou_model = new Model("Tuiyou");
        $evaluate_model = new Model("Evaluate");
        $bzzp_model = new Model("Bzzp");
        $gskh_model = new Model("Gskh");
        $president_model = new Model("President");
        $bzkh_model = new Model("Bzkh");
        $bmkh_model = new Model("Bmkh");
        $oneway_model = new Model("Oneway");
        $bmty_model = new Model("Bmty");
        //echo "干事初始化开始</br>";
        //找出所有干事
        $person_info = $person_model->where("type=1 or type=2")->select();
        foreach ($person_info as $v) {
            $account = $v['account'];
            //基本信息
            $apartment = $v['apartment'];
            unset($data);
            $data['account'] = $account;
            $data['apartment'] = $v['apartment'];
            $data['year'] = $year;
            $data['month'] = $month;
            $data['zptext'] = "空";
            //干事自评表，每个部门的干事都要初始化
            $gszp_info = $gszp_model->add($data);
            //if(!$gszp_info)
            //echo $account."干事自评表初始化出错</br>";
            //干事推优干事
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['waccount'] = $account;
            $data['wapartment'] = $v['apartment'];
            $data['wtype'] = $v['type'];
            $data['rapartment'] = $v['apartment'];
            $data['rtype'] = $v['type'];
            $data['text'] = "空";
            $tuiyou_info = $tuiyou_model->add($data);
            // if(!$tuiyou_info)
            // echo $account."干事推优干事初始化出错</br>";
            //对本部门的留言
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['waccount'] = $account;
            $data['wapartment'] = $v['apartment'];
            $data['wtype'] = $v['type'];
            $data['raccount'] = $v['apartment'];
            $data['text'] = "空";
            $interact_info = $interact_model->add($data);
            //if(!$interact_info)
            // echo $account."干事对部门留言初始化出错</br>";
            //干事对部长的评分
            //找出所有部长
            $person_info_bz = $person_model->where("apartment=$apartment and type=3")->select();
            foreach ($person_info_bz as $v_bz) {
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $account;
                $data['wapartment'] = $v['apartment'];
                $data['wtype'] = $v['type'];
                $data['raccount'] = $v_bz['account'];
                $data['rapartment'] = $v['apartment'];
                $data['rtype'] = 3;
                $data['text'] = "空";
                $data['nm'] = 1;
                $evaluate_info = $evaluate_model->add($data);
                //判断是否添加成功
                //if(!$evaluate_info)
                //echo $account."干事对部长的评价初始化失败"."</br>";
            }
            
        }
        //echo "干事初始化完成</br>";
        //干事初始化完成
        //找出所有部长
        //echo "部长初始化开始</br>";
        $person_info = $person_model->where("type=3")->select();
        foreach ($person_info as $v) {
            //基本信息
            $apartment = $v['apartment'];
            $account = $v['account'];
            //部长自评表
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['waccount'] = $account;
            $data['wapartment'] = $apartment;
            $data['zptext'] = "空";
            $bzzp_info = $bzzp_model->add($data);
            //if(!$bzzp_info)
            //echo $account."的部长自评初始化失败";
            //该部长对本部门其他部长的评价
            $person_info_bz = $person_model->where("apartment=$apartment and type=3")->select();
            foreach ($person_info_bz as $v_bz) {
                if ($v_bz['account'] == $v['account'])
                    continue;
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $account;
                $data['wapartment'] = $apartment;
                $data['wtype'] = 3;
                $data['raccount'] = $v_bz['account'];
                $data['rapartment'] = $apartment;
                $data['rtype'] = 3;
                $data['nm'] = 1;
                $data['text'] = "空";
                $evaluate_info = $evaluate_model->add($data);
                //if(!$evaluate_info)
                //echo $account."部长对本部门其他部长的评价失败";
            }
            
            //该部长对其主管副主席的评价
            //找出主管副主席
            
            $zg_account = $this->info_mgr->getPresidentByApartment($apartment);
            //echo $account."主管副主席是：".$zg_account."</br>";
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['waccount'] = $account;
            $data['wapartment'] = $apartment;
            $data['wtype'] = 3;
            $data['raccount'] = $zg_account;
            $data['rapartment'] = $this->zxt_depart_num;
            $data['rtype'] = 4;
            $data['text'] = "空";
            $interact_info = $interact_model->add($data);
            //if(!$interact_info)
            //echo $account."对主管副主席评价初始化失败</br>";
            //对所有主席团的匿名留言
            $person_info_zxt = $person_model->where("type=4")->select();
            foreach ($person_info_zxt as $v_zxt) {
                $zxt_account = $v_zxt['account'];
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $account;
                $data['wapartment'] = $apartment;
                $data['wtype'] = 3;
                $data['raccount'] = $zxt_account;
                $data['rapartment'] = $this->zxt_depart_num;
                $data['rtype'] = 4;
                $data['text'] = "空";
                $data['nm'] = 1;
                $interact_info = $interact_model->add($data);
                //if(!$interact_info)
                //echo $account."主席团成员匿名评价初始化失败</br>";
            }
            //干事考核表，对部门所有干事的给分
            //找出该部长所有的干事
            $person_info_gs = $person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
            foreach ($person_info_gs as $v_gs) {
                //给干事打分
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $account;
                $data['wapartment'] = $apartment;
                $data['raccount'] = $v_gs['account'];
                $gskh_info = $gskh_model->add($data);
                //if(!$gskh_info)
                //echo $account."对干事考核初始化失败</br>";
                //对干事评价
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $account;
                $data['wapartment'] = $apartment;
                $data['wtype'] = 3;
                $data['raccount'] = $v_gs['account'];
                $data['rapartment'] = $apartment;
                $data['rtype'] = $v_gs['type'];
                $data['text'] = "空";
                $interact_info = $interact_model->add($data);
                //if(!$interact_info)
                //echo $account."对干事评价初始化失败</br>";
            }
        }
        //echo "部长初始化完成</br>";
        //部长初始化完成 
        //找出所有主席团成员
        //echo "主席团初始化开始</br>";
        $person_info = $person_model->where("type=4")->select();
        foreach ($person_info as $v) {
            //每个主席团成员都要对其主管的部门的部长进行考核
            //基本信息
            $account = $v['account'];
            $president_info = $president_model->where("account=$account")->find();
            $apartmentArr = explode("|", $president_info['apartment']);
            
            if ($president_info['is_sub'] == 'y') //一般主管副主席
                {
                
                for ($k = 0; $k < count($apartmentArr); $k++) {
                    $apartment_tar = $apartmentArr[$k];
                    if ($apartment_tar != 0) {
                        $person_info_bz = $person_model->where("apartment=$apartment_tar and type=3")->select();
                        foreach ($person_info_bz as $v_bz) {
                            //对部长进行评分
                            unset($data);
                            $data['waccount'] = $account;
                            $data['wapartment'] = $this->zxt_depart_num;
                            $data['raccount'] = $v_bz['account'];
                            $data['rapartment'] = $apartment_tar;
                            $data['year'] = $year;
                            $data['month'] = $month;
                            $bzkh_info = $bzkh_model->add($data);
                            // if(!$bzkh_info)
                            //echo $account."对部长评分初始化失败</br>";
                            //进行对部长进行评价
                            unset($data);
                            $data['year'] = $year;
                            $data['month'] = $month;
                            $data['waccount'] = $account;
                            $data['wapartment'] = $this->zxt_depart_num;
                            $data['wtype'] = 4;
                            $data['raccount'] = $v_bz['account'];
                            $data['rapartment'] = $apartment_tar;
                            $data['rtype'] = 3;
                            $data['text'] = "空";
                            $interact_info = $interact_model->add($data);
                            // if(!$interact_info)
                            //echo $account."对部长评价初始化失败</br>";
                        }
                        //对部门1进行考核
                        unset($data);
                        $data['waccount'] = $account;
                        $data['wapartment'] = $this->zxt_depart_num;
                        $data['rapartment'] = $apartment_tar;
                        $data['year'] = $year;
                        $data['month'] = $month;
                        $data['text'] = "空";
                        $bmkh_info = $bmkh_model->add($data);
                        //if(!$bmkh_info)
                        //echo $account."对部门考核初始化失败</br>";
                    }
                }
                
                
                
            } else //主席
                {
                //对管辖内的部长进行评分评价
                for ($k = 0; $k < count($apartmentArr); $k++) {
                    $apartment_tar = $apartmentArr[$k];
                    if ($apartment_tar != 0) {
                        $person_info_bz = $person_model->where("apartment=$apartment_tar and type=3")->select();
                        foreach ($person_info_bz as $v_bz) {
                            //对部长进行评分
                            unset($data);
                            $data['waccount'] = $account;
                            $data['wapartment'] = $this->zxt_depart_num;
                            $data['raccount'] = $v_bz['account'];
                            $data['rapartment'] = $apartment_tar;
                            $data['year'] = $year;
                            $data['month'] = $month;
                            $bzkh_info = $bzkh_model->add($data);
                            // if(!$bzkh_info)
                            //echo $account."对部长评分初始化失败</br>";
                            //进行对部长进行评价
                            unset($data);
                            $data['year'] = $year;
                            $data['month'] = $month;
                            $data['waccount'] = $account;
                            $data['wapartment'] = $this->zxt_depart_num;
                            $data['wtype'] = 4;
                            $data['raccount'] = $v_bz['account'];
                            $data['rapartment'] = $apartment_tar;
                            $data['rtype'] = 3;
                            $data['text'] = "空";
                            $interact_info = $interact_model->add($data);
                            // if(!$interact_info)
                            //echo $account."对部长评价初始化失败</br>";
                        }
                        //对部门1进行考核
                        unset($data);
                    }
                }
                //对11个部门进行考核
                //echo $account."</br>";
                for ($i = 1; $i <= $this->all_depart_num; $i++) {
                    //对部门$i进行考核
                    unset($data);
                    $data['waccount'] = $account;
                    $data['wapartment'] = $this->zxt_depart_num;
                    $data['rapartment'] = $i;
                    $data['year'] = $year;
                    $data['month'] = $month;
                    $data['text'] = "空";
                    $bmkh_info = $bmkh_model->add($data);
                    //if(!$bmkh_info)
                    //echo $account."对部门考核初始化失败</br>";
                }
            }
            
        }
        //echo "主席团初始化完成</br>";   
    }
    //绩效考核初始化第一阶段，主席团的部门推优
    private function funcinitbmty($year,$month)
    {
        //echo "主席团的部门推优初始化开始</br>";
        //找出所有主席团成员
        $person_model = new Model("Person");
        $tuiyou_model = new Model("Tuiyou");
        $person_info = $person_model->where("type=4")->select();
        //var_dump($person_info);
        foreach ($person_info as $v) {
            //每个主席团成员都要对其主管的部门的部长进行考核
            //基本信息
            $account = $v['account'];
            //不管是不是主席，都得对非主管部门推优
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['waccount'] = $account;
            $data['wapartment'] = $this->zxt_depart_num;
            $data['wtype'] = 4;
            $data['text'] = "空";
            $tuiyou_info = $tuiyou_model->add($data);
            //if(!$tuiyou_info)
            //echo $account."对非主管部门推优初始化失败</br>";
        }
        //echo "主席团的部门推优初始化完成</br>";
    }
    //绩效考核初始化第一阶段，成该月份的干事反馈表
    private function funcinitgsfk($year,$month)
    {
        $person_model = new Model("Person");
        $gsfk_model = new Model("Gsfk");
        //找到所有的干事
        //echo "干事反馈表初始化开始</br>";
        $person_info = $person_model->where("type=1 or type=2")->select();
        foreach ($person_info as $v) {
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['account'] = $v['account'];
            $gsfk_info = $gsfk_model->add($data);
            //if(!$gsfk_info) 
            //echo $v['account']."干事反馈初始化失败</br>";
        }
        // echo "干事反馈表初始化结束</br>";
    }
    //绩效考核初始化第一阶段，该月份的部长反馈表
    private function funcinitbzfk($year,$month)
    {
        //echo "部长反馈表初始化开始</br>";
        //找出所有的部长
        $person_model = new Model("Person");
        $bzfk_model = new Model("Bzfk");
        $person_info = $person_model->where("type=3")->select();
        foreach ($person_info as $v) {
            $bz_account = $v['account'];
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['account'] = $bz_account;
            $bzfk_info = $bzfk_model->add($data);
            // if(!$bzfk_info)
            //echo $data['account']."部长反馈表初始化失败</br>";
        }
        //echo "部长反馈表初始化完成</br>";
    }
    //绩效考核初始化第一阶段，该月份的部门反馈表
    private function funcinitbmfk($year,$month)
    {
        //echo "部门反馈表初始化开始";
        //echo "部门反馈表初始化开始</br>";
        $bmfk_model = new Model("Bmfk");
        //找出11个部门
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['apartment'] = $i;
            $bmfk_info = $bmfk_model->add($data);
            // if(!$bmfk_info)
            //echo $i."部门反馈表初始化失败</br>";
        }
        // echo "部门反馈表初始化结束</br>";
    }
    
    //绩效考核初始化第一阶段，该月的外调次数表
    private function funcinitwdcs($year,$month)
    {
        $wdcs_model = new Model("Wdcs");
        $person_model = new Model("Person");
        //echo "外调次数初始化开始</br>";
        //每个部门的干事、部长初始化
        for ($i = 1; $i <= ($this->all_depart_num + 1); $i++) //$this->all_depart_num+1表示包括主席团
            {
            $person_info = $person_model->where("apartment=$i")->select();
            foreach ($person_info as $v) {
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['account'] = $v['account'];
                $wdcs_info = $wdcs_model->add($data);
                // if(!$wdcs_info)
                //echo $data['account']."外调次数初始化失败</br>";
            }
        }
        //echo "外调次数初始化结束</br>";
    }
    //绩效考核初始化第一阶段，该月的出勤统计
    private function funcinitchuqin($year,$month)
    {
        $person_model = new Model("Person");
        $chuqin_model = new Model("Chuqin");
        $rlgj_model = new Model("Rlgj");
        //echo "出勤统计初始化开始</br>";
        //共11个部门，根据跟进干事记录各部门的出勤情况
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $rlgj_info = $rlgj_model->where("apartment=$i")->find();
            $rlgs_account = $rlgj_info['account'];
            $person_info = $person_model->where("apartment=$i")->select();
            foreach ($person_info as $v) {
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $rlgs_account;
                $data['raccount'] = $v['account'];
                $data['rapartment'] = $i;
                $chuqin_info = $chuqin_model->add($data);
                //if(!$chuqin_info)
                //echo "出勤表初始化失败</br>";
            }
        }
        //echo "出勤统计初始化结束</br>";
    }
    //绩效考核初始化第一阶段，该月的调研采纳统计
    private function funcinitdiaoyan($year,$month)
    {
        $person_model = new Model("Person");
        $diaoyan_model = new Model("Diaoyan");
        $rlgj_model = new Model("Rlgj");
        //echo "调研采纳初始化开始</br>";
        //找出11个部门的干事和部长
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            //找到跟进的干事
            $rlgj_info = $rlgj_model->where("apartment=$i")->find();
            $rlgs_account = $rlgj_info['account'];
            $person_info = $person_model->where("apartment=$i")->select();
            foreach ($person_info as $v) {
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $rlgs_account;
                $data['raccount'] = $v['account'];
                $data['rapartment'] = $i;
                $diaoyan_info = $diaoyan_model->add($data);
                //if(!$diaoyan_info)
                //echo "调研采纳初始化失败</br>";
            }
        }
        //echo "调研采纳初始化结束</br>";
    }
    //绩效考核初始化第一阶段，其他情况加分表
    private function funcinitqtqk($year,$month)
    {
        $person_model = new Model("Person");
        $qt_model = new Model("Qt");
        //echo "其他情况加减分初始化开始</br>";
        //找到所有的干事、部长
        $person_info = $person_model->where("(type=1 or type=2) or type=3")->select();
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['account'] = $gs_account;
            $data['text'] = "空";
            $qt_info = $qt_model->add($data);
            // if(!$qt_info)
            //echo "其他情况加分表初始化失败</br>";
        }
        //找到所有部门
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['account'] = $i;
            $data['text'] = "空";
            $qt_info = $qt_model->add($data);
            // if(!$qt_info)
            //echo "其他情况加分表初始化失败</br>";
        }
        //echo "其他情况加减分初始化结束</br>";
    }
    //绩效考核初始化第一阶段，部门违规扣分表
    private function funcinitbmwg($year,$month)
    {
        //找到所有人力干事
        $person_model = new Model("Person");
        $bmwg_model = new Model("Bmwg");
        $bmwgfzr_model = new Model("Bmwgfzr");
        for ($j = 1; $j <= $this->weiji_type_num; $j++) {
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $bmwgfzr_info = $bmwgfzr_model->where("type=$j")->find();
            $data['account'] = $bmwgfzr_info['account'];
            $data['type'] = $j;
            for ($i = 1; $i <= $this->all_depart_num; $i++) {
                $data['apartment'] = $i;
                $data['wgkf'] = 0;
                $data['text'] = "空";
                $bmwg_info = $bmwg_model->add($data);
                //if(false==$bmwg_info)
                //echo "部门违规初始化失败</br>";
            }
        }
        //echo "部门违规初始化结束</br>";
    }
    //绩效考核初始化第一阶段，上月的优秀某某限定表
    private function funcinityxchxz($year,$month)
    {
        $control_model = new Model("Control");
        $control_info = $control_model->where("is_over=1")->select();
        if (count($control_info) == 0)
            return;
        $person_model = new Model("Person");
        $gsfk_model = new Model("Gsfk");
        $bzfk_model = new Model("Bzfk");
        $bmfk_model = new Model("Bmfk");
        $yxchxz_model = new Model("Yxchxz");
        //echo "限定表初始化开始</br>";
        //先删除
        $yxchxz_model->where("id>0")->delete();
        //获取上次考核的优秀干事
        $gsfk_info = $gsfk_model->where("(year=$lastyear and month=$lastmonth) and yxgs=1")->select();
        foreach ($gsfk_info as $v) {
            $gs_account = $v['account'];
            unset($data);
            $data['account'] = $gs_account;
            $yxchxz_info = $yxchxz_model->add($data);
            // if(!$yxchxz_info)
            //echo "优秀干事限定初始化失败</br>";
        }
        //获取上次考核的优秀部长
        $bzfk_info = $bzfk_model->where("(year=$lastyear and month=$lastmonth) and yxbz=1")->select();
        foreach ($bzfk_info as $v) {
            $bz_account = $v['account'];
            unset($data);
            $data['account'] = $bz_account;
            $yxchxz_info = $yxchxz_model->add($data);
            //if(!$yxchxz_info)
            //echo "优秀部长限定初始化失败</br>";
        }
        //获取上次考核的优秀部门
        $bmfk_info = $bmfk_model->where("(year=$lastyear and month=$lastmonth) and yxbm=1")->select();
        foreach ($bmfk_info as $v) {
            unset($data);
            $data['account'] = $v['apartment'];
            $yxchxz_info = $yxchxz_model->add($data);
            //if(!$yxchxz_info)
            //echo "优秀部门限定初始化失败</br>";
        }
        //echo "优秀部长限定初始化结束</br>";
    }
    
    
}

?>