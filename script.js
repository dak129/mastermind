
class Circle {
    static bcolors = ["red", "blue", "green"];

    constructor(id) {
        this.id = id;
        this.bcolor = Circle.bcolors[Math.floor(Math.random() * Circle.bcolors.length)];
    }

    changeBcolor() {
        let i = Circle.bcolors.indexOf(this.bcolor);
        i++;
        if (i === Circle.bcolors.length) {
            i = 0;
        } 
        this.bcolor = Circle.bcolors[i];
        return this.bcolor;
    }
}

const drawFigures = () => {
    for (let i = 0; i < circles.length; i++) {
        figures[i].style.backgroundColor = circles[i].bcolor;
        figures[i].style.display = "block";
    }
};

const changeFigure = (event) => {
    const curId = event.currentTarget.id;
    const index = parseInt(curId.slice(-1));
    figures[index].style.backgroundColor = circles[index].changeBcolor();
}

const generatePuzzle = () => {
    const arr = [];
    for (let i = 0; i < circles.length; i++) {
        let colorIndex = Math.floor(Math.random() * numOfColors);
        arr.push(colorIndex);
    } 
    return arr; 
};

const getCurrentColors = () => {
    const arr = [];
    for (let i = 0; i < circles.length; i++) {
        arr.push(Circle.bcolors.indexOf(circles[i].bcolor));
    }
    return arr;
}

const checkMatches = (curGuess) => {
    countExact = 0;
    for (let i = 0; i < circles.length; i++) { 
        if (curGuess[i] == puzzle[i]) {
            countExact++;
        }
    }
    return countExact;
} 

const countUnmatched = (curGuess) => {
    const curUnmatched = [];
    const puzzleUnmatched = [];
    for (let i = 0; i < circles.length; i++) { 
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

const getColorOccurrences = (curGuess) => {
    const colorOccurrences = new Array(numOfColors).fill(0);
    for (let i = 0; i < circles.length; i++) {
        colorOccurrences[curGuess[i]]++;
    }
    return colorOccurrences;
}

const guess = () => {
    countGuesses++;
    counter.value = "Попытка " + countGuesses.toString();
    const myGuess = getCurrentColors();
    const exactMatches = checkMatches(myGuess);
    /* const myOccurences = getColorOccurrences(myGuess);
    const puzzleOccurences = getColorOccurrences(puzzle); */
    const unmatched = countUnmatched(myGuess);
    answer.innerText =  myGuess.join(' ') + ' vs ' 
                        + puzzle.join(' ') + ' exact ' 
                        + exactMatches.toString() + ' displaced ' 
                        + unmatched.toString(); 
                        /* + ' ocs '  + myOccurences.join(' ') 
                        + ' true ocs' + puzzleOccurences.join(' ') */
}

const circleContainer = document.getElementById("circle-container");
const btn = document.getElementById("guesser");
const counter = document.getElementById("counter");
const answer = document.getElementById("answer");

const circles = [new Circle(0), new Circle(1),
                 new Circle(2), new Circle(3)];

const numOfColors = Circle.bcolors.length;
const puzzle = generatePuzzle();

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