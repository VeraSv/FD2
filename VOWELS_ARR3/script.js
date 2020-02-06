
'use strict';
function countLetter(str) {
  let letter=str.split('');
  let a={'а':true,'е':true,'и':true,'ё':true,'у':true,'э':true,'ы':true,'ю':true,'я':true,'о':true};
  let v= letter.reduce(ff,0);
  function ff(sum,letter) {
    if (letter in a) 
     return sum+=1;
    else
      return sum;
   
  }
  return v;
}
console.log(countLetter(prompt('Введите строку')));