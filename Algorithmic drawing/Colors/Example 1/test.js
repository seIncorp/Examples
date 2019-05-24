
let umouse;
let u_resolution;

function toRGB(color)
{
    return [
        Math.abs(map( color.x, 0, 1, 0, 255 )),
        Math.abs(map( color.y, 0, 1, 0, 255 )),
        Math.abs(map( color.z, 0, 1, 0, 255 ))
    ];
}
function mixColor(x,y,a)
{
    // x and y are in vector -->  255,255,255
    // a is in 0 to 1

    let rgbA = [
        x[0] * a,
        x[1] * a,
        x[2] * a
    ];
    let rgbB = [
        y[0] * (1-a),
        y[1] * (1-a),
        y[2] * (1-a)
    ];

    let temp = [
        parseInt(rgbA[0] + rgbB[0]),
        parseInt(rgbA[1] + rgbB[1]),
        parseInt(rgbA[2] + rgbB[2])
    ];

    return temp;
}

let colorA;
let colorB;

function setup()
{
    createCanvas(400,400);

    u_resolution = {
        x: width,
        y: height
    };
}

let u_time = 0;
let steps = 0.05;

function draw()
{
    if(u_time > 1 || u_time < 0)   
        steps *= -1;
    
    colorA = createVector(0.149,0.141,0.912);
    colorB = createVector(1.000,0.833,0.224);

    for(let x = 0; x < width; x++ )
        for(let y = 0; y < height; y++ )
            set(x,height-y,[...mixColor(toRGB(colorA),toRGB(colorB),Math.abs(Math.sin(u_time))),255]);
    
    updatePixels();

    u_time += steps;
}