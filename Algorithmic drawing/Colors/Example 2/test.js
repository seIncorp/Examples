
let umouse;
let u_resolution;

function gl_FragCoord(x,y)
{
    return {
        x: x/u_resolution.x,
        y: y/u_resolution.y
    };
}

function smoothstep(edge0, edge1, x)
{
    let val = (x - edge0) / (edge1 - edge0);
    let t = Math.min(Math.max(0, val), 1)
    return t * t * (3 - (2 * t));
}

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

    if(typeof a != "object")
    {
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

    if(typeof a == "object")
    {
        let rgbA = [
            x[0] * a.x,
            x[1] * a.y,
            x[2] * a.z
        ];
        let rgbB = [
            y[0] * (1-a.x),
            y[1] * (1-a.y),
            y[2] * (1-a.z)
        ];

        let temp = [
            parseInt(rgbA[0] + rgbB[0]),
            parseInt(rgbA[1] + rgbB[1]),
            parseInt(rgbA[2] + rgbB[2])
        ];

        return temp;
    }
}

// plot line
function plot(st, pct)
{
    return smoothstep( pct-0.01, pct, st.y ) - smoothstep( pct, pct+0.01, st.y );
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

function draw()
{
    colorA = createVector(0.149,0.141,0.912);
    colorB = createVector(1.000,0.833,0.224);

    for(let x = 0; x < width; x++ )
        for(let y = 0; y < height; y++ )
        {
            let st = gl_FragCoord(x,y);

            let pct = createVector(st.x,st.x,st.x);

            pct.x = smoothstep(document.getElementById('red').value,1, st.x);
            pct.y = Math.sin(st.x*((2*Math.PI)/document.getElementById('green').value));
            pct.z = Math.pow(st.x,document.getElementById('blue').value);

            let color = mixColor(toRGB(colorB),toRGB(colorA),pct);

            color = mixColor(toRGB(createVector(1,0,0)),color,plot(st,pct.x));
            color = mixColor(toRGB(createVector(0,1,0)),color,plot(st,pct.y));
            color = mixColor(toRGB(createVector(0,0,1)),color,plot(st,pct.z));

            set(x,height-y,[...color,255]);
        }
    updatePixels();
}