const gpu = new GPU();

gpu.addFunction(function step1(edge, value)
{
    if(value < edge)
        return 0;
    else 
        return 1;
});

gpu.addFunction(function smoothstep1(edge0, edge1, x)
{
        let val = (x - edge0) / (edge1 - edge0);
        let t = Math.min(Math.max(0, val), 1)
        return t * t * (3 - (2 * t));
});

gpu.addFunction(function plot1(st, pct)
{
    return smoothstep1( (pct-0.01), pct, st[1] ) - smoothstep1( pct, (pct+0.01), st[1] );
});

gpu.addFunction(function toPolarCoord1(x,y)
{
    return [
        Math.sqrt( Math.pow(x,2) + Math.pow(y,2) ),   // r
        fromRADtoDEG1(Math.atan2(y,x))       // angle
    ];
});

gpu.addFunction(function fromRADtoDEG1(radians)
{
    return radians * (180 / 3.141592653589793);
});

gpu.addFunction(function fromDEGtoRAD1(degrees)
{
    return degrees * (3.141592653589793 / 180); 
});

const render = gpu.createKernel(function(mousexx,mouseyy,sharpness,Rays,transparency,color) {
    let st = [
        this.thread.x/400,
        this.thread.y/400
    ];

    let pos = [
        0.5-st[0],
        0.5-st[1]
    ];

    let pol = toPolarCoord1(pos[0]+mousexx,pos[1]-mouseyy);

    let r = pol[0];
    let a = fromDEGtoRAD1(pol[1]);

    let f = smoothstep1(-0.5,sharpness,Math.cos(a*Rays)) * transparency + 0.5;

    let dd = Math.pow(f,r);

    this.color(color-dd,dd+color,dd,1);

}).setOutput([400,400]).setGraphical(true);

function setup()
{
    createCanvas(400,400);
}

let sharpness = 0.5;
let color = 0.8;
let Rays = 20;
let transparency = 0.2 ;

function test()
{
    Rays = document.getElementById('Rays').value;
    sharpness = document.getElementById('sharpness').value;
    color = document.getElementById('color').value;
    transparency = document.getElementById('transparency').value;
}

function draw()
{
    let mousexx = map(mouseX,0,400,-0.5,0.5);
    let mouseyy = map(mouseY,0,400,-0.5,0.5);

    loadPixels();

    render(
        mousexx,
        mouseyy,
        sharpness,
        Rays,
        transparency,
        color
    );

    pixels.set(render.getPixels(),0);
    updatePixels();
}