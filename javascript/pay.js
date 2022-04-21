const xmlhttp = new XMLHttpRequest();
// alert(1);
xmlhttp.onload = function () {
  if (xmlhttp.responseText == 1) {
    window.location.replace("./landing.html");
  }
  if (xmlhttp.status == 200) {
    if (xmlhttp.responseText == 100) {
      window.location.replace("./thankYouPage.html");
    } else {
      const myObj = JSON.parse(this.responseText);
      console.log(myObj);
      createNewElement(
        myObj[0]["Art_ID"],
        myObj[0]["Art_Name"],
        myObj[0]["Category"],
        myObj[0]["Price"],
        myObj[0]["Art_Picture"]
      );
    }
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

  document.getElementById("t_price").innerHTML = price + " Tk.";
  let total = parseInt(price) + parseInt(49);
  document.getElementById("total").innerHTML = total + " Tk.";
}
function checkChange() {
  if (document.getElementById("check").checked) {
    let total = parseint(document.getElementById("total").innerHTML);
    document.getElementById("extra").innerHTML = "20 Tk";
    // alert(1);
  } else {
  }
}

function confirm() {
  let formData = new FormData();
  formData.append("id", localStorage.getItem("artId"));
  xmlhttp.open("POST", "../back-end/processHandler/paymentProcess.php");
  xmlhttp.send(formData); // used for post method
}
