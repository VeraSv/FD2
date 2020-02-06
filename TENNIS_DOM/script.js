'use strict';
var game=document.createElement('div');
var width=500;
var height=350;
document.body.appendChild(game);

var divTitle=document.createElement('div');
var heightTitle=45;
divTitle.style.cssText='width:'+width+'px; height:'+heightTitle+'px'; 

var button=document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('value', 'Старт!');

game.appendChild(divTitle);
divTitle.appendChild(button);

var count=document.createElement('div');

var a=0;

var b=0;


var font=35;
function updateCount(){
 
count.innerHTML='<span id="count"; style="font-size:'+font+'px">'+a+':'+b+'</span>';
} 
count.style.cssText='margin-left:'+(width/2-button.offsetWidth-font)+'px; display:inline-block';
updateCount()
divTitle.appendChild(count);

var divField=document.createElement('div');
  
divField.style.cssText='width:'+width+'px; height:'+(height-heightTitle)+'px; background-color:yellow;  border:1px solid black;';

game.appendChild(divField);

var leftHand=document.createElement('div');
var handWidth=10;
var handHeight=70;

leftHand.style.cssText='width:'+handWidth+'px; height:'+handHeight+'px; background-color:green; position:absolute;  ';
divField.appendChild(leftHand);

var rightHand=document.createElement('div');

rightHand.style.cssText='width:'+handWidth+'px; height:'+handHeight+'px; background-color:blue; position:absolute; ';
divField.appendChild(rightHand);

var ball=document.createElement('div');
var widthBall=30;
ball.style.cssText='width:'+widthBall+'px; height:'+widthBall+'px; position: absolute; background-color:red; border-radius:50%';
divField.appendChild(ball);

var ballH={
  posX : width/2-widthBall/2,
  posY : height/2+widthBall/2,
  speedX : 0,
  speedY : 0,
  
  update : function() {
    ball.style.left=this.posX+"px";
    ball.style.top=this.posY+"px";
  }
}

var handH={
  leftY:height/2,
  rightY:height/2,
  speedLeft:0,
  speedRight:0,
  update: function(){
   leftHand.style.top=this.leftY+'px';
   leftHand.style.left='8px';
   rightHand.style.top=this.rightY+'px';
   rightHand.style.left=(divField.offsetWidth+divField.offsetLeft-handWidth)+'px';
  }
}
ballH.update();
handH.update();

function start() {
 
  ballH.posX =width/2-widthBall/2;
  ballH.posY =height/2+widthBall/2;

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
   
  handH.speedRight=0;
  handH.speedLeft=0;
}
  

function tick () {
 
 ballH.posX+=ballH.speedX;
 ballH.posY+=ballH.speedY;
 

  if(ballH.speedX !=0 && ballH.speedY !=0) {

    //отскок от правой ракетки
   if( (ballH.posX+widthBall) >=rightHand.offsetLeft && (ballH.posY+widthBall/2)>= rightHand.offsetTop && (ballH.posY+widthBall/2) <= (rightHand.offsetTop+handHeight)) {
      ballH.speedX= -ballH.speedX;
    }

    if ( ballH.posX+widthBall>(divField.offsetLeft+ width)) {
    
     ballH.speedX=0;
     ballH.speedY=0;
     a++; 
   
    }

    //отскок от левой ракетки
    if( ballH.posX <=(leftHand.offsetLeft+handWidth) && (ballH.posY+widthBall/2)>= leftHand.offsetTop && (ballH.posY+widthBall/2) <= (leftHand.offsetTop+handHeight)) {
      ballH.speedX= -ballH.speedX;
    }

    if ( ballH.posX<divField.offsetLeft) {
   ballH.posX=0;
   
     ballH.speedX=0;
     ballH.speedY=0;
     b++;
    
    }

  
    if ( ballH.posY+widthBall>(divField.offsetTop+height-heightTitle) ) {
      ballH.speedY=-ballH.speedY;
    }
  
    if ( ballH.posY<divField.offsetTop) {
      ballH.speedY=-ballH.speedY;
    }
  }
  ballH.update() ;

 handH.leftY+=handH.speedLeft;

  if(handH.leftY <= divField.offsetTop) {
        
   handH.leftY=divField.offsetTop;
  }

  if ((handH.leftY+handHeight) >= (divField.offsetTop    +height-heightTitle)) {
       
   handH.leftY=divField.offsetTop+height-heightTitle-handHeight;
  }

 handH.rightY+=handH.speedRight;
  if(handH.rightY <= divField.offsetTop) {
       
    handH.rightY=divField.offsetTop;
  } 
  if ((handH.rightY+handHeight) >= (divField.offsetTop+height-heightTitle)) {
      
    handH.rightY=divField.offsetTop+height-heightTitle-handHeight;
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
  
    
    ballH.posX=   width/2-widthBall/2;
  ballH.posY=  height/2+widthBall/2;
  ballH.update() ;
   handH.leftY=height/2;
   handH.rightY=height/2;
    rightHand.setAttribute('y',handH.leftY);
    leftHand.setAttribute('y',handH.rightY);

  }
  if (b==10) {
    alert('2 игрок выйграл!');
   
     a=0;
    b=0;
    
    ballH.posX=   width/2-widthBall/2;
    ballH.posY=  height/2+widthBall/2;
  ballH.update() ;
  handH.leftY=height/2;
  handH.rightY=height/2;
    rightHand.setAttribute('y',handH.leftY);
    leftHand.setAttribute('y',handH.rightY);
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

