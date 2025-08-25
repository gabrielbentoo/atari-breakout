let bola;
let raquete;
let tijolos = [];
let linhas = 4;
let colunas = 8;
let larguraTijolo = 60;
let alturaTijolo = 20;
let espacamento = 5;


function setup(){
    createCanvas(600, 600);

    //bola
    bola = {
        x: width /2,
        y: height /2,
        r:10,
        vx:0,
        vy:0
    };

    //raquete
    raquete = {
        x: width /2,
        y: height -20,
        w: 100,
        h: 10
    };

    criarTijolos();
   
}

function draw() {
    background(0);

    //bola
    ellipseMode(RADIUS); 
    fill("white");
    ellipse(bola.x, bola.y, bola.r);

    //raquete
    rectMode(CENTER);
    fill("yellow");
    rect (raquete.x, raquete.y, raquete.w, raquete.h);

    // movimento da bola
    bola.x = bola.x + bola.vx;
    bola.y = bola.y + bola.vy;

    //colisao da bola
    if (bola.x - bola.r < 0 || bola.x + bola.r > width) bola.vx *= -1;
    if (bola.y - bola.r <0 ) bola.vy *= -1;

    //movimento da raquete
    raquete.x = constrain(mouseX, raquete.w /2, width - raquete.w /2);

    //colisao da raquete
    if (bola.y + bola.r > raquete.y - raquete.h /2 && 
        bola.y + bola.r < raquete.y + raquete.h /2 &&
        bola.x > raquete.x - raquete.w /2 &&
        bola.x <raquete.x + raquete.w /2
    ) {
        bola.vy *= -1;
        let diff = bola.x - raquete.x;
        bola.vx = diff * 0.1;
    }
    //mostrar tijolos
    for (let i = 0; i < tijolos.length; i++) {
        fill(tijolos[i].color);
        rect(tijolos[i].x, tijolos[i].y, tijolos[i].w, tijolos[i].h);
    }
 
}

function mousePressed() {
     // direção/movimento da bola
    bola.vx = random(-4, 4);
    bola.vy = 4;
}

function criarTijolos() {
    tijolos = [];
    let larguraTotal = colunas * (larguraTijolo + espacamento) - espacamento;
    let startX = (width - larguraTotal) -15;
    for (let r = 0; r < linhas; r++) {
        for (let c = 0; c < colunas; c++) {

            tijolos.push ({
                x: startX + c * (larguraTijolo + espacamento),
                y: 80 + r * alturaTijolo,
                w: larguraTijolo - espacamento,
                h: alturaTijolo -5,
                color: [random(100,255), random(100,255), random(100,255)]
            });
        }
    }
    
}
