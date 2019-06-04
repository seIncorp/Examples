
let umouse;
let u_resolution;

function gl_FragCoord(x,y)
{
    return {
        x: x/u_resolution.x,
        y: y/u_resolution.y
    };
}

/* Here you send both as number or both as vector */
function smoothstep(edge0, edge1, x)
{
    if(typeof edge0 == 'number')
    {
        let val = (x - edge0) / (edge1 - edge0);
        let t = Math.min(Math.max(0, val), 1)
        return t * t * (3 - (2 * t));
    }
    else
    {
        let tempx = (x.x - edge0.x) / (edge1.x - edge0.x);
        let tx = Math.min(Math.max(0, tempx), 1);

        let tempy = (x.y - edge0.y) / (edge1.y - edge0.y);
        let ty = Math.min(Math.max(0, tempy), 1);

        return {
            x: tx * tx * (3 - (2 * tx)),
            y: ty * ty * (3 - (2 * ty))
        };
    }
}

function toRGB(color)
{
    if(color.x > 1)
        color.x = 1;
    
    if(color.y > 1)
        color.y = 1;

    if(color.z > 1)
        color.z = 1;

    return [
        Math.abs(map( color.x, 0, 1, 0, 255 )),
        Math.abs(map( color.y, 0, 1, 0, 255 )),
        Math.abs(map( color.z, 0, 1, 0, 255 ))
    ];
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
    
    u_resolution = {
        x: width,
        y: height
    };
}

function draw()
{
    let mousexx = map(mouseX,0,400,-0.5,0.5);
    let mouseyy = map(mouseY,0,400,-0.5,0.5);

    for(let x = 0; x < width; x++ )
        for(let y = 0; y < height; y++ )
        {
            let st = gl_FragCoord(x,y);
             
            let pos = createVector(0.5-st.x,0.5-st.y,0)

            let pol = toPolarCoord(pos.x+mousexx,pos.y-mouseyy);
            let r = pol.r;
            let a = fromDEGtoRAD(pol.angle);

            let f = smoothstep(
                -0.5,
                document.getElementById('sharpness').value,
                Math.cos(a*document.getElementById('Rays').value)
            ) * document.getElementById('transparency').value + 0.5;

            let dd = Math.pow(f,r);
            
            let color = createVector(
                document.getElementById('color').value-dd,
                dd+document.getElementById('color').value,
                dd
            );

            set(x,height-y,[...(toRGB(color)),255]);
        }

    updatePixels();
}