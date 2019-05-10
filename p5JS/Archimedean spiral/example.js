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
    // before we can use this
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
    background(0);
}

function draw()
{
    background(0);
    translate(width/2,height/2);

    stroke('green');

    for(let i = 0; i<Math.PI*6; i += 0.1)
    {
        let r = i / (Math.PI*2);

        let temp = fromPolarCoord(r,fromRADtoDEG(i))
        circle(temp.x,-temp.y,3);
    }
}


























