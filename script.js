'use strict'

var count;
var save=[];
var info={};
var noteLeft=50;
var changedMusic=false;
function befUnload(EO) {
  EO=EO||window.event;
  if ( changedMusic )
    EO.returnValue='А у вас есть несохранённые изменения!';
  };
var audioSound= new Audio();
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName='SVISTUN_SOUNDS_STORAGE';
var updatePassword;
     
$.ajax({
  url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
  data : { f : 'READ' ,n : stringName, },
  uccess : readReady, error : errorHandler
});
    
function readReady(callresult) {
  if ( callresult.error!=undefined )
  alert(callresult.error);
  else  {
  info=JSON.parse(callresult.result);
 
  }
}
function getInfo() {
  updatePassword=Math.random();
  $.ajax( {
    url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'LOCKGET',  n : stringName, p : updatePassword },  success : lockGetReady, error : errorHandler
  } );
}
function lockGetReady(callresult) {
        
  if ( callresult.error!=undefined )
  alert(callresult.error);
  else {
    var a=prompt('Введите название');
          
    if(a) {
      a=a.replace(/^\s*|\s(?=\s)/g,'');
      if(a){
        animateClef();
        info[a]=save;
      }
    }
  }
  $.ajax( {
    url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'UPDATE',  n : stringName, v : JSON.stringify(info),  p : updatePassword },
    success : updateReady, error : errorHandler
  } );
}
function updateReady(callresult) {
  if ( callresult.error!=undefined )
  alert(callresult.error);
  
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}
var keySound;
function animateClef() {
  var imgClef=document.createElement('img');
  imgClef.setAttribute('class', 'imgClef');
  imgClef.setAttribute('src', 'img/trebleClef.png');
  imgClef.style.position='absolute';
  imgClef.style.width='40px';
  imgClef.style.height='60px';
  imgClef.style.transform='translateZ(0)';
  imgClef.style.transitionDuration='2s';
  imgClef.style.webkitTransitionDuration='2s';
  imgClef.style.transitionTimingFunction='linear';
  imgClef.style.webkitTransitionTimingFunction='linear';
  imgClef.style.left=( document.documentElement.clientWidth *0.47-40*0.5)+'px';
  imgClef.style.top=(document.documentElement.clientHeight*0.35-60*0.5)+'px';
  document.body.appendChild( imgClef);
}
var RAF=window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback)
{ window.setTimeout(callback, 1000 / 60);} ;

var timer=RAF(startSound)

function startSound() {
  var sharp=document.getElementsByClassName('sharp');
  var note=document.getElementsByClassName('note');
  for (var i=0; i< sharp.length; i++) {
    sharp[i].style.left=noteLeft+'px';
    if (sharp[i].offsetLeft<=50) {
     sharp[i].style.opacity='0';
    }      
  }
  for (let i=0; i< note.length; i++) {
    note[i].style.left=noteLeft+'px'
    if (note[i].offsetLeft<=50) {
      note[i].style.opacity='0';
    }
  }
 
  var imgClef= document.getElementsByClassName('imgClef');
  for (let i=0; i<  imgClef.length; i++) {
   imgClef[i].style.left= '120px';
   imgClef[i].style.top='0px';
   imgClef[i].style.opacity='0';
  }
  
  if( keySound)  {
    
   for(let i=1; i<info[keySound].length; i+=2) {
      
     if(count==info[keySound][i]){
        if(audioSound.canPlayType("audio/mpeg")=="probably")
       audioSound.src='audio/'+info[keySound][i-1]+'.mp3';
       else  audioSound.src='audio/'+info[keySound][i-1]+'.ogg';
       audioSound.currentTime=0;
       audioSound.play(); 
      }
       
    }
  }
   
  count++; 
  RAF(startSound)
}

