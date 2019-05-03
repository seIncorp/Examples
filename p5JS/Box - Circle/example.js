let XX = 100;
let YY = 100;
let r = 10;
let color = {
    r: 255,
    g: 0,
    b: 0
};

function setup()
{
    createCanvas(300,300);
    background(0);
}

let direction = false;
let isCircle = false;

function draw()
{
    background(0);

    r = direction ? r+1 : r-1;

    if(r == 0)
    {
        isCircle =  isCircle ? false : true;
        direction = !direction;
    }
    if(r == 10)
        direction = !direction;

    if(!isCircle)
    {
        fill(0,255,0);
        square(Math.round(XX),Math.round(YY),r);
    }
    else
    {
        fill(color.r,color.g,color.b);
        circle(Math.round(XX),Math.round(YY),r);
    }
}