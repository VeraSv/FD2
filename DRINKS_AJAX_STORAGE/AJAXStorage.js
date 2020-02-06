'use strict'

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;


function AJAXStorage(strName) {
  var stringName=strName;
  let self=this;
  var info={};
   self.storage= {};
updatePassword=Math.random();
  $.ajax({
         url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
         data : { f : 'READ', n : stringName },
         success : readReady, error : errorHandler
        }
    );
  
  
 function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else  {
      info=JSON.parse(callresult.result);
      self.storage=JSON.parse(callresult.result);
    }
}

    
  self.addValue=function(key,value){
     
    self.storage[key] =value;
    info=self.storage;
        self.saveChanges();
   
    
  }

  self.getValue=function(key) {
   if (key in self.storage) {
    return self.storage[key];
   }
    
    else 
    return undefined; 

  }
    
  self.deleteValue=function(key) {
    
    if (key in self.storage) {
    delete self.storage[key];
    self.saveChanges();
    return true;
    }
    else 
    return false;


  }
  self.getKeys=function() {
    return Object.keys(self.storage);
  }
 
self.saveChanges= function () {

    $.ajax( {
      url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
      data : { f : 'LOCKGET', n : stringName, p : updatePassword },
      success : lockGetReady, error : errorHandler
      }
    );
 }

 function lockGetReady(callresult) {
     if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
      info=self.storage;
       
    }
   $.ajax( {
    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
    success : updateReady, error : errorHandler
    }
  );
    
}

function updateReady(callresult) {
  if ( callresult.error!=undefined )
  alert(callresult.error);
}


function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}

}
 

let drinkStorage = new AJAXStorage('SVISTUN_DRINKS_STORAGE');

function clickGetValue() {
 let key=prompt('Введите название напитка');
 let al=prompt('Напиток алкогольный?');
 let rec=prompt('Введите рецепт');
 drinkStorage.addValue(key,{alco:al, recipe: rec})
    
}

function clickInfoValue() {
  let key=prompt('Введите название напитка');
  
  let a=(drinkStorage.getValue(key));
  if (a) {
  let alco=('алкогольный: ');
  let recipe=('рецепт приготовления: ');
  alert('Напиток: '+key+'\n'+alco+a.alco+'\n'+recipe+a.recipe);
  
  }
    
  else {
  alert(a);
  }
  
}

function clickDeleteValue() {
  let key= prompt('Введите название напитка');
   alert(drinkStorage.deleteValue(key)); 
}

function clickGetKeys() {
  alert(drinkStorage.getKeys())
}
