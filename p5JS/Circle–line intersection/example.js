let linePoints;
let circleData;

// euclidean distance between A point and B point of line
let dxLine;
let dyLine;
let LenAB;

// direction vector D from A to B
let Dx;
let Dy;

// distance between the points A and E
let t;
let Ex;
let Ey;

// euclidean distance between E and C
let dxE;
let dyE;
let LenEC;

// distance from t to circle intersection point
let dt;

// first intersection point
let Fx;
let Fy;

// distance between point A and first intersection point
let LenAF;

// second intersection point
let Gx;
let Gy;

// distance between first intersection point and econd intersection point
let LenFG

function setup()
{
    createCanvas(400,400);
    background(0);
}

function draw()
{
    background(0);
    translate(width/2,height/2);

    circleData = {
        r: 100,
        x: 0,
        y: 0
    };

    linePoints = {
        x1: -100,
        y1: -100,
        x2: map(mouseX,0,400,-200,200),
        y2: map(mouseY,0,400,-200,200)
    }

    stroke('white');
    line(circleData.x,
        circleData.y,
        circleData.x + circleData.r,
        circleData.y
    ); 

    stroke('white');
    line(linePoints.x1,
        linePoints.y1,
        circleData.x,
        circleData.y
    ); 

    stroke('red');
    line(linePoints.x1,
        linePoints.y1,
        linePoints.x2,
        linePoints.y2
    ); 

    stroke('purple');
    noFill();
    circle(circleData.x,circleData.y,circleData.r);

    // Point A
    fill('red');
    noStroke();
    circle(linePoints.x1,linePoints.y1,4);

    // Point B
    fill(0,255,0);
    circle(linePoints.x2,linePoints.y2,4);

    // Point C
    fill('yellow');
    circle(circleData.x,circleData.y,4);

    // euclidean distance between A point and B point of line
    dxLine = linePoints.x2 - linePoints.x1;
    dyLine = linePoints.y2 - linePoints.y1;
    LenAB = Math.sqrt( (dxLine ** 2) + (dyLine ** 2) );

    // direction vector D from A to B
    Dx = dxLine / LenAB;
    Dy = dyLine / LenAB;

    // the equation of the line AB:
    // x = Dx*t + Ax
    // y = Dy*t + Ay
    // with 0 <= t <= LenAB.

    // distance between the points A and E, where
    // E is the point of AB closest the circle center (Cx, Cy)
    t = (Dx * (circleData.x - linePoints.x1)) + (Dy * (circleData.y - linePoints.y1));

    // coordinates of the point E
    Ex = (t * Dx) + linePoints.x1;
    Ey = (t * Dy) + linePoints.y1;

    // euclidean distance between E and C
    dxE = Ex - circleData.x;
    dyE = Ey - circleData.y;
    LenEC = Math.sqrt(( dxE ** 2 ) + ( dyE ** 2 ));

    // line intersects the circle
    if( LenEC < circleData.r )
    {
        // distance from t to circle intersection point
        dt = Math.sqrt( (circleData.r ** 2) - (LenEC ** 2) );

        // compute first intersection point
        Fx = (t - dt)*Dx + linePoints.x1;
        Fy = (t - dt)*Dy + linePoints.y1;

        // distance from point A to first intersection point
        LenAF = dist(linePoints.x1,linePoints.y1,Fx,Fy);

        // distance from point A to circle center
        LenAC = dist(linePoints.x1,linePoints.y1,circleData.x,circleData.y);

        if(LenAB > (LenAC- circleData.r))
            if(LenAF <= LenAB)
            {
                stroke('red');
                noFill();
                circle(circleData.x,circleData.y,circleData.r);

                fill('orange');
                noStroke();
                circle(Fx,Fy,5);

                stroke('green');
                line(linePoints.x1,
                    linePoints.y1,
                    Fx,
                    Fy
                );

                if(t < LenAB)
                {
                    // Point E
                    fill('blue');
                    noStroke();
                    circle(Ex,Ey,4);
                    
                    stroke('white');
                    line(Ex,Ey,circleData.x,circleData.y);
                }

                // second intersection point
                Gx = (t + dt)*Dx + linePoints.x1;
                Gy = (t + dt)*Dy + linePoints.y1;

                LenFG = dist(Fx,Fy,Gx,Gy);
                
                if(LenAB > (LenFG + LenAF))
                {
                    fill('orange');
                    circle(Gx,Gy,5);
                    stroke('yellow');
                    line(Fx, Fy, Gx, Gy);

                    stroke('blue');
                    line(Gx, Gy, linePoints.x2, linePoints.y2);
                }
                else
                {
                    stroke('blue');
                    line(Fx, Fy, linePoints.x2, linePoints.y2);
                }
            }
    }

    if( LenEC == circleData.r )
    {
        if(LenAF <= LenAB)
        {
            stroke('red');
            noFill();
            circle(circleData.x,circleData.y,circleData.r);

            fill(255,100,0);
            noStroke();
            circle(Ex,Ey,5);

            stroke('green');
            line(linePoints.x1,
                linePoints.y1,
                Ex,
                Ey
            );

            stroke('blue');
                line(Ex,
                    Ey,
                    linePoints.x2,
                    linePoints.y2
                );
        }
    }
}