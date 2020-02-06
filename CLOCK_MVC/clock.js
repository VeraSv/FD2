'use strict'
var city1='Берлин (GMT+1)';
var timeZone1=3600000;

var city2='Минск (GMT+3)';
var timeZone2=3600000*3;

var id1='clock1';
var id2='clock2';

var city3='Нью-Йорк (GMT-5)';
var timeZone3=-3600000*5;

var city4='Лондон (GMT)';
var timeZone4=0;

var id3='clock3';
var id4='clock4';

var city5='Токио (GMT+9)';
var timeZone5=3600000*9;

var city6='Владивосток (GMT+10)';
var timeZone6=3600000*10

var id5='clock5';
var id6='clock6';

var model1= new Clock(city1,timeZone1);
var model2= new Clock(city2,timeZone2);
var model3= new Clock(city3,timeZone3);
var model4= new Clock(city4,timeZone4);
var model5= new Clock(city5,timeZone5);
var model6= new Clock(city6,timeZone6);
var view1= new ClockViewCanvas(id1,'CVA',0,50,110);
var view2= new ClockViewCanvas(id2,'CVA1',270,320,380);
var view3= new ClockViewDom(id3,0,50,110);
var view4= new ClockViewDom(id4,270,320,380);
var view5= new ClockViewSVG(id5,280,330,390, 0,45);
var view6= new ClockViewSVG(id6,280,330,390, 150,195);

var controller1= new ClockControllerButtons ();
var containerElem1=document.getElementById('clock1');
controller1.start(model1,containerElem1);

var controller2= new ClockControllerButtons ();
var containerElem2=document.getElementById('clock2');
controller2.start(model2,containerElem2);

var controller3= new ClockControllerButtons ();
var containerElem3=document.getElementById('clock3');
controller3.start(model3,containerElem3);

var controller4= new ClockControllerButtons ();
var containerElem4=document.getElementById('clock4');
controller4.start(model4,containerElem4);

var controller5= new ClockControllerButtons ();
var containerElem5=document.getElementById('clock5');
controller5.start(model5,containerElem5);

var controller6= new ClockControllerButtons ();
var containerElem6=document.getElementById('clock6');
controller6.start(model6,containerElem6);

model1.start();
model2.start();
view1.start(model1,containerElem1);
view2.start(model2,containerElem2);
model3.start();
model4.start();
view3.start(model3,containerElem3);
view4.start(model4,containerElem4);
model5.start();
model6.start();
view5.start(model5,containerElem5);
view6.start(model6,containerElem6);

 
window.onload= function() {
  view1.updateTime();
  view2.updateTime();
  view3.updateTime();
  view4.updateTime();
  view5.updateTime();
  view6.updateTime();
  
}
