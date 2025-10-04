const wrapper =  document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
      downloadBtn = wrapper.querySelector(".download"); 


generateBtn.addEventListener("click", ()=>{

  let qrValue = qrInput.value;
  if(!qrValue) return; // if the input is empty then form return here stop here
  generateBtn.innerText = "Generating QR Code..."; 
  //getting a qr code of user entered value using the qrserver
  //api and passing the api returned img src to qrImg
  qrImg.src = ` https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`
  console.log(qrValue);
  console.log("cliked");
  qrImg.addEventListener("load", ()=> { // once qr code img loaded
      wrapper.classList.add("active");
      generateBtn.innerText = "Generate QR Code";

          downloadBtn.style.display = "block";

  })
})

downloadBtn.addEventListener("click", () => {
  if (!qrImg.src) return; // no QR code generated yet
  window.open(qrImg.src, "_blank"); // open QR code in a new tab
});