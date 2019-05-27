var canvas = document.querySelector('#game');
var context = canvas.getContext('2d');

var fon = new Image();
fon.src = "fon.jpg";

var asteroid = new Image();
asteroid.src = "asteroid.png";

var ship = new Image();
ship.src = "ship.png";

var fire = new Image();
fire.src = "fire.png";

var exp = new Image();
exp.src = "explode.png";


var timer = 0;
var fireballs = [];
var expl = [];
var starship = {
    x : 0,
    y : 480,
    animx : 0,
    animy : 0
}
var aster = [{
    x: 500,
    y: 20,
    dx: 3,
    dy: 3
},
{
    x: 500,
    y: 20,
    dx: 2,
    dy: 2
},];


canvas.addEventListener('mousemove', function(e) {
    starship.x = e.offsetX-35;
    starship.y = e.offsetY-45;
});

fon.onload = function() {
    game();
};


function game() {
    update();
    render();
    requestAnimationFrame(game);
};

function update() {
    timer++;
    if (timer%50 == 0) {
        aster.push({
            x : Math.random() * 600,
            y : Math.random() * -80,
            dx : Math.random() * 2 - 2,
            dy : Math.random() * 2 + 3,
            del : 0
        });
    };

    if (timer%10 == 0) {
        fireballs.push({
            x : starship.x + 30,
            y : starship.y,
            dx : 0,
            dy : -5.2
        },{
            x : starship.x + 30,
            y : starship.y,
            dx : 0,
            dy : -5.2
        });
    };

    for ( i in expl) {
        expl[i].animx = expl[i].animx+0.5;
        if (expl[i].animx > 4) {expl[i].animy++; expl[i].animx=0}
        if (expl[i].animy > 4)
        expl.splice(i,1);
    };

    for (i in aster) {
        aster[i].x = aster[i].x + aster[i].dx;
        aster[i].y = aster[i].y + aster[i].dy;
    
        if (aster[i].x >= 720 || aster[i].x < 0) {
            aster[i].dx = -aster[i].dx;
        };
        if (aster[i].y >= 600) {
            aster.splice(i,1);
        };




        for(j in fireballs) {

            if (Math.abs(aster[i].x + 25 - fireballs[j].x - 15) < 50 && Math.abs(aster[i].y - fireballs[j].y) < 25) {
                expl.push({x:aster[i].x, y:aster[i].y-25, animx:0, animy:0});

                aster[i].del = 1;
                fireballs.splice(j,1);break;

                
            };

            

        };
        if (aster[i].del == 1) aster.splice(i,1);



    };

    for (i in fireballs) {
        fireballs[i].y = fireballs[i].y + fireballs[i].dy;

        if (fireballs[i].y < -30) fireballs.splice(i,1);
    };


};

function render() {
    context.drawImage(fon, 0, 0, 800, 600);
    context.drawImage(ship, starship.x, starship.y, 80, 100);
    for( i in fireballs) {
        context.drawImage(fire, fireballs[i].x, fireballs[i].y, 15, 30);
    };
    for( i in aster) {
        context.drawImage(asteroid, aster[i].x, aster[i].y, 60, 40);
    };

    for ( i in expl) {
        context.drawImage(exp, 100*Math.floor(expl[i].animx), 100*Math.floor(expl[i].animy), 100, 100, expl[i].x, expl[i].y, 100, 100);
    };
    
};
