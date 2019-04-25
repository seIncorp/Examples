let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;
let MouseConstraint = Matter.MouseConstraint;
let Mouse = Matter.Mouse;
let Events = Matter.Events;
let Composite = Matter.Composite;
let Composites = Matter.Composites;
let Common = Matter.Common;
let Constraint = Matter.Constraint;

let engine = Engine.create();

let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showPositions: true,
        showAngleIndicator: true
    }
});

let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine,{
    mouse: mouse,
    constraint: {
        stiffness: 0.98,
        render: {
            visible: false
        }
    }
});

let group = Body.nextGroup(true);

World.add(engine.world, [
    Bodies.rectangle(300, 20, 300, 20, { 
        isStatic: true
    }),

    Bodies.rectangle(400, 575, 760, 50, { 
        isStatic: true,
        collisionFilter: { 
            group: group
        }
    })
]);


let curtainParts = [];
let curtain = [];

let numColumns = 12;
let numRows = 2;
let columnGap = 2;
let rowGap = 40;

for(let i = 0; i < 3; i++)
{
    curtainParts.push(
        Composites.stack(100,100,numColumns,numRows,columnGap,rowGap,(x,y) => {
            return Bodies.rectangle(x - 5, y, 50, 10,{
                collisionFilter: { group: group },
                density: 0.01
            });
        })
    );

    curtain.push(Composites.mesh(curtainParts[i],numColumns,numRows,false,{
        render: {
            visible: true,
            stiffness: 0,
            length: 1,
            strokeStyle: '#FF0000'
        }
    }));
}

Events.on(mouseConstraint, "mousedown", (data) => {
    let flag = false;
    let wall = false

    for(let box of engine.world.bodies)
    {
        if(
            Math.round(box.bounds.min.x) < data.mouse.position.x &&
            Math.round(box.bounds.max.x) > data.mouse.position.x &&
            Math.round(box.bounds.min.y) < data.mouse.position.y &&
            Math.round(box.bounds.max.y) > data.mouse.position.y &&
            (box.id != 1 && box.id != 2)
        )
        {
            flag = true;
        }
        else if(
            Math.round(box.bounds.min.x) < data.mouse.position.x &&
            Math.round(box.bounds.max.x) > data.mouse.position.x &&
            Math.round(box.bounds.min.y) < data.mouse.position.y &&
            Math.round(box.bounds.max.y) > data.mouse.position.y &&
            (box.id == 1 || box.id == 2)
        )
        {
            wall = true;
        }
    }

    if(!flag && !wall)
        World.add(engine.world, Bodies.circle(data.mouse.position.x,data.mouse.position.y,10,{
            frictionAir: Math.random() * (0.3 - 0.001) + 0.001,
            density: 0.1,
        }));
});

World.add(engine.world, [
    curtain[0],
    Constraint.create({ 
        bodyA: engine.world.bodies[0],
        pointA: {
            x: -(engine.world.bodies[0].position.x/2), 
            y: (engine.world.bodies[0].position.y/2)},
        bodyB: curtain[0].bodies[0], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[0],
        pointA: {
            x: -(engine.world.bodies[0].position.x/2)+rowGap, 
            y: (engine.world.bodies[0].position.y/2)},
        bodyB: curtain[0].bodies[numColumns], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[1],
        pointA: {x: -(engine.world.bodies[1].position.x)+rowGap, y: -(engine.world.bodies[1].bounds.max.y-engine.world.bodies[1].bounds.min.y-30)},
        bodyB: curtain[0].bodies[numColumns-1], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[1],
        pointA: {x: -(engine.world.bodies[1].position.x)+rowGap*2, y: -(engine.world.bodies[1].bounds.max.y-engine.world.bodies[1].bounds.min.y-30)},
        bodyB: curtain[0].bodies[curtain[0].bodies.length-1], 
        length: 1,
        stiffness: 0.9
    }),

    curtain[1],

    Constraint.create({ 
        bodyA: engine.world.bodies[0],
        pointA: {
            x: -rowGap, 
            y: (engine.world.bodies[0].position.y/3)},
        bodyB: curtain[1].bodies[0], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[0],
        pointA: {
            x: rowGap, 
            y: (engine.world.bodies[0].position.y/2)},
        bodyB: curtain[1].bodies[numColumns], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[1],
        pointA: {x: -(engine.world.bodies[1].position.x/3), y: -(engine.world.bodies[1].bounds.max.y-engine.world.bodies[1].bounds.min.y-25)},
        bodyB: curtain[1].bodies[numColumns-1], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[1],
        pointA: {x: -(engine.world.bodies[1].position.x/3)+rowGap, y: -(engine.world.bodies[1].bounds.max.y-engine.world.bodies[1].bounds.min.y-25)},
        bodyB: curtain[1].bodies[curtain[1].bodies.length-1], 
        length: 1,
        stiffness: 0.9
    }),

    curtain[2],

    Constraint.create({ 
        bodyA: engine.world.bodies[0],
        pointA: {
            x: (engine.world.bodies[0].position.x/2)-rowGap, 
            y: (engine.world.bodies[0].position.y/2
        )},
        bodyB: curtain[2].bodies[0], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[0],
        pointA: {
            x: (engine.world.bodies[0].position.x/2), 
            y: (engine.world.bodies[0].position.y/2
        )},
        bodyB: curtain[2].bodies[numColumns], 
        length: 1,
        stiffness: 0.9
    }),

    Constraint.create({ 
        bodyA: engine.world.bodies[1],
        pointA: {x: engine.world.bodies[1].position.x/3, y: -(engine.world.bodies[1].bounds.max.y-engine.world.bodies[1].bounds.min.y-25)},
        bodyB: curtain[2].bodies[numColumns-1], 
        length: 1,
        stiffness: 0.9
    }),
    
    Constraint.create({ 
        bodyA: engine.world.bodies[1],
        pointA: {x: (engine.world.bodies[1].position.x/3)+rowGap, y: -(engine.world.bodies[1].bounds.max.y-engine.world.bodies[1].bounds.min.y-25)},
        bodyB: curtain[2].bodies[curtain[2].bodies.length-1], 
        length: 1,
        stiffness: 0.9
    })
]);

World.add(engine.world, [mouseConstraint]);

render.mouse = mouse;

Engine.run(engine);

Render.run(render);