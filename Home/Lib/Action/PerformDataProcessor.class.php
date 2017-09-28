<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/

/*从post接受数据并处理之, 相当于响应前端的提交, 看起来只负责存, 而没有进行太多计算*/
class PerformDataProcessor extends JnuEicSuBaseAction
{
    var $info_mgr;
    public function __construct($info_mgr)
    {
        parent::__construct();
        $this->info_mgr=$info_mgr;
    }
    
    public function process_gszp($account,$year,$month)
    {
        //基本信息
        $person_model = new Model("Person");
        $interact_model = new Model("Interact");
        $person_info = $person_model->where("account=$account")->find();
        $apartment = $person_info['apartment'];
        $type = $person_info['type'];
        $status = 1; //操作是否成功的返回值\
        $flagCrud = 1;
        //$DF=$_POST['arrDF'];
        //自我评价
        $data['zptext'] = $_POST['zwpj'];
        //得分细则
        $data['DF1'] = $_POST['arrDF'][0]['df'];
        $data['DF2'] = $_POST['arrDF'][1]['df'];
        $data['DF3'] = $_POST['arrDF'][2]['df'];
        $data['DF4'] = $_POST['arrDF'][3]['df'];
        $data['DF5'] = $_POST['arrDF'][4]['df'];
        $data['DF6'] = $_POST['arrDF'][5]['df'];
        $data['DF7'] = $_POST['arrDF'][6]['df'];
        $data['DF8'] = $_POST['arrDF'][7]['df'];
        $data['DF9'] = $_POST['arrDF'][8]['df'];
        $data['total'] = $data['DF1'] + $data['DF2'] + $data['DF3'] + $data['DF4'] + $data['DF5'] + $data['DF6'] + $data['DF7'] + $data['DF8'] + $data['DF9'];
        $data['hadSubmit'] = $_POST['hadSubmit'];
        //总分
        //推优自评数据库操作
        $gszp_model = new Model("Gszp");
        $gszp_info = $gszp_model->where("(year=$year and month=$month ) and account=$account")->data($data)->save();
        if (false == $gszp_info)
            $flagCrud = 0;
        unset($data);
        //推优干事
        $tuiyou_model = new Model("Tuiyou");
        unset($data);
        $gs_account = $_POST['TYGS']['account'];
        $data['raccount'] = $_POST['TYGS']['account'];
        $data['text'] = $_POST['TYGS']['tyly'];
        $tuiyou_info = $tuiyou_model->where("(year=$year and month=$month) and (waccount=$account and (rtype=1 or rtype=2))")->data($data)->save();
        //部长评价
        if (false == $tuiyou_info)
            $flagCrud = 0;
        $evaluate_model = new Model("Evaluate");
        for ($i = 0; $i < count($_POST['arrDBZPJ']); $i++) {
            unset($data);
            $bz_account = $_POST['arrDBZPJ'][$i]['account'];
            $data['raccount'] = $bz_account;
            $data['df'] = $_POST['arrDBZPJ'][$i]['fs'];
            $data['text'] = $_POST['arrDBZPJ'][$i]['pj'];
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$bz_account)")->data($data)->save();
            if (false == $evaluate_info)
                $flagCrud = 0;
        }
        //对同事留言
        
