"use strict";

document.forms.info.elements.author.addEventListener('blur',(EO)=>validAuthor(false));

document.forms.info.elements.titleSite.addEventListener('blur',(EO)=>validName(false));

document.forms.info.elements.urlSite.addEventListener('blur',(EO)=>validUrl(false));

document.forms.info.elements.startDate.addEventListener('blur',(EO)=>validDate(false));


document.forms.info.elements.persons.addEventListener('blur',(EO)=>validPersons(false));

document.forms.info.elements.mail.addEventListener('blur',(EO)=>validMail(false));

document.forms.info.elements.rubric.addEventListener('change',(EO)=>validRubric(false));

for(var i=0; i<document.forms.info.elements.public.length; i++) {
document.forms.info.elements.public[i].addEventListener('change',(EO)=>validPublic(false));
}



document.forms.info.elements.comments.addEventListener('change',(EO)=>validComments(false));

document.forms.info.elements.article.addEventListener('blur',(EO)=>validArticle(false));

function validAuthor(fwe) {
var form=document.forms.info;
var authorField=form.elements.author;

var authorValue=authorField.value;
if(!authorValue) {
  document.getElementById('authorName').innerHTML=' Вы не ввели разработчика';
  return true;
} else {
  document.getElementById('authorName').innerHTML='';
  if (fwe) {
    authorField.focus;
  }
  return false;
}
}

function validName(fwe) {
var form=document.forms.info;
var nameField=form.elements.titleSite;

var nameValue=nameField.value;
if(!nameValue) {
  document.getElementById('name').innerHTML=' Вы не ввели название сайта';
  return true;
} else {
  document.getElementById('name').innerHTML='';
  if (fwe) {
    nameField.focus;
  }
  return false;
}
}


function validUrl(fwe) {
var form=document.forms.info;
var urlField=form.elements.urlSite;

var urlValue=urlField.value;
if(!urlValue) {
  document.getElementById('urlName').innerHTML=' Вы не ввели URL';
  return true;
} else {
  document.getElementById('urlName').innerHTML='';
  if (fwe) {
    urlField.focus;
  }
  return false;
}
}

function validDate(fwe) {
var form=document.forms.info;
var dateField=form.elements.startDate;

var dateValue=dateField.value;
if(!dateValue) {
  document.getElementById('dateName').innerHTML=' Вы не ввели дату';
  return rtue;
} else {
  document.getElementById('dateName').innerHTML='';
  if (fwe) {
    dateField.focus;
  }
  return false;
}
}

function validPersons(fwe) {
var form=document.forms.info;
var personsField=form.elements.persons;

var personsValue=personsField.value;
if(!personsValue) {
  document.getElementById('personsName').innerHTML=' Вы не ввели количество посетителей';
  return true;
} else {
  document.getElementById('personsName').innerHTML='';
  if (fwe) {
    personsField.focus;
  }
  return false;
}
}

function validMail(fwe) {
var form=document.forms.info;
var mailField=form.elements.mail;

var mailValue=mailField.value;
if(!mailValue) {
  document.getElementById('mailName').innerHTML=' Вы не ввели почту';
  return true;
} else {
  document.getElementById('mailName').innerHTML='';
  if (fwe) {
    mailField.focus;
  }
  return false;
}
}

function validRubric(fwe) {
var form=document.forms.info;
var rubricField=form.elements.rubric;

var rubricValue=rubricField.value;
if(rubricField.value==3) {
  document.getElementById('rubricName').innerHTML=' Эта рубрика недоступна';
  return true;
} else {
  document.getElementById('rubricName').innerHTML='';
  if (fwe) {
    rubricField.focus;
  }
  return false;
}
}

function validPublic(fwe) {
var form=document.forms.info;
var publicField=form.elements.public;

var publicValue=publicField.value;
if(!publicValue) {
  document.getElementById('publicName').innerHTML=' Вы не выбрали размещение';
  return true;
} else {
  document.getElementById('publicName').innerHTML='';
  if (fwe) {
    publicField.focus;
  }
  return false;
}
}

function validComments(fwe) {
var form=document.forms.info;
var commentsField=form.elements.comments;

var commentsValue=commentsField.value;
if(!commentsField.checked) {
  document.getElementById('commentsName').innerHTML=' Пустое поле!';
  return true;
} else {
  document.getElementById('commentsName').innerHTML='';
  if (fwe) {
    commentsField.focus;
  }
  return false;
}
}


function validArticle(fwe) {
var form=document.forms.info;
var articleField=form.elements.article;

var articleValue=articleField.value;
if(!articleValue) {
  document.getElementById('articleName').innerHTML=' Нет описания!';
  return true;
} else {
  document.getElementById('articleName').innerHTML='';
  if (fwe) {
    articleField.focus;
  }
  return false;
}
}

document.forms.info.addEventListener('submit', (EO)=> validateInfoForm(false));

function validateInfoForm(EO) {
  var ok=true;
ok=validAuthor(ok)&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validName()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validUrl()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validDate()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validPersons()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validMail()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validRubric()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validPublic()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok= validComments()&&ok;
if(!ok) {
  EO.preventDefault();
}
ok=validArticle()&&ok;
if(!ok) {
  EO.preventDefault();
}


}