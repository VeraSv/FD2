"use strict";
var formDef1=[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];
        
var formDef2=[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];
 

      
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
      
var t='form';
addForm(t, formDef1);
addForm(t, formDef2)
        