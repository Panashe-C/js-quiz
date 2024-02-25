// Function to print highscores
function printHighscores() {
  // Retrieve highscores from local storage or initialize as empty array if not present
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Sort highscores in descending order based on score
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  // Loop through each highscore and display it on the page
  highscores.forEach(function(score) {
    // Create list item for each highscore
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // Append the list item to the highscores list
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

// Function to clear highscores
function clearHighscores() {
  // Remove highscores from local storage
  window.localStorage.removeItem("highscores");
  
  // Reload the page to reflect the changes
  window.location.reload();
}

// Event listener for the clear highscores button
document.getElementById("clear").onclick = clearHighscores;

// Print highscores when the page loads
printHighscores();
