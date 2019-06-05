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
        Math.atan2(y,x)      // angle in radians
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

const render = gpu.createKernel(function(mousexx,mouseyy,u_resolution,corners,moving,color1,color2) {
    let st = [
        this.thread.x/400,
        this.thread.y/400
    ];
    st[0] = st[0] * (u_resolution[0]/u_resolution[1]);

    let d = 0;
    if(moving == 1)
    {
        st[0] = (st[0] - mousexx) * 2 - 1;
        st[1] = (st[1] + mouseyy) * 2 - 1;
    }
    else
    {
        st[0] = (st[0]) * 2 - 1;
        st[1] = (st[1]) * 2 - 1;
    }

    let N = 3;

    let pol = toPolarCoord1(st[0],st[1]);

    let a = pol[1] + (3.141592653589793/2);
    let r = 6.28318530718/corners;

    // size of object
    let size = pol[0]*2;

    d = Math.cos( Math.floor(0.5 + a/r) * r - a) * size;

    let cc = 1-smoothstep1(0.4,0.41,d)

    let temp1 = [
        (1-d)* (1-cc)*color1[0],
        (1-d)* (1-cc)*color1[1],
        (1-d)* (1-cc)*color1[2]
    ];

    let st1 = [
        this.thread.x/400,
        this.thread.y/400
    ];

    st1[0] = st1[0] * (u_resolution[0]/u_resolution[1]);

    // moving by x and y
    if(moving == 2)
    {
        st1[0] = (st1[0] - mousexx) * 2 - 1;
        st1[1] = (st1[1] + mouseyy) * 2 - 1;
    }
    else
    {
        st1[0] = (st1[0]) * 2 - 1;
        st1[1] = (st1[1]) * 2 - 1;
    }

    let pol1 = toPolarCoord1(st1[0],st1[1]);

    let a1 = pol1[1] +1;
    let r1 = 6.28318530718/N;

    // size of object
    let size1 = pol1[0]*4;

    let d1 = Math.cos( Math.floor(0.5 + a1/r1) * r1 - a1) * size1 ;

    let cc1 = 1-smoothstep1(0.4,0.41,d1);

    // for changing the color of the second object.
    let temp2 = [
        (1-d1)* (1-cc1)*color2[0],
        (1-d1)* (1-cc1)*color2[1],
        (1-d1)* (1-cc1)*color2[2]
    ];

    this.color(
        temp1[0] - temp2[0],
        temp1[1] - temp2[1],
        temp1[2] - temp2[2],
        1
    );
}).setOutput([400,400]).setGraphical(true);

function setup()
{
    createCanvas(400,400);
    u_resolution = {
        x: width,
        y: height
    };
}

let corners = 3;
let moving = 1;
let color1 = [1,0,0];
let color2 = [1,0,0];

function test()
{
    corners = document.getElementById('Corners').value;

    if(document.getElementById('moving1').checked)
    {
        moving = 1;
    }
    else 
    {
        moving = 2;
    }

    color1[0] = document.getElementById('color1R').checked ? 1 : 0;
    color1[1] = document.getElementById('color1G').checked ? 1 : 0;
    color1[2] = document.getElementById('color1B').checked ? 1 : 0;
    color2[0] = document.getElementById('color2R').checked ? 1 : 0;
    color2[1] = document.getElementById('color2G').checked ? 1 : 0;
    color2[2] = document.getElementById('color2B').checked ? 1 : 0;
}

function draw()
{
    let mousexx = map(mouseX,0,400,-0.5,0.5);
    let mouseyy = map(mouseY,0,400,-0.5,0.5);

    loadPixels();

    render(
        mousexx,
        mouseyy,
        [width,height],
        corners,
        moving,
        color1,
        color2,
    );
    
    pixels.set(render.getPixels(),0);
    updatePixels();
}