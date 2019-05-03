TWEEN.autoPlay(true);

let coords = { x: 0, y: 0};

let tween;

let XX = 0;
let YY = 0;
let color = {
    r: 255,
    g: 255,
    b: 255
};

function setup()
{
    createCanvas(300,300);
    background(0);
    test(width,height);
    noLoop();
}

function test(xx, yy)
{
    tween = new TWEEN.Tween(coords)
    .to({ x: xx, y: yy }, 2000)
    .on("update", ({x,y}) => {
        XX = x;
        YY = y;

        color.r = Math.floor(map(x,0,width,0,255));
        color.g = Math.floor(map(x,0,width,255,0));

        redraw();

        if(x == 300)
        {
            coords = { x: width, y: height};
            test(0, 0);
        }

        if(x == 0)
        {
            coords = { x: 0, y: 0};
            test(width,height);
        }
    })
    .start();
}
 
function draw()
{
    background(0);
    fill(color.r,color.g,color.b);
    circle(Math.round(XX),Math.round(YY),5);
} 