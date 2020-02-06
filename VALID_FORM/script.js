"use strict";
var form=document.forms.info;

var authorField=form.elements.author;
authorField.addEventListener('blur',validAuthor,false);
var authorRow=document.getElementById('authorRow');
var newAuthorRow=document.createElement('span');
newAuthorRow.setAttribute('style', 'color:red');
authorRow.appendChild(newAuthorRow);

var titleSiteField=form.elements.titleSite;
titleSiteField.addEventListener('blur',validSite,false);
var siteRow=document.getElementById('siteRow');
var newSiteRow=document.createElement('span');
newSiteRow.setAttribute('style', 'color:red');
siteRow.appendChild(newSiteRow);

var urlSiteField=form.elements.urlSite;
urlSiteField.addEventListener('blur',validUrl,false);
var urlRow=document.getElementById('urlRow');
var newUrlRow=document.createElement('span');
newUrlRow.setAttribute('style', 'color:red');
urlRow.appendChild(newUrlRow);

var startDateField=form.elements.startDate;
startDateField.addEventListener('blur',validDate,false);
var dateRow=document.getElementById('startDateRow');
var newDateRow=document.createElement('span');
newDateRow.setAttribute('style', 'color:red');
dateRow.appendChild(newDateRow);

var personsField=form.elements.persons;
personsField.addEventListener('blur',validPersons,false);
var personsRow=document.getElementById('personsRow');
var newPersonsRow=document.createElement('span');
newPersonsRow.setAttribute('style', 'color:red');
personsRow.appendChild(newPersonsRow);

var mailField=form.elements.mail;
mailField.addEventListener('blur',validMail,false);
var mailRow=document.getElementById('mailRow');
var newMailRow=document.createElement('span');
newMailRow.setAttribute('style', 'color:red');
mailRow.appendChild(newMailRow);

var rubricField=form.elements.rubric;
rubricField.addEventListener('change',validRubric,false);
var rubricRow=document.getElementById('rubricRow');
var newRubricRow=document.createElement('span');
newRubricRow.setAttribute('style', 'color:red');
rubricRow.appendChild(newRubricRow);
var value=false;
 

var publicField=form.elements.public;
for(var i=0; i<publicField.length; i++) {
publicField[i].addEventListener('change',validPublic,false);
}

var publicRow=document.getElementById('publicRow');
var newPublicRow=document.createElement('span');
newPublicRow.setAttribute('style', 'color:red');
publicRow.appendChild(newPublicRow);

var commentsField=form.elements.comments;
commentsField.addEventListener('change',validComments,false);
var commentsRow=document.getElementById('commentsRow');
var newCommentsRow=document.createElement('span');
newCommentsRow.setAttribute('style', 'color:red');
commentsRow.appendChild(newCommentsRow);

var articleField=form.elements.article;
articleField.addEventListener('blur',validArticle,false);
var articleRow=document.getElementById('articleRow');
var newArticleRow=document.createElement('span');
newArticleRow.setAttribute('style', 'color:red');
articleRow.appendChild(newArticleRow);

form.addEventListener('submit',validateInfoForm,false); 

function validAuthor(EO) {
  EO=EO ||window.event;
   
      if(!authorField.value){
        newAuthorRow.textContent=' Вы не ввели Разработчиков!';   
      } 

   else   newAuthorRow.textContent=null;
  }

function validSite(EO) {
  EO=EO ||window.event;
  if(!titleSiteField.value) {
    newSiteRow.textContent=' Вы не ввели Название сайта!';
  } else  if(titleSiteField.value.length>30) {
    newSiteRow.textContent= ' Слишком длинное название!';
  }
  else newSiteRow.textContent=null;

}

function validUrl(EO) {
  EO=EO ||window.event;
  if(!urlSiteField.value) {
    newUrlRow.textContent=' Вы не ввели URL сайта!';
  }
  else newUrlRow.textContent=null;
}

function validDate(EO) {
  EO=EO ||window.event;
  if(!startDateField.value) {
    newDateRow.textContent=' Вы не ввели дату!';
  }
  else newDateRow.textContent=null;
}

function validPersons(EO) {
  EO=EO ||window.event;
 if(!parseInt(personsField.value.trim())) {
    newPersonsRow.textContent=' Вы не ввели количество посетителей!';
  }
  else newPersonsRow.textContent=null;
}

function validMail(EO) {
  EO=EO ||window.event;
if(!mailField.value) {
    newMailRow.textContent=' Вы не ввели E-mail!';
  }
  else newMailRow.textContent=null;
}

function validRubric(EO) {
  EO=EO ||window.event;
   value=true;
  if(rubricField.value==3) {
    newRubricRow.textContent=' Эта рубрика недоступна!';
    
  }   else {
    newRubricRow.textContent=null;
    
  }
    
    

  
}



function validPublic(EO) {
  EO=EO ||window.event;
  if(publicField.value==='') {
    newPublicRow.textContent=' Размещение не выбрано!';
  } else newPublicRow.textContent=null;
}

function validComments(EO) {
  EO=EO ||window.event;
 if(!commentsField.checked) {
   newCommentsRow.textContent=' Пустое поле!';
  }
  else newCommentsRow.textContent=null;
}

function validArticle(EO) {
  EO=EO ||window.event;
  if(!articleField.value) {
   newArticleRow.textContent=' Нет описания сайта!';
  }
  else newArticleRow.textContent=null;
}

function validateInfoForm(EO) {
  EO=EO ||window.event;
  validAuthor();
  validSite();
  validUrl();
  validDate();
  validPersons();
  validMail();
  
  validComments();
  validArticle();
  validPublic();
  
  if(value===false) {
    newRubricRow.textContent=' Выберите рубрику!';
  } 
  

  

  try {
    
    
      if(newAuthorRow.textContent){
       authorField.focus();
       EO.preventDefault();
       return;
      }
    
    if(newSiteRow.textContent) {
     titleSiteField.focus();
     EO.preventDefault();
     return;
    }

    if(newUrlRow.textContent) {
     urlSiteField.focus();
     EO.preventDefault();
     return;
    }

    if(newDateRow.textContent) {
     startDateField.focus();
     EO.preventDefault();
     return;
    }

    if(newPersonsRow.textContent) {
     personsField.focus();
     EO.preventDefault();
     return;
    }

    if(newMailRow.textContent) {
     mailField.focus();
     EO.preventDefault();
     return;
    }

    if(newRubricRow.textContent) {
     rubricField.focus();
     EO.preventDefault();
     return;
    }

    if(newPublicRow.textContent) {
      document.getElementById('public1').scrollIntoView();
      EO.preventDefault();
     return;
    } else newPublicRow.textContent=null;

    if(newCommentsRow.textContent){
     rubricField.focus();
     EO.preventDefault();
     return;
    }

    if(newArticleRow.textContent) {
     rubricField.focus();
     EO.preventDefault();
     return;
    }


  }
  catch ( ex ) {
    EO.preventDefault(); 
  }
  
  
}


