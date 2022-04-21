<?php
    $userEmail = "";
    if(session_status() >= 0){
        session_start();
    
        if(!isset($_SESSION["userEmail"])){
         
            http_response_code(500);
           echo -1;
        }else{
            $userEmail = $_SESSION["userEmail"];
        }
    }

    // file process
    if(isset($_FILES['file']['name'])){
        $filename = uniqid().date("Y-m-d-h-i-s").$_FILES['file']['name'];
	
        // Location
        $location = '../assets/profile-images/'.$filename;

        // file extension
        $file_extension = pathinfo($location, PATHINFO_EXTENSION);
        $file_extension = strtolower($file_extension);

        // Valid image extensions
        $valid_ext = array("png","jpg","jpeg");

        $userName = $_POST["name"];
        $userGender = $_POST["gender"];
        $userLocation = $_POST["location"];
        $userPhone = $_POST["number"];
        
        $conStr = mysqli_connect('localhost','root','','ArtisticLounge');
        $sql = "UPDATE USER_TBL SET User_Name = '$userName', User_Gender = '$userGender', User_Location = '$userLocation', 
                User_Phone = '$userPhone', User_Picture = '$filename' WHERE User_Email = '$userEmail'";
                if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
                    if(mysqli_query($conStr,$sql)){ 
                        http_response_code(200);
                        echo 100;
        
                    }else{
                        http_response_code(900);
                        echo -1;
                    }
                }else{
                    echo -2;
                }
               
    }else{
        $userName = $_POST["name"];
        $userGender = $_POST["gender"];
        $userLocation = $_POST["location"];
        $userPhone = $_POST["number"];
        
        $conStr = mysqli_connect('localhost','root','','ArtisticLounge');
        $sql = "UPDATE USER_TBL SET User_Name = '$userName', User_Gender = '$userGender', User_Location = '$userLocation', 
                User_Phone = '$userPhone' WHERE User_Email = '$userEmail'";
        
                if(mysqli_query($conStr,$sql)){ 
                    http_response_code(200);
                    echo 100;
    
                }else{
                    http_response_code(900);
                    echo -1;
                }
    }
    
    //.......

   
?>