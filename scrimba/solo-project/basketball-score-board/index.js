

const btnNewGame = document.getElementById('new-game-btn');
// Team 1
const team1 = document.getElementById('team1');
const team1Score = document.getElementById('score1');
const team1Btn1 = document.getElementById('home-btn1');
const team1Btn2 = document.getElementById('home-btn2');
const team1Btn3 = document.getElementById('home-btn3');

// Team 2
const team2 = document.getElementById('team2');
const team2Score = document.getElementById('score2');
const team2Btn1 = document.getElementById('away-btn1');
const team2Btn2 = document.getElementById('away-btn2');
const team2Btn3 = document.getElementById('away-btn3'); 

// Function to update the score
function updateScore(team, points) {
  const currentScore = parseInt(team.textContent);
  team.textContent = currentScore + points;
  updateLeader() 
}
// Function to reset the scores
function resetScores() {
    team1Score.textContent = '0';   
    team2Score.textContent = '0';
    updateLeader()
}

// Event listeners for Team 1 buttons
team1Btn1.addEventListener('click', () => updateScore(team1Score, 1));
team1Btn2.addEventListener('click', () => updateScore(team1Score, 2));
team1Btn3.addEventListener('click', () => updateScore(team1Score, 3));

// Event listeners for Team 2 buttons
team2Btn1.addEventListener('click', () => updateScore(team2Score, 1));
team2Btn2.addEventListener('click', () => updateScore(team2Score, 2));
team2Btn3.addEventListener('click', () => updateScore(team2Score, 3));

// Event listener for New Game button
btnNewGame.addEventListener(("click"), () => {
    resetScores();
});

function updateLeader() {
    const score1 = parseInt(team1Score.textContent);
    const score2 = parseInt(team2Score.textContent);

    team1.classList.remove('leader');
    team2.classList.remove('leader');

    if (score1 > score2) {
        team1.classList.add('leader');
    } else if (score2 > score1) {
        team2.classList.add('leader');
    }
}


document.addEventListener('DOMContentLoaded', updateLeader);
