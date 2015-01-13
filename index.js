(function () {
    'use strict';
    var pocetHracu, tlacitko;
    var pocetTextBox, odeslat;    //prvky formuláøe
     
    /*
        Funkce kontroluje rozsah hráèù mezi 1-2 hráèi. Podle poètu hráèù zobrazuje
        jednotlové prvky formuláøe.
    */
    pocetHracu = function pocetHracu(event){
       if(pocetTextBox.value == 1){
              document.getElementById("field3-container").style.display = 'block';
              document.getElementById("field4-container").style.display = 'none'; 
              document.getElementById("form-submit").style.display = 'block';  
       } else if(pocetTextBox.value == 2){
              document.getElementById("field4-container").style.display = 'block';
              document.getElementById("field3-container").style.display = 'block'; 
              document.getElementById("form-submit").style.display = 'block';  
       } else {
              document.getElementById("field4-container").style.display = 'none';
              document.getElementById("field3-container").style.display = 'none'; 
              document.getElementById("form-submit").style.display = 'none';  
       }
    }
    
    /*
        Funkce obsuluje událost kliknutí na tlaèítko. Ukladá zjištìné hodnoty
        z formuláøe do localStorage pro další použití. Následnì pøesmìruje
        uživatele na stránku hry.
    */
    odeslat = function (event) {
        var jmenoHrace;
        var pocetHracu = pocetTextBox.value;
        localStorage.setItem('pocetHracu', pocetHracu); 
        if(pocetHracu == 1){
            localStorage.setItem('hracJedna', document.getElementById("field3").value);
            window.location.href = "hra.html";
        }else if(pocetHracu == 2){
            localStorage.setItem('hracJedna', document.getElementById("field3").value);
            localStorage.setItem('hracDva', document.getElementById("field4").value);
            window.location.href = "hra.html";
        }
    }; 
    
    /*
          Funkce spuštìná na zaèátku vykonavání skriptu. Nastavuje výšku a šíøku dokumentu.
    */
    function onCreate(){
          if(window.innerHeight < window.innerWidth){
          //naležato
             document.getElementById("okno").style.width = window.screen.availWidth+"px";
             document.getElementById("okno").style.height = window.screen.availHeight+"px";
             document.getElementById("layout").style.width = window.screen.availWidth+"px";
             document.getElementById("layout").style.height = window.screen.availHeight+"px";
             document.getElementById("layout").style.verticalAlign = "middle";              
           }else{
           //nastojato
             document.getElementById("okno").style.width = window.screen.availWidth+"px";
             document.getElementById("okno").style.height = window.screen.availHeight+"px";
             document.getElementById("layout").style.width = window.screen.availWidth+"px";
             document.getElementById("layout").style.height = window.screen.availHeight+"px";
             document.getElementById("layout").style.verticalAlign = "middle";
           }
    } 
    
    //pøidání listeneru na pole s poètem hráèù
    pocetTextBox = document.getElementById("field5");
    pocetTextBox.addEventListener('change', pocetHracu);
    //pøidání listeneru na tlaèítko "Nová hra"
    tlacitko = document.getElementById("button_click"); 
    tlacitko.addEventListener('click', odeslat);
    //na zaèátku jsou nepotøebná pole neaktivní (neviditelná) 
    document.getElementById("field4-container").style.display = 'none';
    document.getElementById("field3-container").style.display = 'none'; 
    document.getElementById("form-submit").style.display = 'none';
    onCreate();  
}());
