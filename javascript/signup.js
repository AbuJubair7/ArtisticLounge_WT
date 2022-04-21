function submit() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let cPass = document.getElementById("cPass").value;
  console.log(name + " " + email + " " + pass + " " + cPass);

  console.log("aa");
  if (name == "" || email == "" || pass == "" || cPass == "") {
    alert("Wrong input");
  } else {
    const userObj = {
      name: name,
      email: email,
      pass: pass,
      cPass: cPass,
    };
    const userData = JSON.stringify(userObj);
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function () {
      if (xmlhttp.status == 200) {
        const myObj = JSON.parse(this.responseText);
        console.log(myObj);
      } else {
        console.log("404 error!");
      }
    };
    // xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.open("POST", "../back-end/processHandler/signupProcess.php", true);
    xmlhttp.send(userData);
  }
}
