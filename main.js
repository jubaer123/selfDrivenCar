const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);//0.9 brings the road line more inwards
const N=1000;
const cars= generateCars(N)
let bestCar = cars[0];

if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}
const traffic=[
        new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
        new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
        new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
        new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2)
    ];

animate();

function save(){
    localStorage.setItem("bestBrain",
            JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar = cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));
    //c=>c.y makes new array of only y values
    //...cars.map separates each of the vallues becasue Math.min works with values not arrays

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    
    carCtx.save();// to make it look like the car is being followedby an overhead camera(road moving backwards)
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.8);

    road.draw(carCtx)
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.01;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}

1//to refer to the document myCanvas on style.css
3//prev 3 lines was for shaping the background
6//x,y,width,height in pixels
11//update where car is before animating it
15//calls animate again and again, giving illusion of animationwith movement