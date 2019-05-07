// for rotation purpose
let n = Math.floor(360 / 27);
let r;
let points = [];

function setup()
{
    createCanvas(400,400);
    background(0);
    r = width/2-10;

    // i = 0, ..n − 1.
    for(let i = 0; i< n; i++)
    {
        //  ∆ϕ = 2π/n
        let deltaAngle = (2 * Math.PI) / n;

        //  xi = r cos(i∆ϕ)
        let x = r * (Math.cos(i*deltaAngle));

        //  yi = r sin(i∆ϕ)
        let y = r * ( Math.sin(i * deltaAngle) );

        /* fill(0,255,0);
        circle(Math.floor(x),Math.floor(y),5); */

        points.push({
            x: Math.floor(x),
            y: Math.floor(y)
        });
    }
}

function draw()
{
    background(0);
    translate(width / 2, height / 2);
    noStroke();

    for(let point of points)
    {
        for(let other of points)
        {
            if(other != point)
            {
                stroke(255,0,0);
                line(point.x,point.y,other.x,other.y);
            }
        }
    }
}





