window.onhashchange=switchToStateFromURLHash;
var SPAState={};
function switchToStateFromURLHash() {
 
 document.body.style.backgroundColor='#87CEFA';
  var URLHash=window.location.hash;
  var stateStr=URLHash.substr(1);
  if ( stateStr!="" ) { 
    var parts=stateStr.split("_")
    SPAState={ pagename: parts[0] }; 
  }
  else  SPAState={pagename:'Main'};

  var pageHTML="<input type=button class='main' value='Главная' onclick='switchToMainPage()'> <input type=button class='page1' value='Сохраненные мелодии' onclick='switchToMusicPage()'> ";
  
  switch ( SPAState.pagename ) {
    case 'Main':
 
    function drawPiano(){
      if(document.documentElement.clientWidth>1200){
        var widthKey=15;
        var heightKey=70;
        var nOctave=7;
        var  widthPiano=735;
        
      } else if(document.documentElement.clientWidth<=1200 && document.documentElement.clientWidth>=992){
       widthKey=45;
       heightKey=100;
       nOctave=3;
       widthPiano=945;
    
      } else if(document.documentElement.clientWidth<992 && document.documentElement.clientWidth >630){
       widthKey=45;
       heightKey=100;
       nOctave=2;
       widthPiano=630;
        
      }else {
        
       widthKey=45;
       heightKey=100;
       nOctave=1;
       widthPiano=315;
      }

      var pianoLeft=document.documentElement.clientWidth *0.5-widthPiano*0.5;
      var widthNotes=350;
      var notesLeft=document.documentElement.clientWidth *0.5-widthNotes*0.5;
      var heightNotes=200;
      var heightLine=9;
      var leftLine=10;
      var trebleClefWidth=40;
      var trebleClefHeight=60;
      var note;
      var sharp;
      var titleLeft=230;
      var titleTop=5;
      var font=22;
      var noteWidth=13;
      var heightPiano=70;
      var notes= document.createElement('div');
      var trebleClef=document.createElement('img');
      var bassClef=document.createElement('img');
      var map=document.createElement('img');
      map.setAttribute('src', 'img/map.png');
      map.style.position='absolute';
      map.style.margin='none'
      map.style.width='0px';
      map.style.height=document.documentElement.clientHeight+'px';
      map.style.transform='translateZ(0)';
      map.style.transitionDuration='2s';
      map.style.webkitTransitionDuration='2s';
      map.style.boxSizing='border-box';
      map.style.backgroundSize='cover'
      map.style.transitionTimingFunction='linear';
      map.style.webkitTransitionTimingFunction='linear';
      map.style.zIndex=20;
      map.style.left=document.documentElement.clientWidth +'px';
      map.style.top='0px';
      document.body.appendChild( map);
      map.onclick=closeMap;
      var arrow=document.createElement('div');
      arrow.innerText='◄';
      arrow.style.boxSizing='border-box';
      arrow.style.pudding='none'
      arrow.style.position='absolute';
      arrow.style.zIndex=10;
      arrow.style.cursor='pointer';
      arrow.style.right='0px';
      arrow.style.top=document.documentElement.clientHeight*0.1+'px';
      document.body.appendChild(arrow);
      arrow.onclick=openMap; 
      function  openMap() {  
        if( map.style.width=='0px') {
          map.style.width=document.documentElement.clientWidth+'px';
          map.style.left='0px';  
        }
      }
      function  closeMap(){
        map.style.width='0px'
        map.style.left=document.documentElement.clientWidth +'px';
      } 
    
      var butStart=document.createElement('button');
      butStart.style.backgroundColor='#E0FFFF';
      butStart.innerHTML='Записать';
      butStart.style.position='absolute';
      butStart.style.left='0px';
      butStart.style.top='25px'
      document.body.appendChild(butStart);
       
      var butStop=document.createElement('button');
      butStop.style.backgroundColor='#E0FFFF';
      butStop.innerHTML='Стоп';
      butStop.style.position='absolute';
      butStop.style.left='80px';
      butStop.style.top='25px'
      document.body.appendChild(butStop);
     
      function buttonStart() {
        keySound=null
       butStart.style.backgroundColor='#00FF7F';
       count=0;
       changedMusic=true
      }
     window.onbeforeunload=befUnload;

      function buttonStop() {
        changedMusic=false  
       butStart.style.backgroundColor='#E0FFFF';
        getInfo();
              
      }
      
      //нотный стан

      var  lineH={
        line:[],
        note:[]
      }
    
      if(window.innerHeight<300) {
       notes.style.border='none'; 
       bassClef.style.height=0+'px';
       var topNotes=document.documentElement.clientHeight*0.03;
        lines()

      } else  {
       bassClef.style.height=trebleClefHeight*0.6+'px';
       topNotes=document.documentElement.clientHeight*0.2;
        notes.style.border=' solid black 1px'; 
        notes.style.backgroundColor='white';
        lines();
        bassLines(); 
      } 
      notes.style.width= widthNotes+'px';
      notes.style.height= heightNotes+'px';
      notes.style.boxSizing='border-box';
      notes.style.position='absolute';
      notes.style.left=notesLeft+'px';
      notes.style.top=topNotes+ 'px';
 
      document.body.appendChild(notes);
      function lines() {
        for (let i=1; i<5; i++) {
          lineH.line[i]=document.createElement('div');
          lineH.line[i].style.border=' solid black 1px'; lineH.line[i].style.width=widthNotes*0.6+'px';
          lineH.line[i].style.height=heightNotes*0.05+'px';
          lineH.line[i].style.position='absolute';
          lineH.line[i].style.boxSizing='border-box';
          lineH.line[i].style.left=leftLine+'px';
          lineH.line[i].style.top=(heightNotes*0.23+heightLine*i)+'px';
          notes.appendChild(lineH.line[i]);
        }
      }

      function bassLines() {
        for (let i=1; i<5; i++) {
         lineH.line[i]=document.createElement('div');
         lineH.line[i].style.border=' solid black 1px'; lineH.line[i].style.width=widthNotes*0.6+'px';
         lineH.line[i].style.height=heightNotes*0.05+'px';
         lineH.line[i].style.position='absolute';
         lineH.line[i].style.boxSizing='border-box';
         lineH.line[i].style.left=leftLine+'px';
         lineH.line[i].style.top=heightNotes*0.5+heightLine*i+'px';
         notes.appendChild(lineH.line[i]);
        }
      }
      //скрипичный ключ
    
      trebleClef.setAttribute('src', 'img/trebleClef.png');
      trebleClef.style.position='absolute';
      trebleClef.style.width=trebleClefWidth+'px';
      trebleClef.style.height=trebleClefHeight+'px';
      trebleClef.style.left=leftLine+ 'px';
      trebleClef.style.top=heightNotes*0.23+'px';
      notes.appendChild(trebleClef);
      //басовый ключ
  
      bassClef.setAttribute('src', 'img/bassClef.png');
      bassClef.style.position='absolute';
      bassClef.style.width=trebleClefWidth+'px';
      bassClef.style.left=leftLine*1.5+'px';
      bassClef.style.top=heightNotes*0.53+'px';
      notes.appendChild(bassClef);
  
     //дополнительные линии
      var lineC5=document.createElement('div');
      lineC5.setAttribute('class', 'line');
      lineC5.style.position='absolute';
      lineC5.style.width=noteWidth*13+'px';
      lineC5.style.height='0px';
      lineC5.style.left=leftLine*5+'px'; 
      lineC5.style.top=heightNotes*0.18+'px';
      lineC5.style.border='1px solid black';
      notes.appendChild(lineC5);

      var lineA4=document.createElement('div');
      lineA4.setAttribute('class', 'line');
      lineA4.style.position='absolute';
      lineA4.style.width=noteWidth*13+'px';
      lineA4.style.height='0px';
      lineA4.style.left=leftLine*5+'px'; 
      lineA4.style.top=heightNotes*0.23+'px';
      lineA4.style.border='1px solid black';
      notes.appendChild(lineA4);

      var lineC3=document.createElement('div');
      lineC3.setAttribute('class', 'line');
      lineC3.style.position='absolute';
      lineC3.style.width=noteWidth*13+'px';
      lineC3.style.height='0px';
      lineC3.style.left=leftLine*5+'px'; 
      lineC3.style.top=heightNotes*0.499+'px';
      lineC3.style.border='1px solid black';
      notes.appendChild(lineC3);

      var lineE1=document.createElement('div');
      lineE1.setAttribute('class', 'line');
      lineE1.style.position='absolute';
      lineE1.style.width=noteWidth*13+'px';
      lineE1.style.height='0px';
      lineE1.style.left=leftLine*5+'px'; 
      lineE1.style.top=heightNotes*0.77+'px';
      lineE1.style.border='1px solid black';
      notes.appendChild(lineE1);
      //названия нот
      var title=document.createElement('div');
      title.style.position='absolute';
      title.style.left=titleLeft+'px'
      title.style.top=titleTop+'px'
      title.style.lineHeight=font+'px';
      title.style.fontSize=font+'px';
      notes.appendChild(title);

      var spanC=document.createElement('span')
      spanC.innerHTML='C До<br>';
  
      var spanC1=document.createElement('span')
      spanC1.innerHTML='C# До# (Ре&#9837)<br>';
 
      var spanD=document.createElement('span')
      spanD.innerHTML='D Ре <br>';
  
      var spanD1=document.createElement('span')
      spanD1.innerHTML='D# Ре# (Ми&#9837)<br>';

      var spanE=document.createElement('span')
      spanE.innerHTML='E Ми <br>';
 
      var spanF=document.createElement('span')
      spanF.innerHTML='F Фа <br>';
 
      var spanF1=document.createElement('span');
      spanF1.innerHTML='F# Фа# (Соль&#9837)<br>';

      var spanG=document.createElement('span')
      spanG.innerHTML='G Соль <br>';
 
      var spanG1=document.createElement('span')
      spanG1.innerHTML='G# Соль# (Ля&#9837)<br>';

      var spanA=document.createElement('span')
      spanA.innerHTML='A Ля <br>';
 
      var spanA1=document.createElement('span')
      spanA1.innerHTML='A# Ля# (Си&#9837)<br>';
 
      var spanH=document.createElement('span')
      spanH.innerHTML='H Си <br>';
 
      function DrawNotes(t) {
   
       this.top=t;
        this.noteLeft=190;
       this.note= document.createElement('div');
       this.note.setAttribute('class','note');
       this.note.style.border='1px solid black';
       this.note.style.borderRadius='50%';
       this.note.style.width=noteWidth+'px';
       this.note.style.height=heightNotes*0.05+'px';
       this.note.setAttribute('class','note')
       this.note.style.boxSizing='border-box';
       this.note.style.backgroundColor='black';
       this.note.style.position='absolute';
       this.note.style.top=this.top+'px';
       this.note.style.left=this.noteLeft+'px';
       this.note.style.transform='translateZ(0)';
       this.note.style.transitionDuration='3s';
       this.note.style.webkitTransitionDuration='3s';
       this.note.style.transitionTimingFunction='linear';
       this.note.style.webkitTransitionTimingFunction='linear';    
       notes.appendChild(this.note);
      }
 
     function DrawSharp(t) {
       this.top=t;
       this.sharpLeft=180;
       this.sharp=document.createElement('div');
       this.sharp.setAttribute('class', 'sharp');
       this.sharp.style.position='absolute';
       this.sharp.style.left=this.sharpLeft+'px';
        this.sharp.style.top=this.top+'px';
        this.sharp.innerHTML='#'; 
        this.sharp.style.transform='translateZ(0)';
        this.sharp.style.transitionDuration='2.7s';
        this.sharp.style.webkitTransitionDuration='2.7s';
        this.sharp.style.transitionTimingFunction='linear';
       this.sharp.style.webkitTransitionTimingFunction='linear';
       notes.appendChild(this.sharp);
      }
 
      var piano=document.createElement('div');
      piano.setAttribute('class', 'piano')
      piano.style.width=widthPiano+'px';
      piano.style.height=heightPiano+'px';
      piano.style.position='relative';
      piano.style.left=pianoLeft+'px';
      piano.style.top=(document.documentElement.clientHeight -heightPiano*1.5)+'px' ;
      document.body.appendChild(piano);
      //клавиши
      function KeyPiano(){
       this.keyH={
         octave:['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'],
         id: "",
         whitekeys:0,
         keys : {} 
        }
  
        for (let i = 0; i <nOctave; i++) {
          for (let j = 0; j < 12; j++) {
            this.keyH.keys[j] = document.createElement('div');
            this.keyH.keys[j].style.border = "1px solid black";
            this.keyH.keys[j].style.position = "absolute";
            if(nOctave==1 || nOctave==2) {
              this.keyH.keys[j].id =this.keyH.octave[j]+(i+3);  
            } else if(nOctave==3) {
              this.keyH.keys[j].id =this.keyH.octave[j]+(i+2);
            } else this.keyH.keys[j].id =this.keyH.octave[j]+i;
            switch(j%12) {
              case 1:
              case 3:
              case 6:
              case 8:
              case 10:
              this.keyH.keys[j].style.backgroundColor = 'black';
              this.keyH.keys[j].style.left = ((widthKey* this.keyH.whitekeys) - widthKey/2)+'px';
              this.keyH.keys[j].style.width = widthKey*0.8 + "px";
              this.keyH.keys[j].style.height =heightKey*0.6+ "px";
              this.keyH.keys[j].style.zIndex = 1;
              this.keyH.keys[j].setAttribute('class', 'blackKey')
              break;
              default:
              this.keyH.keys[j].style.left = (widthKey*this.keyH.whitekeys) + 'px';
              this.keyH.keys[j].setAttribute('class' , 'whiteKey');
              this.keyH.keys[j].style. backgroundColor= 'white' ;
              this.keyH.keys[j].style.width = widthKey+ "px";
              this.keyH.keys[j].style.height = heightKey+"px";
              this.keyH.whitekeys++;
            }
            piano.appendChild(this.keyH.keys[j]);
          } 
        }

       this.play=function(EO){
         EO=EO||window.event;
         this.key=EO.target; 

         if(this.key.className=="whiteKey") {
           this.key.style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
          } else  this.key.style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
 
         if(this.key.id == 'C0' || this.key.id ==  'C1' ||     this.key.id == 'C2' || this.key.id ==  'C3' || this.key.id ==  'C4' || this.key.id == 'C5' || this.key.id == 'C6')  {
           title.appendChild(spanC);
          } 
         if(this.key.id == 'C#0' || this.key.id ==  'C#1' || this.key.id == 'C#2' || this.key.id ==  'C#3' ||this.key.id ==   'C#4' || this.key.id == 'C#5' ||this.key.id ==  'C#6')  {
           title.appendChild(spanC1);
          } 
         if (this.key.id == 'D0' ||this.key.id ==   'D1' || this.key.id == 'D2' || this.key.id ==  'D3' || this.key.id ==  'D4' ||this.key.id ==  'D5' ||this.key.id ==  'D6')  {
           title.appendChild(spanD);
          }
         if (this.key.id == 'D#0' ||this.key.id ==   'D#1' || this.key.id == 'D#2' || this.key.id ==  'D#3' ||this.key.id ==   'D#4' ||this.key.id ==  'D#5' || this.key.id == 'D#6')  {
           title.appendChild(spanD1);
          }
         if(this.key.id == 'E0' || this.key.id ==  'E1' ||this.key.id ==  'E2' || this.key.id ==  'E3' || this.key.id ==  'E4' || this.key.id == 'E5' ||this.key.id ==  'E6')  {
           title.appendChild(spanE);
          }
         if(this.key.id == 'F0' || this.key.id ==  'F1' || this.key.id == 'F2' || this.key.id ==  'F3' || this.key.id ==  'F4' || this.key.id == 'F5' ||this.key.id ==  'F6')  {
           title.appendChild(spanF);
          }
         if(this.key.id == 'F#0' || this.key.id ==  'F#1' || this.key.id == 'F#2' || this.key.id ==  'F#3' || this.key.id ==  'F#4' || this.key.id == 'F#5' ||this.key.id ==  'F#6')  {
           title.appendChild(spanF1);
          }
         if(this.key.id == 'G0' || this.key.id ==  'G1' ||this.key.id ==  'G2' || this.key.id ==  'G3' ||  this.key.id == 'G4' || this.key.id == 'G5' || this.key.id == 'G6')  {
           title.appendChild(spanG);
          }
         if(this.key.id == 'G#0' || this.key.id ==  'G#1' ||this.key.id ==  'G#2' || this.key.id ==  'G#3' ||  this.key.id == 'G#4' || this.key.id == 'G#5' || this.key.id == 'G#6')  {
           title.appendChild(spanG1);
          }
         if(this.key.id == 'A0' || this.key.id ==  'A1' ||this.key.id ==  'A2' ||  this.key.id == 'A3' ||this.key.id ==   'A4' ||this.key.id ==  'A5' || this.key.id == 'A6')  {
           title.appendChild(spanA);
          }
         if(this.key.id == 'A#0' || this.key.id ==  'A#1' ||this.key.id ==  'A#2' ||  this.key.id == 'A#3' ||this.key.id ==   'A#4' ||this.key.id ==  'A#5' || this.key.id == 'A#6')  {
           title.appendChild(spanA1);
          }
         if(this.key.id == 'H0' || this.key.id ==  'H1' ||this.key.id ==  'H2' || this.key.id ==  'H3' || this.key.id ==  'H4' ||this.key.id ==  'H5' ||this.key.id ==  'H6')  {
           title.appendChild(spanH);
          }
         if(this.key.id == 'H6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H6.mp3';
            else  audioSound.src='audio/H6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('H6');
             save.push(count);
            }
          }
         if(this.key.id == 'A#6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A16.mp3';
           else  audioSound.src='audio/A16.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('A16');
             save.push(count);
            }
          }
         if(this.key.id == 'A6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A6.mp3';
           else  audioSound.src='audio/A6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('A6');
             save.push(count);
           }
          }
         if(this.key.id == 'G#6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G16.mp3';
           else  audioSound.src='audio/G16.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('G16');
             save.push(count);
           }
          }
          if(this.key.id == 'G6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G6.mp3';
           else  audioSound.src='audio/G6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('G6');
             save.push(count);
            }
          }
         if(this.key.id == 'F#6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F16.mp3';
           else  audioSound.src='audio/F16.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('F16');
             save.push(count);
           }
          }
         if(this.key.id == 'F6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F6.mp3';
           else  audioSound.src='audio/F6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('F6');
             save.push(count);
            }
          }
         if(this.key.id == 'E6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E6.mp3';
           else  audioSound.src='audio/E6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('E6');
             save.push(count);
            }
          }
         if(this.key.id == 'D#6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D16.mp3';
           else  audioSound.src='audio/D16.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('D16');
             save.push(count);
            }
          }
         if(this.key.id == 'D6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D6.mp3';
           else  audioSound.src='audio/D6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('D6');
             save.push(count);
            }
          }
         if(this.key.id == 'C#6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/C16mp3';
            else  audioSound.src='audio/C16.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('C16');
             save.push(count);
            }
          }
          if(this.key.id == 'C6') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C6.mp3';
           else  audioSound.src='audio/C6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('C6');
             save.push(count);
            }
          }
         if(this.key.id == 'H5') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H5.mp3';
           else  audioSound.src='audio/H5.ogg';
           audioSound.currentTime=0;  
	          audioSound.play();
           if(count) {
             save.push('H5');
             save.push(count);
            }
          }
         if(this.key.id == 'A#5') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A15.mp3';
           else  audioSound.src='audio/A15.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            if(count) {
             save.push('A15');
             save.push(count);
           }
          }
         if(this.key.id == 'A5') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A5.mp3';
           else  audioSound.src='audio/A5.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('A5');
             save.push(count);
           }
          }
          if(this.key.id == 'G#5') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G15.mp3';
           else  audioSound.src='audio/G15.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
           if(count) {
             save.push('G15');
             save.push(count);
            }
          }
          if(this.key.id == 'G5') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G5.mp3';
           else  audioSound.src='audio/G5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('G5');
             save.push(count);
            }
          }
         if(this.key.id == 'F#5') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F15.mp3';
           else  audioSound.src='audio/F15.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
           if(count) {
             save.push('F15');
             save.push(count);
            }
          }
         if(this.key.id == 'F5') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/F5.mp3';
            else  audioSound.src='audio/F5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('F5');
             save.push(count);
            }
          }
         if(this.key.id == 'E5') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E5.mp3';
           else  audioSound.src='audio/E5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('E5');
             save.push(count);
            }
         }
         if(this.key.id == 'D#5') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/D15.mp3';
           else  audioSound.src='audio/D15.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
           if(count) {
             save.push('D15');
             save.push(count);
            }
          }
         if(this.key.id == 'D5') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D5.mp3';
           else  audioSound.src='audio/D5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            if(count) {
             save.push('D5');
             save.push(count);
            }
          }
         if(this.key.id == 'C#5') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C15.mp3';
            else  audioSound.src='audio/C15.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
            var note=new DrawNotes(31);
            var sharp=new DrawSharp(28)
           if(count) {
              save.push('C15');
              save.push(count);
            }
          }
          if(this.key.id == 'C5') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C5.mp3';
           else  audioSound.src='audio/C5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(31);
           if(count) {
             save.push('C5');
             save.push(count);
            }
          }
          if(this.key.id == 'H4') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H4.mp3';
           else  audioSound.src='audio/H4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(37);
           if(count) {
             save.push('H4');
             save.push(count);
            }
          }
         if(this.key.id == 'A#4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A14.mp3';
           else  audioSound.src='audio/A14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(42);
           var sharp=new DrawSharp(39)
           if(count) {
             save.push('A14');
             save.push(count);
            }
          }
         if(this.key.id == 'A4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/A4.mp3';
            else  audioSound.src='audio/A4.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(42);
           if(count) {
             save.push('A4');
             save.push(count);
            }
          }
          if(this.key.id == 'G#4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G14.mp3';
           else  audioSound.src='audio/G14.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(47);
           var sharp=new DrawSharp(44);
           if(count) {
             save.push('G14');
             save.push(count);
            }
          }
         if(this.key.id == 'G4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G4.mp3';
            else  audioSound.src='audio/G4.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(47);
           if(count) {
             save.push('G4');
             save.push(count);
            }
          }
         if(this.key.id == 'F#4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F14.mp3';
           else  audioSound.src='audio/F14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(50);
           var sharp=new DrawSharp(47);
           if(count) {
             save.push('F14');
             save.push(count);
            }
          }
         if(this.key.id == 'F4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F4.mp3';
           else  audioSound.src='audio/F4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(50);
           if(count) {
             save.push('F4');
             save.push(count);
            }
          }
          if(this.key.id == 'E4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E4.mp3';
            else  audioSound.src='audio/E4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(54);
           if(count) {
             save.push('E4');
             save.push(count);
            }
          }
          if(this.key.id == 'D#4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D14.mp3';
           else  audioSound.src='audio/D14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(59);
            var sharp=new DrawSharp(56);
            if(count) {
             save.push('D14');
             save.push(count);
            }
          }
          if(this.key.id == 'D4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D4.mp3';
           else  audioSound.src='audio/D4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(59);
           if(count) {
             save.push('D4');
             save.push(count);
            }
          }
         if(this.key.id == 'C#4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C14.mp3';
           else  audioSound.src='audio/C14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(63);
           var sharp=new DrawSharp(60);
           if(count) {
             save.push('C14');
             save.push(count);
            }
          }
         if(this.key.id == 'C4') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C4.mp3';
            else  audioSound.src='audio/C4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(63);
           if(count) {
             save.push('C4');
              save.push(count);
            }
          }
         if(this.key.id == 'H3') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H3.mp3';
            else  audioSound.src='audio/H3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(68);
           if(count) {
             save.push('H3');
              save.push(count);
            }
          }
         if(this.key.id == 'A#3') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A13.mp3';
           else  audioSound.src='audio/A13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(72);
           var sharp=new DrawSharp(69);
           if(count) {
             save.push('A13');
              save.push(count);
            }
          }
         if(this.key.id == 'A3') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A3.mp3';
            else  audioSound.src='audio/A3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(72);
           if(count) {
              save.push('A3');
              save.push(count);
            }
          }
          if(this.key.id == 'G#3') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G13.mp3';
           else  audioSound.src='audio/G13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(78);
            var sharp=new DrawSharp(75);
           if(count) {
             save.push('G13');
             save.push(count);
            }
          }
         if(this.key.id == 'G3') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G3.mp3';
           else  audioSound.src='audio/G3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(78);
            if(count) {
             save.push('G3');
             save.push(count);
            }
          }
         if(this.key.id == 'F#3') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F13.mp3';
            else  audioSound.src='audio/F13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(82);
           var sharp=new DrawSharp(79);
           if(count) {
             save.push('F13');
             save.push(count);
            }
          }
          if(this.key.id == 'F3') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/F3.mp3';
           else  audioSound.src='audio/F3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(82);
           if(count) {
             save.push('F3');
             save.push(count);
            }
          }
         if(this.key.id == 'E3') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/E3.mp3';
           else  audioSound.src='audio/E3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(87);
            if(count) {
             save.push('E3');
             save.push(count);
            }
          }
         if(this.key.id == 'D#3') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/D13.mp3';
            else  audioSound.src='audio/D13.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
            var note=new DrawNotes(90);
            var sharp=new DrawSharp(87);
            if(count) {
              save.push('D13');
             save.push(count);
            }
          }
          if(this.key.id == 'D3') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/D3.mp3';
           else  audioSound.src='audio/D3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(90);
           if(count) {
             save.push('D3');
             save.push(count);
            }
          }
          if(this.key.id == 'C#3') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C13.mp3';
           else  audioSound.src='audio/C13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(95);
           var sharp=new DrawSharp(92);
            if(count) {
             save.push('C13');
             save.push(count);
            }
          }
         if(this.key.id == 'C3') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C3.mp3';
           else  audioSound.src='audio/C3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(95);
           if(count ) {
             save.push('C3');
             save.push(count);
            }     
          }
         if(this.key.id == 'H2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H2.mp3';
            else  audioSound.src='audio/H2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(101);
           if(count) {
             save.push('H2');
             save.push(count);
            }
          }
          if(this.key.id == 'A#2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A12.mp3';
           else  audioSound.src='audio/A12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(105);
           var sharp=new DrawSharp(102);
           if(count) {
             save.push('A12');
              save.push(count);
            }
          }
         if(this.key.id == 'A2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/A2.mp3';
           else  audioSound.src='audio/A2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(105);
            if(count) {
              save.push('A2');
             save.push(count);
            }
          }
          if(this.key.id == 'G#2') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G12.mp3';
           else  audioSound.src='audio/G12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(109);
           var sharp=new DrawSharp(106);
           if(count) {
             save.push('G12');
             save.push(count);
            }
          }
         if(this.key.id == 'G2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G2.mp3';
           else  audioSound.src='audio/G2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(109);
           if(count) {
             save.push('G2');
              save.push(count);
            }
          }
         if(this.key.id == 'F#2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F12.mp3';
            else  audioSound.src='audio/F12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(113);
           var sharp=new DrawSharp(110);
           if(count) {
             save.push('F12');
             save.push(count);
            }
          }
          if(this.key.id == 'F2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/F2.mp3';
           else  audioSound.src='audio/F2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(113);
           if(count) {
             save.push('F2');
             save.push(count);
            }
         }
         if(this.key.id == 'E2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E2.mp3';
           else  audioSound.src='audio/E2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(118);
           if(count) {
             save.push('E2');
             save.push(count);
            }
          }
          if(this.key.id == 'D#2') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D12.mp3';
           else  audioSound.src='audio/D12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(123);
           var sharp=new DrawSharp(120)
            if(count) {
             save.push('D12');
             save.push(count);
            }
          }
         if(this.key.id == 'D2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D2.mp3';
            else  audioSound.src='audio/D2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(123);
           if(count) {
             save.push('D2');
             save.push(count);
            }
          }
         if(this.key.id == 'C#2') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C12.mp3';
           else  audioSound.src='audio/C12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(128);
           var sharp=new DrawSharp(125);
           if(count) {
             save.push('C12');
             save.push(count);
            }
          }
          if(this.key.id == 'C2') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C2.mp3';
           else  audioSound.src='audio/C2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(128);
           if(count) {
             save.push('C2');
             save.push(count);
            }
          }
         if(this.key.id == 'H1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H1.mp3';
           else  audioSound.src='audio/H1.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(132);
           if(count) {
             save.push('H1');
              save.push(count);
            }
          }
         if(this.key.id == 'A#1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A11.mp3';
           else  audioSound.src='audio/A11.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(137);
           var sharp=new DrawSharp(134);
           if(count) {
             save.push('A11');
             save.push(count);
            }
          }
          if(this.key.id == 'A1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A1.mp3';
           else  audioSound.src='audio/A1.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(137);
           if(count) {
              save.push('A1');
              save.push(count);
            }
          }
         if(this.key.id == 'G#1') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G11.mp3';
           else  audioSound.src='audio/G11.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(141);
           var sharp=new DrawSharp(138);
           if(count) {
              save.push('G11');
              save.push(count);
            }
          }
         if(this.key.id == 'G1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G1.mp3';
           else  audioSound.src='audio/G1.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(141);
           if(count) {
             save.push('G1');
             save.push(count);
            }
          }
         if(this.key.id == 'F#1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/F11.mp3';
           else  audioSound.src='audio/F11.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(145);
           var sharp=new DrawSharp(142);
           if(count) {
              save.push('F11');
             save.push(count);
            }
          }
          if(this.key.id == 'F1') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F1.mp3';
           else  audioSound.src='audio/F1.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(145);
           if(count) {
              save.push('F1');
             save.push(count);
            }
          }
         if(this.key.id == 'E1') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E2.mp3';
           else  audioSound.src='audio/E2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(149);
            if(count) {
              save.push('E1');
             save.push(count);
            }
          }
         if(this.key.id == 'D#1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D11.mp3';
            else  audioSound.src='audio/D11.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           var note=new DrawNotes(154);
           var sharp=new DrawSharp(151);
           if(count) {
              save.push('D11');
              save.push(count);
            }
          }
         if(this.key.id == 'D1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D1.mp3';
           else  audioSound.src='audio/D1.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            var note=new DrawNotes(154);
           if(count) {
             save.push('D1');
             save.push(count);
            }
          }
         if(this.key.id == 'C#1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C11.mp3';
           else  audioSound.src='audio/C11.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('C11');
              save.push(count);
            }
          }
         if(this.key.id == 'C1') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C1.mp3';
           else  audioSound.src='audio/C1.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('C1');
             save.push(count);
            }
          }
         if(this.key.id == 'H0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H0.mp3';
           else  audioSound.src='audio/H0.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('H0');
             save.push(count);
            }
          }
         if(this.key.id == 'A#0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/A10.mp3';
            else  audioSound.src='audio/A10.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('A10');
             save.push(count);
            }
          }
         if(this.key.id == 'A0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A0.mp3';
           else  audioSound.src='audio/A0.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('A0');
              save.push(count);
            }
          }
          if(this.key.id == 'G#0') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G10.mp3';
           else  audioSound.src='audio/G10.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('G10');
              save.push(count);
            }
          }
         if(this.key.id == 'G0') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G0.mp3';
            else  audioSound.src='audio/G0.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('G0');
             save.push(count);
            }
          }
         if(this.key.id == 'F#0') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F10.mp3';
           else  audioSound.src='audio/F10.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('F10');
             save.push(count);
            }
          }
         if(this.key.id == 'F0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F0.mp3';
            else  audioSound.src='audio/F0.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            if(count) {
              save.push('F0');
              save.push(count);
            }
          }
         if(this.key.id == 'E0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E0.mp3';
           else  audioSound.src='audio/E0.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('E0');
              save.push(count);
            }
          }
         if(this.key.id == 'D#0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D10.mp3';
           else  audioSound.src='audio/D10.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('D10');
              save.push(count);
            }
          }
         if(this.key.id == 'D0') {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D0.mp3';
           else  audioSound.src='audio/D0.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('D0');
              save.push(count);
            }
          }
         if(this.key.id == 'C#0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C10.mp3';
           else  audioSound.src='audio/C10.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
             save.push('C10');
             save.push(count);
            }
          }
         if(this.key.id == 'C0') {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C0.mp3';
           else  audioSound.src='audio/C0.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           if(count) {
              save.push('C0');
              save.push(count);
            }
          }
        }


       this.play1=function(EO){
         EO=EO||window.event;
          EO.preventDefault();
          if (EO.keyCode==16) {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/H1.mp3';
            else  audioSound.src='audio/H1.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('H1').style.backgroundImage='linear-gradient(0deg, white 15%, grey)'; 
            var note=new DrawNotes(132);
            title.appendChild(spanH);
            if(count) {
              save.push('H1');
             save.push(count);
            }
          }
          if (EO.keyCode==226) {   
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/C2.mp3';
            else  audioSound.src='audio/C2.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
            document.getElementById('C2').style.backgroundImage='linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(128);
            title.appendChild(spanC);
           if(count) {
             save.push('C2');
             save.push(count);
            }
          }
         if ( EO.keyCode== 90) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C12.mp3';
           else  audioSound.src='audio/C12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            document.getElementById('C#2').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
            var note=new DrawNotes(128);
           var sharp=new DrawSharp(125);
           title.appendChild(spanC1);
           if(count) {
             save.push('C12');
             save.push(count);
            }
          }
         if ( EO.keyCode== 88) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D2.mp3';
           else  audioSound.src='audio/D2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('D2').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(123);
           title.appendChild(spanD);
           if(count) {
             save.push('D2');
             save.push(count);
            }
          }
         if ( EO.keyCode== 67) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D12.mp3';
           else  audioSound.src='audio/D12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('D#2').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(123);
           var sharp=new DrawSharp(120)
           title.appendChild(spanD1);
           if(count) {
             save.push('D12');
              save.push(count);
            }
          }
         if ( EO.keyCode== 86) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/E2.mp3';
            else  audioSound.src='audio/E2.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('E2').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(118);
           title.appendChild(spanE);
           if(count) {
             save.push('E2');
             save.push(count);
            }
          }
         if ( EO.keyCode== 66) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/F2.mp3';
           else  audioSound.src='audio/F2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('F2').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(113);
           title.appendChild(spanF);
           if(count) {
             save.push('F2');
             save.push(count);
            }
         }
          if ( EO.keyCode== 78) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F12.mp3';
            else  audioSound.src='audio/F12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('F#2').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(113);
           var sharp=new DrawSharp(110)
           title.appendChild(spanF1);
           if(count) {
             save.push('F12');
              save.push(count);
            }
          } 
         if ( EO.keyCode== 77) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G2.mp3';
            else  audioSound.src='audio/G2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G2').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(109);
           title.appendChild(spanG);
           if(count) {
             save.push('G2');
             save.push(count);
            }
          }
         if ( EO.keyCode== 188) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G12.mp3';
           else  audioSound.src='audio/G12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G#2').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(109);
           var sharp=new DrawSharp(106)
           title.appendChild(spanG1); 
           if(count) {
             save.push('G12');
             save.push(count);
            }
          }
          if ( EO.keyCode== 190) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A2.mp3';
           else  audioSound.src='audio/A2.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A2').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
            var note=new DrawNotes(105);
            title.appendChild(spanA);
           if(count) {
             save.push('A2');
             save.push(count);
            }
          }
         if ( EO.keyCode==191) { 
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/A12.mp3';
           else  audioSound.src='audio/A12.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A#2').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(105);
            var sharp=new DrawSharp(102)
           title.appendChild(spanA1);
           if(count) {
             save.push('A12');
              save.push(count);
            }
          }
         if ( EO.keyCode== 38) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/H2.mp3';
            else  audioSound.src='audio/H2.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
           document.getElementById('H2').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';  
           var note=new DrawNotes(101);
           title.appendChild(spanH);
           if(count) {
             save.push('H2');
             save.push(count);
            }
          }
          if ( EO.keyCode== 65) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/C3.mp3';
           else  audioSound.src='audio/C3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play(); 
           document.getElementById('C3').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';   
           var note=new DrawNotes(95);
           title.appendChild(spanC);
           if(count) {
             save.push('C3');
              save.push(count);
             }
          }
         if ( EO.keyCode== 83) {  
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C13.mp3';
           else  audioSound.src='audio/C13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('C#3').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(95);
           var sharp=new DrawSharp(92)
           title.appendChild(spanC1);
           if(count) {
              save.push('C13');
             save.push(count);
            }
          }
          if ( EO.keyCode== 68) { 
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/D3.mp3';
            else  audioSound.src='audio/D3.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
           document.getElementById('D3').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(90);
           title.appendChild(spanD);
           if(count) {
             save.push('D3');
             save.push(count);
            }
         }
         if ( EO.keyCode== 70) { 
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/D13.mp3';
           else  audioSound.src='audio/D13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('D#3').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(90);
           var sharp=new DrawSharp(87)
           title.appendChild(spanD1);
           if(count) {
             save.push('D13');
              save.push(count);
            }
          }
          if ( EO.keyCode== 71) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E3.mp3';
           else  audioSound.src='audio/E3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('E3').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(87);
           title.appendChild(spanE);
            if(count) {
             save.push('E3');
             save.push(count);
            }
         }
         if ( EO.keyCode==72) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F3.mp3';
           else  audioSound.src='audio/F3.ogg';
            audioSound.currentTime=0;  
	          audioSound.play();
           document.getElementById('F3').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(82);
           title.appendChild(spanF);
           if(count) {
             save.push('F3');
             save.push(count);
            }
         }
         if ( EO.keyCode== 74) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F13.mp3';
           else  audioSound.src='audio/F13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('F#3').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(82);
           var sharp=new DrawSharp(79)
           title.appendChild(spanF1);
           if(count) {
             save.push('F13');
              save.push(count);
            }
          }
         if ( EO.keyCode== 75) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G3.mp3';
            else  audioSound.src='audio/G3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G3').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(78);
           title.appendChild(spanG);
           if(count) {
             save.push('G3');
             save.push(count);
            }
          }
         if ( EO.keyCode== 76) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G13.mp3';
           else  audioSound.src='audio/G13.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G#3').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(78);
           var sharp=new DrawSharp(75)
           title.appendChild(spanG1);
           if(count) {
             save.push('G13');
             save.push(count);
           }
         }
         if ( EO.keyCode== 186) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A3.mp3';
           else  audioSound.src='audio/A3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A3').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(72);
           title.appendChild(spanA);
           if(count) {
             save.push('A3');
             save.push(count);
            }
         }
         if ( EO.keyCode== 81) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A13.mp3';
           else  audioSound.src='audio/A13.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A#3').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(72);
           var sharp=new DrawSharp(69)
            title.appendChild(spanA1);
           if(count) {
             save.push('A13');
             save.push(count);
           }
         }
         if ( EO.keyCode== 87) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/H3.mp3';
           else  audioSound.src='audio/H3.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('H3').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(68);
            title.appendChild(spanH);
           if(count) {
              save.push('H3');
             save.push(count);
            }
         }
         if ( EO.keyCode== 69) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C4.mp3';
           else  audioSound.src='audio/C4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('C4').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)'; 
           var note=new DrawNotes(63);
           title.appendChild(spanC);
           if(count) {
             save.push('C4');
             save.push(count);
            }
         }
         if ( EO.keyCode== 82) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably") audioSound.src='audio/C14.mp3';
           else  audioSound.src='audio/C14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('C#4').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(63);
           var sharp=new DrawSharp(60)
           title.appendChild(spanC1);
           if(count) {
             save.push('C14');
             save.push(count);
            }
          }
         if ( EO.keyCode== 84) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D4.mp3';
           else  audioSound.src='audio/D4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('D4').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           var note=new DrawNotes(59);
           title.appendChild(spanD);
           if(count) {
             save.push('D4');
              save.push(count);
            }
          }
         if ( EO.keyCode== 89) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D14.mp3';
           else  audioSound.src='audio/D14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('D#4').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(59);
            var sharp=new DrawSharp(56)
           title.appendChild(spanD1);
            if(count) {
              save.push('D14');
             save.push(count);
            }
          }
          if ( EO.keyCode==85) { 
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E4.mp3';
           else  audioSound.src='audio/E4.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('E4').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           var note=new DrawNotes(54);
            title.appendChild(spanE);
           if(count) {
             save.push('E4');
             save.push(count);
            }
          }
         if ( EO.keyCode==73) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F4.mp3';
            else  audioSound.src='audio/F4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('F4').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           var note=new DrawNotes(50);
           title.appendChild(spanF);
           if(count) {
             save.push('F4');
             save.push(count);
           }
          }
         if ( EO.keyCode== 79) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F14.mp3';
           else  audioSound.src='audio/F14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('F#4').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(50);
           var sharp=new DrawSharp(47)
           title.appendChild(spanF1);
           if(count) {
              save.push('F14');
             save.push(count);
            }
          }
         if ( EO.keyCode== 80) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G4.mp3';
            else  audioSound.src='audio/G4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G4').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           var note=new DrawNotes(47);
            title.appendChild(spanG);
           if(count) {
             save.push('G4');
              save.push(count);
           }
          }
         if ( EO.keyCode== 219) {  
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/G14.mp3';
           else  audioSound.src='audio/G14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G#4').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
            var note=new DrawNotes(47);
           var sharp=new DrawSharp(44)
           title.appendChild(spanG1);
           if(count) {
             save.push('G14');
             save.push(count);
            }
         }
         if ( EO.keyCode== 221) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A4.mp3';
           else  audioSound.src='audio/A4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A4').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           var note=new DrawNotes(42);
           title.appendChild(spanA);
           if(count) {
             save.push('A4');
              save.push(count);
            }
          }
         if ( EO.keyCode== 192) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A14.mp3';
           else  audioSound.src='audio/A14.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A#4').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(42);
           var sharp=new DrawSharp(39)
           title.appendChild(spanA1);
           if(count) {
             save.push('A14');
             save.push(count);
           }
          }
         if ( EO.keyCode== 49) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H4.mp3';
           else  audioSound.src='audio/H4.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('H4').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           var note=new DrawNotes(37);
           title.appendChild(spanH);
           if(count) {
             save.push('H4');
             save.push(count);
           }
          }
          if ( EO.keyCode== 50) { 
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C5.mp3';
           else  audioSound.src='audio/C5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('C5').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           var note=new DrawNotes(31);
           title.appendChild(spanC);
           if(count) {
             save.push('C5');
             save.push(count);
            }
          }
          if ( EO.keyCode== 51) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C15.mp3';
           else  audioSound.src='audio/C15.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
            document.getElementById('C#5').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           var note=new DrawNotes(31);
           var sharp=new DrawSharp(28)
           title.appendChild(spanC1);
           if(count) {
             save.push('C15');
              save.push(count);
           }
          }
         if ( EO.keyCode== 52) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/D5.mp3';
            else  audioSound.src='audio/D5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('D5').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           title.appendChild(spanD);
           if(count) {
             save.push('D5');
             save.push(count);
            }
          }
         if ( EO.keyCode== 53) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/D15.mp3';
           else  audioSound.src='audio/D15.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('D#5').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
            title.appendChild(spanD1);
           if(count) {
             save.push('D15');
             save.push(count);
            }
          }
         if ( EO.keyCode==54) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/E5.mp3';
           else  audioSound.src='audio/E5.ogg';
            audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('E5').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           title.appendChild(spanE);
           if(count) {
             save.push('E5');
              save.push(count);
            }
          }
          if ( EO.keyCode== 55) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F5.mp3';
           else  audioSound.src='audio/F5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('F5').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           title.appendChild(spanF);
           if(count) {
             save.push('F5');
             save.push(count);
            }
          }
          if ( EO.keyCode==56) {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/F15.mp3';
           else  audioSound.src='audio/F15.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('F#5').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           title.appendChild(spanF1);
           if(count) {
             save.push('F15');
             save.push(count);
            }
          }
         if ( EO.keyCode== 57) {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G5.mp3';
           else  audioSound.src='audio/G5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G5').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           title.appendChild(spanG);
           if(count) {
             save.push('G5');
             save.push(count);
            }
          }
         if ( EO.keyCode== 48) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
            audioSound.src='audio/G15.mp3';
           else  audioSound.src='audio/G15.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('G#5').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
            title.appendChild(spanG1);
           if(count) {
             save.push('G15');
             save.push(count);
            }
          }
         if ( EO.keyCode== 189) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A5.mp3';
           else  audioSound.src='audio/A5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A5').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           title.appendChild(spanA);
           if(count) {
             save.push('A5');
              save.push(count);
            }
          }
         if ( EO.keyCode== 187) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/A15.mp3';
           else  audioSound.src='audio/A15.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('A#5').style.backgroundImage='linear-gradient(0deg, black 2%, gray)';
           title.appendChild(spanA1);
           if(count) {
              save.push('A15');
             save.push(count);
            }
          }
          if ( EO.keyCode== 106) {
            if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/H5.mp3';
           else  audioSound.src='audio/H5.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('H5').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           title.appendChild(spanH);
           if(count) {
             save.push('H5');
             save.push(count);
            }
          }
          if ( EO.keyCode== 107) {
           if(audioSound.canPlayType("audio/mpeg")=="probably")
           audioSound.src='audio/C6.mp3';
           else  audioSound.src='audio/C6.ogg';
           audioSound.currentTime=0;  
	         audioSound.play();
           document.getElementById('C6').style.backgroundImage=' linear-gradient(0deg, white 15%, grey)';
           title.appendChild(spanC);
           if(count) {
             save.push('C6');
              save.push(count);
            }
          }
        }

        this.stopPlay=function(EO){
         EO=EO||window.event;
     
         var whiteKey=document.getElementsByClassName('whiteKey');
         for (var i=0; i<whiteKey.length; i++) {
           whiteKey[i].style.backgroundImage='none';
           whiteKey[i].style.backgroundColor='white';
          }
         var blackKey=document.getElementsByClassName('blackKey');
         for (var i=0; i<blackKey.length; i++) {
           blackKey[i].style.backgroundImage='none';
           blackKey[i].style.backgroundColor='black';
          }
  
         title.innerHTML='';
        }
      }
    
     var key = new KeyPiano();
     piano.addEventListener('mousedown',  key.play, false);
     piano.addEventListener('touchstart',key.play, false);
     piano.addEventListener('mouseup',  key.stopPlay, false);
     piano.addEventListener('touchend', key.stopPlay, false);
     addEventListener('keydown', key.play1, false);
     addEventListener('keyup', key.stopPlay, false);
 
     butStart.addEventListener('click', buttonStart, false);
     butStop.addEventListener('click', buttonStop, false);
    }
    document.body.innerHTML=pageHTML;
    drawPiano();  

    window.onresize= function() {
      document.body.innerHTML="<input type=button class='main' value='Главная' onclick='switchToMainPage()'> <input type=button class='page1' value='Сохраненные мелодии' onclick='switchToMusicPage()'> ";
      drawPiano();
    }

   break;
   case 'Music':
 
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
   var stringName='SVISTUN_SOUNDS_STORAGE';

   $.ajax({
      url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
      data : { f : 'READ' ,n : stringName, },
      success : readReady, error : errorHandler
    } );
   function readReady(callresult) {
     if ( callresult.error!=undefined )
      alert(callresult.error);
     else  {
    
       info=JSON.parse(callresult.result);
       drawMusic( info);
      }
    }

    function drawMusic() {
   
      var list= document.createElement('div');
      list.style.paddingTop='50px';
     document.body.appendChild(list);
    
      var noteimg=document.createElement('img');
      noteimg.setAttribute('src', 'img/noteimg.png');
      noteimg.style.position='absolute';
      noteimg.style.width=document.documentElement.clientWidth*0.8+'px';
      noteimg.style.height=document.documentElement.clientHeight*0.7+'px';
      noteimg.style.right='0px';
      noteimg.style.top=document.documentElement.clientHeight*0.2+'px';
      document.body.appendChild(noteimg);

     for(var k in info) {
       var music;
       music=document.createElement('span');
       music.setAttribute('class', 'music');
       music.style.marginLeft='20px';
       music.style.fontSize='22px';
       music.style.lineHeight='27px';
       music.style.cursor='pointer';
       music.innerHTML=k+'<br>';
       music.onclick=playMusic;
       list.appendChild(music);
      }
 
     function playMusic() {
       count=0;
       keySound=this.textContent; 
      }
    }
   document.body.innerHTML=pageHTML;
   window.onresize= function() {
      document.body.innerHTML="<input type=button class='main' value='Главная' onclick='switchToMainPage()'> <input type=button class='page1' value='Сохраненные мелодии' onclick='switchToMusicPage()'> ";
     drawMusic();
    }
   break;
  }  
}

function switchToState(newState) {
  var stateStr=newState.pagename;
  location.hash=stateStr;
}
function switchToMainPage() {
  switchToState( { pagename:'Main' } );
}

function switchToMusicPage() {
   
  if ( changedMusic ) {
    var mas=confirm('У вас есть несохранённые изменения!');
    if(mas) {
      changedMusic=false
      switchToState( { pagename:'Music' } );
    }
  }
  else {
    switchToState( { pagename:'Music' } );
    changedMusic=false
  }
}
switchToStateFromURLHash();
 
