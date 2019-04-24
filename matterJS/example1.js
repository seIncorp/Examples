let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let MouseConstraint = Matter.MouseConstraint;
let Mouse = Matter.Mouse;
let Events = Matter.Events;

let engine = Engine.create();

let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 400,
        height: 400,
        showPositions: true,
        showAngleIndicator: true
    }
});

let ground = Bodies.rectangle(200, 390, 400, 40, { 
    isStatic: true
});

let wallA = Bodies.rectangle(10, 196, 40, 350, { 
    isStatic: true
});
let wallB = Bodies.rectangle(390, 196, 40, 350, { 
    isStatic: true
});

let boxes = [];
for(let i=0; i< 50; i++)
{
    let randX = Math.floor(Math.random() * (300 - 100) + 100);
    let randY = Math.floor(Math.random() * (100 - 10) + 10);

    boxes.push(Bodies.rectangle(randX,randY,10,10,{
        frictionAir: Math.random() * (0.3 - 0.001) + 0.001,
    }));
}

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
            (box.id != 1 && box.id != 2 && box.id != 3)
        )
        {
            Matter.World.remove(engine.world,box)
            flag = true;
        }
        else if(
            Math.round(box.bounds.min.x) < data.mouse.position.x &&
            Math.round(box.bounds.max.x) > data.mouse.position.x &&
            Math.round(box.bounds.min.y) < data.mouse.position.y &&
            Math.round(box.bounds.max.y) > data.mouse.position.y &&
            (box.id == 1 || box.id == 2 || box.id == 3)
        )
        {
            wall = true;
        }
    }

    if(!flag && !wall)
    {
        Matter.World.add(engine.world,Bodies.rectangle(data.mouse.position.x,data.mouse.position.y,10,10,{
            frictionAir: Math.random() * (0.3 - 0.001) + 0.001,
        }));
    }
});

World.add(engine.world, [mouseConstraint, ...boxes,wallA,wallB, ground]);

render.mouse = mouse;

Engine.run(engine);

Render.run(render);