'use strict';



function  ClockViewDom(name, left1, left2, left3 ) {
  var hours, minutes, seconds;
 var s=360/60;
 var h=360/12;
 var d=360/24;
 var radius=125; 

  var butTop3=350;
  var dom1Top=390;
  var id=name;
  var butLeft1=left1;
  var butLeft2=left2;
  var spanLeft=left3;
    
 this.divDom=document.createElement('div');
 this.divDom.style.cssText='display:inline-block;'
 this.divDom.setAttribute('id', id);
 document.body.appendChild(this.divDom);

 this.button=document.createElement('input');
 this.button.setAttribute('type', 'button');
 this.button.setAttribute('value', 'стоп');
 this.button.setAttribute('class', 'butStop');
 this.button.style.cssText=' position:absolute;  left:'+butLeft1+'px; top:'+ butTop3+'px';
 this.divDom.appendChild(this.button);

 this.button1=document.createElement('input');
 this.button1.setAttribute('type', 'button');
 this.button1.setAttribute('value', 'старт');
 this.button1.setAttribute('class', 'butStart');
 this.button1.style.cssText=' position:absolute;  left:'+butLeft2+'px; top:'+ butTop3+'px';
 this.divDom.appendChild(this.button1);

 this.divTag=document.createElement('div');
  this.divDom.appendChild(this.divTag);
 
  this.divTag.style.cssText='width:'+radius*2+'px; height:'+radius*2+'px; background-color:#20f963; border-radius:50%;  position:absolute;  left:'+butLeft1+'px; top:'+ dom1Top+'px';

  var storage={};

 for(var i=1, angle=(360/12); i<=12; i++, angle+=(360/12)) {
    storage[i]=document.createElement('div');
 
   storage[i].style.cssText='width:' +radius*0.3 +'px; height:'+radius*0.3+'px; background-color:#96ffd6; border-radius:50%; position:absolute'; 

   this.divTag.appendChild(storage[i]);
   var newSpan=document.createElement('span');
   newSpan.innerHTML=i;
   newSpan.style.cssText='position:absolute';
   storage[i].appendChild(newSpan);
  
   var ang=parseFloat(angle)/180*Math.PI;
   var centerX=this.divTag.offsetLeft+radius-butLeft1;
   var centerY=this.divTag.offsetTop+radius-dom1Top;
   var numberCenterX=centerX+radius*0.8*Math.sin(ang);
   var numberCenterY=centerY-radius*0.8*Math.cos(ang);
 
   storage[i].style.left=Math.round(numberCenterX-storage[i].offsetWidth/2)+'px';
   storage[i].style.top=Math.round(numberCenterY- storage[i].offsetHeight/2)+'px';
   newSpan.style.left= Math.round(storage[i].offsetWidth/2-newSpan.offsetWidth/2)+'px';
   newSpan.style.top=Math.round(storage[i].offsetHeight/2-newSpan.offsetHeight/2)+'px';
  }


 this.hourArrow=document.createElement('div');
 this.hourArrow.setAttribute('class', 'hourArrow');
 this.hourArrow.style.cssText='width:' +radius*0.04+'px; height:'+radius*0.6+'px; background-color:black; border-radius:'+radius*0.4+'px; position:absolute; '; 
 this.divTag.appendChild(this.hourArrow);
 this.hourArrow.style.left=this.divTag.offsetLeft+radius-butLeft1-this.hourArrow.offsetWidth/2+'px';
 this.hourArrow.style.top=this.divTag.offsetTop+radius-dom1Top-this.hourArrow.offsetHeight*0.8+'px';


 this.minuteArrow=document.createElement('div');
 this.minuteArrow.setAttribute('class', 'minuteArrow');
 this.minuteArrow.style.cssText='width:'+radius*0.02+'px; height:'+radius*0.8+'px; background-color:black; position:absolute;'; 
 this.divTag.appendChild(this.minuteArrow);
 this.minuteArrow.style.left=this.divTag.offsetLeft+radius-butLeft1-this.minuteArrow.offsetWidth/2+'px';
 this.minuteArrow.style.top=this.divTag.offsetTop+radius-dom1Top-this.minuteArrow.offsetHeight*0.9+'px';

 this.secondArrow=document.createElement('div');
 this.secondArrow.setAttribute('class', 'secondArrow');
 this.secondArrow.style.cssText='width:'+radius*0.01+'px; height:'+radius*0.9+'px; background-color:black; position:absolute;'; 
 this.divTag.appendChild(this.secondArrow);

 this.secondArrow.style.left=this.divTag.offsetLeft+radius-butLeft1-this.secondArrow.offsetWidth/2+'px';
 this.secondArrow.style.top=this.divTag.offsetTop+radius-dom1Top-this.secondArrow.offsetHeight*0.9+'px';

 this.newDayArrow=document.createElement('div');
 this.newDayArrow.setAttribute('class', 'newDayArrow');
 this.newDayArrow.style.cssText='width:'+radius*0.01+'px; height:'+radius*0.9+'px; background-color:red; position:absolute;';
 this.divTag.appendChild(this.newDayArrow);
 this.newDayArrow.style.left=this.divTag.offsetLeft+radius-butLeft1-this.newDayArrow.offsetWidth/2+'px'; 

 this.newDayArrow.style.top=this.divTag.offsetTop+radius-dom1Top-this.newDayArrow.offsetHeight*0.9+'px';

 var newText=document.createElement('span');
 newText.setAttribute('class', 'newText');
 this.divTag.appendChild(newText);
 newText.style.cssText='position:absolute; margin-top:'+radius*0.5+'px; margin-left:'+radius*0.65+'px; font-size:'+radius*0.2+'px';


 this.city=document.createElement('span');
   
 this.city.setAttribute('class', 'city');
 this.city.style.cssText=' position:absolute;  left:'+spanLeft+'px; top:'+ butTop3+'px';
 this.divDom.appendChild(this.city);

 
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
      newText.innerHTML=this.currTimeStr;

      this.hourArrow=myField.querySelector('.hourArrow');
      this.hourArrow.style.transformOrigin ='center '+this.hourArrow.offsetHeight*0.8+'px';
      this.hourArrow.style.transform='rotate('+Number((hours-12)*h+(minutes*h/60))+'deg)';
        
     this.newDayArrow=myField.querySelector('.newDayArrow');
     this.newDayArrow.style.transformOrigin='center '+this.newDayArrow.offsetHeight*0.9+'px';
     this.newDayArrow.style.transform='rotate('+Number(hours*d+minutes*d/60)+'deg)';

     this.secondArrow=myField.querySelector('.secondArrow');
     this.secondArrow.style.transformOrigin='center '+this.secondArrow.offsetHeight*0.9+'px';
     this.secondArrow.style.transform='rotate('+seconds*s+'deg)';

     this.minuteArrow=myField.querySelector('.minuteArrow');    
     this.minuteArrow.style.transformOrigin='center '+this.minuteArrow.offsetHeight*0.9+'px ';
     this.minuteArrow.style.transform='rotate('+minutes*s+'deg)';
    }   setInterval(this.updateTime,1000);
  }
}

