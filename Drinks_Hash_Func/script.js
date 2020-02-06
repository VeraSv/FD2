function HashStorageFunc() {
  let self=this;
 
  self.storage= {};
    
  self.addValue=function(key,value){
    
    self.storage[key] =value;
    
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
    return true;
    }
    else 
    return false;


  }
  self.getKeys=function() {
    return Object.keys(self.storage);
  }
 

}
 

let drinkStorage = new HashStorageFunc();
function clickGetValue() {
  let key=prompt('Введите название напитка');
     let al=prompt('Напиток алкогольный?');
     let rec=prompt('Введите рецепт');
     
     
     drinkStorage.addValue(key,{alco:al, recipe: rec})
}

function clickInfoValue() {
  let key=prompt('Введите название напитка');
  
  let a=(drinkStorage.getValue(key));
  if (a) {
  let alco=('алкогольный: ');
  let recipe=('рецепт приготовления: ');
  alert('Напиток: '+key+'\n'+alco+a.alco+'\n'+recipe+a.recipe);
  
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

