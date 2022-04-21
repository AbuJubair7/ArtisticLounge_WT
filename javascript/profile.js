const xmlhttp = new XMLHttpRequest();
var table = document.getElementById("table");
//alert(0);
xmlhttp.onload = function () {
  if (xmlhttp.status == 200) {
    if (xmlhttp.responseText == 100) {
      console.log("profile updated");
    } else if (xmlhttp.responseText == -1) {
      console.log("did not update");
    } else if (xmlhttp.responseText == -2) {
      console.log("file move error");
    } else {
      // console.log(xmlhttp.responseText);
      const myObj = JSON.parse(this.responseText);
      console.log(myObj);
      table.rows[0].cells[1].innerHTML = myObj[0].User_Email;
      document.getElementById("name").innerHTML = myObj[0].User_Name;
      table.rows[1].cells[1].innerHTML = myObj[0].User_Gender;
      table.rows[2].cells[1].innerHTML = myObj[0].User_Phone;
      table.rows[3].cells[1].innerHTML = myObj[0].User_Location;
      if (myObj[0].User_Picture != null) {
        document.getElementById("image").src =
          "../back-end/assets/profile-images/" + myObj[0].User_Picture;
        console.log(myObj[0].User_Picture);
      }
    }
  } else {
    console.log("Internal server error");
  }
};

xmlhttp.open("GET", "../back-end/processHandler/loadProfile.php");
xmlhttp.send(); // used for post method

function update() {
  const files = document.getElementById("file").files;
  var name = document.getElementById("name").value;
  var gender = document.getElementById("gender").value;
  var location = document.getElementById("location").value;
  var number = document.getElementById("number").value;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("gender", gender);
  formData.append("location", location);
  formData.append("number", number);
  if (files[0] != null) {
    formData.append("file", files[0]);
  }

  xmlhttp.open("POST", "../back-end/processHandler/profileUpdateProcess.php");
  xmlhttp.send(formData); // used for post method
}

function logout() {
  xmlhttp.open("GET", "../back-end/processHandler/logoutProcess.php");
  xmlhttp.send(); // used for post method
  window.location.replace("../front-end/landing.html");
}
