
'use strict';
var str=prompt('Введите строку','');

function countLetter(s) {
 
  let letter=s.split('');
  let a={'а':true,'е':true,'и':true,'ё':true,'у':true,'э':true,'ы':true,'ю':true,'я':true,'о':true};
  let v= letter.filter(ff);
  function ff(letter) {
   return letter in a;
  }
  return v.length;
  
}
console.log(countLetter(str));


