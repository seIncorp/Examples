
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
    return [
        Math.abs(map( color.x, 0, 1, 0, 255 )),
        Math.abs(map( color.y, 0, 1, 0, 255 )),
        Math.abs(map( color.z, 0, 1, 0, 255 ))
    ];
}

/* Here you send both as number or both as vector */
function step(edge, value)
{
    if(typeof edge == 'number' && typeof value == 'number')
        return value < edge ? 0 : 1;
    else
        return {
            x: value.x < edge.x ? 0 : 1,
            y: value.y < edge.y ? 0 : 1
        };
}

function setup()
{
    createCanvas(400,400);
    
    u_resolution = {
        x: width,
        y: height
    };
}

function recta(st)
{
    let pct;
    if(document.getElementById('border').value == 1)
    {
        let bottomLeft = smoothstep(
            createVector(0.01, 0.01, 0.1),
            createVector(0.2, 0.2, 0.1),
            st
        );

        pct = bottomLeft.x * bottomLeft.y;

        let topright = smoothstep(
            createVector(0.01, 0.01, 0.1),
            createVector(0.2, 0.2, 0.1),
            {x: 1-st.x, y: 1-st.y}
        );

        pct *= topright.x * topright.y;
    }

    if(document.getElementById('border').value == 0)
    {
        let bottomLeft = step(
            createVector(0.45,0.01,0.1),
            st
        );

        pct = bottomLeft.x * bottomLeft.y;

        let topright = step(
            createVector(0.01,0.1,0.1),
            {x: 1-st.x, y: 1-st.y}
        );

        pct *= topright.x * topright.y;
    }

    return pct;
}

function draw()
{
    for(let x = 0; x < width; x++ )
        for(let y = 0; y < height; y++ )
        {
            let st = gl_FragCoord(x,y);
            
            let bottomLeft2 = step(
                createVector(0.01,0.5,0.1),
                st
            );
    
            let pct2 = bottomLeft2.x * bottomLeft2.y;
            
            let topright2 = step(
                createVector(0.6,0.1,0.1),
                {x: 1-st.x, y: 1-st.y}
            );
    
            pct2 *= topright2.x * topright2.y;

            let bottomLeft = step(
                createVector(0.01,0.01,0.1),
                st
            );
    
            let pct1 = bottomLeft.x * bottomLeft.y;
            
            let topright = step(
                createVector(0.6,0.6,0.1),
                {x: 1-st.x, y: 1-st.y}
            );
    
            pct1 *= topright.x * topright.y;

            let pct = recta(st)
            
            pct -= pct2
            pct -= pct1
            
            let color = createVector(
                pct,
                pct,
                pct
            );

            set(x,height-y,[...(toRGB(color)),255]);
        }
    updatePixels();
}