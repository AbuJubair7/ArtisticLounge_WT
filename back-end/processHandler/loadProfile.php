
<?php
    $userEmail = "";
    if(session_status() >= 0){
        session_start();

        if(!isset($_SESSION["userEmail"])){
        http_response_code(500);
        echo 0;
        }else{
            $userEmail = $_SESSION["userEmail"];

            $conStr = mysqli_connect('localhost','root','','ArtisticLounge');
            $sqlQuery = "SELECT * FROM USER_TBL WHERE User_Email = '$userEmail'";

            $result = mysqli_query($conStr, $sqlQuery);
            $users = mysqli_fetch_all($result, MYSQLI_ASSOC);
            http_response_code(200);
            echo json_encode($users);
        }
    }
?> 