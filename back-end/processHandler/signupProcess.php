<?php

header("Content-Type: application/json; charset=UTF-8");

$inputJSON = file_get_contents('php://input'); // used for handle POST data Object
$data = json_decode($inputJSON, true); // used to get post data
$res = ["reuslt"=>"true"];

insert_into_database($data["name"],$data["email"],$data["pass"]);

// funtions
function insert_into_database($uName, $uEmail, $uPass){
    $conStr = mysqli_connect('localhost','root','','ArtisticLounge');
    $sql = "INSERT INTO USER_TBL(User_Name, User_Email, User_Pass)
            VALUES ('$uName', '$uEmail', '$uPass')";

            // cehck user already exist
            if(check_exist_user($uEmail, $conStr)){
                $res["result"] = "false";
                http_response_code(200);
                echo json_encode($res);
            }else{
                // create user
                if(mysqli_query($conStr,$sql)){
                     session_start();
                    // // setting up session data;
                
                     $_SESSION["userEmail"] = $uEmail;
                    
                    $res["result"] = "true";
                    http_response_code(200);
                    echo json_encode($res);
    
                   // header("refresh:2, url=.../front-end/gallery.html");
                }else{
                    $res["result"] = "false";
                    http_response_code(200);
                    echo json_encode($res);
                }
            }

            
}


function check_exist_user($uEmail, $conStr){
     $sql = "SELECT * FROM USER_TBL WHERE User_Email = '$uEmail'";
     $result = mysqli_query($conStr, $sql);
     $data = mysqli_fetch_array($result, MYSQLI_ASSOC);

    if(mysqli_num_rows($result) >= 1) return true;

     return false;
}

?>