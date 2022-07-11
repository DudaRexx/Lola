const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var chao;
var corda;
var hortalica;
var link;

var himg;
var fundoimg;
var lola;
var lolaimg;

var botao;

var idle;
var eat;
var sad;

var air;
var comer;
var cortar;
var triste;
var fundo;

var balao;

var mute;

var corda2;
var link2;
var botao2;

function preload(){ 

  himg = loadImage("images/melon.png");
  fundoimg = loadImage("images/background.png");
  lolaimg = loadImage("images/rabbit1.png");

  idle = loadAnimation ("images/rabbit1.png", "images/rabbit2.png","images/rabbit3.png");
  eat = loadAnimation ("images/eat.png", "images/eat2.png","images/eat3.png","images/eat4.png");
  sad = loadAnimation ("images/sad_1.png","images/sad_2.png","images/sad_3.png");

  air = loadSound ("sounds/air.wav")
  comer = loadSound ("sounds/eating_sound.mp3");
  triste = loadSound ("sounds/sad.wav");
  fundo = loadSound ("sounds/sound1.mp3");
  cortar = loadSound ("sounds/rope_cut.mp3");

  eat.looping = false;
  sad.looping = false;

}

function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  var options = {
    isStatic: true
  }

  chao = Bodies.rectangle(250,690,500,20,options);
  World.add(world,chao);
  corda = new Rope(8,{x: 250, y: 30});
  corda2 = new Rope(6,{x: 370, y: 200});
  hortalica = Bodies.circle(300,300,15); 
  Composite.add (corda.body,hortalica);
  link = new Link(corda,hortalica);
  link2 = new Link(corda2,hortalica);

  lola = createSprite(450,600);
  idle.frameDelay = 15;
  lola.addAnimation("lolaimg",idle);
  lola.scale = 0.3;

  eat.frameDelay = 15;
  lola.addAnimation("eat",eat);
  sad.frameDelay = 15;
  lola.addAnimation("sad",sad);

  botao = createImg ("images/cut_btn.png");
  botao.size (50,50);
  botao.position(225,20);
  botao.mouseClicked(drop);

  botao2 = createImg ("images/cut_btn.png");
  botao2.size (50,50);
  botao2.position(340,200);
  botao2.mouseClicked(drop2);
  
  balao = createImg ("images/balloon.png");
  balao.size (120,80);
  balao.position (50,300);
  balao.mouseClicked(anemo);

  mute = createImg ("images/mute.png");
  mute.size(45,45);
  mute.position (20,650);
  mute.mouseClicked(mutar);


  fundo.play();
  fundo.setVolume(0.2);

}

function draw(){
  background(50);
  Engine.update(engine);

  rect(chao.position.x,chao.position.y,500,20);
  image(fundoimg,250,350,500,700);

  corda.show()
  corda2.show()

  if (hortalica != null){
    image(himg,hortalica.position.x,hortalica.position.y,60,60);
  }
  
  if (hortalica != null && hortalica.position.y > 650) {

    lola.changeAnimation("sad");

    triste.play();
    hortalica = null;

  }

  if (collide(hortalica,lola) === true) {

    lola.changeAnimation("eat");

    comer.play();

  }

  drawSprites()

}

function drop(){

  corda.break()
  link.break()
  link = null;
  cortar.play()

}

function drop2(){

  corda2.break()
  link2.break()
  link2 = null;
  cortar.play()

}

function collide (body,sprite) {

  if (body != null){
    var distacia = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)

    if (distacia <= 80){

      World.remove (world,hortalica);
      hortalica = null;

      return true;

    }

    else {

      return false;

    }

  }

}

function anemo() {

 Matter.Body.applyForce (hortalica,{x: 0, y: 0},{x: 0.03, y: 0});
 air.play();

}

function mutar (){

  if (fundo.isPlaying()){

    fundo.stop();

  }

  else {

    fundo.play();

  }


}