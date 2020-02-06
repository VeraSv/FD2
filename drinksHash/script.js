
class HashStorageFunc {
  constructor () {
    this.storage= {};
  }
  
    
  addValue (key,value){
    
    this.storage[key] =value;

  }

  getValue (key) {
    
   return this.storage[key];
   
  }
    
 deleteValue (key) {
    
    if (key in this.storage) {
    delete this.storage[key];
    return true;
    }
    else 
    return false;


  }
  getKeys() {
    return Object.keys(this.storage);
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
