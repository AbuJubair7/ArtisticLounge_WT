const xmlhttp = new XMLHttpRequest();

xmlhttp.onload = function () {
  if (xmlhttp.status == 200) {
    console.log("log" + this.responseText);
    const myObj = JSON.parse(this.responseText);

    if (myObj.result == "succes") {
      console.log("Sign in done");
      window.location.replace("./gallery.html");
    } else {
      console.log("Sign in problem");
    }
    //redirect to gallery
    if (myObj.result == "true") {
      // window.location.replace("./gallery.html");
      console.log(myObj);
    }
  } else {
    // console.log(myObj.result);
    console.log("404 error!");
  }
};

// xmlhttp.open("GET", "../back-end/processHandler/redirect.php", true);
// xmlhttp.send();

function submit() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  console.log(email + " " + pass);

  if (email == "a.admin" && pass == "1234") {
    window.location.replace("./adminPanel.html");
  }

  var formData = new FormData();
  formData.append("email", email);
  formData.append("pass", pass);
  // console.log(email + " " + pass);
  xmlhttp.open("POST", "../back-end/processHandler/signinProcess.php");
  xmlhttp.send(formData);
}
