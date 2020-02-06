'use strict'
/*var pageA={
    1 : "kf",
    2 : "mhd",
    3:"hgf"
  };*/
   function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}
window.onhashchange=switchToStateFromURLHash;
var SPAState={};
function switchToStateFromURLHash() {
   var URLHash=window.location.hash;
  var stateStr=URLHash.substr(1);
  if ( stateStr!="" ) {
    var parts=stateStr.split("_")
      SPAState={ pagename: parts[0] };
      if ( SPAState.pagename=='Article' )
        SPAState.num=parts[1];
  } 
   else
      SPAState={pagename:'Main'};
  var pageHTML='';
  switch (SPAState.pagename){
    case 'Main':
      pageHTML+='<h2>Энциклопедия </h2>';
      pageHTML+='<a href="#List" onclick="switchToListPage()">список статей</a>'
     
      break;
      case 'List':
      pageHTML+='<h2>Оглавление</h2>';
      var listArticles=undefined;
     $.ajax("contents.json",
{ type:'GET', dataType:'json', success:function(data) {  listArticles=data; addArticles(listArticles)}, error:errorHandler });
   
  
  function addArticles(listArticles) {
    for (var i=0; i<listArticles.length; i++) {
     pageHTML+='<h3>'+listArticles[i]["name"]+'</h3>';
     for(var j=0; j<listArticles[i]["value"].length; j++) {
       pageHTML+='<a href="#Article_'+(i+1)+(j+1)+'" onclick="switchToPage('+(i+1)+(j+1)+')">'+listArticles[i]["value"][j]+'</a><br>'
     }
     
     document.body.innerHTML=pageHTML;
    }
  }
 
          
      break;
      case 'Article':
      var listArticles=undefined;
     $.ajax("contents.json",
{ type:'GET', dataType:'json', success:function(data) {  listArticles=data; addList(listArticles)}, error:errorHandler });
function addList(listArticles) {
       for (var i=0; i<listArticles.length; i++) {
     
     for(var j=0; j<listArticles[i]["value"].length; j++) {
       pageHTML+='<a href="#Article_'+(i+1)+(j+1)+'" onclick="switchToPage('+(i+1)+(j+1)+')">'+listArticles[i]["value"][j]+'</a><br>'
     }
       
     document.body.innerHTML=pageHTML;
       }
}
      var articleLink=stateStr+".html"
       $.ajax(articleLink,
            { type:'GET', dataType:'html', success:dataLoaded, error:errorHandler }
        );
         function dataLoaded(data) {
          var divTag=document.createElement('div');
           
           divTag.style.position='absolute';
           divTag.style.left='105px'
           divTag.style.top='0px';
          document.body.appendChild(divTag)
          
         divTag.innerHTML=data;
         
    }

   
      break;
      
  }
  document.body.innerHTML=pageHTML;
}
function switchToState(newState) {
  var stateStr=newState.pagename;
  if ( newState.pagename=='Article' )
      stateStr+="_"+newState.num;
  location.hash=stateStr;
}
function switchToMainPage() {
  switchToState({pagename:'Main'});
}

function switchToListPage() {
 switchToState({pagename:'List'});
}
 function switchToPage(numArticle) {
   switchToState( { pagename:'Article', num: numArticle} );
  }
switchToStateFromURLHash();