"use strict";

  var formDef1=undefined;
  var  formDef2=undefined;
  function getData() {
  if(!formDef1) {
$.ajax("data.json",
{ type:'GET', dataType:'json', success:function(data) {  formDef1=data[0]; getData()}, error:errorHandler });
    return;
  }
   if(!formDef2) {
     $.ajax("data.json",
{ type:'GET', dataType:'json', success:function(data) {  formDef2=data[1]; getData()}, error:errorHandler });
    return;
  }

         
var t='form';
addForm(t, formDef1);
addForm(t, formDef2)


function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}

         
function addForm (teg, mass) {
  var parent=document.getElementsByTagName('body');
  var newElement=document.createElement('form');
  newElement.setAttribute('action', 'https://fe.it-academy.by/TestForm.php');
  parent[0].appendChild( newElement);
          
  var str='';
  var input='<input type="';
          
  for(var i=0; i<mass.length; i++) {
            
   var lab='<label for="'+mass[i]['name']+'">'+mass[i]['label']+'</label>' ;
   var type=mass[i]['kind'];
   var name='name="'+mass[i]['name']+'">';
            
            
    switch(type) {
      case 'longtext':
        str+=lab+input+'text" style="width:300px"'+name;
        break; 
      case'shorttext':
        str+=lab+input+'text" style="width:80px"'+name;
        break; 
      case'number':
        str+=lab+input+'number"'+name;
        break;
      case'check':
        str+=lab+input+'checkbox"'+name;
        break;
      case 'submit':
        str+=input+type+'" value="'+mass[i]['label']+'">';
        break;
      case 'memo':
        str+=lab+'<textarea style="width: 300px; height: 50px"'+name+'</textarea>'; 
        break;
      case  'combo':
        str+=lab+'<select style="width:204px">';
        var val='';
        for(var j=0; j<mass[i]['variants'].length; j++) {
          val=mass[i]['variants'][j]['value']+'">'+mass[i]['variants'][j]['text'];
          
          str+='<option value="'+val+'</option>';
        }
        str+='</select>';
        break;
        
      case  'radio':
        str+=lab;
        for(var j=0; j<mass[i]['variants'].length; j++) {
          val=mass[i]['variants'][j]['value']+'">'+mass[i]['variants'][j]['text'];

          str+=input+'radio"'+name+'<span value="'+val+'</span>';
        }
        
          break;              
    }  
                 
    str+='<br>' ;
           
  }
          
  newElement.innerHTML=str;
}

}
getData();