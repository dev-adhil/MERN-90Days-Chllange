const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close")
copyBtn = wrapper.querySelector(".copy");


function fetchRequest(formData, file) {
  infoText.innerText = "Scaning QR Code..."
  //SENDING POST REQUEST TO QR SERVER API WITH PASSING
  // FORM DATA AS BODY AND GETTING RESPONSE FROM IT 
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST", body: formData
  }).then(res => res.json()).then(result => {
    result = result[0].symbol[0].data;
    console.log(result,"result");
    infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code"
    if(!result) return;
    wrapper.querySelector("textarea").innerText = result;
    form.querySelector("img").src = URL.createObjectURL(file);
    infoText.innerText = "Upload QR Code to Read"
    wrapper.classList.add("active");
    console.log(result);
  })
}

fileInp.addEventListener("change", e => {
  let file = e.target.files[0]; // GETTING USE SELECTED FILE
  if(!file) return;
  let formData = new FormData(); //CREATING A NEW NEW formData OBJECT
  formData.append("file", file); // ADDING SELECTED FILE TO formData
  console.log(file);
  fetchRequest(formData,file);

})

copyBtn.addEventListener("click",() => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text)                       // writeText() property writes the specified text string to the system clipboard
})

form.addEventListener("click", ()=> fileInp.click());
closeBtn.addEventListener("click", ()=> wrapper.classList.remove("active"))