        $interact_model->where("(year=$year and month=$month) and (waccount=$account and rtype=$type)")->delete();
        for ($i = 0; $i < count($_POST['arrTongshiliuyan']); $i++) {
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['waccount'] = $account;
            $data['wapartment'] = $apartment;
            $data['wtype'] = $type;
            $data['raccount'] = $_POST['arrTongshiliuyan'][$i]['account'];
            $data['rapartment'] = $apartment;
            $data['rtype'] = $type;
            $data['text'] = $_POST['arrTongshiliuyan'][$i]['liuyan'];
            $data['nm'] = 1;
            $interact_info = $interact_model->add($data);
            if (false == $interact_info)
                $flagCrud = 0;
        }
        //对部门的留言
        unset($data);
        $data['waccount'] = $account;
        $data['wapartment'] = $apartment;
        $data['wtype'] = $type;
        $data['raccount'] = $apartment;
        $data['text'] = $_POST['bumenliuyan'];
        $data['nm'] = 1;
        $interact_info = $interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$apartment)")->data($data)->save();
        if (false == $interact_info)
            $flagCrud = 0;
        $arr = Array(
            'flagCrud' => $flagCrud,
            'status' => $_POST['arrTongshiliuyan'][0]['liuyan']
            
        );
        return $arr;
    }
    
    public function process_bzzp($account,$year,$month)
    {
        //基本信息
        $person_model = new Model("Person");
        $interact_model = new Model("Interact");
        $evaluate_model = new Model("Evaluate");
        $president_model = new Model("President");
        $person_info = $person_model->where("account=$account")->find();
        $apartment = $person_info['apartment'];
        $type = $person_info['type'];
        //记录数据库操作是否成功，默认为1表示成功
        $flagCrud = 1;
        $status = 1;
        //自我评价
        $data['zptext'] = $_POST['zwpj'];
        //各种得分
        
        $data['DF1'] = $_POST['arrDF'][0]['df'];
        $data['DF2'] = $_POST['arrDF'][1]['df'];
        $data['DF3'] = $_POST['arrDF'][2]['df'];
        $data['DF4'] = $_POST['arrDF'][3]['df'];
        $data['DF5'] = $_POST['arrDF'][4]['df'];
        $data['DF6'] = $_POST['arrDF'][5]['df'];
        $data['DF7'] = $_POST['arrDF'][6]['df'];
        $data['DF8'] = $_POST['arrDF'][7]['df'];
        $data['DF9'] = $_POST['arrDF'][8]['df'];
        $data['DF10'] = $_POST['arrDF'][9]['df'];
        $data['DF11'] = $_POST['arrDF'][10]['df'];
        $data['DF12'] = $_POST['arrDF'][11]['df'];
        //计算总分
        $data['total'] = $data['DF1'] + $data['DF2'] + $data['DF3'] + $data['DF4'] + $data['DF5'] + $data['DF6'] + $data['DF7'] + $data['DF8'] + $data['DF9'] + $data['DF10'] + $data['DF11'] + $data['DF12'];
        $data['hadSubmit'] = $_POST['hadSubmit'];
        $bzzp_model = new Model("Bzzp");
        $bzzp_info = $bzzp_model->where("(year=$year and month=$month) and waccount=$account")->save($data);
        if (!$bzzp_info)
            $flagCrud = 0;
        
        //对本部门其他部长的评价
        $arrBZ = $_POST['DQTBZPJ']['arrBZ'];
        for ($i = 0; $i < count($arrBZ); $i++) {
            unset($data);
            $bz_account = $arrBZ[$i]['account'];
            $data['text'] = $arrBZ[$i]['pj'];
            $data['df'] = $arrBZ[$i]['fs'];
            $evaluate_info = $evaluate_model->where("(year=$year and month=$month) and waccount=$account and raccount=$bz_account")->data($data)->save();
            if (!$evaluate_info)
                $flagCrud = 0;
        }
        
        //对主管副主席的评价，不匿名
        //找出主管副主席
        $fzx_account = $this->info_mgr->getPresidentByApartment($apartment);
        unset($data);
        $data['text'] = $_POST['dzgfzxpj'];
        $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$account and raccount=$fzx_account and nm=0")->data($data)->save();
        if (!$interact_info)
            $status = 0;
        //对主席团的匿名评价
        
        for ($i = 0; $i < count($_POST['NMPJ']['arrNMPJ']); $i++) {
            unset($data);
            $zxt_account = $_POST['NMPJ']['arrNMPJ'][$i]['account'];
            $data['text'] = $_POST['NMPJ']['arrNMPJ'][$i]['pj'];
            $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$account and raccount=$zxt_account and nm=1")->data($data)->save();
            if (!$interact_info)
                $status = 0;
        }
        //对其他部门部长的留言
        $interact_model->where("(year=$year and month=$month) and waccount=$account and rtype=$type and rapartment!=$apartment")->delete();
        for ($i = 0; $i < count($_POST['TSLY']); $i++) {
            unset($data);
            $data['year'] = $year;
            $data['month'] = $month;
            $data['waccount'] = $account;
            $data['wapartment'] = $apartment;
            $data['wtype'] = $type;
            $data['raccount'] = $_POST['TSLY'][$i]['account'];
            $data['rtype'] = $type;
            $data['text'] = $_POST['TSLY'][$i]['liuyan'];
            $data['nm'] = 1;
            $interact_info = $interact_model->add($data);
            if (false == $interact_info)
                $flagCrud = 0;
        }
        //返回信息
        $arr = Array(
            'flagCrud' => $flagCrud
        );
        return $arr;
    }
    //接收跟进部门出勤统计表
    public function process_gjbmcqtj($account,$year,$month)
    {
        $flagCrud = 1;
        $chuqin_model = new Model("Chuqin");
        for ($i = 0; $i < count($_POST['chuqinarr']); $i++) {
            for ($j = 0; $j < count($_POST['chuqinarr'][$i]['chuqin']); $j++) {
                $raccount = $_POST['chuqinarr'][$i]['chuqin'][$j]['account'];
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['qj'] = $_POST['chuqinarr'][$i]['chuqin'][$j]['qj'];
                $data['ct'] = $_POST['chuqinarr'][$i]['chuqin'][$j]['ct'];
                $data['qx'] = $_POST['chuqinarr'][$i]['chuqin'][$j]['qx'];
                $chuqin_info = $chuqin_model->where("(year=$year and month=$month) and raccount=$raccount")->data($data)->save();
                if (false == $chuqin_info)
                    $flagCrud = 0;
            }
            
        }
        
        //返回信息
        $arr = Array(
            'flagCrud' => $flagCrud
        );
        return $arr;
    }
    //接收调研意见采纳
    
    public function process_dyyjcn($account,$year,$month)
    {
        
        $diaoyan_model = new Model("Diaoyan");
        $person_model = new Model("Person");
        $flagCrud = 1;
        for ($i = 0; $i < count($_POST['arrBM']); $i++) {
            for ($j = 0; $j < count($_POST['arrBM'][$i]['arrCNJF']); $j++) {
                $x_account = $_POST['arrBM'][$i]['arrCNJF'][$j]['account'];
                $caina = $_POST['arrBM'][$i]['arrCNJF'][$j]['jiafen'];
                unset($data);
                $data['raccount'] = $x_account;
                $data['caina'] = $caina;
                $diaoyan_info = $diaoyan_model->where("(year=$year and month=$month) and raccount=$x_account")->data($data)->save();
                if (false == $diaoyan_info)
                    $flagCrud = 0;
            }
        }
        //返回信息
        $arr = Array(
            'flagCrud' => $flagCrud
        );
        return $arr;
    }
    
    //接收干事考核
    public function process_gskh($account,$year,$month)
    {  
        $gskh_model = new Model("Gskh");
        $interact_model = new Model("Interact");
        //部长账号
        $waccount = $account;
        $flagCrud = 1;
        $status = 1; //操作是否成功的返回值
        //遍历得分
        for ($i = 0; $i < count($_POST['GSDF']['arrGSDF']); $i++) {
            //每个干事
            unset($data);
            $raccount = $_POST['GSDF']['arrGSDF'][$i]['account'];
            $data['DF1'] = $_POST['GSDF']['arrGSDF'][$i]['df0'];
            $data['DF2'] = $_POST['GSDF']['arrGSDF'][$i]['df1'];
            $data['DF3'] = $_POST['GSDF']['arrGSDF'][$i]['df2'];
            $data['DF4'] = $_POST['GSDF']['arrGSDF'][$i]['df3'];
            $data['DF5'] = $_POST['GSDF']['arrGSDF'][$i]['df4'];
            $data['DF6'] = $_POST['GSDF']['arrGSDF'][$i]['df5'];
            $data['DF7'] = $_POST['GSDF']['arrGSDF'][$i]['df6'];
            $data['DF8'] = $_POST['GSDF']['arrGSDF'][$i]['df7'];
            $data['total'] = $data['DF1'] + $data['DF2'] + $data['DF3'] + $data['DF4'] + $data['DF5'] + $data['DF6'] + $data['DF7'] + $data['DF8'];
            $data['hadSubmit'] = $_POST['hadSubmit'];
            $gskh_info = $gskh_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();
            if (!$gskh_info)
                $flagCrud = 0;
        }
        //遍历评价
        
        for ($i = 0; $i < count($_POST['DGSPJ']['arrDGSPJ']); $i++) {
            
            unset($data);
            $raccount = $_POST['DGSPJ']['arrDGSPJ'][$i]['account'];
            $data['text'] = $_POST['DGSPJ']['arrDGSPJ'][$i]['pj'];
            $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();
            if (!$interact_info)
                $flagCrud = 0;
        }
        //返回信息
        $arr = Array(
            'flagCrud' => $flagCrud
        );
        return $arr;
    }
    
    //接收部长考核表
    public function process_bzkh($account,$year,$month)
    {
        //$account=$_SESSION['account'];
        //主席账号
        $waccount = $account;
        $status = 1;
        $flagCrud = 1;
        $bzkh_model = new Model("Bzkh");
        $interact_model = new Model("Interact");
        //部门数目
        for ($i = 0; $i < count($_POST['BMBZ']['arrBM']); $i++) {
            //该部门部长数目
            for ($j = 0; $j < count($_POST['BMBZ']['arrBM'][$i]['arrBZ']); $j++) {
                $raccount = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['account'];
                //得分细则
                unset($data);
                
                $data['DF1'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df0'];
                $data['DF2'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df1'];
                $data['DF3'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df2'];
                $data['DF4'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df3'];
                $data['DF5'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df4'];
                $data['DF6'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df5'];
                $data['DF7'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df6'];
                $data['DF8'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df7'];
                $data['DF9'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df8'];
                $data['total'] = $data['DF1'] + $data['DF2'] + $data['DF3'] + $data['DF4'] + $data['DF5'] + $data['DF6'] + $data['DF7'] + $data['DF8'] + $data['DF9'];
                $data['hadSubmit'] = $_POST['hadSubmit'];
                $bzkh_info = $bzkh_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();
                if (!$bzkh_info)
                    $flagCrud = 0;
                unset($data);
                $data['text'] = $_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['pj'];
                $info .= $data['text'];
                $info .= $waccount;
                $info .= $raccount;
                $interact_info = $interact_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();
                if (!$interact_info)
                    $flagCrud = 0;
            }
        }
        
        $_POST['NMPJ'][0]['name'];
        //返回信息
        $arr = Array(
            'status' => $flagCrud,
            'flagCrud' => $flagCrud,
            'info' => $_POST['NMPJ'][0]['name'],
            'gjbm' => $_POST['gjbm'],
            'renshu' => $_POST['renshu']
        );
        return $arr;
    }
    
    //接收部门考核表的数据
    public function process_bmkh($account,$year,$month)
    {
        //主席团账号
        $waccount = $account;
        $status = 1;
        $flagCrud = 1;
        $bmkh_model = new Model("Bmkh");
        $tuiyou_model = new Model("Tuiyou");
        //获取部门数目
        for ($i = 0; $i < count($_POST['BM']['arrBM']); $i++) {
            //部门名字
            $rapartment = $_POST['BM']['arrBM'][$i]['bm'];
            //得分细则
            unset($data);
            $data['DF1'] = $_POST['BM']['arrBM'][$i]['df0'];
            $data['DF2'] = $_POST['BM']['arrBM'][$i]['df1'];
            $data['DF3'] = $_POST['BM']['arrBM'][$i]['df2'];
            $data['DF4'] = $_POST['BM']['arrBM'][$i]['df3'];
            $data['DF5'] = $_POST['BM']['arrBM'][$i]['df4'];
            $data['DF6'] = $_POST['BM']['arrBM'][$i]['df5'];
            $data['DF7'] = $_POST['BM']['arrBM'][$i]['df6'];
            $data['total'] = $data['DF1'] + $data['DF2'] + $data['DF3'] + $data['DF4'] + $data['DF5'] + $data['DF6'] + $data['DF7'];
            $data['text'] = $_POST['BM']['arrBM'][$i]['pj'];
            $data['hadSubmit'] = $_POST['hadSubmit'];
            $bmkh_info = $bmkh_model->where("(year=$year and month=$month) and (waccount=$waccount and rapartment=$rapartment)")->data($data)->save();
            if (false == $bmkh_info)
                $flagCrud = 0;
        }
        //部门推优
        unset($data);
        $data['raccount'] = $_POST['TYBM'];
        $tuiyou_info = $tuiyou_model->where("(year=$year and month=$month) and waccount=$waccount")->data($data)->save();
        if (!$tuiyou_info)
            $flagCrud = 0;
        //返回信息
        $arr = Array(
            'status' => $_POST['BM']['arrBM'][6]['pj'] + $_POST['BM']['arrBM'][7]['pj'],
            'flagCrud' => $flagCrud,
            'gjbm' => $_POST['gjbm'],
            'renshu' => $_POST['renshu']
        );
        return $arr;
    }
    //接收优秀部长评定表的数据
    public function process_yxbz($account,$year,$month)
    {
        //主席账号
        $waccount = $account;
        $yxbz_model = new Model("Yxbz");
        //将传过来的数据保存到tbl_yxbz中
        $flagCrud = 1;
        if (!empty($_POST['arrIDlist'][0]['account'])) {
            $yxbz_info = $yxbz_model->where("(year=$year and month=$month) and waccount=$waccount")->delete();
            
            for ($i = 0; $i <= count($_POST['arrIDlist']); $i++) {
                unset($data);
                $data['year'] = $year;
                $data['month'] = $month;
                $data['waccount'] = $waccount;
                $data['raccount'] = $_POST['arrIDlist'][$i]['account'];
                $data['checked'] = 1;
                
                $yxbz_info = $yxbz_model->add($data);
                if (false == $yxbz_info)
                    $flagCrud = 0;
            }
        }
        
        //返回信息
        $arr = Array(
            'flagCrud' => $flagCrud,
            'status' => $_POST['arrIDlist'][0]['account'] . $_POST['arrIDlist'][1]['account'] . $_POST['arrIDlist'][2]['account'] . $_POST['arrIDlist'][3]['account'],
            'gjbm' => $_POST['gjbm'],
            'renshu' => $_POST['renshu']
        );
        return $arr;
    }
    
    //接收其他情况加减分数据
    public function process_qt($account,$year,$month)
    {
        $flagCrud = 1;
        $qt_model = new Model("Qt");
        $person_model = new Model("Person");
        //接收干事部长的其他加减分
        
        for ($i = 0; $i < count($_POST['personsarr']); $i++) {
            for ($j = 0; $j < count($_POST['personsarr'][$i]['persons']); $j++) {
                $x_account = $_POST['personsarr'][$i]['persons'][$j]['account'];
                unset($data);
                $data['account'] = $x_account;
                $data['year'] = $year;
                $data['month'] = $month;
                $data['qt'] = $_POST['personsarr'][$i]['persons'][$j]['jiajianfen'];
                $data['text'] = $_POST['personsarr'][$i]['persons'][$j]['liyou'];
                $qt_info = $qt_model->where("(year=$year and month=$month) and account=$x_account")->data($data)->save();
                if (false == $qt_info)
                    $flagCrud = 0;
            }
            //接收部门的其他加减分
            $apartment = $_POST['personsarr'][$i]['bmjjf']['name'];
            unset($data);
            $data['account'] = $apartment;
            $data['year'] = $year;
            $data['month'] = $month;
            $data['qt'] = $_POST['personsarr'][$i]['bmjjf']['jiajianfen'];
            $data['text'] = $_POST['personsarr'][$i]['bmjjf']['liyou'];
            $qt_info = $qt_model->where("(year=$year and month=$month) and account=$apartment")->data($data)->save();
            if (false == $qt_info)
                $flagCrud = 0;
        }
        
        //返回信息
        $arr = Array(
            'flagCrud' => $flagCrud
        );
        return $arr;
    }
    //接收违纪登记表数据
    public function process_bmwg($account,$year,$month)
    {
        $flagCrud = 1;
        $arrWJDJB = $_POST['arrBMWG']['arrWJDJB'];
        $type = $_POST['type'];
        $bmwg_model = new Model("Bmwg");
        for ($i = 0; $i < $this->all_depart_num; $i++) {
            unset($data);
            $data['wgkf'] = $arrWJDJB[$i]['kf'];
            $data['text'] = $arrWJDJB[$i]['ly'];
            $apartment = $arrWJDJB[$i]['bm'];
            $bmwg_info = $bmwg_model->where("(year=$year and month=$month) and (apartment=$apartment and type=$type)")->save($data);
            if (false == $bmwg_info)
                $flagCrud = 0;
        }
        //返回信息
        $arr = Array(
            'flagCrud' => $flagCrud,
            'status' => $arrWJDJB[0]['kf'] . $arrWJDJB[0]['ly'] . $arrWJDJB[0]['bm'] . $type
        );
        return $arr;
    }
    //接收优秀称号限定表的数据
    public function process_yxchxz($account,$year,$month)
    {
        $yxchxz_model = new Model("Yxchxz");
        $person_model = new Model("Person");
        //处理干事和部长的限制
        for ($i = 0; $i < count($_POST['arrDepart']); $i++) {
            for ($j = 0; $j < count($_POST['arrDepart'][$i]['arrPersons']); $j++) {
                $x_account = $_POST['arrDepart'][$i]['arrPersons'][$j]['account'];
                $check = $_POST['arrDepart'][$i]['arrPersons'][$j]['check'];
                $yxchxz_info = $yxchxz_model->where("account=$x_account")->find();
                if (empty($yxchxz_info) && $check == 1) {
                    //勾选了但原来没有则添加到限制里面
                    unset($data);
                    $data['account'] = $x_account;
                    $yxchxz_model->add($data);
                }
                if (!empty($yxchxz_info) && $check == 0) {
                    //原来有的但取消了勾选则从限制表里面删除
                    $yxchxz_model->where("account=$x_account")->delete();
                }
            }
        }
        //处理部门的限制
        for ($i = 0; $i < count($_POST['arrBMPD']); $i++) {
            $apartment = $_POST['arrBMPD'][$i]['depart'];
            $check = $_POST['arrBMPD'][$i]['check'];
            $yxchxz_info = $yxchxz_model->where("account=$apartment")->find();
            $status .= "部门" . $apartment . "为" . $check;
            if (empty($yxchxz_info) && $check == 1) {
                //勾选了但原来没有则添加到限制里面
                //$status.="部门".$apartment."勾选".$check;
                unset($data);
                $data['account'] = $apartment;
                $yxchxz_model->add($data);
            }
            if (!empty($yxchxz_info) && $check == 0) {
                //原来有的但取消了勾选则从限制表里面删除
                //$status.="部门".$apartment."取消勾选".$check;
                $yxchxz_model->where("account=$apartment")->delete();
            }
        }
        $arr = Array(
            'status' => $status . $_POST['arrBMPD'][0]['check']
        );
        return $arr;
    }
    
    
}

?>