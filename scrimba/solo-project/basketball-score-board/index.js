// Team 1
const team1Score = document.getElementById('score1');
const team1Btn1 = document.getElementById('home-btn1');
const team1Btn2 = document.getElementById('home-btn2');
const team1Btn3 = document.getElementById('home-btn3');

// Team 2
const team2Score = document.getElementById('score2');
const team2Btn1 = document.getElementById('away-btn1');
const team2Btn2 = document.getElementById('away-btn2');
const team2Btn3 = document.getElementById('away-btn3'); 

// Function to update the score
function updateScore(team, points) {
  const currentScore = parseInt(team.textContent);
  team.textContent = currentScore + points;
}

// Event listeners for Team 1 buttons
team1Btn1.addEventListener('click', () => updateScore(team1Score, 1));
team1Btn2.addEventListener('click', () => updateScore(team1Score, 2));
team1Btn3.addEventListener('click', () => updateScore(team1Score, 3));

// Event listeners for Team 2 buttons
team2Btn1.addEventListener('click', () => updateScore(team2Score, 1));
team2Btn2.addEventListener('click', () => updateScore(team2Score, 2));
team2Btn3.addEventListener('click', () => updateScore(team2Score, 3));