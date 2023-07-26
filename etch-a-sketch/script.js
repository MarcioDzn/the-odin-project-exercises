const canvas = document.querySelector('.canvas');
const btnDimensions = document.querySelector('.btn-dimensions');
const canvasDimensionsValue = document.querySelector('.canvas-dimensions-value');

const GRAY = `rgb(127.5, 127.5, 127.5)`;
const BLACK = `rgb(0, 0, 0)`;

let gridSize = 16; // Npx x Npx
let squareSize = 100 / gridSize;

let isPainting = false;

let squareArray = [];
// SetTimeout to avoid html block rendering while prompt is active
setTimeout(() => {
    changeCanvasDimensions();
}, 20);
btnDimensions.addEventListener('click', changeCanvasDimensions);

function createSquareDivs(){
    canvas.innerHTML = '';
    squareArray.length = 0;
    for (let i = 0; i < gridSize*gridSize; i++){
        const square = document.createElement('div');
        square.style.width = `${squareSize}%`;
        square.style.height = `${squareSize}%`;
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

function changeCanvasDimensions() {
    let dimension = prompt("Please enter canvas dimensions:\n(16 < n < 64)");

    while (dimension !== null && (isNaN(dimension) || dimension < 16 || dimension > 64 || dimension.trim() === '')) {
        if (dimension === null) break; // The user clicked Cancel, the loop stops 
        dimension = prompt("Enter valid dimensions!\n(16 < n < 64)");
    }

    if (dimension !== null) {
        gridSize = parseInt(dimension);
        squareSize = 100 / gridSize;
    }

    createSquareDivs();
    
    squareArray = canvas.querySelectorAll('.square');
    squareArray.forEach(paintSquare);
    canvasDimensionsValue.textContent = `Canvas Dimensions: ${gridSize}x${gridSize}.`
}
