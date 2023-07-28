const gameChoices = ['rock', 'paper', 'scissors'];
let roundsAmount = 5;

function getComputerChoice(){
    return gameChoices[Math.floor(Math.random() * gameChoices.length)];
}

function formatString(string){
    if (string !== null)
        return string.trim().toLowerCase();
}

function getPlayerChoice(){
    let playerChoice = formatString(prompt('Make your move! [Rock, Paper, Scissors]'));
    while (!gameChoices.includes(playerChoice) || playerChoice === null){
        playerChoice = formatString(prompt('Invalid move!\nMake your move! [Rock, Paper, Scissors]'));
    }

    return playerChoice;
}

function checkFinalWinner(playerScore, computerScore){
    if (playerScore > computerScore) return 'Player Wins!';
    else if (playerScore < computerScore) return 'Computer Wins!';
    return 'Draw!';
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

function game(){
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < roundsAmount; i++){
        const playerSelection = getPlayerChoice();
        const computerSelection = getComputerChoice();

        const roundWinner = checkRoundWinner(playerSelection, computerSelection);
        if (roundWinner == 1) playerScore++;
        else if (roundWinner == -1) computerScore++;

        console.log(`\nRound ${i+1}`);
        console.log(playRound(playerSelection, computerSelection));
        console.log(`Player Score: ${playerScore} | Computer score: ${computerScore}`);
    }

    console.log(`========= ${checkFinalWinner(playerScore, computerScore)} =========`);
}

// game();

