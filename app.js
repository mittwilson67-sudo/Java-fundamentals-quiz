const question = [
  {
    question: "What keyword is used to declare a variable in JavaScript",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "What is the correct way to write a comment in JavaScript",
    answers: [
      { text: "comment", correct: false },
      { text: "//Comment", correct: false },
      { text: "/*comment*/", correct: false },
      { text: "B and C are correct", correct: true },
    ],
  },
  {
    question: "What function is used to display data in the console log?",
    answers: [
      { text: "console.log", correct: true },
      { text: "prompt", correct: false },
      { text: "alert", correct: false },
      { text: "All of the above", correct: false },
    ],
  },
  {
    question: "What do you call a function named (myFunction)",
    answers: [
      { text: "call myFunction()", correct: false },
      { text: "myFunction[]", correct: false },
      { text: "myFunction{}", correct: false },
      { text: "myFunction()", correct: true },
    ],
  },
  {
    question:
      "What keyword is used to stop a loop from continuing to the next iteration?",
    answers: [
      { text: "stop", correct: false },
      { text: "break", correct: true },
      { text: "continue", correct: false },
      { text: "return", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currrentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
