'use strict'

var radius=125; //радиус часов

var svgTag=document.createElementNS("http://www.w3.org/2000/svg",'svg');
document.body.appendChild(svgTag);

 
svgTag.setAttribute('width', radius*2);
svgTag.setAttribute('height', radius*2);
svgTag.setAttribute('xmlns', 'http://www.w3.org/2000/svg') ;
var circle=document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
circle.setAttribute('cx',radius);
circle.setAttribute('cy',radius);
circle.setAttribute('ry',radius);
circle.setAttribute('rx',radius);
circle.setAttribute('fill','yellow');
circle.setAttribute('stroke','blue');

svgTag.appendChild(circle);

var storage={};

for(var i=1, angle=(360/12); i<=12; i++, angle+=(360/12)) {
 storage[i]=document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
 
  storage[i].setAttribute('ry',radius*0.15);
  storage[i].setAttribute('rx',radius*0.15);
  storage[i].setAttribute('fill','#96ffd6');
  storage[i].setAttribute('stroke','blue');
  
  svgTag.appendChild(storage[i]);
  var newText=document.createElementNS("http://www.w3.org/2000/svg", 'text');
  newText.innerHTML=i;
  svgTag.appendChild(newText);
  
  var ang=parseFloat(angle)/180*Math.PI;
  var numberCenterX=radius+radius*0.8*Math.sin(ang);
  var numberCenterY=radius-radius*0.8*Math.cos(ang);
 
 storage[i].setAttribute('cx',numberCenterX);
 storage[i].setAttribute('cy',numberCenterY);
  newText.setAttribute('x',numberCenterX);
  newText.setAttribute('y',numberCenterY);
  newText.setAttribute('text-anchor','middle');
  newText.setAttribute('dominant-baseline', 'middle');
  newText.style.fontSize=radius*0.15+'px';
}



   
var hourArrow=document.createElementNS("http://www.w3.org/2000/svg", 'line');
hourArrow.setAttribute('x1',radius);
hourArrow.setAttribute('y1',radius+radius*0.1);
hourArrow.setAttribute('x2',radius);
hourArrow.setAttribute('y2',radius-radius*0.4);
hourArrow.setAttribute('stroke', 'black');
hourArrow.setAttribute('stroke-width', 5);
hourArrow.setAttribute('stroke-linecap','round');
svgTag.appendChild(hourArrow);


var minuteArrow=document.createElementNS("http://www.w3.org/2000/svg", 'line');
minuteArrow.setAttribute('x1',radius);
minuteArrow.setAttribute('y1',radius+radius*0.1);
minuteArrow.setAttribute('x2',radius);
minuteArrow.setAttribute('y2',radius-radius*0.7);
minuteArrow.setAttribute('stroke', 'black');
minuteArrow.setAttribute('stroke-width', 3);
svgTag.appendChild(minuteArrow);

var secondArrow=document.createElementNS("http://www.w3.org/2000/svg", 'line');
secondArrow.setAttribute('x1',radius);
secondArrow.setAttribute('y1',radius+radius*0.1);
secondArrow.setAttribute('x2',radius);
secondArrow.setAttribute('y2',radius-radius*0.8);
secondArrow.setAttribute('stroke', 'black');
secondArrow.setAttribute('stroke-width', 1);
svgTag.appendChild(secondArrow);

var newDayArrow=document.createElementNS("http://www.w3.org/2000/svg", 'line');
newDayArrow.setAttribute('x1',radius);
newDayArrow.setAttribute('y1',radius+radius*0.1);
newDayArrow.setAttribute('x2',radius);
newDayArrow.setAttribute('y2',radius-radius*0.8);
newDayArrow.setAttribute('stroke', 'red');
newDayArrow.setAttribute('stroke-width', 2);
svgTag.appendChild(newDayArrow);


var newTextTime=document.createElementNS("http://www.w3.org/2000/svg", 'text');

newTextTime.setAttribute('x',radius-radius*0.35);
newTextTime.setAttribute('y',radius-radius*0.3);
newTextTime.style.fontSize=radius*0.2+'px';

svgTag.appendChild(newTextTime);
var hours, minutes, seconds;
 var s=360/60;
 var h=360/12;
 var d=360/24;

function timer(){
  secondArrow.setAttribute('transform','rotate('+ seconds*s+' '+radius+' '+radius+')');
        
  minuteArrow.setAttribute('transform','rotate('+minutes*s+' '+radius+' '+radius+')');
          
  hourArrow.setAttribute('transform','rotate('+Number((hours-12)*h+(minutes*h/60))+' '+radius+' '+radius+')');
          
  newDayArrow.setAttribute('transform','rotate('+Number(hours*d+minutes*d/60)+' '+radius+' '+radius+')');
  setTimeout('timer()',1000);
}

function updateTime() {
     
  var currTime=new Date();
  var currTimeStr=formatDateTime(currTime);
  newTextTime.innerHTML=currTimeStr;
   

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
  setTimeout('updateTime()',1000);
}

window.onload= function time() {
  updateTime();
  timer();
}
