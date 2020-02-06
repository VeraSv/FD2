'use strict'

function ClockViewCanvas(name, nameCanvas, left1, left2, left3 ) {

var hours, minutes,  seconds;
var s=360/60;
var h=360/12;
var d=360/24;
var radius=125; 

var id=name;
var idCanvas= nameCanvas;
var butLeft1=left1;
var butLeft2=left2;
var spanLeft=left3;

var divCanvas=document.createElement('div');
divCanvas.style.cssText='display:inline-block;';
divCanvas.setAttribute('id', id);
document.body.appendChild(divCanvas);


var clockY=30;
var butTop=50;
var canvTop=80;


var button=document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('value', 'стоп');
button.setAttribute('class', 'butStop');
button.style.cssText=' position:absolute;  left:'+butLeft1+'px; top:'+butTop+'px';
divCanvas.appendChild(button);

var button=document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('value', 'старт');
button.setAttribute('class', 'butStart');
button.style.cssText=' position:absolute;  left:'+butLeft2+'px; top:'+butTop+'px';
divCanvas.appendChild(button);

var canvasTag=document.createElement('canvas');
canvasTag.style.cssText=' position:absolute;  left:'+butLeft1+'px;  top:'+canvTop+'px';
canvasTag.setAttribute('width', radius*2);
canvasTag.setAttribute('height', radius*2);
canvasTag.setAttribute('id', idCanvas) ;
canvasTag.innerHTML='Обновите браузер';
divCanvas.appendChild(canvasTag);

var city=document.createElement('span');
city.setAttribute('class', 'city');
city.style.cssText=' position:absolute;  left:'+spanLeft+'px; top:'+butTop+'px';
divCanvas.appendChild(city);
   
   
function  drawClock(){
 var cvs=document.getElementById(idCanvas);
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


function  arrows(){
    
  var cvs=document.getElementById(idCanvas);
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

 var myModel=null;
  var myField=null;

  this.start=function (model,field) {
    myModel=model;
   myField=field
    
  }
   
  
  
  this.updateTime=function() {
  
    var cvs=document.getElementById(idCanvas);
    var context=cvs.getContext('2d');
    drawClock();
      
    this.formatDateTime=function (dt) {
      hours=dt.getUTCHours();
      minutes=dt.getUTCMinutes();
      seconds=dt.getUTCSeconds();
      return this.str0l(hours,2) + ':' + this.str0l(minutes,2) + ':' + this.str0l(seconds,2);
    }

    this.str0l=function (val,len) {
      var strVal=val.toString();
      while ( strVal.length < len )
      strVal='0'+strVal;
     return strVal;
    }
    if(myModel) {
      myField.querySelector('.city').innerHTML=myModel.myCity;

      this.currTimeStr=this.formatDateTime(myModel.currTime);
      var cvs=document.getElementById(idCanvas);
      var context=cvs.getContext('2d');
      context.fillStyle='black';
      context.font=radius*0.2+'px Arial';
      context.fillText(this.currTimeStr, radius, radius-radius*0.4);
 
      arrows();
    }
   setInterval(this.updateTime,1000);
    
  }
 
}
