const canvas = document.querySelector('.container');

const GRID_SIZE = 16; // Npx x Npx
const SQUARE_SIZE = 100 / GRID_SIZE;

createSquareDivs();

function createSquareDivs(){
    for (let i = 0; i < GRID_SIZE*GRID_SIZE; i++){
        const square = document.createElement('div');
        square.style.width = `${SQUARE_SIZE}%`;
        square.style.height = `${SQUARE_SIZE}%`;
        square.setAttribute('class', 'square');

        canvas.appendChild(square);
    }
}