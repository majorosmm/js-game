let x;
let y;
let enemies = [];   // Ebben a tömbben tároljuk az akadalyok kordinatait
let playerObject;  
let player_width;
let player_height;
let enemy_width;
let enemy_height;
let rect;
let fail_count = 0;
let alreadyHit = []; // Ebben a tömbben tároljuk, hogy az egyes kockákra már léptél-e
let barriers = [];  // Ebben a tömbben tároljuk a "barrier" elemek kordinatait
let barrier_width;
let barrier_height;
let goal_height;
let goal_width;
let easy;
let medium;
let hard;



window.addEventListener("load", function() {
    x = 0;
    y = 0;

    window.addEventListener("mousemove", function(event) {
        x = event.clientX - player_width /2 -20;
        y = event.clientY - player_height /2 -20;
        playerObject.setAttribute('x', x);
        playerObject.setAttribute('y', y);
        document.getElementById('mousecoordinates').innerHTML = "Mouse corinates: (" + x + ", " + y + ")";
    });


    let svgns = "http://www.w3.org/2000/svg";
    playerObject = document.createElementNS(svgns, 'rect');
    player_height = 50;
    player_width = 50;
    playerObject.setAttribute('x', x);
    playerObject.setAttribute('y', y);
    playerObject.setAttribute('height', '50');
    playerObject.setAttribute('width', '50');
    playerObject.setAttribute('fill', '#fffffff');
    document.getElementById('svgOne').appendChild(playerObject);

    enemies = [
        { x: 100, y: 200 },
        { x: 300, y: 150 },
        { x: 500, y: 200 },
        { x: 700, y: 150 },
        { x: 900, y: 200 },
        { x: 1100, y: 150 },
        { x: 100, y: 500 },
        { x: 300, y: 550 },
        { x: 500, y: 500 },
        { x: 700, y: 550 },
        { x: 900, y: 500 },
        { x: 1100, y: 550 },

    ];


    let svg = document.querySelector('svg');
    enemy_height = 50;
    enemy_width = 50;

    enemies.forEach((enemy, index) => {
        alreadyHit[index] = false; // Kezdetben egyik kockára sem léptél
        rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", enemy.x);
        rect.setAttribute("y", enemy.y);
        rect.setAttribute("width", enemy_width);
        rect.setAttribute("height", enemy_height);
        rect.setAttribute("fill", "green");
        rect.setAttribute("id", "enemy" + index);
        svg.appendChild(rect);
    });

    barriers = [
        { x: 0, y: 350 },
        { x: 200, y: 700 }

    ];

    barrier_height = 50;
    barrier_width = 1300;

    barriers.forEach((barrier, index) => {
        
        fal = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        fal.setAttribute("x", barrier.x);
        fal.setAttribute("y", barrier.y);
        fal.setAttribute("width", barrier_width);
        fal.setAttribute("height", barrier_height);
        fal.setAttribute("fill", "green");
        fal.setAttribute("id", "barrier" + index);
        svg.appendChild(fal);
    });


    goal_height = 100;
    goal_width = 100;


        goal = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        goal.setAttribute("x", 1300);
        goal.setAttribute("y", 800);
        goal.setAttribute("width", goal_width);
        goal.setAttribute("height", goal_height);
        goal.setAttribute("fill", "blue");
        svg.appendChild(goal);

    collisionCheckInterval = setInterval(isColiding, 100);
});

function isColiding() {
    collisionDetected = false;

    enemies.forEach((enemy, index) => {
        let enemyRect = document.getElementById("enemy" + index);

        if (parseInt(playerObject.getAttribute('x')) + player_width >= enemy.x &&
            parseInt(playerObject.getAttribute('x')) <= enemy.x + enemy_width &&
            parseInt(playerObject.getAttribute('y')) + enemy_height >= enemy.y &&
            parseInt(playerObject.getAttribute('y')) <= enemy.y + enemy_height &&
            !alreadyHit[index]) { // Csak akkor veszíts életet, ha még nem léptél erre a kockára
            enemyRect.setAttribute("fill", "red");
            collisionDetected = true;
            alreadyHit[index] = true; // Jelöld meg, hogy erre a kockára már léptél
            fail_count++;
            if (fail_count >= 3) {
                alert("Letelt az osszes eleted!");
                window.open("///C:/Users/aerocool/Desktop/js%20game/index.html");
                window.close(this);
            }
        } 
    });
    barriers.forEach((barrier, index) => {

    let barrierRect = document.getElementById("barrier" + index);
    
    if (parseInt(playerObject.getAttribute('x')) + player_width >= barrier.x &&
        parseInt(playerObject.getAttribute('x')) <= barrier.x + barrier_width &&
        parseInt(playerObject.getAttribute('y')) + player_height >= barrier.y &&
        parseInt(playerObject.getAttribute('y')) <= barrier.y + barrier_height) {
        collisionDetected = true;
        alert("A falnak mentel ;P, probald ujra!");
        window.location.reload();

    }


    });
    if (parseInt(playerObject.getAttribute('x')) + player_width >= goal.getAttribute('x') &&
        parseInt(playerObject.getAttribute('x')) <= goal.getAttribute('x') + goal_width &&
        parseInt(playerObject.getAttribute('y')) + player_height >= goal.getAttribute('y') &&
        parseInt(playerObject.getAttribute('y')) <= goal.getAttribute('y') + goal_height ){
            collisionDetected = true;
            alert("Gyoztel!!!")
            window.open("///C:/Users/aerocool/Desktop/js%20game/index.html");
            window.close(this);


    }

    document.getElementById("lives").innerHTML = "fails: " + fail_count;

    if (collisionDetected && fail_count >= 3) {
        clearInterval(collisionCheckInterval);
    }

    if (parseInt(playerObject.getAttribute('x')) >= 1500 ||
        parseInt(playerObject.getAttribute('y')) >= 1000) {
        clearInterval(collisionCheckInterval);
        alert("Ne hagyd el a palyat!");
        window.open("///C:/Users/aerocool/Desktop/js%20game/index.html");
        window.close(this);
    }
}


function setDiff(){
    
}
