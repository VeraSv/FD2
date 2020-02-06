"use strict";
  function b(str) {
    let v=('aоеёиуыэюя');
    let sum=0;
    for (let i=0; i<str.length; i++) {
      let c=str[i];
      if (v.indexOf(c)!=-1)
        sum++;
    }
    return sum;
  }
  let str=('оияп');
  console.log(b(str));
