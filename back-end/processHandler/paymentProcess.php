<?php
 $userEmail = "";
if(session_status() >= 0){
    session_start();
    
    if(!isset($_SESSION["userEmail"])){
    
    }else{
        $userEmail = $_SESSION["userEmail"];
    }
}
$id = $_POST["id"];

$conStr = mysqli_connect('localhost','root','','ArtisticLounge');
$insert_buy = "INSERT INTO BUY_TBL (Product_Code_B,Art_ID, Buyer) 
               VALUES(next value for PCB_SQ, '$id','$userEmail');";
$update_art = "UPDATE ART_TBL SET Art_Status = 'Sold' WHERE Art_ID = '$id';";

$sql = $update_art.$insert_buy;
        if(mysqli_multi_query($conStr,$sql)){ 
            http_response_code(200);
            echo 100;

        }else{
            http_response_code(900);
            echo -1;
        }

?>