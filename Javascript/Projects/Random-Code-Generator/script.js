let button = document.getElementById("btn")


function generate() {
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    let randomColor1 = "#" + Math.floor(Math.random()*16777215).toString(16);

  document.getElementById("colorBox").style.backgroundColor = randomColor;
  document.getElementById("btn").style.backgroundColor = randomColor1;
  document.getElementById("colorCode").innerText = "Color: " + randomColor;
}

