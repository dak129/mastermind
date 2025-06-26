
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

const generatePuzzle = (/*numOfFigures, */numOfColors) => {
    let arr = [];
    for (let i = 0; i < circles.length; i++) {
        let colorIndex = Math.floor(Math.random() * numOfColors);
        arr.push(colorIndex);
    } 
    return arr; 
};

const getCurrentColors = (/*numOfFigures */) => {
    let arr = [];
    for (let i = 0; i < circles.length; i++) {
        arr.push(Circle.bcolors.indexOf(circles[i].bcolor));
    }
    return arr;
}

/*
const checkMatches = (curGuess) => {
    countExact = 0;
    for (let i = 0; i < circles.length; i++) { };
}  
*/

const guess = () => {
    countGuesses++;
    counter.value = "Попытка " + countGuesses.toString();
    const curGuess = getCurrentColors(/*numOfCircles */);
    answer.innerText =  curGuess.join(' ') + ' vs ' + puzzle.join(' ');
}

const circleContainer = document.getElementById("circle-container");
const btn = document.getElementById("guesser");
const counter = document.getElementById("counter");
const answer = document.getElementById("answer");

/*const numOfCircles = 4; */
const circles = [new Circle(0), new Circle(1),
                 new Circle(2), new Circle(3)];

const numOfColors = Circle.bcolors.length;
const puzzle = generatePuzzle(/* numOfCircles, */numOfColors);

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