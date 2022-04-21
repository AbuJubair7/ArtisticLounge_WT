const xmlhttp = new XMLHttpRequest();
// alert(0);
xmlhttp.onload = function () {
  if (xmlhttp.responseText == 1) {
    window.location.replace("./landing.html");
  }
  if (xmlhttp.status == 200) {
    const myObj = JSON.parse(this.responseText);
    console.log(myObj);
    createNewElement(
      myObj[0]["Art_ID"],
      myObj[0]["Art_Name"],
      myObj[0]["Category"],
      myObj[0]["Price"],
      myObj[0]["Art_Picture"]
    );
  } else {
    console.log(xmlhttp.responseURL);
  }
};
const formData = new FormData();
formData.append("id", localStorage.getItem("artId"));
xmlhttp.open("POST", "../back-end/processHandler/loadBuyArt.php");
xmlhttp.send(formData); // used for post method
// creating new card
function createNewElement(artId, name, cate, price, src) {
  document.getElementById("image").src = "../back-end/assets/arts/" + src;
  document.getElementById("title").innerHTML = name;
  document.getElementById(
    "detail"
  ).innerHTML = `Catagory: ${cate}<br />Product Code: ${artId}`;
  document.getElementById("price").innerHTML = price + " Tk.";
}

function proceed() {
  window.location.replace("./paymentPage.html");
}
