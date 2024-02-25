// Variables to keep track of quiz state
var currentQuestionIndex = 0; // Index of the current question being displayed
var time = questions.length * 10; // Initial time for the quiz based on the number of questions

var timerId; // Holds the ID of the interval timer used for updating time

// DOM elements
var questionsEl = document.getElementById("questions"); // Reference to the questions section
var timerEl = document.getElementById("time"); // Reference to the timer element
var selectionEl = document.getElementById("choices"); // Reference to the answer choices element
var submitBtn = document.getElementById("submit"); // Reference to the submit button
var startBtn = document.getElementById("start"); // Reference to the start button
var initialsEl = document.getElementById("initials"); // Reference to the initials input element
var feedbackEl = document.getElementById("feedback"); // Reference to the feedback element

// Function to start the quiz
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen"); // Reference to the start screen
  startScreenEl.classList.add("hide"); // Hide the start screen
  
  questionsEl.classList.remove("hide"); // Show the questions section
  
  // Start the quiz timer
  timerId = setInterval(clockTick, 1000);
  
  timerEl.textContent = time; // Display starting time
  
  getQuestion(); // Display the first question
}

// Function to display the current question
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex]; // Get the current question object
  
  // Display the title of the current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  
  // Clear previous answer choices
  selectionEl.innerHTML = "";
  
  // Loop through choices and create buttons for each choice
  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick; // Attach click event listener
    selectionEl.appendChild(choiceNode); // Display the choice on the page
  });
}

// Function to handle when a choice is clicked
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10; // Decrease time penalty for wrong answer
    if (time < 0) time = 0; // Ensure time doesn't go negative
    timerEl.textContent = time; // Display updated time
    feedbackEl.textContent = "You'll get it next time!"; // Display feedback for wrong answer
  } else {
    feedbackEl.textContent = "Correct!"; // Display feedback for correct answer
  }

  feedbackEl.setAttribute("class", "feedback"); // Show feedback
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide"); // Hide feedback after a delay
  }, 1000);

  currentQuestionIndex++; // Move to the next question
  
  // Check if reached the end of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd(); // End the quiz
  } else {
    getQuestion(); // Display the next question
  }
}

// Function to end the quiz
function quizEnd() {
  clearInterval(timerId); // Stop the timer
  var endScreenEl = document.getElementById("end-screen"); // Reference to the end screen
  endScreenEl.classList.remove("hide"); // Show the end screen
  document.getElementById("final-score").textContent = time; // Display final score
  questionsEl.classList.add("hide"); // Hide the questions section
}

// Function to update the timer
function clockTick() {
  time--; // Decrement time
  timerEl.textContent = time; // Display updated time
  if (time <= 0) {
    quizEnd(); // End quiz if time runs out
  }
}

// Function to save highscore
function saveHighscore() {
  var initials = initialsEl.value.trim(); // Get user initials
  
  if (initials !== "") {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || []; // Retrieve highscores from local storage or initialize empty array
    var newScore = { score: time, initials: initials }; // Create new highscore entry
    highscores.push(newScore); // Add new highscore entry
    localStorage.setItem("highscores", JSON.stringify(highscores)); // Save highscores to local storage
    window.location.href = "highscores.html"; // Redirect to highscores page
  }
}

// Event listeners
submitBtn.onclick = saveHighscore; // Submit button click event
startBtn.onclick = startQuiz; // Start button click event
initialsEl.onkeyup = function(event) {
  if (event.key === "Enter") saveHighscore(); // Trigger saveHighscore function on enter key press
};
