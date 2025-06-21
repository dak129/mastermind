
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

const generatePuzzle = (numOfFigures, numOfColors) => {
    arr = [];
    for (let i = 0; i < numOfFigures; i++) {
        curColor = Circle.bcolors[Math.floor(Math.random() * numOfColors)];
        arr.push(curColor);
    } 
    return arr;
};

const notateNumber = (num) => {
    return (num % 10 >= 2 & num % 10 <= 4 && (num < 10 || num > 20)) ? 
    num.toString() + ' раза' : num.toString() + ' раз';
}

const checkPlaces = () => {
    let countPlaces = 0;
    for (let i = 0; i < numOfCircles; i++) {
        if (circles[i].bcolor == puzzle[i]) {
            countPlaces++;
        };
    } 
    return countPlaces.toString();
}

const guessSolution = () => {
    count++;
    counter.value = notateNumber(count);
    places = checkPlaces();
    answer.innerText = "Загадано " + puzzle.join(' ')
                    + " угадано " + places + " кругов";
}

const circleContainer = document.getElementById("circle-container");
const btn = document.getElementById("guesser");
const counter = document.getElementById("counter");
const answer = document.getElementById("answer");
const figures = [document.getElementById("circle0"),
                 document.getElementById("circle1"),
                 document.getElementById("circle2"),
                 document.getElementById("circle3")];

const numOfCircles = 4;
const numOfColors = Circle.bcolors.length;
let count = 0;

let circles = [];
for (let i = 0; i < numOfCircles; i++) {
    circles.push(new Circle(i));
}

const puzzle = generatePuzzle(numOfCircles, numOfColors);

drawFigures();

figures[0].addEventListener("click", changeFigure);
figures[1].addEventListener("click", changeFigure);
figures[2].addEventListener("click", changeFigure);
figures[3].addEventListener("click", changeFigure);

btn.addEventListener("click", guessSolution);