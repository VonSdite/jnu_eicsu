<?php

class DbLogger
{
    public function log($info)
    {
        $log_model=new Model("Log");
        $data['text']=$info;
        $data['time']=mktime();
        $log_model->add($data);
    }
}

?>