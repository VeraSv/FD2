var name = prompt('Введите имя', '');
while(!name)
  name = prompt('Вы не ввели имя', '');
var surname = prompt('Введите фамилию', '');
while(!surname)
surname = prompt('Вы не ввели фамилию', '');
var name2 = prompt('Введите отчество', ''); 
while(!name2)
name2 = prompt('Вы не ввели отчество', '');
do {
  var age = prompt('Сколько Вам лет?', '');
  age = parseInt(age);
  if( !age ) continue; 
} while(isNaN(age));
  
  
  var z = confirm("Ваш пол мужской?");
  var a, b;
  
  if (z==true && age>=61) {
    a = "мужской";
    b = "да";
  } else if(z==true && age<61) {
      a = "мужской";
      b = "нет";
    } else if(z==false && age>=56)  {
        a = "женский";
        b = "да";
      }  else if(z==false && age<56) {
            a = "женский";
            b = "нет";
          }
     
  alert("Ваше ФИО: " + name+ " " + surname +" "+ name2+ "\n"+ "Ваш возраст в годах: " + age+ "\n"+"Ваш возраст в днях: "+ age*365+"\n" + "Через 5 лет Вам будет: "
  + (Number(age) + 5) + "\n"  +  "Ваш пол: " + a + "\n" + "Вы на пенсии: " + b)