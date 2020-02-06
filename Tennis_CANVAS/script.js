'use strict';
var width =500;
var height=350;
var buttonX=10;
var buttonY=20;
var button=document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('value', 'Старт!');
button.style.cssText=' position:absolute;  left:'+ buttonX+'px; top:'+buttonY+'px';
document.body.appendChild(button);

var  posX=(width-buttonX)/2;
var posY=height/2;
var speedX = 0;
var speedY = 0;
var a=0;
var b=0;
var widthHand=10;
var heightHand=70;
var leftY= height/2-heightHand/2;
var speedLeftY=0;
var rightY= height/2-heightHand/2;
var speedRightY=0;
var radBall=15;
var fieldY=40;

var game=document.createElement('canvas');
game.setAttribute('width', width);
game.setAttribute('height', height);
game.setAttribute('id', 'CVA') ;
game.innerHTML='Обновите браузер';
document.body.appendChild(game);

function drawGame(){
  
 var cvs=document.getElementById('CVA');
 var context=cvs.getContext('2d');
 context.clearRect(0,0,width,height);
 context.fillStyle='black';
 var font=35;
 var countX=width/2-buttonX-font/2;
 var countY=30;
 context.font=font+'px Arial';

 function updateCount(){
   context.fillText(a+':'+b, countX, countY);
  } 

  updateCount()

 context.fillStyle='yellow';
 context.strokeStyle='black';

 context.fillRect(buttonX,fieldY , width-buttonX, height-fieldY);
 context.fillStyle='green';
 context.fillRect(buttonX,leftY , widthHand, heightHand);

 context.fillStyle='blue';
 context.fillRect(width-widthHand, rightY , widthHand, heightHand);
} 

function updateBall(){
  
 var cvs=document.getElementById('CVA');
 var context=cvs.getContext('2d');
 context.beginPath();
 context.fillStyle='red';
 context.arc(posX,posY,radBall, 0,Math.PI*2, false);
context.fill();
 context.closePath();
}

function start() {
  posX=  (width-buttonX)/2;
  posY=  height/2;

 speedX=1;
 speedY=2;
  
}

function startMove(EO) {
  EO=EO||window.event;
  if ( EO.keyCode== 16) {
    speedLeftY=-2;
  }
  
  if ( EO.keyCode== 17) {
    speedLeftY=2;
  }

  if (EO.keyCode== 38) {
    speedRightY=-2;
  }

  if (EO.keyCode== 40) {
    speedRightY=2;
  }
}

function endMove() {
  speedLeftY=0;
 speedRightY=0;
}

function tick() {
  
  drawGame();
  posX+=speedX;
  posY+=speedY;
  rightY+=speedRightY;
 leftY+=speedLeftY;

 if(speedX !=0 && speedY !=0) {
   //отскок от правой ракетки
   if( (posX+radBall) >=(width-widthHand) && (posY-radBall)>= (rightY+speedRightY) && (posY+radBall) <= (rightY+speedRightY+heightHand)) {
   speedX= -speedX;
  }

  if ( posX+radBall>=width) {
    speedX=0;
    speedY=0;
    a++; 
  }

  //отскок от левой ракетки
  if((posX-radBall)<=(buttonX+widthHand) && (posY-radBall)>= (leftY+speedLeftY) && (posY+radBall) <= (leftY+speedLeftY+heightHand)) {
    speedX= -speedX;
  }

  if ((posX-radBall)<buttonX) {
   
    speedX=0;
    speedY=0;
    b++;
  }

  
  if ( (posY+radBall)>(height)) {
    speedY=-speedY;
  }
  
  if ( (posY-radBall)<(fieldY)) {
    speedY=-speedY;
  }
}
 
 if(leftY <= fieldY) {
    leftY=fieldY
  }

 if ((leftY+heightHand) >= height) {
    leftY=height-heightHand;
  } 
if(rightY<= fieldY) {
    rightY=fieldY;
  } 
 if ( (rightY+heightHand) >= height) {
   rightY= height-heightHand;
  }
  updateBall();
  showWinner(); 
  requestAnimationFrame(tick);
}



function showWinner() {
  if (a==10) {
    alert('1 игрок выйграл!');
    a=0;
   b=0;
    posX=  (width-buttonX)/2;
   posY=  height/2;
   leftY=(height-fieldY)/2;
    rightY=(height-fieldY)/2;
  }
  if (b==10) {
    alert('2 игрок выйграл!');
   a=0;
   b=0;
    posX=  (width-buttonX)/2;
    posY=  height/2;
    leftY=(height-fieldY)/2;
    rightY=(height-fieldY)/2;
  }
  
}

var timer=0; 
window.onload =function() {
  
  button.addEventListener('click', start, false);
 addEventListener('keydown', startMove);

 addEventListener('keyup', endMove);
  var timer =requestAnimationFrame(tick);
  
} 