TWEEN.autoPlay(true);

let tween;

let XX = 100;
let YY = 100;

let radius = {
    min: 0,
    max: 100
};

let r = radius.max;

let coords = { x: radius.max};

let color = {
    r: 0,
    g: 0,
    b: 0
};

let direction = false;
let isCircle = false;

function setup()
{
    createCanvas(300,300);
    background(0);

    XX = width/2;
    YY = height/2;

    test(radius.min);
    noLoop();
}

function test(number)
{
    tween = new TWEEN.Tween(coords)
    .to({ x: number }, 2000)
    .on("update", ({x}) => {
        r = x;

        color.r = Math.floor(map(x,0,radius.max,0,255));
        color.g = Math.floor(map(x,0,radius.max,255,0));
        

        redraw();

        if(x == 0)
        {
            isCircle =  !isCircle;
            direction = !direction;
            coords = { x: radius.min };
            test(100);
        }

        if(x == 100)
        {
            coords = { x: radius.max };
            test(0);
        }
    })
    .start();
}

function draw()
{
    background(0);

    fill(color.r,color.g,color.b);

    if(!isCircle)
    {
        rectMode(CENTER);
        square(Math.round(XX),Math.round(YY),r);
    }
    else
        circle(Math.round(XX),Math.round(YY),r);
}