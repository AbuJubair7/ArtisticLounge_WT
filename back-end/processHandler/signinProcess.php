<?php

$res = ["result"=>"error"];
$userEmail = $_POST["email"];
$userPass = $_POST["pass"];



if(check_user_validation($userEmail, $userPass)){
    session_start();
    $_SESSION["userEmail"] = $userEmail;
    $res = ["result"=>"succes"];
    echo json_encode($res);
   
}else{
    $res = ["result"=>"error"];
    echo json_encode($res);
}


// function
function check_user_validation($uEmail, $uPass){
    $conStr = mysqli_connect('localhost','root','','ArtisticLounge');
    $sqlQuery = "SELECT * FROM USER_TBL WHERE User_Email = '$uEmail' AND User_Pass = '$uPass'";

    $result = mysqli_query($conStr, $sqlQuery);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if(mysqli_num_rows($result) >= 1) return true;

     return false;
}

?>