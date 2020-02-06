 'use strict'

function  Clock(city,t) {
 
  var myView=null;
  this.myCity=city;
  var timeZone=t;
  this.currTime1=new Date();
  this.currTime=new Date(this.currTime1.getTime()+timeZone);
  
  this.timer=0;
 
 
  this.start=function() {
  
   this.timer=setInterval((
   ()=>{
     this.currTime1=new Date();
     this.currTime=new Date(this.currTime1.getTime()+timeZone)
   
   }),1000)
  }

  this.stop=function(){
   clearInterval(this.timer);
   this.timer=0;
    
  }
}
