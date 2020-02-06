'use strict';

function  ClockViewSVG(name, left1, left2, left3 , top1, top2) {


 var hours, minutes, seconds;
 var s=360/60;
 var h=360/12;
 var d=360/24;

 var radiusSvg=125; 

  var id=name;
  var butLeft1=left1;
  var butLeft2=left2;
  var spanLeft=left3;
  var butTop=top1;
  
 var svgTop=top2;

 var divSvg=document.createElement('div');
 divSvg.style.cssText='display:inline-block;';
 divSvg.setAttribute('id', id);
 divSvg.style.position='absolute';
 divSvg.style.left=butLeft1+'px';
 divSvg.style.top=svgTop+'px';
 document.body.appendChild(divSvg);

 var button=document.createElement('input');
 button.setAttribute('type', 'button');
 button.setAttribute('value', 'стоп');
 button.setAttribute('class', 'butStop');
 button.style.cssText=' position:absolute;  left:'+butLeft1+'px; top:'+ butTop+'px';
 divSvg.appendChild(button);

 var button=document.createElement('input');
 button.setAttribute('type', 'button');
 button.setAttribute('value', 'старт');
 button.setAttribute('class', 'butStart');
 button.style.cssText=' position:absolute;  left:'+butLeft2+'px; top:'+ butTop+'px';
 divSvg.appendChild(button);

 var city=document.createElement('span'); 
 city.setAttribute('class', 'city');
 city.style.cssText=' position:absolute;  left:'+spanLeft+'px; top:'+ butTop+'px';
 divSvg.appendChild(city);

 var svgTag=document.createElementNS("http://www.w3.org/2000/svg",'svg');
 divSvg.appendChild(svgTag);
 svgTag.setAttribute('width', radiusSvg*2);
 svgTag.setAttribute('height', radiusSvg*2);
 svgTag.setAttribute('xmlns', 'http://www.w3.org/2000/svg') ;
 svgTag.style.position='absolute';
 svgTag.style.left=butLeft1+'px';
 svgTag.style.top=svgTop+'px';
 var circle=document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');

 circle.setAttribute('cx',radiusSvg);
 circle.setAttribute('cy',radiusSvg);
 circle.setAttribute('ry',radiusSvg);
 circle.setAttribute('rx',radiusSvg);
 circle.setAttribute('fill','yellow');
 circle.setAttribute('stroke','blue');

 svgTag.appendChild(circle);

 var storageSvg={};

 for(var i=1, angle=(360/12); i<=12; i++, angle+=(360/12)) {
   storageSvg[i]=document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
 
    storageSvg[i].setAttribute('ry',radiusSvg*0.15);
   storageSvg[i].setAttribute('rx',radiusSvg*0.15);
   storageSvg[i].setAttribute('fill','#96ffd6');
   storageSvg[i].setAttribute('stroke','blue');
  
   svgTag.appendChild(storageSvg[i]);
   var newTextSvg=document.createElementNS("http://www.w3.org/2000/svg", 'text');
   newTextSvg.innerHTML=i;
   svgTag.appendChild(newTextSvg);
  
   var ang=parseFloat(angle)/180*Math.PI;
   var numberCenterXSvg=radiusSvg+radiusSvg*0.8*Math.sin(ang);
   var numberCenterYSvg=radiusSvg-radiusSvg*0.8*Math.cos(ang);
 
   storageSvg[i].setAttribute('cx',numberCenterXSvg);
   storageSvg[i].setAttribute('cy',numberCenterYSvg);
   newTextSvg.setAttribute('x',numberCenterXSvg);
   newTextSvg.setAttribute('y',numberCenterYSvg);
   newTextSvg.setAttribute('text-anchor','middle');
   newTextSvg.setAttribute('dominant-baseline', 'middle');
   newTextSvg.style.fontSize=radiusSvg*0.15+'px';
  }

 var hourArrowSvg=document.createElementNS("http://www.w3.org/2000/svg", 'line');
 hourArrowSvg.setAttribute('x1',radiusSvg);
 hourArrowSvg.setAttribute('y1',radiusSvg+radiusSvg*0.1);
 hourArrowSvg.setAttribute('x2',radiusSvg);
 hourArrowSvg.setAttribute('y2',radiusSvg-radiusSvg*0.4);
 hourArrowSvg.setAttribute('stroke', 'black');
 hourArrowSvg.setAttribute('stroke-width', 5);
 hourArrowSvg.setAttribute('stroke-linecap','round');
 svgTag.appendChild(hourArrowSvg);

 var minuteArrowSvg=document.createElementNS("http://www.w3.org/2000/svg", 'line');
 minuteArrowSvg.setAttribute('x1',radiusSvg);
 minuteArrowSvg.setAttribute('y1',radiusSvg+radiusSvg*0.1);
 minuteArrowSvg.setAttribute('x2',radiusSvg);
 minuteArrowSvg.setAttribute('y2',radiusSvg-radiusSvg*0.7);
 minuteArrowSvg.setAttribute('stroke', 'black');
 minuteArrowSvg.setAttribute('stroke-width', 3);
 svgTag.appendChild(minuteArrowSvg);

 var secondArrowSvg=document.createElementNS("http://www.w3.org/2000/svg", 'line');
 secondArrowSvg.setAttribute('x1',radiusSvg);
 secondArrowSvg.setAttribute('y1',radiusSvg+radiusSvg*0.1);
 secondArrowSvg.setAttribute('x2',radiusSvg);
 secondArrowSvg.setAttribute('y2',radiusSvg-radiusSvg*0.8);
 secondArrowSvg.setAttribute('stroke', 'black');
 secondArrowSvg.setAttribute('stroke-width', 1);
 svgTag.appendChild(secondArrowSvg);

 var newDayArrowSvg=document.createElementNS("http://www.w3.org/2000/svg", 'line');
 newDayArrowSvg.setAttribute('x1',radiusSvg);
 newDayArrowSvg.setAttribute('y1',radiusSvg+radiusSvg*0.1);
 newDayArrowSvg.setAttribute('x2',radiusSvg);
 newDayArrowSvg.setAttribute('y2',radiusSvg-radiusSvg*0.8);
 newDayArrowSvg.setAttribute('stroke', 'red');
 newDayArrowSvg.setAttribute('stroke-width', 2);
 svgTag.appendChild(newDayArrowSvg);

 var newTextTimeSvg=document.createElementNS("http://www.w3.org/2000/svg", 'text');
 newTextTimeSvg.setAttribute('x',radiusSvg-radiusSvg*0.35);
 newTextTimeSvg.setAttribute('y',radiusSvg-radiusSvg*0.3);
 newTextTimeSvg.style.fontSize=radiusSvg*0.2+'px';
 svgTag.appendChild(newTextTimeSvg);



 function timer(){
   secondArrowSvg.setAttribute('transform','rotate('+ seconds*s+' '+radiusSvg+' '+radiusSvg+')');
        
   minuteArrowSvg.setAttribute('transform','rotate('+minutes*s+' '+radiusSvg+' '+radiusSvg+')');
          
   hourArrowSvg.setAttribute('transform','rotate('+Number((hours-12)*h+(minutes*h/60))+' '+radiusSvg+' '+radiusSvg+')');
          
   newDayArrowSvg.setAttribute('transform','rotate('+Number(hours*d+minutes*d/60)+' '+radiusSvg+' '+radiusSvg+')');
  }

 var myModel=null;
  var myField=null;

  this.start=function (model,field) {
    myModel=model;
   myField=field
    
  }

  this.updateTime=function() {
      
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
      newTextTimeSvg.innerHTML=this.currTimeStr;
      timer();
      setInterval(this.updateTime,1000);
    }
  }
}
