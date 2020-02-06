let str = prompt('Введите строку', '');

function deleteSpace (s) {
  
  for(i=0; i<=s.length; i++) {  

    if (s.charAt(i)==' ') 
    continue;
    else break;
  }

  if (i==s.length) 
  return ('');
  
  for(j=1; j<=s.length; j++) {

    if (s.charAt(s.length-j)==' ')
    continue;
    else break; 
  }
  
  if (i==0 && j==1)
  return s;
  else 
   return s.substr(i, s.length-j-i+1);
} 
console.log('*'+ deleteSpace(str)+'*')