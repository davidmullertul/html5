(function () {
    'use strict';
    var handleTouch;                //prom�nn� pro obsluhu kliknut� na displej
    var buttons = new Array();      //pole jednotliv�ch karet pexesa
    var btn1, btn2;                 //ozna�en� karta1 a karta2
    var tah = 1;                    //aktu�ln� tah
    var bcgArray;                   //n�hodn� generovan� pole pro generov�n� pozad� oto�en�ch karet
    var pocetNalezenych = 0;        //po�et nalezen�ch dvojic
    var aktualniHrac = 0;           //hr��, kter� je na �ad�
    var kartaOtocena = 0;           //kontroln� prom�nn�(nelze oto�it v�c jak dv� karty)
    var poleHracu = new Array();    //seznam hr���
    
    //napln�n� pole tla��tky
    for(var i = 1; i < 13; i++){
        buttons.push(document.getElementById('btn'+i));
    }
        
    /*******************blok funkc�***********************/
    /*
        Objekt Hrac obsahuj�c� po�et bod� a jm�no hr��e
    */
    function Hrac(_jmeno){
      this.jmeno = _jmeno;
      this.pocetBodu = 0;
    }
    
    /*
        Funkce, kter� je spu�t�na p�i spu�t�n� skriptu. Nastavuje ���ku dokumentu
        a umis�uje hlavn� blok doprost�ed okna. D�le nastavuje ���ku tla��tek a jm�na
        hr��� z localStorage.
    */
    function onCreate(){
          var hrac;
          var velikostTlacitka;
          if(window.screen.availHeight < window.screen.availWidth){
          //nale�ato
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
          Funkce vygeneruje na n�hodn� neobsazen� m�sto v poli dvojce ��sel
          od 1-6, kter� jsou n�sledn� vyu�ita pro v�b�r pozad� karet na dan�ch
          pozic�ch. 
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
          Funkce generuje novou hru. Na za��tku nuluje v�echny prom�nn�, vygeneruje
          n�hodn� pole pro pozad�, vynuluje body v�em hr���m, resetuje pozad� v�em 
          kart�m a vyp�e aktu�ln� stav hry. 
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
          Funkce testuje konec hry. Pou��v� pro to po�et nalezen�ch p�ru.
    */
    function testKonec(){
      if(pocetNalezenych == 6)
        return 1;
      return 0;
    }
    
    /*
          Funkce obsluhuje ud�lost kliknut� na kartu. Sleduje po�et oto�en�ch karet.
          Pokud nen� oto�en� ��dn� karta, zm�n� obr�zek pozad� karty a jej� barvu.
          D�le je karta uzam�ena, aby nebylo mo�n� jej� op�tovn� stiknut�. Pokud
          je oto�ena karta druh�, nastav� op�t pozad� a barvu karty a uzamkne ji.
          D�le je jsou porovn�na pozad� obou karet. Pokud se shoduj�, je aktu�ln�mu
          hr��i p�id�n bod a pokra�uje se d�le ve h�e (dokud nen� konec). Pokud se 
          neshoduj�, hraje dal�� hr��. Funkce je�t� nastav� zpo�d�n� pro oto�en�
          karet na 1s. 
    */
    handleTouch = function (event) {
        if(kartaOtocena == 0){      //mo�nost oto�en� pouze dvou karet najednou
            var cisloPozadi; 
            var vitez;              //pokud do�lo k ukon�en�, je zde ulo�en v�t�z
            if(tah == 1){
            //Prvn� tah
                btn1 = event.target.id;
                cisloPozadi = btn1.substring(3);                 //o��znut� btn
                cisloPozadi = bcgArray[cisloPozadi-1];          //cisloPozadi-1 -> tla��tka jsou indexov�na od 1, kde�to pole od 0
                document.getElementById(btn1).style.backgroundColor = "#FFFFFF";
                document.getElementById(btn1).style.backgroundImage = "url(a"+cisloPozadi+".png)";
                document.getElementById(btn1).disabled = true;  //tla��tko nen� aktivn�
                tah++;
            }else{
            //Druh� tah
                btn1 = document.getElementById(btn1);
                btn2 = document.getElementById(event.target.id);
                cisloPozadi = event.target.id.substring(3);
                cisloPozadi = bcgArray[cisloPozadi-1];
                btn2.style.backgroundColor = "#FFFFFF"; 
                btn2.style.backgroundImage = "url(a"+cisloPozadi+".png)";
                tah = 1;
                //P�r nalezen
                if(btn1.style.backgroundImage == btn2.style.backgroundImage){
                     poleHracu[aktualniHrac].pocetBodu++;
                     btn2.disabled = true;
                     pocetNalezenych++; 
                     if(testKonec() == 1){
                        //Konec hry a nalezen� v�t�ze
                        if(poleHracu.length == 2 && poleHracu[0].pocetBodu <= poleHracu[1].pocetBodu){
                               vitez = poleHracu[1].jmeno;
                        }else if(poleHracu.length == 2 && poleHracu[1].pocetBodu < poleHracu[0].pocetBodu){
                               vitez = poleHracu[1].jmeno;
                        }else{
                              vitez = poleHracu[0].jmeno;
                        }
                        alert("Game Over!!!\nVyhr�v� "+vitez);
                        novaHra();
                     }
                //P�r nenalezen
                }else{
                    kartaOtocena =! kartaOtocena;
                    aktualniHrac++; 
                    if((aktualniHrac) == poleHracu.length){
                       aktualniHrac = 0;
                    }
                    //Nastaven� prodlevy pro oto�en� karet
                    setTimeout(function(){
                        btn1.style.backgroundImage = "url(pozadi.png)";
                        btn2.style.backgroundImage = "url(pozadi.png)";
                        btn1.disabled = false;
                        btn2.disabled = false;
                        kartaOtocena =! kartaOtocena;
                    },1000);
                }
              }
              //zobrazit aktu�ln� stav
              document.getElementById("hracNaRade").innerHTML='Hrac: '+poleHracu[aktualniHrac].jmeno;
              document.getElementById("hracBody").innerHTML='Body: '+poleHracu[aktualniHrac].pocetBodu;  
          }
    };  
    
    //blok k�du     
    randomBcg();
    
    //nastaven� listeneru na v�echny tla��tka
    for(var i = 0; i < buttons.length; i++){
         buttons[i].addEventListener('touchstart', handleTouch);
    }
    
   // onCreate();
    window.addEventListener("load", onCreate(),false);
    document.getElementById("hracNaRade").innerHTML='Hrac: '+poleHracu[aktualniHrac].jmeno;
    document.getElementById("hracBody").innerHTML='Body: '+poleHracu[aktualniHrac].pocetBodu;
      

}());
