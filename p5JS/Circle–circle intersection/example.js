let circleData1 = {
    r: 100,
    x: 0,
    y: 0
};

let circles2 = [];
let interceptPoints =[];

function setup()
{
    createCanvas(400,400);
    background(0);

    for(let i= 0; i< 50; i++)
        circles2.push({
            r: random(5,10),
            x: random(-100,100),
            y: random(-100,100),
            moveX: random(-1,1),
            moveY: random(-1,1)
        });
}

function draw()
{
    background(0);
    translate(width/2,height/2);

    noFill();
    stroke(255);
    circle(circleData1.x,circleData1.y,circleData1.r);

    for(let circle2 of circles2)
    {
        circle2.x += circle2.moveX;
        circle2.y += circle2.moveY;

        noFill();
        circle(circle2.x,circle2.y,circle2.r);

        // a = 2(x2 − x1)
        let a =  2 * (circle2.x - circleData1.x);

        // b = 2(y2 − y1)
        let b = 2 * (circle2.y - circleData1.y);

        // c = r22 − x21 − y21 − r22 + x22 + y22.
        let c = (circleData1.r ** 2) - (circleData1.x ** 2) - (circleData1.y ** 2) - (circle2.r ** 2) + (circle2.x ** 2) + (circle2.y ** 2);

        // cC = c − ax1 − by2
        let cC = c - (a * circleData1.x) - (b * circleData1.y);

        let part = (a**2)+(b**2);
        let part2 = ((circleData1.r ** 2)*part) - (cC ** 2);

        // E 1,2
        let E1 = ((a*cC) + (b * Math.sqrt( part2 )) ) / part;
        let E2 = ((a*cC) - (b * Math.sqrt( part2 ))) / part;
        
        // N 1,2
        let N1 = ((b*cC) - (a * Math.sqrt( part2 ))) / part;
        let N2 = ((b*cC) + (a * Math.sqrt( part2 ))) / part;
        
        //let d = (circleData1.r ** 2) * ((a ** 2)+(b**2)) -(cC ** 2)

        let LenAB = Math.round(dist(circleData1.x,circleData1.y,circle2.x,circle2.y) - circleData1.r - circle2.r);

        if(LenAB < 0)
        {
            // point 1
            let x1 = Math.round(circleData1.x + E1);
            let y1 = Math.round(circleData1.y + N1);

            // point 2
            let x2 = Math.round(circleData1.x + E2);
            let y2 = Math.round(circleData1.y + N2);

            fill('orange');
            
            let temp = {
                first: {
                    x: x1,
                    y: y1
                },
                second: {
                    x: x2,
                    y: y2
                }
            }

            interceptPoints.push(temp);

            circle(x1,y1,5);
            circle(x2,y2,5); 

            if(interceptPoints.length > 1)
            {
                for(let point of interceptPoints)
                {
                    if(point != temp)
                    {
                        stroke('green');
                        line(point.first.x,point.first.y,temp.first.x,temp.first.y);
                        line(point.second.x,point.second.y,temp.second.x,temp.second.y);
                    }
                }
            }
        }

        stroke('white');

        if(LenAB == 0)
        {
            // point 1
            let x1 = Math.round(circleData1.x + E1);
            let y1 = Math.round(circleData1.y + N1);

            // point 2
            let x2 = Math.round(circleData1.x + E2);
            let y2 = Math.round(circleData1.y + N2);

            let dx = x1 - x2;
            let dy = y1 - y2;

            fill('orange');
            circle(x1-dx,y1-dy,5);
        }


        if(circle2.x < (-200+circle2.r) || circle2.x > (200-circle2.r))
        {
            circle2.moveX *= -1;
            circle2.moveY = random(-1,1);
        }

        if(circle2.y < (-200 + circle2.r) || circle2.y > (200 - circle2.r))
        {   
            circle2.moveY *= -1;
            circle2.moveX = random(-1,1);
        }
    }
 
    interceptPoints = [];
}