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

    let old;
    for(let i = 0; i<Math.PI*2; i += 0.01)
    {
        let k = document.getElementById('krange').value;
        let r = fromRADtoDEG(Math.cos(k * i)) / document.getElementById('myRange').value;
        let temp = fromPolarCoord(r,fromRADtoDEG(i));

        if(old && i < (Math.PI*2))
        {
            line(old.x,old.y,temp.x,temp.y);
        }
        
        if(old && ((i+0.01) > (Math.PI*2)))
        {
            let next = fromPolarCoord(fromRADtoDEG(Math.cos(k * 0))/document.getElementById('myRange').value,fromRADtoDEG(0));
            line(temp.x,temp.y,next.x,next.y);
        }

        old = {...temp};
    }
}


























