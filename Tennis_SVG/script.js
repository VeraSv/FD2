'use strict';

var width =500;
var height=350;
var svgTag =document.createElementNS('http://www.w3.org/2000/svg','svg');

document.body.appendChild(svgTag);

svgTag.setAttribute('width', width);
svgTag.setAttribute('height',  height);

svgTag.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
var buttonX=10;
var buttonY=20;
var button=document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('value', 'Старт!');
button.style.cssText=' position:absolute;  left:'+ buttonX+'px; top:'+buttonY+'px';
document.body.appendChild(button);

var count=document.createElementNS('http://www.w3.org/2000/svg', 'text');
var font=35;
var countX=width/2-buttonX-font/2;
var countY=30;
var a=0;
var b=0;
function updateCount(){
 
count.innerHTML=a+':'+b;
} 

updateCount()

count.setAttribute('x',countX);
count.setAttribute('y',countY);
count.style.cssText='font-size:'+font;

svgTag.appendChild(count);

var field=document.createElementNS('http://www.w3.org/2000/svg', 'rect');
var fieldY=40;
field.setAttribute('x',buttonX);
field.setAttribute('y',fieldY);
field.setAttribute('width',width-buttonX);
field.setAttribute('height',height-fieldY);
field.setAttribute('stroke','black');
field.setAttribute('fill','yellow');
svgTag.appendChild(field);

var leftHand=document.createElementNS('http://www.w3.org/2000/svg', 'rect');
var widthHand=10;
var heightHand=70;
leftHand.setAttribute('x',buttonX);
leftHand.setAttribute('width',widthHand);
leftHand.setAttribute('height',heightHand);
leftHand.setAttribute('fill','green');
svgTag.appendChild(leftHand);

var rightHand=document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rightHand.setAttribute('x',width-widthHand);
rightHand.setAttribute('width',widthHand);
rightHand.setAttribute('height',heightHand);
rightHand.setAttribute('fill','blue');
svgTag.appendChild(rightHand);

var ball=document.createElementNS('http://www.w3.org/2000/svg', 'circle');
var radBall=15;
ball.setAttribute('cx',(width-buttonX)/2);
ball.setAttribute('cy',height/2);
ball.setAttribute('r',radBall);
ball.setAttribute('fill','red');
svgTag.appendChild(ball);


var ballH={
  posX : (width-buttonX)/2,
  posY : height/2,
  speedX : 0,
  speedY : 0,
  
  update : function() { 
   ball.setAttribute('cx',this.posX);
   ball.setAttribute('cy',this.posY);
  }
}

var handH={
  leftY:(height-fieldY)/2,
  rightY:(height-fieldY)/2,
  speedLeft:0,
  speedRight:0,
  update: function(){
    leftHand.setAttribute('y',this.leftY);
   rightHand.setAttribute('y',this.rightY);
  }
}
ballH.update();
handH.update();


function start() {
  ballH.posX=  (width-buttonX)/2;
  ballH.posY=  height/2;
  ballH.speedX=1;
  ballH.speedY=2;
}

function startMove(EO) {
  EO=EO||window.event;
  if ( EO.keyCode== 16) {
    handH.speedLeft=-2;
  }
  
  if ( EO.keyCode== 17) {
    handH.speedLeft=2;
  }

  if (EO.keyCode== 38) {
   handH.speedRight=-2;
  }

  if (EO.keyCode== 40) {
   handH.speedRight=2;
  }
}



function endMove() {
  handH.speedLeft=0;
  handH.speedRight=0;
}

function tick() {
 
  ballH.posX+=ballH.speedX;
  ballH.posY+=ballH.speedY;
  handH.rightY+=handH.speedRight;

  handH.leftY+=handH.speedLeft;

  if(ballH.speedX !=0 && ballH.speedY !=0) {
 
 //отскок от правой ракетки
 if( (ballH.posX+radBall) >=(width-widthHand) && (ballH.posY-radBall)>= (handH.rightY+handH.speedRight) && (ballH.posY+radBall) <= (handH.rightY+handH.speedRight+heightHand)) {
  ballH.speedX= -ballH.speedX;
 }

  if ( ballH.posX+radBall>=width) {
    ballH.speedX=0;
    ballH.speedY=0;
    a++; 
  }

  //отскок от левой ракетки
  if((ballH.posX-radBall)<=(buttonX+widthHand) && (ballH.posY-radBall)>= (handH.leftY+handH.speedLeft) && (ballH.posY+radBall) <= (handH.leftY+handH.speedLeft+heightHand)) {
    ballH.speedX= -ballH.speedX;
  }

  if ((ballH.posX-radBall)<buttonX) {
    ballH.speedX=0;
    ballH.speedY=0;
    b++;
  }

  
  if ( (ballH.posY+radBall)>(height)) {
    ballH.speedY=-ballH.speedY;
  }
  
  if ( (ballH.posY-radBall)<(fieldY)) {
    ballH.speedY=-ballH.speedY;
  }
}
 ballH.update();
  if(  (handH.leftY) <= fieldY) {
    handH.leftY=fieldY;
    } 

    if ((handH.leftY+heightHand) >= height) {
     handH.leftY= height-heightHand;
    }
   
   if(  (handH.rightY) <= fieldY) {
     handH.rightY=fieldY;

    }

    if ( (handH.rightY+heightHand) >= height) {
       handH.rightY=height-heightHand;
    } 
 
  handH.update();
  showWinner(); 
  requestAnimationFrame(tick);
}



function showWinner() {
  if (a==10) {
    alert('1 игрок выйграл!');
    a=0;
    b=0;
    count.innerHTML= a+':'+b;
    ballH.posX=  (width-buttonX)/2;
    ballH.posY=  height/2;
   handH.leftY=(height-fieldY)/2;
    handH.rightY=(height-fieldY)/2;
  }
  if (b==10) {
    alert('2 игрок выйграл!');
     a=0;
    b=0;
    count.innerHTML= a+':'+b;
    ballH.posX=  (width-buttonX)/2;
   ballH.posY=  height/2;
   handH.leftY=(height-fieldY)/2;
  handH.rightY=(height-fieldY)/2;
  }
   updateCount();
}


var timer=0; 
window.onload =function() {
  button.addEventListener('click', start, false);
 addEventListener('keydown', startMove);
 addEventListener('keyup', endMove);
  var timer =requestAnimationFrame(tick);
  
} 


