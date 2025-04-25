let currentLevel = "easy";
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  currentLevel = "easy";
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  startTimer();

  const levelQuestions = questions[currentLevel];
  if (currentQuestion >= levelQuestions.length) {
    moveToNextLevel();
    return;
  }

  const q = levelQuestions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });

  scoreEl.textContent = `Score: ${score}`;
}

function checkAnswer(selected) {
  const correct = questions[currentLevel][currentQuestion].answer;
  if (selected === correct) {
    score++;
  }
  currentQuestion++;
  loadQuestion();
}

function startTimer() {
  timerEl.textContent = `Time: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestion++;
      loadQuestion();
    }
  }, 1000);
}

function moveToNextLevel() {
  if (currentLevel === "easy") {
    currentLevel = "medium";
  } else if (currentLevel === "medium") {
    currentLevel = "hard";
  } else {
    showResult();
    return;
  }
  currentQuestion = 0;
  loadQuestion();
}

function showResult() {
  questionEl.textContent = "Quiz Over!";
  optionsEl.innerHTML = `<h3>Your Score: ${score}</h3>`;
  timerEl.textContent = "";
  nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  loadQuestion();
});

startQuiz();
