const words = [
  { hint: "A game played with an orange ball.", answer: "basketball" },
  { hint: "You hit a yellow ball with a raquet.", answer: "tennis" },
  { hint: "You hit a white ball with a bat.", answer: "baseball" },
  { hint: "You need googles and a swim cap.", answer: "swimming" },
  { hint: "You kick a black and white ball.", answer: "soccer" }
];

let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let userAnswers = [];


function checkGuess() {

  const userGuess = document.getElementById("guess").value.toLowerCase();
  const correctAnswer = words[currentIndex].answer;
  
  if (userGuess === correctAnswer) {
      correctCount++;  // Increase correct count
  } else {
      incorrectCount++; // Increase incorrect count
  }

  // Save the user's answer
  userAnswers.push({ question: words[currentIndex].hint, userGuess, correctAnswer });

  // Move to the next word or show results
  if (currentIndex < words.length - 1) {
      currentIndex++;
      updateGame();
  } else {
      showResults();
  }
  document.getElementById("guess").focus();
}

function updateGame() {
  document.getElementById("hint").textContent = "Hint: " + words[currentIndex].hint;
  document.getElementById("guess").value = "";
  // Update the counter (Current word index + 1 because it's zero-based)
  document.getElementById("counter").textContent = (currentIndex + 1);
}

function showResults() {
  document.getElementById("game-container").innerHTML = `
    <h2>Game Over!</h2>
    <p>You got <strong>${correctCount}</strong> correct and <strong>${incorrectCount}</strong> incorrect.</p>
    <h3>Your Answers:</h3>
    <ul>
      ${userAnswers.map(answer => `
        <li>
          <strong>Hint:</strong> ${answer.question} <br>
          <br/>
          <strong>Your Answer:</strong> ${answer.userGuess} 
          ${answer.userGuess === answer.correctAnswer ? "✅" : "❌ (Correct: " + answer.correctAnswer + ")"}
        </li>
        <br/>
        <br/>
        <br/>
      `).join("")}
    </ul>
    <button onclick="restartGame()">Play Again</button>
  `;
}

function restartGame() {
  currentIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  userAnswers = [];
  document.getElementById("game-container").innerHTML = `
    <p id="hint">Hint: ${words[currentIndex].hint}</p>
    <input type="text" id="guess">
    <button onclick="checkGuess()">Check</button>
  `;
  // Reset the counter to 1/5 when restarting
  document.getElementById("counter").textContent = "1";
}

document.addEventListener("DOMContentLoaded", updateGame);
