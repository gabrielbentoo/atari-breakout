let bola;
let raquete;
let tijolos = [];
let linhas = 4;
let colunas = 8;
let larguraTijolo = 60;
let alturaTijolo = 20;
let espacamento = 5;
let pontuacao = 0;
let vidas = 3;
let estadoJogo = "serve";

function setup(){
    createCanvas(600, 600);

    //bola
    bola = {
        x: width /2,
        y: height -200,
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
    fill("255");
    textSize(16);
    text("Score: " + pontuacao, 20, 20);
    text("Vidas: " + vidas, 20, 40);

    //mostrar tijolos
    for (let i = 0; i < tijolos.length; i++) {
        fill(tijolos[i].color);
        rect(tijolos[i].x, tijolos[i].y, tijolos[i].w, tijolos[i].h);
    }

    //bola
    ellipseMode(RADIUS); 
    fill("white");
    ellipse(bola.x, bola.y, bola.r);

    //raquete
    rectMode(CENTER);
    fill("yellow");
    rect (raquete.x, raquete.y, raquete.w, raquete.h);

    //movimento da raquete
    raquete.x = constrain(mouseX, raquete.w /2, width - raquete.w /2);
    

    if (estadoJogo === "serve") {
        textSize(18);
        text("Clique na tela para começar!", 200, height /2);
        bola.x = width /2;
        bola.y = height -200;
        bola.vx = 0;
        bola.vy = 0;
    }
    if (estadoJogo === "play") {
        // movimento da bola
        bola.x = bola.x + bola.vx;
        bola.y = bola.y + bola.vy;

        //colisao da bola
        if (bola.x - bola.r < 0 || bola.x + bola.r > width) bola.vx *= -1;
        if (bola.y - bola.r <0 ) bola.vy *= -1;

        

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
        

        //colisao com tijolos
        for (let i= tijolos.length - 1; i >= 0; i-- ) {
            let b = tijolos[i];


            if (bola.x + bola.r > b.x && bola.x - bola.r < b.x + b.w &&
                bola.y + bola.r > b.y && bola.y - bola.r < b.y + b.h )
                {
                bola.vy *= -1;
                pontuacao += 5;
                tijolos.splice(i, 1);
                break;
            }
        }
        //se cair no fundo
        if (bola.y - bola.r > height) {
            vidas--;
            if (vidas > 0){
                estadoJogo = "serve";
            }
            else {
                estadoJogo = "over";
            }
        }
    }
    if (estadoJogo === "over") {
        textSize(24);
        text("Você perdeu.", width /2 -70, height /2);
    }
    if (tijolos.length === 0 && estadoJogo === "play") {
        textSize(24);
        text("Parabéns, você venceu!", width /2 -120, height /2);
        bola.vx = 0;
        bola.vy = 0;
        estadoJogo = "end";
    }
 
}

function mousePressed() {
    if (estadoJogo === "serve") {
        // direção/movimento da bola
        bola.vx = random(-4, 4);
        bola.vy = 4;
        estadoJogo = "play";
    }
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
