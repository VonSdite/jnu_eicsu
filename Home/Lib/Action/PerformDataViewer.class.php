<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/

/*提取数据并返回之, 相当于查看各个表*/
class PerformDataViewer extends JnuEicSuBaseAction
{
    var $info_mgr;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->info_mgr = $info_mgr;
    }
    
    public function view_gszp($status,$account,$year,$month)
    {
        $gszp_model = new Model("Gszp");
        $interact_model = new Model("Interact");
        //获得类型，部门
        $person_model = new Model("Person");
        $person_info = $person_model->where("account=$account")->find();
        $type = $person_info['type'];
        $apartment = $person_info['apartment'];
        //除己之外干事
        $person_info = $person_model->where("apartment=$apartment and type=$type")->select();
        foreach ($person_info as $v) {
            if ($v['account'] != $account) {
                $arr_TongShi[] = Array(
                    'name' => $v['name'],
                    'account' => $v['account']
                );
            }
        }
        //获取推优干事账号，名字，推优理由（该年该月，谁对谁）
        $tuiyou_model = new Model('Tuiyou');
        $tuiyou_info = $tuiyou_model->where("(year=$year and month=$month) and waccount=$account and rtype=$type")->find();
        if (!empty($tuiyou_info['raccount'])) {
            $tygs_account = $tuiyou_info['raccount'];
            $tygs_tyly = $tuiyou_info['text'];
            $person_info = $person_model->where("account=$tygs_account")->find();
            $tygs_name = $person_info['name'];
        } else {
            $person_info = $person_model->where("account!=$account and (type=1 or type=2 ) and apartment=$apartment")->find();
            $tygs_name = $person_info['name'];
            $tygs_account = $person_info['account'];
            $tygs_tyly = "空";
        }
        $arr_tygs = Array(
            'tygs' => $tygs_name,
            'account' => $tygs_account,
            'tyly' => $tygs_tyly
        );
        //获取部长级的姓名，账号，得分，评价
        $evaluate_model = new Model("Evaluate");
        $person_info = $person_model->where("apartment=$apartment and type!=$type")->select();
        foreach ($person_info as $v) {
            $bz_account = $v['account'];
            $bz_name = $v['name'];
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$bz_account)")->find();
            $bz_pj = $evaluate_info['text'];
            
            $bz_df = $evaluate_info['df'];
            
            $arr_DBZPJ[] = Array(
                'account' => $bz_account,
                'name' => $bz_name,
                'fs' => $bz_df,
                'pj' => $bz_pj
            );
        }
        //按照当前账号找出干事自评表的信息
        $gszp_model = new Model("Gszp");
        $gszp_info = $gszp_model->where("(year=$year and month=$month) and account=$account")->find();
        //生成得分
        $arrDF[] = Array('df' => $gszp_info['DF1']);
        $arrDF[] = Array('df' => $gszp_info['DF2']);
        $arrDF[] = Array('df' => $gszp_info['DF3']);
        $arrDF[] = Array('df' => $gszp_info['DF4']);
        $arrDF[] = Array('df' => $gszp_info['DF5']);
        $arrDF[] = Array('df' => $gszp_info['DF6']);
        $arrDF[] = Array('df' => $gszp_info['DF7']);
        $arrDF[] = Array('df' => $gszp_info['DF8']);
        $arrDF[] = Array('df' => $gszp_info['DF9']);
        $zongfen = $gszp_info['total'];
        $zwpj = $gszp_info['zptext'];
        //对部门留言
        $interact_model = new Model("Interact");
        $interact_info = $interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$apartment)")->find();
        $bumenliuyan = $interact_info['text'];
        //对同事的留言
        $interact_info = $interact_model->where("(year=$year and month=$month) and (waccount=$account and rtype=$type)")->select();
        foreach ($interact_info as $v) {
            $arrTongshiliuyan[] = Array(
                'account' => $v['raccount'],
                'liuyan' => $v['text']
            );
        }
        //生成将要返回的json数组
        $arr = Array(
            'status' => $status,
            'DF' => $arrDF,
            'zongfen' => $zongfen,
            'zwpj' => $zwpj,
            'TongShi' => $arr_TongShi,
            'TYGS' => $arr_tygs,
            'DBZPJ' => $arr_DBZPJ,
            'bumenliuyan' => $bumenliuyan,
            'arrTongshiliuyan' => $arrTongshiliuyan
        );
        return $arr;
    }
    
    public function view_gskh($status,$waccount,$year,$month)
    {
        //判断时间是否合理
        $gskh_model = new Model("Gskh");
        
        //获取部门，类型
        $person_model = new Model("Person");
        //echo $account;
        $person_info = $person_model->where("account=$waccount")->find();
        $type = $person_info['type'];
        $apartment = $person_info['apartment'];
        $person_info = $person_model->where("apartment=$apartment and type!=$type")->select();
        //获取干事得分
        $interact_model = new Model("Interact");
        
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            $gs_name = $v['name'];
            $gskh_info = $gskh_model->where("(year=$year and month=$month) and  waccount=$waccount and raccount=$gs_account")->find();
            $arrGSDF[] = Array(
                'account' => $gs_account,
                'name' => $gs_name,
                'df0' => $gskh_info['DF1'],
                'df1' => $gskh_info['DF2'],
                'df2' => $gskh_info['DF3'],
                'df3' => $gskh_info['DF4'],
                'df4' => $gskh_info['DF5'],
                'df5' => $gskh_info['DF6'],
                'df6' => $gskh_info['DF7'],
                'df7' => $gskh_info['DF8'],
                'df8' => $gskh_info['DF9']
                //忽略部门特色
            );
            //var_dump($arrGSDF);
        }
        //echo json_encode($arrGSDF,JSON_UNESCAPED_UNICODE);
        //对干事评价
        $person_info = $person_model->where("apartment=$apartment and type!=$type")->select();
        foreach ($person_info as $v) {
            $gs_account = $v['account'];
            $gs_name = $v['name'];
            $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$gs_account")->find();
            $arrDGSPJ[] = Array(
                'account' => $gs_account,
                'name' => $gs_name,
                'pj' => $interact_info['text']
            );
        }
        //部门特色
        $strBMTS = "<div id=\"bmts\">" + "<p><h3  style=\"text-align:center\">部门特色</h3></p>" + "<p>评价标准:</p>" + "<p>A.每次都很认真完成任务，并细心、有耐心地尽自己的职责，乐于接受任务</p>" + "<p>B.会负责任地完成任务，工作效果良好</p>" + "<p>C.欠缺耐心，有时候不想完成任务，属于被动型</p>" + "<p>D.觉得团务很麻烦，完全不想完成任务，被催了才会去做</p>" + "</div>";
        //是否提交过
        $gskh_info = $gskh_model->where("(year=$year and month=$month) and waccount=$waccount")->find();
        $hadSubmit = $gskh_info['hadSubmit'];
        //生成将要返回的json数组
        $arr = Array(
            'status' => $status,
            'bmts' => $strBMTS,
            'hadSubmit' => $hadSubmit,
            'arrGSDF' => $arrGSDF,
            'arrDGSPJ' => $arrDGSPJ,
            'apartment' => $apartment
        );
        return $arr;
    }
    
    public function view_bzzp($status, $account,$year,$month)
    {
        $bzzp_model = new Model("Bzzp");
        $interact_model = new Model("Interact");
        $evaluate_model = new Model("Evaluate");
        $president_model = new Model("President");
        //获取部门，类型
        $person_model = new Model("Person");
        $person_info = $person_model->where("account=$account")->find();
        $type = $person_info['type'];
        $apartment = $person_info['apartment'];
        //获取总分
        $bzzp_info = $bzzp_model->where("(year=$year and month=$month) and (waccount=$account)")->find();
        $zongfen = $bzzp_info['total'];
        //获取得分数组
        $arrDF[] = Array('df' => $bzzp_info['DF1']);
        $arrDF[] = Array('df' => $bzzp_info['DF2']);
        $arrDF[] = Array('df' => $bzzp_info['DF3']);
        $arrDF[] = Array('df' => $bzzp_info['DF4']);
        $arrDF[] = Array('df' => $bzzp_info['DF5']);
        $arrDF[] = Array('df' => $bzzp_info['DF6']);
        $arrDF[] = Array('df' => $bzzp_info['DF7']);
        $arrDF[] = Array('df' => $bzzp_info['DF8']);
        $arrDF[] = Array('df' => $bzzp_info['DF9']);
        $arrDF[] = Array('df' => $bzzp_info['DF10']);
        $arrDF[] = Array('df' => $bzzp_info['DF11']);
        $arrDF[] = Array('df' => $bzzp_info['DF12']);
        $hadSubmit = $bzzp_info['hadSubmit'];
        //获取自我评价
        $zwpj = $bzzp_info['zptext'];
        //找出本部门其他部长
        $person_info = $person_model->where("(apartment=$apartment and type=$type) and account!=$account")->select();
        foreach ($person_info as $v) {
            $ts_account = $v['account'];
            $ts_name = $v['name'];
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$ts_account)")->find();
            $arrDQTBZPJ[] = Array(
                'name' => $ts_name,
                'account' => $ts_account,
                'fs' => $evaluate_info['df'],
                'pj' => $evaluate_info['text']
            );
        }
        $DQTBZPJ = Array(
            'sum' => count($person_info),
            'arrBZ' => $arrDQTBZPJ
        );
        
        
        //找出对主管副主席评价
        $zg_account = $this->info_mgr->getPresidentByApartment($apartment);
        $interact_info = $interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$zg_account) and nm=0")->find();
        $dzgfzxpj = $interact_info['text'];
        //对主席团成员的匿名评价
        $person_info = $person_model->where("type=4")->select();
        foreach ($person_info as $v) {
            $raccount = $v['account'];
            $rname = $v['name'];
            $position = $v['position'];
            $interact_info = $interact_model->where("nm=1 and (waccount=$account and raccount=$raccount) and (year=$year and month=$month)")->find();
            $pj = $interact_info['text'];
            $arrNMPJ[] = Array(
                'name' => $rname,
                'account' => $raccount,
                'depart' => $position,
                'pj' => $pj
            );
        }
        //获取非同部门同事留言
        $person_info = $person_model->where("type=3 and apartment!=$apartment")->select();
        foreach ($person_info as $v) {
            $TongShi[] = Array(
                'name' => $v['name'],
                'account' => $v['account']
            );
        }
        $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$account and rtype=$type")->select();
        foreach ($interact_info as $v) {
            $TongShiliuYan[] = Array(
                'account' => $v['raccount'],
                'liuyan' => $v['text']
            );
        }
        //生成将要返回的json数组
        $arr = Array(
            'zongfen' => $zongfen,
            'status' => $status,
            'arrDF' => $arrDF,
            'zwpj' => $zwpj,
            'DQTBZPJ' => $DQTBZPJ,
            'dzgfzxpj' => $dzgfzxpj,
            'NMPJ' => $arrNMPJ,
            'TongShi' => $TongShi,
            'TongShiliuYan' => $TongShiliuYan
        );
        return $arr;
    }
    
    public function view_bzkh($status,$account,$year,$month)
    {
        //获取部门，类型
        $person_model = new Model("Person");
        $person_info = $person_model->where("account=$account")->find();
        $type = $person_info['type'];
        $apartment = $person_info['apartment'];
        $president_model = new Model("President");
        $interact_model = new Model("Interact");
        $bzkh_model = new Model("Bzkh");
        $president_info = $president_model->where("account=$account")->find();
        $presidentArr = explode("|", $president_info['apartment']);
        

        for ($k = 0; $k < count($presidentArr); $k++) {
            if ($presidentArr[$k] == '')
                continue;
            else {
                $apartment_tar = $presidentArr[$k];
                $person_info = $person_model->where("apartment=$apartment_tar and type=3")->select();
                $arrBZ = $this->getarrBZ($account, $presidentArr[$k],$year,$month);
                $arrBM[] = Array(
                    'bm' => $presidentArr[$k],
                    'bzrs' => count($person_info),
                    'arrBZ' => $arrBZ
                );
            }
            
        }
        //记录部门数目
        $bmsm = count($presidentArr) - 1;
        //跳出判断
        //是否提交过
        $bzkh_info = $bzkh_model->where("(year=$year and month=$month) and waccount=$account")->find();
        $hadSubmit = $bzkh_info['hadSubmit'];
        //生成将要返回的json数组
        $arr = Array(
            'status' => $status,
            'hadSubmit' => $hadSubmit,
            'BMBZ' => Array(
                'bmsm' => $bmsm,
                'arrBM' => $arrBM
            )
        );
        return $arr;
    }
    
    //部门考核表
    public function view_bmkh($status,$account,$year,$month)
    {
        //获取部门，类型
        $person_model = new Model("Person"); //echo $account;
        $person_info = $person_model->where("account=$account")->find();
        $type = $person_info['type'];
        $apartment = $person_info['apartment'];
        //获取该主席所主管的部门信息
        $president_model = new Model("President");
        $bmkh_model = new Model("Bmkh");
        $president_info = $president_model->where("account=$account")->find();
        //如果是副主席，找到两个部门
        
        if ($president_info['is_sub'] == 'y') {
            $apartmentArr = explode("|", $president_info['apartment']);
            for ($k = 0; $k < count($apartmentArr); $k++) {
                if (empty($apartmentArr[$k]))
                    continue;
                else {
                    $arrBM[] = $this->getarrBM($account, $apartmentArr[$k],$year,$month);
                }
            }
            $sum = count($apartmentArr) - 1;
        } else {
            $sum = $this->all_depart_num;
            for ($i = 1; $i <= $this->all_depart_num; $i++) {
                $arrBM[] = $this->getarrBM($account, $i,$year,$month);
            }
            
        }
        //跳出判断
        //推优部分
        //找出非主管的部门信息
        // BUG dengzuoheng@gmail.com 2016/4/11 16:32 : 部门1和部门11可能混淆
        // 这里应该是将非主管部门加到$BuMen数组中
        $president_info = $president_model->where("account=$account")->find();
        $pzgbm = explode("|", $president_info['apartment']); //先把主管部门提取出来
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            if (in_array($i, $pzgbm)) {
                continue;
            } else {
                $BuMen[] = Array(
                    'name' => $i
                );
            }
        }
        //找到推优部门
        //推优部分
        $tuiyou_model = new Model("Tuiyou");
        $tuiyou_info = $tuiyou_model->where("(year=$year and month=$month) and waccount=$account")->find();
        $bm_account = $tuiyou_info['raccount'];
        if (!empty($bm_account)) {
            $TYBM = $bm_account;
        } else {
            $TYBM = $BuMen[0]['name'];
        }
        //是否提交过
        $bmkh_info = $bmkh_model->where("(year=$year and month=$month) and waccount=$account")->find();
        $hadSubmit = $bmkh_info['hadSubmit'];
        //生成将要返回的json数组
        $arr = Array(
            'status' => $status,
            'hadSubmit' => $hadSubmit,
            'BM' => Array(
                'sum' => $sum,
                'arrBM' => $arrBM
            ),
            'BuMen' => $BuMen,
            'TYBM' => $TYBM
        );
        return $arr;
        //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        
    }
    //调研意见采纳表
    public function view_dyyjcn($status,$account,$year,$month)
    {
        $person_model = new Model("Person");
        $diaoyan_model = new Model("Diaoyan");
        //获取操作的所有部门
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $person_info = $person_model->where("apartment=$i")->select();
            foreach ($person_info as $v) {
                $x_account = $v['account'];
                $x_name = $v['name'];
                $diaoyan_info = $diaoyan_model->where("(year=$year and month=$month) and raccount=$x_account")->find();
                $caina = $diaoyan_info['caina'];
                $arrCNJF[] = Array(
                    "name" => $x_name,
                    "account" => $x_account,
                    "jiafen" => $caina
                );
            }
            $arrBM[] = Array(
                "bmmz" => $i,
                "arrCNJF" => $arrCNJF
            );
            unset($arrCNJF);
            //echo $this->_encode($arrBM);
        }
        //向前端发送json数据
        $arr = Array(
            "status" => $status,
            "arrBM" => $arrBM
        );
        return $arr;
    }
    //跟进部门出勤统计表
    public function view_gjbmcqtj($status,$account,$year,$month)
    {
        $chuqin_model = new Model("Chuqin");
        $person_model = new Model("Person");
        $rlgj_model = new Model("Rlgj");
        
        $rlgj_info = $rlgj_model->where("account=$account")->select();
        //跟进部门
        for ($i = 0; $i < count($rlgj_info); $i++) {
            $apartment = $rlgj_info[$i]['apartment'];
            
            $gjbm = $apartment;
            $person_info = $person_model->where("apartment=$apartment")->select();
            //人数
            $renshu = count($person_info);
            //出勤情况
            foreach ($person_info as $v) {
                $raccount = $v['account'];
                $chuqin_info = $chuqin_model->where("raccount=$raccount and (year=$year and month=$month)")->find();
                $person_info = $person_model->where("account=$raccount")->find();
                $rname = $person_info['name'];
                $chuqin[] = Array(
                    'account' => $raccount,
                    'name' => $rname,
                    'qj' => $chuqin_info['qj'],
                    'ct' => $chuqin_info['ct'],
                    'qx' => $chuqin_info['qx']
                );
            }
            //生成将要返回的json数组
            $arr[] = Array(
                'gjbm' => $apartment,
                'renshu' => $renshu,
                'status' => $status,
                'chuqin' => $chuqin,
                'str' => $status
            );
            unset($chuqin);
        }
        return $arr;
    }
    
    //优秀称号限定表
    public function view_yxchxz($status)
    {
        $person_model = new Model("Person");
        $yxchxz_model = new Model("Yxchxz");
        //找到所有部门,限定干事和部长
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $person_info = $person_model->where("apartment=$i")->select();
            foreach ($person_info as $v) {
                $x_account = $v['account'];
                $person_info2 = $person_model->where("account=$x_account")->find();
                $x_name = $person_info2['name'];
                $yxchxz_info = $yxchxz_model->where("account=$x_account")->find();
                if (!empty($yxchxz_info))
                    $check = 1;
                else
                    $check = 0;
                $arrPersons[] = Array(
                    'name' => $x_name,
                    'account' => $x_account,
                    'check' => $check
                );
            }
            $arrDepart[] = Array(
                'depart' => $i,
                'arrPersons' => $arrPersons
            );
            unset($arrPersons);
        }
        //找到所有部门，限制部门
        for ($i = 1; $i <= $this->all_depart_num; $i++) {
            $yxchxz_info = $yxchxz_model->where("account=$i")->find();
            if (!empty($yxchxz_info))
                $check = 1;
            else
                $check = 0;
            $arrBMPD[] = Array(
                'depart' => $i,
                'check' => $check
            );
        }
        //向前端发送json数据
        $arr = Array(
            'year' => 0,
            'month' => 0,
            'status' => $status,
            'arrDepart' => $arrDepart,
            'arrBMPD' => $arrBMPD,
            'str' => $status
        );
        return $arr;
    }
    //其他情况加减分表
    public function view_qt($status, $account, $year, $month)
    {
        $person_model = new Model("Person");
        $rlgj_model = new Model("Rlgj");
        $qt_model = new Model("Qt");
        //根据当前登录的人力干事账号获取其跟进部门的信息
        $rlgj_info = $rlgj_model->where("account=$account")->select();
        for ($i = 0; $i < count($rlgj_info); $i++) {
            $apartment = $rlgj_info[$i]['apartment'];
            //获取人员信息
            $person_info = $person_model->where("apartment=$apartment")->select();
            foreach ($person_info as $v) {
                $x_account = $v['account'];
                $person_info2 = $person_model->where("account=$x_account")->find();
                $x_name = $person_info2['name'];
                $x_type = $person_info2['type'];
                $qt_info = $qt_model->where("(year=$year and month=$month) and account=$x_account")->find();
                $qt = $qt_info['qt'];
                $liyou = $qt_info['text'];
                $persons[] = Array(
                    'name' => $x_name,
                    'account' => $x_account,
                    'depart' => $x_type,
                    'jiajianfen' => $qt,
                    'liyou' => $liyou
                );
            }
            //获取跟进部门信息
            
            $qt_info = $qt_model->where("(year=$year and month=$month) and account=$apartment")->find();
            $bmjjf = Array(
                'name' => $apartment,
                'jiajianfen' => $qt_info['qt'],
                'liyou' => $qt_info['text']
            );
            //向前端发送json数据
            $arr[] = Array(
                'status' => $status,
                'gjbm' => $apartment,
                'persons' => $persons,
                'bmjjf' => $bmjjf
            );
            unset($persons);
        }
        
       return $arr;
    }
    //违纪登记
    public function view_bmwg($status, $account, $year, $month, $type)
    {
        
        $flagCrud = 1;
        $bmwg_model = new Model("Bmwg");
        $bmwgfzr_model = new Model("Bmwgfzr");
        $bmwg_info = $bmwg_model->where("(year=$year and month=$month) and type=$type")->select();
        foreach ($bmwg_info as $v) {
            $arrWJDJB[] = Array(
                'bm' => $v['apartment'],
                'kf' => $v['wgkf'],
                'ly' => $v['text']
            );
        }
        
        $arr = Array(
            'status' => $status,
            'arrWJDJB' => $arrWJDJB,
            'type' => $type
        );
        return $arr;
    }
    //优秀部长评定表
    public function view_yxbz($status, $account, $year, $month)
    {
        //从tbl_yxbzhx中找出十个候选人
        $yxbzhx_model = new Model("Yxbzhx");
        $yxbz_model = new Model("Yxbz");
        $person_model = new Model("Person");
        $bzfk_model = new Model("Bzfk");
        $yxbzhx_info = $yxbzhx_model->where("(year=$year and month=$month)")->select();
        foreach ($yxbzhx_info as $hx_v) {
            $bz_account = $hx_v['HX'];
            //判断是否为勾选状态
            $checked = 0;
            $yxbz_info = $yxbz_model->where("(year=$year and month=$month) and waccount=$account and raccount=$bz_account")->find();
            if (!empty($yxbz_info['checked']))
                $checked = $yxbz_info['checked'];
            //echo $bz_account."checked:".$checked."</br>";
            $person_info = $person_model->where("account=$bz_account")->find();
            //echo $bz_account."部门:".$person_info['apartment'].",checked:".$checked."</br>";
            $name = $person_info['name'];
            $depart = $person_info['apartment'];
            $bzfk_info = $bzfk_model->where("(year=$year and month=$month) and account=$bz_account")->find();
            $score = $bzfk_info['total'];
            //echo $bz_account."名字".$name.$score."</br>";
            //确定该分数在所有候选人中的排名
            $j = 0;
            $yxbzhx_info2 = $yxbzhx_model->where("(year=$year and month=$month)")->select();
            foreach ($yxbzhx_info2 as $hx_v2) {
                if ($bz_account == $hx_v2['HX'])
                    continue;
                $bz_account2 = $hx_v2['HX'];
                $bzfk_info2 = $bzfk_model->where("(year=$year and month=$month) and account=$bz_account2")->find();
                if ($score < $bzfk_info2['total']) {
                    $j++;
                }
                if ($score == $bzfk_info2['total']) {
                    //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
                    //echo $account1."比较：".$account2."结果：".strcmp($account1,$account2)."</br>";
                    if (strcmp($bz_account, $bz_account2) > 0) //学号小的排在前面	
                        $j++;
                }
            }
            //echo $bz_account."排名是：".$j."</br>";
            $arrYXBZPDlist[$j] = Array(
                'name' => $name,
                'account' => $bz_account,
                'Checked' => $checked,
                'depart' => $depart,
                'score' => $score
            );
        }
        for ($k = 0; $k < count($arrYXBZPDlist); $k++) {
            $arrYXBZPDlist2[] = $arrYXBZPDlist[$k];
        }
        
        //生成将要返回的json数组
        $arr = Array(
            'status' => $status,
            'arrYXBZPDlist' => $arrYXBZPDlist2
            
        );
        return $arr;
    }
    
    //在部长考核表中，需要根据主席团的 account,主管的部门 apartment,来生成arrBZ,
    private function getarrBZ($account, $apartment,$year,$month)
    {
        //找到该本门部长
        $person_model = new Model("Person");
        $bzkh_model = new Model("Bzkh");
        $person_info = $person_model->where("apartment=$apartment and type=3")->select();
        foreach ($person_info as $v) {
            
            $bz_account = $v['account'];
            $bz_name = $v['name'];
            $bzkh_info = $bzkh_model->where("(year=$year and month=$month) and (raccount=$bz_account)")->find();
            //生成评价
            $interact_model = new Model("Interact");
            $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$account and raccount=$bz_account")->find();
            $arrBZ[] = Array(
                'account' => $bz_account,
                'bzmz' => $bz_name,
                'pj' => $interact_info['text'],
                'df0' => $bzkh_info['DF1'],
                'df1' => $bzkh_info['DF2'],
                'df2' => $bzkh_info['DF3'],
                'df3' => $bzkh_info['DF4'],
                'df4' => $bzkh_info['DF5'],
                'df5' => $bzkh_info['DF6'],
                'df6' => $bzkh_info['DF7'],
                'df7' => $bzkh_info['DF8'],
                'df8' => $bzkh_info['DF9'],
                'df9' => $bzkh_info['DF10']
            );
        }
        return $arrBZ;
    }
    
    //在部门考核表中，需要根据主席团的 account,主管的部门 apartment,来生成arrBZ,
    
    private function getarrBM($account, $apartment,$year,$month)
    {
        $bmkh_model = new Model("Bmkh");
        $bmkh_info = $bmkh_model->where("(year=$year and month=$month) and (waccount=$account and rapartment=$apartment)")->find();
        $BM = Array(
            'bm' => $apartment,
            'pj' => $bmkh_info['text'],
            'df0' => $bmkh_info['DF1'],
            'df1' => $bmkh_info['DF2'],
            'df2' => $bmkh_info['DF3'],
            'df3' => $bmkh_info['DF4'],
            'df4' => $bmkh_info['DF5'],
            'df5' => $bmkh_info['DF6'],
            'df6' => $bmkh_info['DF7']
        );
        //echo json_encode($BM,JSON_UNESCAPED_UNICODE);
        return $BM;
    }
}
    
?>