<?php

    $id = $_POST["id"];
    $conStr = mysqli_connect('localhost','root','','ArtisticLounge');
    $sql = "SELECT * FROM ART_TBL Where Art_Status = 'Available' and Art_ID = '$id'";

    $result = mysqli_query($conStr, $sql);
    $arts = mysqli_fetch_all($result, MYSQLI_ASSOC);

    http_response_code(200);
    // $myObj = ["name"=>"Jubair","age"=>"30","city"=>"New Work"];
    $myJSON = json_encode($arts);
    http_response_code(200);
    echo $myJSON;
    


?>