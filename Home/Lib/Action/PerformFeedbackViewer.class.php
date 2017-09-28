<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/

/*提取各种反馈表的数据*/
class PerformFeedbackViewer extends JnuEicSuBaseAction
{
    var $info_mgr;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->info_mgr=$info_mgr;
    }
    
    //返回干事考核反馈表json数据
    public function view_gskhfk($account,$year,$month)
    {
        //判断时间是否合理
        $gsfk_model = new Model("Gsfk");
        $tuiyou_model = new Model("Tuiyou");
        $person_model = new Model("Person");
        
        $gszp_model = new Model("Gszp");
        $interact_model = new Model("Interact");
        $bmfk_model = new Model("Bmfk");
        $person_info = $person_model->where("account=$account")->find();
        //基本信息
        $name = $person_info['name'];
        $apartment = $person_info['apartment'];
        $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and account=$account")->find();
        $zongfen = $gsfk_info['total'];
        $paiming = $gsfk_info['rank'];
        //获取该部门该月优秀干事
        $person_info = $person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and account=$gs_account")->find();
            if ($gsfk_info['yxgs'] == 1) {
                $yxgs_account = $gs_account;
                break;
            }
        }
        $person_info = $person_model->where("account=$yxgs_account")->find();
        if (!empty($person_info)) {
            $yxgs_name = $person_info['name'];
        } else {
            $yxgs_name = "无";
        }
        //echo "优秀干事：".$yxgs_name;
        //所在部门的得分和排名
        $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->find();
        $bmpm = $bmfk_info['rank'];
        $bmdf = $bmfk_info['total'];
        //得分细节：
        $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and account=$account")->find();
        $DFXJ[] = Array(
            'a' => $gsfk_info['zpdf'],
            'b' => $gsfk_info['bzpjdf'],
            'c' => $gsfk_info['cqdf'],
            'd' => $gsfk_info['wddf'],
            'e' => $gsfk_info['tydf'],
            'f' => $gsfk_info['fkdf'],
            'g' => $gsfk_info['qtdf']
        );
        //自我评价
        $gszp_info = $gszp_model->where("(year=$year and month=$month) and account=$account")->find();
        $zwpj = $gszp_info['zptext'];
        //其他干事评价
        $person_info = $person_model->where("(type=1 or type=2) and apartment=$apartment")->select();
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            if ($gs_account == $account)
                continue;
            $tuiyou_info = $tuiyou_model->where("(year=$year and month=$month) and waccount=$gs_account and raccount=$account")->find();
            $pj = $tuiyou_info['text'];
            if (empty($pj))
                $pj = "无";
            $qtgspj[] = Array(
                'pj' => $pj
            );
        }
        //部长评价
        $person_info = $person_model->where("(type=3) and apartment=$apartment")->select();
        foreach ($person_info as $v) {
            $bz_account = $v['account'];
            $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$account")->find();
            $bzdpj = $interact_info['text'];
            $bzpj[] = Array(
                'bzpj' => $bzdpj
            );
        }
        //同事留言
        $interact_info = $interact_model->where("(year=$year and month=$month) and raccount=$account and (wtype=1 or wtype=2)")->select();
        foreach ($interact_info as $v) {
            $liuyan[] = Array(
                'liuyan' => $v['text']
            );
        }
        //该干事的请他情况加减分表
        $qt_model = new Model("Qt");
        $qt_info = $qt_model->where("year=$year and month=$month and account=$account")->find();
        $qitaliyou = $qt_info['text'];
        //生成将要返回的json数组
        $arr = Array(
            'zongfen' => $zongfen,
            'paiming' => $paiming,
            'yxgs' => $yxgs_name,
            'bmpm' => $bmpm,
            'bmdf' => $bmdf,
            'DFXJ' => $DFXJ,
            'zwpj' => $zwpj,
            'qtgspj' => $qtgspj,
            'bzpj' => $bzpj,
            'liuyan' => $liuyan,
            'qitaliyou' => $qitaliyou
        );
        return $arr;
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
    
    //部长反馈表的json数据
    public function view_bzfk($account,$year,$month)
    {
        $bzfk_model = new Model("Bzfk");
        $person_model = new Model("Person");
        $bzzp_model = new Model("Bzzp");
        $interact_model = new Model("Interact");
        $evaluate_model = new Model("Evaluate");
        $president_model = new Model("President");
        $gszp_model = new Model("Gszp");
        $bmfk_model = new Model("Bmfk");
        //$oneway_model=new Model("Oneway");
        $bmkh_model = new Model("Bmkh");
        $gsfk_model = new Model("Gsfk");
        $qt_model = new Model("Qt");
        $bmwg_model = new Model("Bmwg");
        //$oneway
        //基本信息
        $person_info = $person_model->where("account=$account")->find();
        $apartment = $person_info['apartment'];
        //获取总分

        $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and account=$account")->find();
        $ZongFen = $bzfk_info['total'];
        //获取得分细则
        $arrDeFenXiZhe = Array(
            'a' => $bzfk_info['zpdf'],
            'b' => $bzfk_info['zxpjdf'],
            'c' => $bzfk_info['gspjdf'],
            'd' => $bzfk_info['bzpjdf'],
            'e' => $bzfk_info['cqdf'],
            'f' => $bzfk_info['wddf'],
            'g' => $bzfk_info['fkdf'],
            'h' => $bzfk_info['qtdf']
        );
        //获取自我评价
        $bzzp_info = $bzzp_model->where("(year=$year and month=$month) and waccount=$account")->find();
        $ZiWoPingJia = $bzzp_info['zptext'];
        //其他部长评价
        $person_info = $person_model->where("apartment=$apartment and type=3")->select();
        foreach ($person_info as $v) {
            
            $bz_account = $v['account'];
            if ($bz_account == $account)
                continue;
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$account")->find();
            $pj = $evaluate_info['text'];
            $arrQiTaBuZhanPinJia[] = Array(
                'pj' => $pj
            );
        }
        $QiTaBuZhanPinJia = Array(
            'sum' => count($person_info) - 1,
            'arrQiTaBuZhanPinJia' => $arrQiTaBuZhanPinJia
        );
        //echo json_encode($QiTaBuZhanPinJia,JSON_UNESCAPED_UNICODE);
        //主管副主席评价
        $fzx_account = $this->info_mgr->getPresidentByApartment($apartment);
        $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$fzx_account and raccount=$account")->find();
        $ZhuGuanFuZhuXiPinJia = $interact_info['text'];
        //获取干事评价
        $person_info = $person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
        $sum = count($person_info);
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            $person_info = $person_model->where("account=$gs_account")->find();
            //$gs_name=$person_info['name'];
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and waccount=$gs_account and raccount=$account")->find();
            $arrGanShiPingJia[] = Array(
                'gspj' => $evaluate_info['text']
            );
        }
        $GanShiPingJia = Array(
            'sum' => $sum,
            'arrGanShiPingJia' => $arrGanShiPingJia
        );
        //echo json_encode($GanShiPingJia,JSON_UNESCAPED_UNICODE);
        //获取干事自评
        $person_info = $person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
        $sum = count($person_info);
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            $gszp_info = $gszp_model->where("(year=$year and month=$month) and account=$gs_account")->find();
            $arrGSZP[] = Array(
                'name' => $v['name'],
                'account' => $gs_account,
                'assess' => $gszp_info['zptext']
            );
        }
        $GSZP = Array(
            'sum' => $sum,
            'arrGSZP' => $arrGSZP
        );
        //echo json_encode($GSZP,JSON_UNESCAPED_UNICODE);
        //部门得分和部门排名
        $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->find();
        $BuMenDeFeng = $bmfk_info['total'];
        for ($k = 1; $k <= $this->all_depart_num; $k++) {
            $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and rank=$k")->find();
            
            $BuMenPaiMing[] = Array(
                'bm' => $bmfk_info['apartment'],
                'df' => $bmfk_info['total']
            );
        }
        //部门得分细则
        $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->find();
        $arrBuMenDeFenXiZhe = Array(
            'a' => $bmfk_info['zxpjdf'],
            'b' => $bmfk_info['zgpjdf'],
            'c' => $bmfk_info['cqdf'],
            'd' => $bmfk_info['wgkf'],
            'e' => $bmfk_info['fkdf'],
            'f' => $bmfk_info['tydf'],
            'g' => $bmfk_info['yxbz'],
            'h' => $bmfk_info['qtdf']
        );
        //主管副主席的部门评价
        $bmkh_info = $bmkh_model->where("(year=$year and month=$month) and waccount=$fzx_account and rapartment=$apartment")->find();
        $ZhuGuanFuZhuXiBuMenPinJia = $bmkh_info['text'];
        //主席的部门评价
        $president_info = $president_model->where("is_sub='n'")->find();
        $zx_account = $president_info['account'];
        $bmkh_info = $bmkh_model->where("(year=$year and month=$month) and waccount=$zx_account and rapartment=$apartment")->find();
        //var_dump($oneway_info);
        $ZhuXiDeBuMenPinJia = $bmkh_info['text'];
        //每个部门所有干事的得分情况，按得分高低排
        $person_info = $person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
        for ($i = 1; $i <= count($person_info); $i++) {
            $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and rank=$i")->select();
            foreach ($gsfk_info as $v) {
                $gs_account = $v['account'];
                $person_info2 = $person_model->where("account=$gs_account")->find();
                if ($person_info2['apartment'] == $apartment) {
                    $arrGSPM[] = Array(
                        'name' => $person_info2['name'],
                        'score' => $v['total']
                    );
                    break;
                }
            }
        }
        //同事留言
        $interact_info = $interact_model->where("(year=$year and month=$month) and (raccount=$account and wtype=3)")->select();
        foreach ($interact_info as $v) {
            $LiuYan[] = Array(
                'liuyan' => $v['text']
            );
        }
        //干事对部门的留言
        $interact_info = $interact_model->where("(year=$year and month=$month) and (wtype=1 or wtype=2) and raccount=$apartment")->select();
        foreach ($interact_info as $v) {
            $BuMenLiuYan[] = Array(
                'liuyan' => $v['text']
            );
        }
        //该部长其他情况加减分的理由
        $qt_info = $qt_model->where("(year=$year and month=$month) and account=$account")->find();
        $bzqitaliyou = $qt_info['text'];
        //该部门，各种违纪登记表扣分的理由，拼接成一个字符
        $bmwg_info = $bmwg_model->where("(year=$year and month=$month) and apartment=$apartment")->select();
        $weijiliyou = " ";
        foreach ($bmwg_info as $v) {
            if ($v['wgkf'] == 0)
                continue;
            else {
                $weijiliyou .= $v['text'];
            }
        }
        //该部门其他情况加减分表的理由
        $qt_info = $qt_model->where("(year=$year and month=$month) and account=$apartment")->find();
        $bmqitaliyou = $qt_info['text'];
        //向前端发送json数据
        $arr = Array(
            'ZongFen' => $ZongFen,
            'arrDeFenXiZhe' => $arrDeFenXiZhe,
            'ZiWoPingJia' => $ZiWoPingJia,
            'QiTaBuZhanPinJia' => $QiTaBuZhanPinJia,
            'ZhuGuanFuZhuXiPinJia' => $ZhuGuanFuZhuXiPinJia,
            'GSZP' => $GSZP,
            'arrGSPM' => $arrGSPM,
            'GanShiPingJia' => $GanShiPingJia,
            'BuMenDeFeng' => $BuMenDeFeng,
            'BuMenPaiMing' => $BuMenPaiMing,
            'arrBuMenDeFenXiZhe' => $arrBuMenDeFenXiZhe,
            //前端两个评价给颠倒了。。。
            'ZhuGuanFuZhuXiBuMenPinJia' => $ZhuGuanFuZhuXiBuMenPinJia,
            'ZhuXiDeBuMenPinJia' => $ZhuXiDeBuMenPinJia,
            'LiuYan' => $LiuYan,
            'BuMenLiuYan' => $BuMenLiuYan,
            'bzqitaliyou' => $bzqitaliyou,
            'weijiliyou' => $weijiliyou,
            'bmqitaliyou' => $bmqitaliyou
        );
        return $arr;
    }
    
    
    //整体考核结果反馈表json数据
    public function view_ztkhjgfk($account,$year,$month)
    {
        $person_model = new Model("Person");
        $gsfk_model = new Model("Gsfk");
        $bzfk_model = new Model("Bzfk");
        $bmfk_model = new Model("Bmfk");
        $resource_model = new Model("Resource");
        $yxbz_model = new Model("Yxbz");
        //获取优秀部门
        $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and yxbm=1")->select();
        foreach ($bmfk_info as $v) {
            //echo "优秀部门".$v['apartment'];
            $arrYXBM[] = Array(
                'bm' => $v['apartment'],
                'df' => $v['total']
            );
        }
        //echo json_encode($arrYXBM,JSON_UNESCAPED_UNICODE);    
        //获取优秀部长
        // Anqur
        $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and (yxbz=1 or yxbz=2 or yxbz=3)")->select();
        foreach ($bzfk_info as $v) {
            $yxbz_account = $v['account'];
            $person_info = $person_model->where("account=$yxbz_account")->find();
            $yxbz_info = $yxbz_model->where("(year=$year and month=$month) and raccount=$yxbz_account")->select();
            $ps = count($yxbz_info);
            $yxbz_name = $person_info['name'];
            $ssbm = $person_info['apartment'];
            $df = $v['total'];
            $rank = $v['yxbz'];
            $arrYXBZ[] = Array(
                'account' => $yxbz_account,
                'bm' => $yxbz_name,
                'ssbm' => $ssbm,
                'df' => $df,
                'rank' => $rank,
                'ps' => $ps
            );
        }
        //echo json_encode($arrYXBZ,JSON_UNESCAPED_UNICODE);  
        
        //上面获取各部门排名前三干事有误
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            for ($j = 1; $j <= 3; $j++) {
                //优秀干事人数
                $sum = 0;
                $gsfk_info = $gsfk_model->where("(year=$year and month=$month) and rank=$j")->select();
                $person_info = $person_model->where("apartment=$i and (type=1 or type=2)")->select();
                foreach ($person_info as $v) {
                    $gs_account = $v['account'];
                    foreach ($gsfk_info as $v2) {
                        if ($gs_account == $v2['account']) {
                            
                            $GS[] = Array(
                                'name' => $v['name'],
                                'account' => $gs_account,
                                'df' => $v2['total'],
                                'ydyxgs' => $v2['yxgs']
                            );
                            break;
                        }
                    }
                }
                //找到了$i部门排名第$j的信息		
            }
            //整个$i部门找完了
            $arrBM[] = Array(
                //'sum'=>3,
                'bm' => $i,
                'GS' => $GS
            );
            unset($GS);
        }
        $YXGS = Array(
            'bmsm' => $this->all_depart_num,
            'arrBM' => $arrBM
        );
        //echo json_encode($YXGS,JSON_UNESCAPED_UNICODE);
        //外调较多的人员
        //这里有点不明朗，前端需要的是较多人员，还是所有人员
        unset($GS);
        unset($arrBM);
        $wdcs_model = new Model("Wdcs");
        //外调较多人员代码有误，下面重写
        
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $person_info2 = $person_model->where("apartment=$i")->select();
            for ($j = 1; $j <= count($person_info2); $j++) {
                $wdcs_info = $wdcs_model->where("(year=$year and month=$month) and rank=$j")->select();
                $person_info = $person_model->where("apartment=$i and (type=1 or type=2)")->select();
                //var_dump($person_info);
                foreach ($person_info as $v) {
                    $gs_account = $v['account'];
                    foreach ($wdcs_info as $v2) {
                        if ($gs_account == $v2['account']) {
                            $GS[] = Array(
                                'name' => $v['name'],
                                'account' => $gs_account,
                                'wdcs' => $v2['wdcs']
                            );
                            break;
                        }
                    }
                }
            }
            //找第二个部门前
            $arrBM[] = Array(
                //'sum'=>3,
                'bm' => $i,
                'GS' => $GS
            );
            unset($GS);
        }
        $WDJDRY = Array(
            'bmsm' => $this->all_depart_num,
            'arrBM' => $arrBM
        );
        //echo json_encode($WDJDRY,JSON_UNESCAPED_UNICODE);
        //生成将要返回的json数组
        $arr = Array(
            'arrYXBM' => $arrYXBM,
            'arrYXBZ' => $arrYXBZ,
            'YXGS' => $YXGS,
            'WDJDRY' => $WDJDRY
        );
        return $arr;
    }
    //主席团反馈表json数据
    public function view_zxtfk($account, $year, $month)
    {
        $bmfk_model = new Model("Bmfk");
        $bzfk_model = new Model("Bzfk");
        $person_model = new Model("Person");
        
        //var_dump($arrTime);
        //获取部门排名
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $bmfk_info = $bmfk_model->where("(year=$year and month=$month) and rank=$i")->find();
            $score = $bmfk_info['total'];
            $apartment = $bmfk_info['apartment'];
            $isExc = $bmfk_info['yxbm'];
            $arrSorted[] = Array(
                'name' => $apartment,
                'score' => $score,
                'isExc' => $isExc
            );
        }
        $classSortDepart = Array(
            'sum' => 2,
            'arrSorted' => $arrSorted
        );
        //echo json_encode($arrSorted,JSON_UNESCAPED_UNICODE);
        //获取优秀部长
        
        $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and yxbz=1")->select();
        //var_dump($bzfk_info);
        foreach ($bzfk_info as $v) {
            $bz_account = $v['account'];
            $person_info = $person_model->where("account=$bz_account")->find();
            $bz_name = $person_info['name'];
            $apartment = $person_info['apartment'];
            $score = $v['total'];
            $ExcMinster[] = Array(
                'name' => $bz_name,
                'account' => $bz_account,
                'depart' => $apartment,
                'score' => $score
            );
        }
        //echo json_encode($arrExcMin,JSON_UNESCAPED_UNICODE);
        
        //echo json_encode($ExcMinster,JSON_UNESCAPED_UNICODE);
        //获取部长对主管副主席评价
        $interact_model = new Model("Interact");
        $bzzp_model = new Model("Bzzp");
        $president_model = new Model("President");
        //找出部长们
        //echo $account;
        $president_info = $president_model->where("account=$account")->find();
        $apartmentArr = explode("|", $president_info['apartment']);
        for ($k = 0; $k < count($apartmentArr); $k++) {
            if ($apartmentArr[$k] == '')
                continue;
            else {
                $apartment_tar = $apartmentArr[$k];
                if ($apartment_tar != 0) {
                    $person_info = $person_model->where("type=3 and apartment=$apartment_tar")->select();
                    foreach ($person_info as $v) {
                        //echo $account."PK".$bz_account."</br>";
                        $bz_account = $v['account'];
                        $bz_name = $v['name'];
                        $bzzp_info = $bzzp_model->where("(year=$year and month=$month) and waccount=$bz_account")->find();
                        $interact_info = $interact_model->where("(year=$year and month=$month) and (waccount=$bz_account and raccount=$account) and nm=0")->find();
                        //var_dump($interact_info);
                        $arrMinFeedBack[] = Array(
                            'depart' => $apartment_tar,
                            'minister' => $bz_name,
                            'selfAssess' => $bzzp_info['zptext'],
                            'feedBack' => $interact_info['text']
                        );
                    }
                    //匿名评价
                    $person_info = $person_model->where("type=3 and (apartment=$apartment_tar)")->select();
                    //管辖下的部长数目
                    $sum = count($person_info);
                    foreach ($person_info as $v) {
                        //echo $account."PK".$bz_account."</br>";
                        $bz_account = $v['account'];
                        $bz_name = $v['name'];
                        //$bzzp_info=$bzzp_model->where("waccount=$bz_account")->find();
                        $interact_info = $interact_model->where("(waccount=$bz_account and raccount=$account) and nm=1")->find();
                        //var_dump($interact_info);
                        if (!empty($interact_info['text'])) {
                            $arrAnonymity[] = Array(
                                'anonymityFeedBack' => $interact_info['text']
                            );
                        }
                    }
                    
                }
            }
        }
        
        
        
        //echo json_encode($arrMinFeedBack,JSON_UNESCAPED_UNICODE);	
        $classSituation = Array(
            'sum' => $sum,
            'arrMinFeedBack' => $arrMinFeedBack,
            'arrAnonymity' => $arrAnonymity
        );
        //echo json_encode($arrAnonymity,JSON_UNESCAPED_UNICODE);	
        //生成将要返回的json数组
        $arr = Array(
            'classSortDepart' => $classSortDepart,
            'ExcMinster' => $ExcMinster,
            'classSituation' => $classSituation,
            '_arrAnonymity' => $arrAnonymity
        );
        return $arr;
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);	
        
    }
    
}

?>