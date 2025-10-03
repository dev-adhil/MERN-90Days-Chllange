const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUM = "0123456789";
const SYM = "!@#$%^&*()-_=+[]{};:,.<>/?|~";

const pwdEl = document.getElementById("password");
const lenRange = document.getElementById("length");
const lenValue = document.getElementById("lenValue");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const toggleShow = document.getElementById("toggleShow");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const upperCb = document.getElementById("upper");
const lowerCb = document.getElementById("lower");
const numbersCb = document.getElementById("numbers");
const symbolsCb = document.getElementById("symbols");

let currentPassword = "";
let masked = false;

function generatePassword(length) {
  const pools = [];
  if (upperCb.checked) pools.push(UPPER);
  if (lowerCb.checked) pools.push(LOWER);
  if (numbersCb.checked) pools.push(NUM);
  if (symbolsCb.checked) pools.push(SYM);

  if (pools.length === 0) pools.push(LOWER);

  const charset = pools.join("");
  let password = "";
  for(let i=0;i<length;i++){
    password += charset[Math.floor(Math.random()*charset.length)];
  }
  return password;
}

function updatePasswordDisplay(){
  if(!currentPassword){
    pwdEl.textContent = "Click Generate";
    return;
  }
  pwdEl.textContent = masked ? "•".repeat(currentPassword.length) : currentPassword;
}

function updateStrength(){
  const length = parseInt(lenRange.value);
  let charsetSize = 0;
  if(upperCb.checked) charsetSize += UPPER.length;
  if(lowerCb.checked) charsetSize += LOWER.length;
  if(numbersCb.checked) charsetSize += NUM.length;
  if(symbolsCb.checked) charsetSize += SYM.length;
  if(charsetSize===0) charsetSize = LOWER.length;
  const entropy = Math.round(length*Math.log2(charsetSize));

  lenValue.textContent = length;

  let percent = Math.min(100, Math.round(entropy/128*100));
  strengthFill.style.width = percent+"%";

  if(entropy>=100){
    strengthFill.style.background = "#10b981";
    strengthText.textContent = "Strength: Excellent";
  } else if(entropy>=80){
    strengthFill.style.background = "#34d399";
    strengthText.textContent = "Strength: Very Good";
  } else if(entropy>=60){
    strengthFill.style.background = "#f59e0b";
    strengthText.textContent = "Strength: Good";
  } else {
    strengthFill.style.background = "#ef4444";
    strengthText.textContent = "Strength: Weak";
  }
}

// Event listeners
lenRange.addEventListener("input", updateStrength);
[upperCb, lowerCb, numbersCb, symbolsCb].forEach(cb => cb.addEventListener("change", updateStrength));

generateBtn.addEventListener("click", () => {
  currentPassword = generatePassword(parseInt(lenRange.value));
  updatePasswordDisplay();
  updateStrength();
});

copyBtn.addEventListener("click", () => {
  if(!currentPassword) return;
  navigator.clipboard.writeText(currentPassword).then(()=>{
    copyBtn.textContent = "Copied ✓";
    setTimeout(()=>copyBtn.textContent="Copy",1200);
  });
});

toggleShow.addEventListener("click", () => {
  masked = !masked;
  updatePasswordDisplay();
});
