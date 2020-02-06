 "use strict";

    function randomDiap(n,m) {
            return Math.floor(Math.random()*(m-n+1))+n;
    }

    function mood(colorsCount) {
        var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];

        console.log( 'цветов: ' + colorsCount );
        
        
      var h={};
      var i=1;
            
      while (i<=colorsCount) {
                
        var n=randomDiap(1,7);   
        var colorName=colors[n];
          if (colorName in h) {
            continue
          }
          else {
            h[colorName]=true;
                  console.log( colorName) ;
                }
               i++;
              }                 
    }

    mood(3);
