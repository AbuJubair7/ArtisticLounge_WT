var main = document.getElementById("main");
var arts = [];

const xmlhttp = new XMLHttpRequest();
// alert(0);
xmlhttp.onload = function () {
  // console.log(xmlhttp.responseText);
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
    console.log(myObj);
    arts = [];
    for (let i = 0; i < myObj.length; i++) {
      arts.push(myObj[i]);
      main.appendChild(
        createNewElement(
          myObj[i].Art_ID,
          myObj[i].Art_Name,
          myObj[i].Price,
          myObj[i].Art_Picture
        )
      );
    }
  } else {
    console.log(xmlhttp.responseURL);
  }
};

xmlhttp.open("GET", "../back-end/processHandler/loadAllArts.php", true);
xmlhttp.send(); // used for post method
loadProfileImage();

// creating new card
function createNewElement(artId, name, price, src) {
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
  h6.innerHTML = price + " Tk.";

  var buyBtn = document.createElement("a");
  buyBtn.href = "#";
  buyBtn.className = "btn ms-5";
  buyBtn.style.backgroundColor = "brown";
  buyBtn.style.color = "azure";
  buyBtn.innerHTML = "Buy Now";
  buyBtn.onclick = function () {
    localStorage.setItem("artId", artId);
    window.location.replace("./buyArt.html");
  };

  //appending
  cardBody.appendChild(h4);
  cardBody.appendChild(h6);
  cardBody.appendChild(buyBtn);

  card.appendChild(img);
  card.appendChild(cardBody);

  container.appendChild(card);

  return container;
}

function loadProfileImage() {
  const xmlhttp = new XMLHttpRequest();
  // alert(0);
  xmlhttp.onload = function () {
    if (xmlhttp.status == 200) {
      const myObj = JSON.parse(this.responseText);
      if (myObj[0].User_Picture != null) {
        document.getElementById("image").src =
          "../back-end/assets/profile-images/" + myObj[0].User_Picture;
        console.log(myObj[0].User_Picture);
      }
    } else {
      console.log("Internal server error");
    }
  };

  xmlhttp.open("GET", "../back-end/processHandler/loadProfile.php");
  xmlhttp.send(); // used for post method
}
