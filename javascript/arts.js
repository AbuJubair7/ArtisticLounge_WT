var main = document.getElementById("main");
const xmlhttp = new XMLHttpRequest();
// alert(0);
xmlhttp.onload = function () {
  if (xmlhttp.responseText == 1) {
    window.location.replace("./landing.html");
  }
  if (xmlhttp.status == 200) {
    const myObj = JSON.parse(this.responseText);
    if (myObj.length == 0) {
      let h1 = document.createElement("h1");
      h1.innerHTML = "No art found";
      main.appendChild(h1);
    }
    //console.log(myObj);
    for (let i = 0; i < myObj.length; i++) {
      main.appendChild(
        createNewElement(
          myObj[i]["Art_Name"],
          myObj[i]["Art_Status"],
          myObj[i]["Art_Picture"]
        )
      );
    }
  } else {
    console.log(xmlhttp.responseURL);
  }
};

xmlhttp.open("GET", "../back-end/processHandler/loadAdminArts.php");
xmlhttp.send(); // used for post method

function logout() {
  xmlhttp.open("GET", "../back-end/processHandler/logoutProcess.php");
  xmlhttp.send(); // used for post method
}

// creating new card
function createNewElement(name, status, src) {
  var container = document.createElement("div");
  container.className = "ms-5 p-5 d-inline-block";

  var card = document.createElement("div");
  card.style.width = "14rem";
  card.style.height = "19rem";
  card.className = "card";

  var img = document.createElement("img");
  img.src = "../back-end/assets/arts/" + src;
  img.className = "card-img-top";

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var h4 = document.createElement("h4");
  h4.className = "card-title";
  h4.innerHTML = name;

  var h6 = document.createElement("h6");
  h6.style.color = "red";
  h6.innerHTML = "Status: " + status;

  // var buyBtn = document.createElement("a");
  // buyBtn.href = "#";
  // buyBtn.className = "btn ms-5";
  // buyBtn.style.backgroundColor = "brown";
  // buyBtn.style.color = "azure";
  // buyBtn.innerHTML = "Delete";
  // buyBtn.onclick = function () {
  //   // window.location.replace("./buyArt.html");
  // };

  //appending
  cardBody.appendChild(h4);
  cardBody.appendChild(h6);
  //cardBody.appendChild(buyBtn);

  card.appendChild(img);
  card.appendChild(cardBody);

  container.appendChild(card);

  return container;
}
