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
      h1.innerHTML = "No user found";
      main.appendChild(h1);
    }
    for (let i = 0; i < myObj.length; i++) {
      main.appendChild(
        createNewElement(
          myObj[i]["User_Name"],
          myObj[i]["User_Email"],
          myObj[i]["User_Picture"],
          myObj[i]["User_Location"]
        )
      );
    }
  } else {
    console.log(xmlhttp.responseURL);
  }
};

xmlhttp.open("GET", "../back-end/processHandler/loadUsers.php");
xmlhttp.send(); // used for post method

// creating new card
function createNewElement(name, email, src, loc) {
  var container = document.createElement("div");
  container.className = "ms-5 p-5 d-inline-block";

  var card = document.createElement("div");
  card.style.width = "14rem";
  card.style.height = "25rem";
  card.className = "card";

  var img = document.createElement("img");
  img.src = "../back-end/assets/profile-images/" + src;
  img.className = "card-img-top";

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var h4 = document.createElement("h4");
  h4.className = "card-title";
  h4.innerHTML = name;

  var h6 = document.createElement("h6");
  h6.style.color = "red";
  h6.innerHTML = "Email: " + email + "<br>Location: " + loc;

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
  // cardBody.appendChild(buyBtn);

  card.appendChild(img);
  card.appendChild(cardBody);

  container.appendChild(card);

  return container;
}
