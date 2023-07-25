const canvas = document.querySelector('.container');

const GRAY = `rgb(127.5, 127.5, 127.5)`;
const BLACK = `rgb(0, 0, 0)`;

const GRID_SIZE = 16; // Npx x Npx
const SQUARE_SIZE = 100 / GRID_SIZE;

let isPainting = false;

createSquareDivs();

const squareArray = canvas.querySelectorAll('.square');
squareArray.forEach(paintSquare);

function createSquareDivs(){
    for (let i = 0; i < GRID_SIZE*GRID_SIZE; i++){
        const square = document.createElement('div');
        square.style.width = `${SQUARE_SIZE}%`;
        square.style.height = `${SQUARE_SIZE}%`;
        square.setAttribute('class', 'square');

        canvas.appendChild(square);
    }
}

function paintSquare(square){
    // Prevents continuing to paint even after removing the mouse from the canvas and returning
    window.addEventListener('mousemove', (e) => {
        if (e.target.parentElement != canvas) isPainting = false;
    })

    square.addEventListener('dragstart', (e) => {e.preventDefault();}); // Prevents drag and drop action

    square.addEventListener('mousedown', (e) => {
        isPainting = true;
        paintSquareGray(e);
    });

    square.addEventListener('mouseup', (e) => {
        paintSquareBlack(e)
        isPainting = false;
    });

    square.addEventListener('mouseenter', paintSquareGray);
    square.addEventListener('mouseleave', paintSquareBlack);
}

function paintSquareGray(e){
    if (!isPainting || getComputedStyle(e.target).backgroundColor == BLACK) return;
    e.target.style.backgroundColor = GRAY;

}

function paintSquareBlack(e){
    if (!isPainting) return;
    e.target.style.backgroundColor = BLACK;

}
