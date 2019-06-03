
let umouse;
let u_resolution;

function gl_FragCoord(x,y)
{
    return {
        x: x/u_resolution.x,
        y: y/u_resolution.y
    };
}

function toRGB(color)
{
    return [
        Math.abs(map( color.x, 0, 1, 0, 255 )),
        Math.abs(map( color.y, 0, 1, 0, 255 )),
        Math.abs(map( color.z, 0, 1, 0, 255 ))
    ];
}

function fromHSVtoRGB(h,s,v)
{
    // b is the same as v, HSB == HSV
    let C = v * s;

    let H2 = h / 60;

    let X = C * (1 - Math.abs((H2 % 2)-1 ));

    let m = v - C;

    if(0 <= H2 && H2 <= 1)
        return [C+m,X+m,0+m]

    if(1 < H2 && H2 <= 2)
        return [X+m,C+m,0+m];

    if(2 < H2 && H2 <= 3)
        return [0+m,C+m,X+m];

    if(3 < H2 && H2 <= 4)
        return [0+m,X+m,C+m];

    if(4 < H2 && H2 <= 5)
        return [X+m,0+m,C+m];

    if(5 < H2 && H2 <= 6)
        return [C+m,0+m,X+m];
}


/* angle in degrees */
function toPolarCoord(x,y)
{
    return {
        r: Math.sqrt( (x ** 2) + (y ** 2) ),
        angle: fromRADtoDEG(Math.atan2(y,x))
    };
}

/* input degrees, output degrees */
function fromPolarCoord(r, angle)
{
    return {
        x: r * fromRADtoDEG(Math.cos(fromDEGtoRAD(angle))),
        y: r * fromRADtoDEG(Math.sin(fromDEGtoRAD(angle)))
    };
}

function fromRADtoDEG(radians)
{
    return radians * (180 / Math.PI);
}

function fromDEGtoRAD(degrees)
{
    return degrees * (Math.PI / 180); 
}

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
    for(let x = 0; x < width; x++ )
        for(let y = 0; y < height; y++ )
        {
            let st = gl_FragCoord(x,y);

            let tocenter = createVector((0.5-st.x),(0.5-st.y));

            let angle = toPolarCoord(tocenter.x,tocenter.y);
            
            let an = map(angle.angle,-180,180,0,360);

            let color = createVector(...fromHSVtoRGB(an, angle.r* document.getElementById('Radius').value,1));
            set(x,height-y,[...toRGB(color),255]);
        }

    updatePixels();
}