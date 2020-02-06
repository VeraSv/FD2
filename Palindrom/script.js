let str = prompt('Введите строку', '');

function checkPalindrom (s) {
  s=s.toLowerCase()
  .split('ё').join('')
  .split(',').join('')
  .split('.').join('')
  .split('ь').join('')
  .split('ъ').join('')
  .split('?').join('')
  .split('!').join('')
  .split(' ').join('');
   
   let len=Math.floor(s.length/2);
  for(i=0; i<=len; i++){
    if(s[i] !=s[s.length-i-1]) 
    return false;
  }
  return true;
 
} 
console.log(checkPalindrom(str))