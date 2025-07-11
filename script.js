const quizData = [
  {
    type: "single",
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    type: "multiple",
    question: "Which of these are JavaScript frameworks?",
    options: ["React", "Laravel", "Vue", "Django"],
    answer: ["React", "Vue"]
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.classList.add("option");

    const input = document.createElement("input");
    input.type = q.type === "multiple" ? "checkbox" : "radio";
    input.name = "option";
    input.value = opt;
    input.id = `opt${index}`;

    const label = document.createElement("label");
    label.htmlFor = `opt${index}`;
    label.textContent = opt;

    div.appendChild(input);
    div.appendChild(label);
    optionsEl.appendChild(div);
  });
}

function getSelectedAnswers() {
  const selected = [];
  const inputs = document.querySelectorAll("input[name='option']");
  inputs.forEach((input) => {
    if (input.checked) {
      selected.push(input.value);
    }
  });
  return selected;
}

submitBtn.addEventListener("click", () => {
  const q = quizData[currentQuestion];
  const selected = getSelectedAnswers();

  if (selected.length === 0) {
    alert("Please select an answer!");
    return;
  }

  if (q.type === "single") {
    if (selected[0] === q.answer) score++;
  } else if (q.type === "multiple") {
    if (
      selected.length === q.answer.length &&
      selected.every((val) => q.answer.includes(val))
    ) {
      score++;
    }
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  resultEl.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

loadQuestion();