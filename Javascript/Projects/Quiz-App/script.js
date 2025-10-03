// Array of quiz questions
const questions = [
  {
    id: 1,
    question: "Which of these are JavaScript data types?",
    options: ["String", "Number", "Button", "Boolean"],
    answer: "Boolean"
  },
  {
    id: 2,
    question: "What is the output of: console.log(typeof null)?",
    options: ["null", "object", "undefined", "boolean"],
    answer: "object"
  },
  {
    id: 3,
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "<!-- -->", "#"],
    answer: "//"
  },
  {
    id: 4,
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    answer: "Netscape"
  },
  {
    id: 5,
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "all of these"],
    answer: "all of these"
  },
  // {
  //   id: 6,
  //   question: "What does `===` mean in JavaScript?",
  //   options: ["Equal value", "Equal value and type", "Assignment", "Not equal"],
  //   answer: "Equal value and type"
  // },
  // {
  //   id: 7,
  //   question: "Which method converts JSON to a JavaScript object?",
  //   options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
  //   answer: "JSON.parse()"
  // },
  // {
  //   id: 8,
  //   question: "Which event occurs when a user clicks on an HTML element?",
  //   options: ["onhover", "onclick", "onchange", "onsubmit"],
  //   answer: "onclick"
  // },
  // {
  //   id: 9,
  //   question: "How do you write a function in JavaScript?",
  //   options: ["function myFunc() {}", "func myFunc() {}", "function:myFunc() {}", "def myFunc() {}"],
  //   answer: "function myFunc() {}"
  // },
  // {
  //   id: 10,
  //   question: "Which operator is used for string concatenation in JavaScript?",
  //   options: ["+", "-", "*", "&"],
  //   answer: "+"
  // }
];


const quiz = document.getElementById("quiz");
const next = document.getElementById("btnNext");
const prev = document.getElementById("btnprev");
const submit = document.getElementById("btnsubmit");
const scoreEl  = document.getElementById("score");

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null); // store user's selected answers

// Function to show one question
function showQuestion(index) {
  quiz.innerHTML = ""; // clear old question

  let q = questions[index];

  // Question text
  const questionText = document.createElement("h3");
  questionText.textContent = (index + 1) + ". " + q.question;
  quiz.appendChild(questionText);

  // Options (radio buttons)
  q.options.forEach(option => {
    const optionEl = document.createElement("div");
    optionEl.innerHTML = `
      <label>
        <input type="radio" name="q${index}" value="${option}">
        ${option}
      </label>
    `;

    const input = optionEl.querySelector("input");

    // Keep previous selection
    if(userAnswers[index] === option) input.checked = true;

    // Save user answer
    input.addEventListener("change", () => {
      userAnswers[index] = option;
    });

    quiz.appendChild(optionEl);
  });

  // Show / hide buttons
  prev.style.display = index === 0 ? "none" : "inline";
  next.style.display = index === questions.length - 1 ? "none" : "inline";
}

// Show first question
showQuestion(currentQuestion);

// Next button
next.addEventListener("click", () => {
  if(currentQuestion < questions.length - 1){
    currentQuestion++;
    showQuestion(currentQuestion);
  }
});

// Prev button
prev.addEventListener("click", () => {
  if(currentQuestion > 0){
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

// Submit button
submit.addEventListener("click", () => {
  let score = 0;
  quiz.innerHTML = "";
  scoreEl.textContent = "";

    // Make quiz container full height
  quiz.classList.add("full-height");

  questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];

    // Calculate score
    if(userAnswer === q.answer) score++;

    // Show question
    const questionText = document.createElement("h3");
    questionText.textContent = (i + 1) + ". " + q.question;
    quiz.appendChild(questionText);

    // Show correct answer
    const answerText = document.createElement("p");
    answerText.style.color = "green";
    answerText.textContent = "Correct Answer: " + q.answer;
    quiz.appendChild(answerText);



    // Show user's wrong answer
    if(userAnswer && userAnswer !== q.answer){
      const userText = document.createElement("p");
      userText.style.color = "red";
      userText.textContent = "Your Answer: " + userAnswer;
      quiz.appendChild(userText);
    }
  });

  // Show final score
  scoreEl.textContent = "Your Score: " + score + "/" + questions.length;

  // Hide buttons
  next.style.display = "none";
  prev.style.display = "none";
  submit.style.display = "none";
});
