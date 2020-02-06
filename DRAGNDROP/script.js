"use strict";

window.onload=function(EO) {
 EO=EO||window.event;

var divTag=document.getElementById('divTag');
var img=document.getElementsByTagName('img');

var x,y;
  
for(var i=0; i<img.length; i++){
  x=img[img.length-1-i].offsetLeft;
  y=img[img.length-1-i].offsetTop;
    
  img[img.length-1-i].style.position='absolute';
  img[img.length-1-i].style.left=x.toString()+'px';
  img[img.length-1-i].style.top=y.toString()+'px';
  
}
}

divTag.addEventListener('mousedown',imgMouseDown, false);
 
var draggetImg=null;

var clickX, clickY;

function imgMouseDown(EO) {
 EO=EO||window.event;
 draggetImg=EO.target;
 
 draggetImg.ondragstart = function() {
   return false;
  }
  draggetImg.style.cursor='pointer';

  divTag.appendChild(draggetImg);
  clickX = Math.round(EO.pageX-draggetImg.offsetLeft);
  clickY = Math.round(EO.pageY -draggetImg.offsetTop);

  document.onmousemove=function(EO) {
   EO=EO||window.event;
 
   draggetImg.style.left= Math.round(EO.pageX-clickX)+'px';
   draggetImg.style.top= Math.round(EO.pageY-clickY)+'px';
  }

  draggetImg.onmouseup=function(EO) {
   EO=EO||window.event;
   document.onmousemove=null; 
   draggetImg.onmouseup=null;
  }
}
