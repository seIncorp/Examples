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

const render = gpu.createKernel(function() {

    let st = [
        this.thread.x/400,
        this.thread.y/400
    ];

    let YY = smoothstep1(0.2,0.5,st[0]) - smoothstep1(0.5,0.8,st[0]);

    let pct = plot1(st,YY)

    let color = [
        YY * (1 - pct),
        YY * (1 - pct),
        YY * (1 - pct)
    ];

    let temp2 = [
        1 * pct,
        0 * pct,
        0 * pct
    ];

    this.color(color[0]+temp2[0],color[1]+temp2[1],color[2]+temp2[2],1);

}).setOutput([400,400]).setGraphical(true);

function setup()
{
    createCanvas(400,400);
}

function draw()
{
    
    loadPixels();

    render();
    
    pixels.set(render.getPixels(),0);
    updatePixels();
}