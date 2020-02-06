'use strict'

function    ClockControllerButtons() {
  
  var myModel=null;
  var myField=null;

   
  this.start=function(model,field)  {
    myModel=model;
    myField=field;
   var buttonStop=myField.querySelector('.butStop');
    buttonStop.addEventListener('click', this.butStop,false);

    var buttonStart=myField.querySelector('.butStart');
    buttonStart.addEventListener('click', this.butStart,false);
  }

  this.butStop=function() {
    myModel.stop();
  }
  this.butStart=function() {
    myModel.start();
  }
}
