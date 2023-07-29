const gameChoices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;

const choicesBtn = document.querySelectorAll('.player-choice');
const matchResult = document.querySelector('.match-result');
const playerMoveDiv = document.querySelector('.player-move');
const computerMoveDiv = document.querySelector('.computer-move');
const playerScoreBox = document.querySelector('.player-score span');
const computerScoreBox = document.querySelector('.computer-score span');
const gameWinnerBox = document.querySelector('.game-winner');

choicesBtn.forEach(choice => {
    choice.addEventListener('click', game);
})

function getComputerChoice(){
    return gameChoices[Math.floor(Math.random() * gameChoices.length)];
}

function checkFinalWinner(playerScore, computerScore){
    if (playerScore > computerScore) return 'Player Wins!';
    else if (playerScore < computerScore) return 'Computer Wins!';
}

function checkRoundWinner(playerSelection, computerSelection){
    const beats = {'paper': 'rock', 'rock': 'scissors', 'scissors': 'paper'};

    if (playerSelection === computerSelection){
        return 0;

    } else if (beats[playerSelection] == computerSelection){
        return 1;
    }

    return -1;
}

function playRound(playerSelection, computerSelection){
    const roundWinner = checkRoundWinner(playerSelection, computerSelection);

    if (roundWinner === 0){
        return `Draw! '${playerSelection}' matches '${computerSelection}'.`;

    } else if (roundWinner === 1){
        return `You Win! '${playerSelection}' beats '${computerSelection}'.`;
    }

    return `You Lose! '${playerSelection}' loses to '${computerSelection}'.`;
}

function setWinnerBox(active){
    if (active) gameWinnerBox.style.visibility = 'visible';
    else gameWinnerBox.style.visibility = 'hidden';
}

function game(e){
    let playerSelection = '';
    if (e.target.id == 'rock-btn') playerSelection = 'rock';
    else if (e.target.id == 'paper-btn') playerSelection = 'paper';
    else if (e.target.id == 'scissors-btn') playerSelection = 'scissors';

    setWinnerBox(false);
    const computerSelection = getComputerChoice();

    const roundWinner = checkRoundWinner(playerSelection, computerSelection);
    if (roundWinner == 1) playerScore++;
    else if (roundWinner == -1) computerScore++;

    playerMoveDiv.textContent = playerSelection;
    computerMoveDiv.textContent = computerSelection;

    matchResult.textContent = playRound(playerSelection, computerSelection);
    playerScoreBox.textContent = playerScore;
    computerScoreBox.textContent = computerScore;
    
    if (playerScore == 5 || computerScore == 5){
        setWinnerBox(true);
        gameWinnerBox.textContent = `========= ${checkFinalWinner(playerScore, computerScore)} =========`;
        playerScore = 0;
        computerScore = 0;
    }
}


