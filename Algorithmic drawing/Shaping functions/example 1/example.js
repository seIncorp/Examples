
let umouse;
let u_resolution;

function gl_FragCoord(x,y)
{
    return {
        x: x/u_resolution.x,
        y: y/u_resolution.y
    };
}

function smoothstep(edge0, edge1,x)
{
    let val = (x - edge0) / (edge1 - edge0);
    let t = Math.min(Math.max(0, val), 1)
    return t * t * (3 - 2* t);
}

function plot(st, pct)
{
    return smoothstep(pct-0.02, pct, st.y) - smoothstep(pct, pct+0.02, st.y);
}

function toRGB(color)
{
    let temp =  [
        Math.abs(map(color.x,0,1,0,255)),
        Math.abs(map(color.y,0,1,0,255)),
        Math.abs(map(color.z,0,1,0,255))
    ];

    return temp;
}

function setup()
{
    createCanvas(400,400)

    u_resolution = {
        x: width,
        y: height
    };

    for(let x=0; x< width; x++ )
        for(let y=0; y< height; y++ )
        {
            let st = gl_FragCoord(x,y);

            let YY = st.x;

            let color = createVector(YY,YY,YY);

            let pct = plot(st,YY);

            let temp1 = color.mult((1-pct))

            let temp2 = createVector(0,1,0).mult(pct);

            color = temp1.add(temp2);
            
            set(x,y,[...(toRGB(color)),255])
        }

    updatePixels();
}