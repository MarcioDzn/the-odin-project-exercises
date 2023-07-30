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
const finalResultModal = document.querySelector('.final-result-modal');
const restartBtn = document.querySelector('#restart-btn');
const overlay = document.querySelector('.overlay');

choicesBtn.forEach(choice => {
    choice.addEventListener('click', game);
})

restartBtn.addEventListener('click', restartGame);

function restartGame(){
    playerScore = 0;
    computerScore = 0;
    finalResultModal.classList.remove('active');
    overlay.classList.remove('active');

    playerScoreBox.textContent = playerScore;
    computerScoreBox.textContent = computerScore;

    playerMoveDiv.textContent = '--------';
    computerMoveDiv.textContent = '--------';
    matchResult.textContent = '--------';
}

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

function displayRestartModal(){
    if (playerScore == 5 || computerScore == 5){
        setWinnerBox(true);
        gameWinnerBox.textContent = `========= ${checkFinalWinner(playerScore, computerScore)} =========`;
        finalResultModal.classList.add('active');
        overlay.classList.add('active');
    }
}

function displayGameInfos(playerSelection, computerSelection){
    matchResult.textContent = '--------';
    playerMoveDiv.innerHTML = `<img class="${playerSelection}-img" src="media/${playerSelection}.png" alt="${playerSelection}-image">`;
    computerMoveDiv.innerHTML = `<img class="${computerSelection}-img" src="media/${computerSelection}.png" alt="${computerSelection}-image">`;

    setTimeout(() => {
        playerMoveDiv.querySelector('img').style.opacity = 1;
        playerMoveDiv.addEventListener('transitionend', () => {
            computerMoveDiv.querySelector('img').style.opacity = 1

            computerMoveDiv.addEventListener('transitionend', () => {
                matchResult.textContent = playRound(playerSelection, computerSelection);
                playerScoreBox.textContent = playerScore;
                computerScoreBox.textContent = computerScore;

                choicesBtn.forEach(choice => {
                    choice.disabled = false;
                    choice.setAttribute('style', 'pointer-events: all;')
                });

                displayRestartModal();
            })
        });
    }, 300);
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

    choicesBtn.forEach(choice => {
        choice.disabled = false;
        choice.setAttribute('style', 'pointer-events: none;')
    });

    displayGameInfos(playerSelection, computerSelection);
}


