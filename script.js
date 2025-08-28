//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
// Load saved answers from sessionStorage or initialize empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Load saved score from localStorage and display if it exists
const savedScore = localStorage.getItem("score");
if (savedScore) {
  document.getElementById("score").innerText = `Your score is ${savedScore} out of 5.`;
}

function renderQuestions() {
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = ""; // Clear existing content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br"));

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore saved answer
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", "checked");
      }

      // Save selection to sessionStorage
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(" " + choice));
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsDiv.appendChild(questionElement);
  }
}

// Handle submit button click
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
      score++;
    }
  }
  // Display score
  document.getElementById("score").innerText = `Your score is ${score} out of 5.`;
  // Save score to localStorage
  localStorage.setItem("score", score);
});

// Render questions on page load
renderQuestions();