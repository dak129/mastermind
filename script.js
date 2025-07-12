
class Circle {
    static bcolors = ["red", "blue", "green", "yellow", "orange", "magenta", "aqua"];

    constructor(id, colorsLength) {
        this.id = id;
        this.bcolor = Circle.bcolors[Math.floor(Math.random() * colorsLength)];
    }

    changeBcolor(colorsLength) {
        let i = Circle.bcolors.indexOf(this.bcolor);
        i++;
        if (i === colorsLength) {
            i = 0;
        } 
        this.bcolor = Circle.bcolors[i];
        return this.bcolor;
    }
}

const drawFigures = () => {
    for (let i = 0; i < numOfCircles; i++) {
        figures[i].style.backgroundColor = circles[i].bcolor;
        figures[i].style.display = "block";
    }
};

const changeFigure = (event) => {
    const curId = event.currentTarget.id;
    const index = parseInt(curId.slice(-1));
    figures[index].style.backgroundColor = circles[index].changeBcolor(numOfColors);
}

const generatePuzzle = (colorsLength) => {
    const arr = [];
    for (let i = 0; i < numOfCircles; i++) {
        let colorIndex = Math.floor(Math.random() * colorsLength);
        arr.push(colorIndex);
    } 
    return arr; 
};

const getCurrentColors = () => {
    const arr = [];
    for (let i = 0; i < numOfCircles; i++) {
        arr.push(Circle.bcolors.indexOf(circles[i].bcolor));
    }
    return arr;
}

const checkMatches = (curGuess) => {
    countExact = 0;
    for (let i = 0; i < numOfCircles; i++) { 
        if (curGuess[i] == puzzle[i]) {
            countExact++;
        }
    }
    return countExact;
} 

const countUnmatched = (curGuess) => {
    const curUnmatched = [];
    const puzzleUnmatched = [];
    for (let i = 0; i < numOfCircles; i++) { 
        if (curGuess[i] != puzzle[i]) {
            curUnmatched.push(curGuess[i]);
            puzzleUnmatched.push(puzzle[i]);
        }
    }
    let count = 0;
    for (let i = 0; i < puzzleUnmatched.length; i++) {
        if (curUnmatched.includes(puzzleUnmatched[i])) {
            count++;
        }
    }
    return count;
} 

const messageOtherPlaces = (number) => {
    if (number < 2) {
        return " на другом месте";
    }
    return " на других местах";
}

const restart = () => {
    puzzle = generatePuzzle(numOfColors);
    for (let i = 0; i < numOfCircles; i++) {
        circles[i] = new Circle(i, numOfColors);
    }
    countGuesses = 0;
    counter.value = "0 попыток";
    answer.innerText = "Результат не определен...";
}

const guess = () => {
    countGuesses++;
    counter.value = "Попытка " + countGuesses.toString();
    const myGuess = getCurrentColors();
    const exactMatches = checkMatches(myGuess);
    const unmatched = countUnmatched(myGuess);
    answer.innerText =  exactMatches.toString() + ' точно, ' 
                        + unmatched.toString() + messageOtherPlaces(unmatched); 
    if (exactMatches == puzzle.length) {
        alert('ПОБЕДА!');
        restart();
    }
}

const changeColorSet = (event) => {
    numOfColors = parseInt(event.currentTarget.value);
    restart();
}

const circleContainer = document.getElementById("circle-container");
const btn = document.getElementById("guesser");
const counter = document.getElementById("counter");
const answer = document.getElementById("answer");
const restarter = document.getElementById("restarter");
const colors = document.getElementById("colors");

const numOfCircles = 4;
let numOfColors = 3;
let puzzle = generatePuzzle(numOfColors);

const circles = [new Circle(0, numOfColors), new Circle(1, numOfColors),
                 new Circle(2, numOfColors), new Circle(3, numOfColors)];

const figures = [document.getElementById("circle0"),
                 document.getElementById("circle1"),
                 document.getElementById("circle2"),
                 document.getElementById("circle3")];
drawFigures();
figures[0].addEventListener("click", changeFigure);
figures[1].addEventListener("click", changeFigure);
figures[2].addEventListener("click", changeFigure);
figures[3].addEventListener("click", changeFigure);

let countGuesses = 0;

btn.addEventListener("click", guess);
restarter.addEventListener("click", restart);
colors.addEventListener("change", changeColorSet);