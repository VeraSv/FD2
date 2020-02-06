'use strict';


var divTag=document.createElement('div');
document.body.appendChild(divTag);
var radius=125; //радиус часов
 
divTag.style.cssText='width:'+radius*2+'px; height:'+radius*2+'px; background-color:#20f963; border-radius:50%;';

var storage={};

for(var i=1, angle=(360/12); i<=12; i++, angle+=(360/12)) {
 storage[i]=document.createElement('div');
 
  storage[i].style.cssText='width:' +radius*0.3 +'px; height:'+radius*0.3+'px; background-color:#96ffd6; border-radius:50%; position:absolute'; 

  divTag.appendChild(storage[i]);
  var newSpan=document.createElement('span');
  newSpan.innerHTML=i;
  newSpan.style.cssText='position:absolute';
  storage[i].appendChild(newSpan);
  
  var ang=parseFloat(angle)/180*Math.PI;
  var centerX=divTag.offsetLeft+radius;
  var centerY=divTag.offsetTop+radius;
  var numberCenterX=centerX+radius*0.8*Math.sin(ang);
  var numberCenterY=centerY-radius*0.8*Math.cos(ang);
 
 storage[i].style.left=Math.round(numberCenterX-storage[i].offsetWidth/2)+'px';
 storage[i].style.top=Math.round(numberCenterY- storage[i].offsetHeight/2)+'px';
  newSpan.style.left= Math.round(storage[i].offsetWidth/2-newSpan.offsetWidth/2)+'px';
  newSpan.style.top=Math.round(storage[i].offsetHeight/2-newSpan.offsetHeight/2)+'px';
}


var hourArrow=document.createElement('div');
hourArrow.style.cssText='width:' +radius*0.04+'px; height:'+radius*0.6+'px; background-color:black; border-radius:'+radius*0.4+'px; position:absolute; '; 
divTag.appendChild(hourArrow);
hourArrow.style.left=divTag.offsetLeft+radius-hourArrow.offsetWidth/2+'px';
hourArrow.style.top=divTag.offsetTop+radius-hourArrow.offsetHeight*0.8+'px';


var minuteArrow=document.createElement('div');
minuteArrow.style.cssText='width:'+radius*0.02+'px; height:'+radius*0.8+'px; background-color:black; position:absolute;'; 
divTag.appendChild(minuteArrow);
minuteArrow.style.left=divTag.offsetLeft+radius-minuteArrow.offsetWidth/2+'px';
minuteArrow.style.top=divTag.offsetTop+radius-minuteArrow.offsetHeight*0.9+'px';

var secondArrow=document.createElement('div');
secondArrow.style.cssText='width:'+radius*0.01+'px; height:'+radius*0.9+'px; background-color:black; position:absolute;'; 
divTag.appendChild(secondArrow);

secondArrow.style.left=divTag.offsetLeft+radius-secondArrow.offsetWidth/2+'px';
secondArrow.style.top=divTag.offsetTop+radius-secondArrow.offsetHeight*0.9+'px';

var newDayArrow=document.createElement('div');
newDayArrow.style.cssText='width:'+radius*0.01+'px; height:'+radius*0.9+'px; background-color:red; position:absolute;';
divTag.appendChild(newDayArrow);
newDayArrow.style.left=divTag.offsetLeft+radius-newDayArrow.offsetWidth/2+'px'; //24-часовая стрелка
newDayArrow.style.top=divTag.offsetTop+radius-newDayArrow.offsetHeight*0.9+'px';


var newText=document.createElement('span');
divTag.appendChild(newText);
newText.style.cssText='position:absolute; margin-top:'+radius*0.5+'px; margin-left:'+radius*0.65+'px; font-size:'+radius*0.2+'px';




function updateTime() {
  var hours, minutes, seconds;
 var s=360/60;
 var h=360/12;
 var d=360/24;

   
  var currTime=new Date();
  var currTimeStr=formatDateTime(currTime);
  newText.innerHTML=currTimeStr;

  secondArrow.style.transformOrigin='center '+secondArrow.offsetHeight*0.9+'px';
  secondArrow.style.transform='rotate('+seconds*s+'deg)';
        
  minuteArrow.style.transformOrigin='center '+minuteArrow.offsetHeight*0.9+'px ';
  minuteArrow.style.transform='rotate('+minutes*s+'deg)';
        
  hourArrow.style.transformOrigin ='center '+hourArrow.offsetHeight*0.8+'px';
  hourArrow.style.transform='rotate('+Number((hours-12)*h+(minutes*h/60))+'deg)';
        
  newDayArrow.style.transformOrigin='center '+newDayArrow.offsetHeight*0.9+'px';
  newDayArrow.style.transform='rotate('+Number(hours*d+minutes*d/60)+'deg)';
        
    

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
}