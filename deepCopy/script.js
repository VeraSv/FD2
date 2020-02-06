'use strict'
function deepCopy (x) {
  var copy;
  if (Array.isArray(x)) {
    copy=[];
    for(var i=0; i<x.length; i++) {
     if (x[i] instanceof Object) 
     copy[i]=deepCopy(x[i]);
     else copy[i]=x[i];
    } 
  } else if (x instanceof Object) {
    copy={};
    for(var key in x){
      if(x[key] instanceof Object) 
      copy[key]=deepCopy(x[key] );
     else copy[key]=x[key]
    } 
  } else copy=x;
return copy;
}
  

function test1 () {
var h1={ a:5, b:{b1:6 ,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };

var h2=deepCopy(h1);
console.log(' h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN }');
console.log('h1===h2 => false');
console.log((h1===h2)?'НЕ ПРОЙДЕН!':'пройден');

console.log('h1.a===h2.a => true');
console.log((h1.a===h2.a)?'пройден':'НЕ ПРОЙДЕН!')
 
console.log('h1.b===h2.b => false');
console.log((h1.b===h2.b)?'НЕ ПРОЙДЕН!':'пройден');

console.log('h1.b.b1===h2.b.b1 => true');
console.log((h1.b.b1===h2.b.b1)?'пройден':'НЕ ПРОЙДЕН!');

console.log('h1.c===h2.c => false');
console.log((h1.c===h2.c)?'НЕ ПРОЙДЕН!':'пройден');

console.log('h1.c[0]===h2.c[0] => true');
console.log((h1.c[0]===h2.c[0])?'пройден':'НЕ ПРОЙДЕН!');


console.log('h1.d===h2.d =>  true');
console.log((h1.d===h2.d)?'пройден': 'НЕ ПРОЙДЕН!');

console.log('h1.e===h2.e => true');
console.log((h1.e===h2.e)?'пройден':'НЕ ПРОЙДЕН!');

console.log('isNaN(h2.f) =>  true');
console.log((isNaN(h2.f))?'пройден':'НЕ ПРОЙДЕН!н');

console.log('h2.c instanceof Array => true');
console.log((h2.c instanceof Array)?'пройден':'НЕ ПРОЙДЕН!');
}

function test2 () {
  
var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
var a2=deepCopy(a1);
console.log(' a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN]');
console.log('a1===a2 => false');
console.log((a1===a2)?'НЕ ПРОЙДЕН!':'пройден');

console.log('typeof(a2)===typeof(a1) => true');
console.log((typeof(a2)===typeof(a1))?'пройден':'НЕ ПРОЙДЕН!');

console.log('a1[0]===a2[0] => true');
console.log((a1[0]===a2[0])?'пройден':'НЕ ПРОЙДЕН!');

console.log('a1[1]===a2[1]  => false');
console.log((a1[1]===a2[1])?'НЕ ПРОЙДЕН!':'пройден');

console.log('a1[1].b1===a2[1].b1  =>  true');
console.log((a1[1].b1===a2[1].b1)?'пройден':'НЕ ПРОЙДЕН!');

console.log('a1[2]===a2[2]  =>  false');
console.log((a1[2]===a2[2])?'НЕ ПРОЙДЕН!':'пройден');

console.log('a1[2][0]===a2[2][0]  =>   true');
console.log((a1[2][0]===a2[2][0])?'пройден':'НЕ ПРОЙДЕН!');

console.log('a1[3]===a2[3]  =>   true');
console.log((a1[3]===a2[3])?'пройден':'НЕ ПРОЙДЕН!');

console.log('a1[4]===a2[4]   =>   true');
console.log((a1[4]===a2[4] )?'пройден':'НЕ ПРОЙДЕН!');

console.log('isNaN(a2[5])    =>   true');
console.log((isNaN(a2[5]) )?'пройден':'НЕ ПРОЙДЕН!');

console.log('a2[2] instanceof Array     =>   true');
console.log((a2[2] instanceof Array )?'пройден':'НЕ ПРОЙДЕН!');
}

function test3 () {

  var v1="sss";
var v2=deepCopy(v1);

console.log(' v1="sss"');
console.log('typeof(v2)===typeof(v1) => true');
console.log((typeof(v2)===typeof(v1))?'пройден':'НЕ ПРОЙДЕН!');

console.log('v1===v2 => true');
console.log((v1===v2)?'пройден':'НЕ ПРОЙДЕН!');
}

function test4 () {
var z1=null;
var z2=deepCopy(z1);

console.log(' z1=null');
console.log('typeof(z2)===typeof(z1)  => true');
console.log((typeof(z2)===typeof(z1) )?'пройден':'НЕ ПРОЙДЕН!');

console.log('z1===z2  => true');
console.log((z1===z2 )?'пройден':'НЕ ПРОЙДЕН!');
}

function test5 () {
  
  var n1=Number.NaN;
var n2=deepCopy(n1);

console.log(' n1=Number.NaN');
console.log('typeof(n2)===typeof(n1)  => true');
console.log((typeof(n2)===typeof(n1) )?'пройден':'НЕ ПРОЙДЕН!');

console.log('isNaN(n2)  => true');
console.log((isNaN(n2) )?'пройден':'НЕ ПРОЙДЕН!');
}
