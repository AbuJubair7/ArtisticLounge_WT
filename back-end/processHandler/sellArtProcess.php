
<?php 
// $inputJSON = file_get_contents('php://input'); // used for handle POST data Object
// $data = json_decode($inputJSON, true);

// file name
	$filename = uniqid().date("Y-m-d-h-i-s").$_FILES['file']['name'];

	$jsonData = $_POST["data"];
	$data = json_decode($jsonData, true);

	// Location
	$location = '../assets/arts/'.$filename;

	// file extension
	$file_extension = pathinfo($location, PATHINFO_EXTENSION);
	$file_extension = strtolower($file_extension);

	// Valid image extensions
	$valid_ext = array("png","jpg","jpeg");

	$response = 0;
	if(in_array($file_extension,$valid_ext)){
	  	// Upload file
	  	if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
	    	$response = $data["name"];
			

			// database process
			$userEmail = "";
			if(session_status() >= 0){
				session_start();
				
				if(!isset($_SESSION["userEmail"])){
				
				}else{
					$userEmail = $_SESSION["userEmail"];
				}
			}else{
				// try to redirect to main page
			}
			$artName = $data["name"];
			$artCategory = $data["cate"];
			$artPrice = $data["price"];

			$conStr = mysqli_connect('localhost','root','','ArtisticLounge');
			$insert_into_art = "INSERT INTO ART_TBL (Art_Status, Art_ID, Art_Name, Category, Price, Art_Picture)
								VALUES ('Available',next value for ART_SQ,'$artName','$artCategory','$artPrice','$filename');";
			$insert_into_sell = "INSERT INTO SELL_TBL (Product_Code_S, Art_ID, Seller)
								VALUES (next value for PCS_SQ, previous value for ART_SQ,'$userEmail');";

			$sql = $insert_into_art.$insert_into_sell;

			if(mysqli_multi_query($conStr,$sql)){ 
				$response = "Art Posted";
				http_response_code(200);
			
			}else{
				$response =  mysqli_error($conStr);
				http_response_code(300);
			}
			// process done
    
			
	  	}else{
			  http_response_code(500);
		}
	}
	
	echo $response;
	exit;


//...........

