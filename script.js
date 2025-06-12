
class Circle {
    static bcolors = ["red", "blue", "green"];
    constructor(id) {
        this.id = id;
        this.bcolor = Circle.bcolors[Math.floor(Math.random() * Circle.bcolors.length)];
    }
}

const circleContainer = document.getElementById("circle-container");
const colorPicker = document.getElementById("color-picker");

const logColor = () => {
    console.log(new Circle(0));
}

colorPicker.addEventListener("click", logColor);