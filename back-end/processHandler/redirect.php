<?php

$res = ["result"=>"false"];

if(session_status() >= 0){
    session_start();

    if(isset($_SESSION["userEmail"])){
     
        $res = ["result"=>"true"];
        echo json_encode($res);
    }else{
        $res = ["result"=>"false"];
        echo json_encode($res);
    }
}else{
    $res = ["result"=>"false"];
    echo json_encode($res);
}

?>