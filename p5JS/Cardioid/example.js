let r;

function getVector(index,total)
{
    let angle = map(index % total,0,total,0,TWO_PI)+PI;
    let v = createVector(Math.cos(angle),Math.sin(angle));
    return v.mult(r);
}

function setup()
{
    createCanvas(640,640);
    r = width/2 - 6;
}

function draw()
{
    background( 0 );
    
    let total = 200;

    let factorBy = 3;

    translate( width/2, height/2 );
    strokeWeight( 2 );

    for(let i = 0; i < total; i++)
    {
        let a = getVector(i, total);
        let b = getVector(i * factorBy, total);

        let xTemp = map(a.x, -314, 314, 0, 255);
        let yTemp = map(a.y, -314, 314, 0, 255);
        let zTemp = map((a.x + a.y), -628, 628, 0, 255);
        
        stroke(xTemp, yTemp, 255-zTemp);
        line(a.x, a.y, b.x, b.y) 
    }

    noStroke();

    for(let i = 0; i < total; i++)
    {
        let v = getVector(i, total);

        let xTemp = map(v.x, -314, 314, 0, 255);
        let yTemp = map(v.y, -314, 314, 0, 255);
        let zTemp = map((v.x + v.y), -628, 628, 0, 255);

        fill(xTemp, yTemp, 255-zTemp);
        circle(v.x, v.y, 5);
    }
}