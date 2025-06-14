
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


const circleContainer = document.getElementById("circle-container");

let circles = [];
for (let i = 0; i < 4; i++) {
    circles.push(new Circle(i));
}

const figures = [document.getElementById("circle0"),
                 document.getElementById("circle1"),
                 document.getElementById("circle2"),
                 document.getElementById("circle3")];
drawFigures();

figures[0].addEventListener("click", changeFigure);
figures[1].addEventListener("click", changeFigure);
figures[2].addEventListener("click", changeFigure);
figures[3].addEventListener("click", changeFigure);