'use strict';

var str=prompt(' Введите строку');

function checkPalindrom(s) {
 s=s.toLowerCase()
  .split('ё').join('е')
  .split('.').join('')
  .split(',').join('')
  .split('!').join('')
  .split('?').join('')
  .split('ъ').join('')
  .split('ь').join('')
 .split(' '). join('');
 let len=Math.floor(s.length/2);
 
 return check(len);
 function check( len) {
   if(len>0) {
     if(s[len-1]!=s[s.length-len]){

        return false;
      }   
      else return check(len-1);
    }
   else return true;
  }
}
console. log(checkPalindrom(str)) 