<?php

class PersonCrudController extends JnuEicSuBaseAction
{
    public function __construct()
    {
        parent::__construct();
    }  

    //添加一个person记录
    public function addPerson($account,$name,$type,$apartment,&$flagInitPerson)
    {
        unset($data);
        $person_model=new Model("Person");
        $data['account']=$account;//账号
        $person_info=$person_model->where("account=$account")->select();
        if(count($person_info)!=0)
        {
            echo $account."已经存在,不能重复添加</br>";
            $flagInitPerson=0;
            return;
        }
        $data['name']=$name;//名字
        $data['password']=$account;//初始密码,跟学号一致
        $data['type']=$type;
        $data['apartment']=$apartment;
        
        if($flagInitPerson!=2)
        {
            $person_info=$person_model->data($data)->add();
            if(false==$person_info)
            {
                $flagInitPerson=0;  
                echo "成员添加出错：".$name."</br>"."检查程序并清空数据库表tbl_person</br>";
            
            }
        }
    }

    //删除干事
    public function removePerson($account)
    {
        //判断是否满足删除条件：非人力干事，不是部门违规负责人（如果是，得先去修改部门违规负责人）
        //tbl_person,tbl_timetable,
        $person_model=new Model("Person");
        $rlgj_model=new Model("Rlgj");
        $person_info=$person_model->where("account=$account")->find();
        if(false==$person_info)
            return -1;
        if($person_info['type']==2)//如果是人力干事,必须先在Init/index中将跟进的部门转交给别的人力干事
        {
            $rlgj_info=$rlgj_model->where("account=$account")->select();
            if(count($rlgj_info)!=0)
                return -1;
        }
        $bmwgfzr_model=new Model();
        $bmwgfzr_info=$bmwgfzr_model->where("account=$account")->find();
        if(!empty($bmwgfzr_info))//不能是部门违规负责人
            return -1;
        echo "开始删除";
        $person_model->where("account=$account")->delete();
        $timetable_model=new Model("Timetable");
        $timetable_model->where("account=$account")->delete();
        $bzkh_model=new Model("Bzkh");//raccount
        $bzkh_model->where("raccount=$account")->delete();
        $chuqin_model=new Model("Chuqin");//raccount
        $chuqin_model->where("raccount=$account")->delete();
        $diaoyan_model=new Model("Diaoyan");//raccount
        $diaoyan_model->where("raccount=$account")->delete();
        $evaluate_model=new Model("Evaluate");//waccount,raccount
        $evaluate_model->where("waccount=$account")->delete();
        $evaluate_model->where("raccount=$account")->delete();
        $gsfk_model=new Model("Gsfk");//account
        $gsfk_model->where("account=$account")->delete();
        $gskh_model=new Model("Gskh");//raccount
        $gskh_model->where("raccount=$account")->delete();
        $gszp_model=new Model("Gszp");//account
        $gszp_model->where("account=$account")->delete();
        $interact_model=new Model("Interact");//waccount,raccount
        $interact_model->where("waccount=$account")->delete();
        $interact_model->where("raccount=$account")->delete();
        $login_model=new Model("Login");
        $login_model->where("account=$account")->delete();
        $qt_model=new Model("Qt");
        $qt_model->where("account=$account")->delete();
        $resource_model=new Model("Resource");
        $resource_model->where("account=$account")->delete();
        $tuiyou_model=new Model("Tuiyou");//waccount,raccount
        $tuiyou_model->where("waccount=$account")->delete();
        $tuiyou_model->where("raccount=$account")->delete();
        $wdcs_model=new Model("Wdcs");
        $wdcs_model->where("account=$account")->delete();
        $yxchxz_model=new Model("Yxchxz");
        $yxchxz_model->where("account=$account")->delete();
        return 0;
    }

    //变更学号
    public function modifyAccount($account, $accountNew)
    {
        $person_model=new Model();
        $data['account']=$accountNew;
        $datar['raccount']=$accountNew;
        $dataw['waccount']=$accountNew;
        $dataHX['HX']=$accountNew;
        $person_info=$person_model->where("account=$account")->save($data);
        $admin_model=new Model("Admin");
        $bmkh_model=new Model("Bmkh");
        $bmwg_model=new Model("Bmwg");
        $bmwgfzr_model=new Model("Bmwgfzr");
        $bzfk_model=new Model("Bzfk");
        $bzkh_model=new Model("Bzkh");
        $bzzp_model=new Model("Bzzp");
        $chuqin_model=new Model("Chuqin");
        $diaoyan_model=new Model("Diaoyan");
        $evaluate_model=new Model("Evaluate");
        $gsfk_model=new Model("Gsfk");
        $gskh_model=new Model("Gskh");
        $gszp_model=new Model("Gszp");
        $interact_model=new Model("Interact");
        $login_model=new Model("Login");
        $person_model=new Model("Person");
        $president_model=new Model("President");
        $qt_model=new Model("Qt");
        $resource_model=new Model("Resource");
        $rlgj_model=new Model("Rlgj");
        $timetable_model=new Model("Timetable");
        $tuiyou_model=new Model("Tuiyou");
        $wdcs_model=new Model("Wdcs");
        $yxbz_model=new Model("Yxbz");
        $yxbzhx_model=new Model("Yxbzhx");
        $yxchxz_model=new Model("Yxchxz");
        $admin_model->where("account=$account")->save($data);
        $bmkh_model->where("waccount=$account")->save($dataw);
        $bmwg_model->where("account=$account")->save($data);
        $bmwgfzr_model->where("account=$account")->save($data);
        $bzfk_model->where("account=$account")->save($data);
        $bzkh_model->where("waccount=$account")->save($dataw);
        $bzkh_model->where("raccount=$account")->save($datar);
        $bzzp_model->where("waccount=$account")->save($dataw);
        $chuqin_model->where("waccount=$account")->save($dataw);
        $chuqin_model->where("raccount=$account")->save($datar);
        $diaoyan_model->where("waccount=$account")->save($dataw);
        $diaoyan_model->where("raccount=$account")->save($datar);
        $evaluate_model->where("waccount=$account")->save($dataw);
        $evaluate_model->where("raccount=$account")->save($datar);
        $gsfk_model->where("account=$account")->save($data);
        $gskh_model->where("waccount=$account")->save($dataw);
        $gskh_model->where("raccount=$account")->save($datar);
        $gszp_model->where("waccount=$account")->save($dataw);
        $gszp_model->where("raccount=$account")->save($datar);
        $interact_model->where("waccount=$account")->save($dataw);
        $interact_model->where("raccount=$account")->save($datar);
        $login_model->where("account=$account")->save($data);
        $person_model->where("account=$account")->save($data);
        $president_model->where("account=$account")->save($data);
        $qt_model->where("account=$account")->save($data);
        $resource_model->where("account=$account")->save($data);
        $resource_model->where("waccount=$account")->save($dataw);
        $rlgj_model->where("account=$account")->save($data);
        $timetable_model->where("account=$account")->save($data);
        $tuiyou_model->where("waccount=$account")->save($dataw);
        $tuiyou_model->where("raccount=$account")->save($datar);
        $wdcs_model->where("account=$account")->save($data);
        $yxbz_model->where("waccount=$account")->save($dataw);
        $yxbz_model->where("raccount=$account")->save($datar);
        $yxbzhx_model->where("HX=$account")->save($dataHX);
        $yxchxz_model->where("account=$account")->save($data);
        return 0;
    }


}

?>