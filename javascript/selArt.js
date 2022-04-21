// alert("sell");
function uploadFile() {
  const files = document.getElementById("file").files;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const cate = document.getElementById("cate").value;

  if (files.length > 0) {
    // create object
    const data = {
      name: name,
      cate: cate,
      price: price,
    };
    const strData = JSON.stringify(data);
    var formData = new FormData();
    formData.append("file", files[0]);
    formData.append("data", strData);

    var xhttp = new XMLHttpRequest();

    // Set POST method and ajax file path
    xhttp.open("POST", "../back-end/processHandler/sellArtProcess.php", true);

    // call on request changes state
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;
        if (xhttp.status == 200) {
          alert("Uploaded " + response);
        } else if ((xhttp.status = 300)) {
          alert("server error " + xhttp.status);
        } else {
          alert("did not upload " + xhttp.status);
        }
      }
    };

    // Send request with data

    xhttp.send(formData);
  } else {
    alert("Please select a file");
  }
}

// load selected image
function showImage(src, target) {
  var fr = new FileReader();
  fr.onload = function () {
    target.src = fr.result;
  };
  fr.readAsDataURL(src.files[0]);
}

function putImage() {
  var src = document.getElementById("file");
  var target = document.getElementById("image");
  showImage(src, target);
}
