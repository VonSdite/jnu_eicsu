<?php
class SysInitController extends JnuEicSuBaseAction
{
    public function __construct()
    {
        parent::__construct();
    } 

    //遍历所有person, 如果没有对应的空课表, 就创建一个
    public function initKKBTable()
    {
        //获取所有人员信息
        $person_model=new Model("Person");
        $timetable_model=new Model("Timetable");
        $person_info=$person_model->select();
        foreach($person_info as $v)
        {
            $add_account=$v['account'];
            unset($data);
            $data['account']=$add_account;
            $timetable_info=$timetable_model->where("account=$add_account")->find();
            if(false==$timetable_info)
                $timetable_model->data($data)->add();
        }
    } 

    //初始化人力干事跟进部门
    public function initRlgj()
    {
        $rlgj_model=new Model("Rlgj");
        $person_model=new Model("Person");
        $person_info=$person_model->where("apartment=2 and type=2")->select();

        //每个干事跟进一个部门,若干事低于11个,剩余部门平均分摊,若干事多于11人,只有11个能跟进相关部门
        $rlgs_num=count($person_info);
        for($i=0;$i<$this->all_depart_num;$i++)
        {
            unset($data);
            $data['account']=$person_info[$i%$rlgs_num]['account'];
            $data['apartment']=$i+1;
            $rlgj_info=$rlgj_model->add($data);
            if(!$rlgj_info)
              echo "部门".$i."人力干事跟进部门初始化失败</br>";
        }
    }

    //主席主管部门初始化
    public function initZxzg()
    {
        //找出所有主席团成员
        $person_model=new Model("Person");
        $president_model=new Model("President");
        $person_info=$person_model->where("type=4")->select();
        foreach($person_info as $v)
        {
          unset($data);
          $data['account']=$v['account'];
          $data['apartment']="|1";
          $data['is_sub']='y';
          $president_info=$president_model->add($data);
          if(!$president_info)
            "主席团".$data['account']."初始化失败</br>";
        }
    }

    //违规登记负责人初始化
    public function initBmwgfzr()
    {

        $bmwgfzr_model=new Model("Bmwgfzr");
        $person_model=new Model("Person");
        $person_info=$person_model->where("type!=4")->select();
        if(count($person_info)>6)
        {
            for($i=0;$i<6;$i++)
            {
                unset($data);
                $data['account']=$person_info[$i]['account'];
                $data['type']=$i+1;
                $bmwgfzr_info=$bmwgfzr_model->add($data);
                if(false==$bmwgfzr_info)
                {
                    echo ($i+1)."部门违规登记初始化失败</br>";
                }
            }
        }
    }

}
?>