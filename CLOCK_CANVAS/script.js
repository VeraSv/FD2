'use strict'

var radius=125; //радиус часов
var hours, minutes, seconds;
var s=360/60;
var h=360/12;
var d=360/24;

var canvasTag=document.createElement('canvas');
canvasTag.setAttribute('width', radius*2.5);
canvasTag.setAttribute('height', radius*2.5);
canvasTag.setAttribute('id', 'CVA') ;
canvasTag.innerHTML='Обновите браузер';
document.body.appendChild(canvasTag);

function clock(){
 var cvs=document.getElementById('CVA');
 var context=cvs.getContext('2d');
 context.fillStyle='yellow';
 context.beginPath();
 context.arc(radius,radius, radius, 0,Math.PI*2, false);
 context.fill();

 for(var i=1, angle=(360/12); i<=12; i++, angle+=(360/12)) {
   var ang=parseFloat(angle)/180*Math.PI;
   var numberCenterX=radius+radius*0.8*Math.sin(ang);
   var numberCenterY=radius-radius*0.8*Math.cos(ang);

   context.fillStyle='#96ffd6';
   context.beginPath();
   context.arc(numberCenterX,numberCenterY, radius*0.15, 0,Math.PI*2, false); 
   context.fill();
  
   context.fillStyle='black';
   context.font=radius*0.15+'px Arial';
   context.textAlign='center';
   context.textBaseline='middle';
   context.fillText(i, numberCenterX, numberCenterY);
  }
}


function arrows(){
    
  var cvs=document.getElementById('CVA');
  var context=cvs.getContext('2d');

  //секундная стрелка
  context.strokeStyle='black';
  context.lineWidth=1;
  context.beginPath();
  context.moveTo(Math.round(radius+radius*0.1*Math.sin((seconds*s+180)/180*Math.PI)),Math.round(radius-radius*0.1*Math.cos((seconds*s+180)/180*Math.PI)));
  context.lineTo(Math.round(radius+radius*0.9*Math.sin(seconds*s/180*Math.PI)),Math.round(radius-radius*0.9*Math.cos(seconds*s/180*Math.PI)));
  context.stroke();

  //минутная стрелка
  context.strokeStyle='black';
  context.lineWidth=3;
  context.beginPath();
  context.moveTo(Math.round(radius+radius*0.1*Math.sin((minutes*s+180)/180*Math.PI)),Math.round(radius-radius*0.1*Math.cos((minutes*s+180)/180*Math.PI)));
  context.lineTo(Math.round(radius+radius*0.8*Math.sin(minutes*s/180*Math.PI)),Math.round(radius-radius*0.8*Math.cos(minutes*s/180*Math.PI)));
  context.stroke();

  //часовая стрелка
  context.strokeStyle='black';
  context.lineCap='round';
  context.lineWidth=5;
  context.beginPath();
  context.moveTo(Math.round(radius+radius*0.1*Math.sin(((hours-12)*h+(minutes*h/60)+180)/180*Math.PI)),Math.round(radius-radius*0.1*Math.cos(((hours-12)*h+(minutes*h/60)+180)/180*Math.PI)));
  context.lineTo(Math.round(radius+radius*0.4*Math.sin(((hours-12)*h+(minutes*h/60))/180*Math.PI)),Math.round(radius-radius*0.4*Math.cos(((hours-12)*h+(minutes*h/60))/180*Math.PI)));
  context.stroke();

  //24-часовая стрелка
  context.strokeStyle='red';
  context.lineWidth=2;
  context.beginPath();
  context.moveTo(Math.round(radius+radius*0.1*Math.sin(((hours*d+minutes*d/60)+180)/180*Math.PI)),Math.round(radius-radius*0.1*Math.cos(((hours*d+minutes*d/60)+180)/180*Math.PI)));
  context.lineTo(Math.round(radius+radius*0.9*Math.sin((hours*d+minutes*d/60)/180*Math.PI)),Math.round(radius-radius*0.9*Math.cos((hours*d+minutes*d/60)/180*Math.PI)));
  context.stroke();

}

function updateTime() {
 var cvs=document.getElementById('CVA');
 var context=cvs.getContext('2d');
 clock();

 var currTime=new Date();
 var currTimeStr=formatDateTime(currTime);

 function formatDateTime(dt) {
    hours=dt.getHours();
    minutes=dt.getMinutes();
    seconds=dt.getSeconds();
    return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
  }

  function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
      strVal='0'+strVal;
    return strVal;
  }

 context.fillStyle='black';
 context.font=radius*0.2+'px Arial';
 context.fillText(currTimeStr, radius, radius-radius*0.4);
 arrows();

 setTimeout(updateTime,1000);
}

window.onload= function time() {
updateTime();
}
