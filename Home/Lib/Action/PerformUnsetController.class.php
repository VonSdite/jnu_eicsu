<?php
/*
* @author: dengzuoheng@gmail.com
* @date: 2016/4/27
*/

/*
* last update : 2016/4/27 dengzuoheng@gmail.com :代码其实不是我写的, 我只是重构
* 而已
*/

//删除某次考核, 祝你用不上这个类;)
class PerformUnsetController extends JnuEicSuBaseAction
{
    public function __construct()
    {
        parent::__construct();
    }
    
    //删除某年某月绩效考核
    public function unsetPerform($year,$month)
    {
        $control_model = new Model("Control");
        $gszp_model = new Model("Gszp");
        $interact_model = new Model("Interact");
        $tuiyou_model = new Model("Tuiyou");
        $evaluate_model = new Model("Evaluate");
        $bzzp_model = new Model("Bzzp");
        $gskh_model = new Model("Gskh");
        $bzkh_model = new Model("Bzkh");
        $bmkh_model = new Model("Bmkh");
        $wdcs_model = new Model("Wdcs");
        $chuqin_model = new Model("Chuqin");
        $diaoyan_model = new Model("Diaoyan");
        $qt_model = new Model("Qt");
        $gsfk_model = new Model("Gsfk");
        $bzfk_model = new Model("Bzfk");
        $bmfk_model = new Model("Bmfk");
        $yxchxz_model = new Model("Yxchxz");
        $bmwg_model = new Model("Bmwg");
        $yxbzhx_model = new Model("Yxbzhx");
        $yxbz_model = new Model("Yxbz");
        //干事部分
        $gszp_model->where("year=$year and month=$month")->delete();
        $interact_model->where("year=$year and month=$month")->delete();
        $tuiyou_model->where("year=$year and month=$month")->delete();
        $evaluate_model->where("year=$year and month=$month")->delete();
        $control_model->where("year=$year and month=$month")->delete();
        //部长部分
        $bzzp_model->where("year=$year and month=$month")->delete();
        $gskh_model->where("year=$year and month=$month")->delete();
        //主席部分
        $bzkh_model->where("year=$year and month=$month")->delete();
        $bmkh_model->where("year=$year and month=$month")->delete();
        //外调次数
        $wdcs_model->where("year=$year and month=$month")->delete();
        //出勤统计
        $chuqin_model->where("year=$year and month=$month")->delete();
        //调研采纳
        $diaoyan_model->where("year=$year and month=$month")->delete();
        //其他情况
        $qt_model->where("year=$year and month=$month")->delete();
        //反馈
        $gsfk_model->where("year=$year and month=$month")->delete();
        $bzfk_model->where("year=$year and month=$month")->delete();
        $bmfk_model->where("year=$year and month=$month")->delete();
        //优秀称号限制
        $yxchxz_model->where("year=$year and month=$month")->delete();
        //部门违规
        $bmwg_model->where("year=$year and month=$month")->delete();
        //候选，优秀部长
        $yxbzhx_model->where("year=$year and month=$month")->delete();
        $yxbz_model->where("year=$year and month=$month")->delete();
        
    }
}
?>