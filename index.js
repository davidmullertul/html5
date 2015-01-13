(function () {
    'use strict';
    var pocetHracu, tlacitko;
    var pocetTextBox, odeslat;    //prvky formul��e
     
    /*
        Funkce kontroluje rozsah hr��� mezi 1-2 hr��i. Podle po�tu hr��� zobrazuje
        jednotlov� prvky formul��e.
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
        Funkce obsuluje ud�lost kliknut� na tla��tko. Uklad� zji�t�n� hodnoty
        z formul��e do localStorage pro dal�� pou�it�. N�sledn� p�esm�ruje
        u�ivatele na str�nku hry.
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
          Funkce spu�t�n� na za��tku vykonav�n� skriptu. Nastavuje v��ku a ���ku dokumentu.
    */
    function onCreate(){
          if(window.innerHeight < window.innerWidth){
          //nale�ato
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
    
    //p�id�n� listeneru na pole s po�tem hr���
    pocetTextBox = document.getElementById("field5");
    pocetTextBox.addEventListener('change', pocetHracu);
    //p�id�n� listeneru na tla��tko "Nov� hra"
    tlacitko = document.getElementById("button_click"); 
    tlacitko.addEventListener('click', odeslat);
    //na za��tku jsou nepot�ebn� pole neaktivn� (neviditeln�) 
    document.getElementById("field4-container").style.display = 'none';
    document.getElementById("field3-container").style.display = 'none'; 
    document.getElementById("form-submit").style.display = 'none';
    onCreate();  
}());
