function LocStorage(k) {
  
  let self=this;
 self.newKey=k;
 
if(!localStorage[self.newKey]) {
  self.storage= {};
} else self.storage=JSON.parse(localStorage[self.newKey]);
  
  self.addValue=function(key,value){
    
    self.storage[key] =value;
    localStorage[self.newKey]=JSON.stringify(self.storage);
  
    
    
  }

  self.getValue=function(key) {
   if (key in self.storage) {
    return self.storage[key];
   }
    
    else 
    return undefined; 
    
  }
    
  self.deleteValue=function(key) {
    
    if (key in self.storage) {
    delete self.storage[key];
   
    localStorage[self.newKey]=JSON.stringify(self.storage);
    return true;
    }
    else 
    return false;


  }
  self.getKeys=function() {
    return Object.keys(self.storage);
  }
 
}
 

let drinkStorage = new LocStorage('drinks');
 
function clickGetValue() {
  var key=prompt('Введите название напитка');
     let al=prompt('Напиток алкогольный?');
     let rec=prompt('Введите рецепт');
     
     drinkStorage.addValue(key,{alco:al, recipe: rec})
    
}

function clickInfoValue() {
  let key=prompt('Введите название напитка');
  
  let a=drinkStorage.getValue(key);
  if (a) {
  let alco=('алкогольный: ');
  let recipe=('рецепт приготовления: ');

  alert('Напиток: '+key+'\n'+alco+a.alco+'\n'+recipe+a.recipe) 
  
  }
    
  else {
  alert(a);
  }
  
}

function clickDeleteValue() {
  let key= prompt('Введите название напитка');
   alert(drinkStorage.deleteValue(key)); 
}

function clickGetKeys() {
  alert(drinkStorage.getKeys())
}


let dishStorage=new LocStorage('dishes');

function clickGetValueDish() {
  let key=prompt('Введите название блюда');
     let des=prompt('Это десерт?');
     let rec=prompt('Введите рецепт');
     
     
     dishStorage.addValue(key,{desert:des, recipe: rec})
     
}

function clickInfoValueDish() {
  let key=prompt('Введите название блюда');
  
  let a=dishStorage.getValue(key);
  if (a) {
  let desert=('десерт: ');
  let recipe=('рецепт приготовления: ');

  alert('Блюдо: '+key+'\n'+desert+a.desert+'\n'+recipe+a.recipe) 
  
  }
    
  else {
  alert(a);
  }
  
}

function clickDeleteValueDish() {
  let key= prompt('Введите название блюда');
   alert(dishStorage.deleteValue(key)); 
}

function clickGetKeysDish() {
  alert(dishStorage.getKeys())
}