const gameChoices = ['rock', 'paper', 'scissors'];

function getComputerChoice(){
    return gameChoices[Math.floor(Math.random() * gameChoices.length)];
}

function formatString(string){
    return string.trim().toLowerCase();
}

function playRound(playerSelection, computerSelection){
    const beats = {'paper': 'rock', 'rock': 'scissors', 'scissors': 'paper'};

    const playerChoice = formatString(playerSelection);
    const computerChoice = computerSelection;

    if (playerChoice === computerChoice){
        return `Draw! '${playerChoice}' matches '${computerChoice}'.`;

    } else if (beats[playerChoice] == computerChoice){
        return `You Win! '${playerChoice}' beats '${computerChoice}'.`;
    }

    return `You Lose! '${playerChoice}' loses to '${computerChoice}'.`;
}

const playerSelection = '  paPer   ';
const computerSelection = getComputerChoice();

console.log(playRound(playerSelection, computerSelection));

