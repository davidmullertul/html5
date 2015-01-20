(function () {
    'use strict';
    var handleTouch;                //promìnná pro obsluhu kliknutí na displej
    var buttons = new Array();      //pole jednotlivých karet pexesa
    var btn1, btn2;                 //oznaèená karta1 a karta2
    var tah = 1;                    //aktuální tah
    var bcgArray;                   //náhodnì generované pole pro generování pozadí otoèených karet
    var pocetNalezenych = 0;        //poèet nalezených dvojic
    var aktualniHrac = 0;           //hráè, který je na øadì
    var kartaOtocena = 0;           //kontrolní promìnná(nelze otoèit víc jak dvì karty)
    var poleHracu = new Array();    //seznam hráèù
    
    //naplnìní pole tlaèítky
    for(var i = 1; i < 13; i++){
        buttons.push(document.getElementById('btn'+i));
    }
        
    /*******************blok funkcí***********************/
    /*
        Objekt Hrac obsahující poèet bodù a jméno hráèe
    */
    function Hrac(_jmeno){
      this.jmeno = _jmeno;
      this.pocetBodu = 0;
    }
    
    /*
        Funkce, která je spuštìna pøi spuštìní skriptu. Nastavuje šíøku dokumentu
        a umisuje hlavní blok doprostøed okna. Dále nastavuje šíøku tlaèítek a jména
        hráèù z localStorage.
    */
    function onCreate(){
          var hrac;
          var velikostTlacitka;
          if(window.screen.availHeight < window.screen.availWidth){
          //naležato
             velikostTlacitka= window.innerHeight / 7;               
           }else if (window.screen.availHeight > window.screen.availWidth){
           //nastojato
             velikostTlacitka= window.screen.availWidth / 3.5;
           } 
           
          for(var i = 0; i < 12; i++){
              buttons[i].style.width = velikostTlacitka+"px";
              buttons[i].style.height = velikostTlacitka+"px";
          }
          
          if(localStorage.getItem("pocetHracu") == 1){
              hrac = localStorage.getItem("hracJedna");
              poleHracu.push(new Hrac(hrac));
          }else{
              hrac = localStorage.getItem("hracJedna");
              poleHracu.push(new Hrac(hrac));
              hrac = localStorage.getItem("hracDva");
              poleHracu.push(new Hrac(hrac));
          }
          
          document.getElementById("okno").style.width = window.screen.availWidth+"px";
          document.getElementById("okno").style.height = window.screen.availHeight+"px";
          document.getElementById("layout").style.width = window.screen.availWidth+"px";
          document.getElementById("layout").style.height = window.screen.availHeight+"px";
          document.getElementById("layout").style.verticalAlign = "middle"; 
    }
    
    /*
          Funkce vygeneruje na náhodná neobsazená místo v poli dvojce èísel
          od 1-6, která jsou následnì využita pro výbìr pozadí karet na daných
          pozicích. 
    */  
    function randomBcg () {
        var zarazeno, pozice;
        var cislo = 1;
        bcgArray = new Array(12);
        for(var i = 0; i < 12; i++){
              zarazeno = 0;
              while(zarazeno != 1){
                  pozice = Math.floor((Math.random() * 12));
                  if(bcgArray[pozice] == undefined) {
                     bcgArray[pozice] = cislo;
                     cislo++;
                     zarazeno = 1;
                     if (cislo == 7){
                        cislo = 1;
                     }
                  }
              }
        }
    };
    
    /*
          Funkce generuje novou hru. Na zaèátku nuluje všechny promìnné, vygeneruje
          náhodné pole pro pozadí, vynuluje body všem hráèùm, resetuje pozadí všem 
          kartám a vypíše aktuální stav hry. 
    */
    function novaHra(){
      pocetNalezenych = 0;
      aktualniHrac = 0;
      kartaOtocena = 0;
      tah = 1;
      randomBcg();
      
      for(var i = 0; i < poleHracu.length; i++){
          poleHracu[i].pocetBodu = 0;
      }
      
      for(var i = 0; i < 12; i++){
        buttons[i].style.backgroundImage = "url(pozadi.png)";
        buttons[i].disabled = false;                      
      }
      
      document.getElementById("hracNaRade").innerHTML='Hrac: '+poleHracu[aktualniHrac].jmeno;
      document.getElementById("hracBody").innerHTML='Body: '+poleHracu[aktualniHrac].pocetBodu;  
    }
    
    /*
          Funkce testuje konec hry. Používá pro to poèet nalezených páru.
    */
    function testKonec(){
      if(pocetNalezenych == 6)
        return 1;
      return 0;
    }
    
    /*
          Funkce obsluhuje událost kliknutí na kartu. Sleduje poèet otoèených karet.
          Pokud není otoèená žádná karta, zmìní obrázek pozadí karty a její barvu.
          Dále je karta uzamèena, aby nebylo možné její opìtovné stiknutí. Pokud
          je otoèena karta druhá, nastaví opìt pozadí a barvu karty a uzamkne ji.
          Dále je jsou porovnána pozadí obou karet. Pokud se shodují, je aktuálnímu
          hráèi pøidán bod a pokraèuje se dále ve høe (dokud není konec). Pokud se 
          neshodují, hraje další hráè. Funkce ještì nastaví zpoždìní pro otoèení
          karet na 1s. 
    */
    handleTouch = function (event) {
        if(kartaOtocena == 0){      //možnost otoèení pouze dvou karet najednou
            var cisloPozadi; 
            var vitez;              //pokud došlo k ukonèení, je zde uložen vítìz
            if(tah == 1){
            //První tah
                btn1 = event.target.id;
                cisloPozadi = btn1.substring(3);                 //oøíznutí btn
                cisloPozadi = bcgArray[cisloPozadi-1];          //cisloPozadi-1 -> tlaèítka jsou indexována od 1, kdežto pole od 0
                document.getElementById(btn1).style.backgroundColor = "#FFFFFF";
                document.getElementById(btn1).style.backgroundImage = "url(a"+cisloPozadi+".png)";
                document.getElementById(btn1).disabled = true;  //tlaèítko není aktivní
                tah++;
            }else{
            //Druhý tah
                btn1 = document.getElementById(btn1);
                btn2 = document.getElementById(event.target.id);
                cisloPozadi = event.target.id.substring(3);
                cisloPozadi = bcgArray[cisloPozadi-1];
                btn2.style.backgroundColor = "#FFFFFF"; 
                btn2.style.backgroundImage = "url(a"+cisloPozadi+".png)";
                tah = 1;
                //Pár nalezen
                if(btn1.style.backgroundImage == btn2.style.backgroundImage){
                     poleHracu[aktualniHrac].pocetBodu++;
                     btn2.disabled = true;
                     pocetNalezenych++; 
                     if(testKonec() == 1){
                        //Konec hry a nalezení vítìze
                        if(poleHracu.length == 2 && poleHracu[0].pocetBodu <= poleHracu[1].pocetBodu){
                               vitez = poleHracu[1].jmeno;
                        }else if(poleHracu.length == 2 && poleHracu[1].pocetBodu < poleHracu[0].pocetBodu){
                               vitez = poleHracu[1].jmeno;
                        }else{
                              vitez = poleHracu[0].jmeno;
                        }
                        alert("Game Over!!!\nVyhrává "+vitez);
                        novaHra();
                     }
                //Pár nenalezen
                }else{
                    kartaOtocena =! kartaOtocena;
                    aktualniHrac++; 
                    if((aktualniHrac) == poleHracu.length){
                       aktualniHrac = 0;
                    }
                    //Nastavení prodlevy pro otoèení karet
                    setTimeout(function(){
                        btn1.style.backgroundImage = "url(pozadi.png)";
                        btn2.style.backgroundImage = "url(pozadi.png)";
                        btn1.disabled = false;
                        btn2.disabled = false;
                        kartaOtocena =! kartaOtocena;
                    },1000);
                }
              }
              //zobrazit aktuální stav
              document.getElementById("hracNaRade").innerHTML='Hrac: '+poleHracu[aktualniHrac].jmeno;
              document.getElementById("hracBody").innerHTML='Body: '+poleHracu[aktualniHrac].pocetBodu;  
          }
    };  
    
    //blok kódu     
    randomBcg();
    
    //nastavení listeneru na všechny tlaèítka
    for(var i = 0; i < buttons.length; i++){
         buttons[i].addEventListener('touchstart', handleTouch);
    }
    
   // onCreate();
    window.addEventListener("load", onCreate(),false);
    document.getElementById("hracNaRade").innerHTML='Hrac: '+poleHracu[aktualniHrac].jmeno;
    document.getElementById("hracBody").innerHTML='Body: '+poleHracu[aktualniHrac].pocetBodu;
      

}());
