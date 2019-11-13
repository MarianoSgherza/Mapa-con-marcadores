$(document).ready(function () {

    var mapa = document.getElementById("mapa");
    var a = document.getElementById("map-form");
    var b = a.elements;
    
    var nameInp = document.getElementById("name");
    var address = document.getElementById("address");
    var tel = document.getElementById("tel");
    var coordenadas = document.getElementById("coordenadas");
    var nameerror = document.getElementById("name-error");    
    var addresserror = document.getElementById("address-error");
    var telerror = document.getElementById("tel-error");
    var caterror = document.getElementById("categoria-error");
    var coorderror = document.getElementById("coordenadas-error");
    
    var regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\.\-\_\']+$/;
    var regexAddress = /^([A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+\.?)+$/;
    var regexTel = /^([0-9\s]+)(([\-])?([0-9\s]+)*)$/;
    var regexCoord = /^(\s*)(-?)(\d{1,3})+((\.)(\d{0,8}))?(\s*)(\,)(\s*)(-?)(\d)+((\.)(\d{0,8}))?(\s*)$/;
    var hayErrores = false;
    function validarName() {
        hayErrores = false;

        if (regexName.test(b.name.value)==false) {
            nameerror.innerHTML = 'Caracteres alfanuméricos y espacios';
            hayErrores = true;
        }

        if (b.name.value.length>20) {
            nameerror.innerHTML= "Máximo: 20 caracteres";
            hayErrores = true;

        }

        if (b.name.value.length===0) {
            nameerror.innerHTML= "El nombre es requerido";
            hayErrores = true;

        }

        if (hayErrores===true) {
            nameInp.classList.remove("is-valid");
            nameInp.classList.add("is-invalid");

        }else{
            nameInp.classList.remove("is-invalid");

            nameInp.classList.add("is-valid");
            nameerror.innerHTML='';
        }

    }

    function validarAddress() {
        hayErrores = false;

        if (regexAddress.test(b.address.value)==false) {
            addresserror.innerHTML = 'Caracteres alfanuméricos y espacios';
            hayErrores = true;
        }

        if (b.address.value.length>20) {
            addresserror.innerHTML= "Máximo: 20 caracteres";
            hayErrores = true;

        }

        if (b.address.value.length===0) {
            addresserror.innerHTML= "El nombre es requerido";
            hayErrores = true;

        }

        if (hayErrores===true) {
            address.classList.remove("is-valid");

            address.classList.add("is-invalid");
        }else{
            address.classList.remove("is-invalid");

            address.classList.add("is-valid");
            addresserror.innerHTML='';

        }

    }

    function validarTel() {

        hayErrores = false;

        if (regexTel.test(b.tel.value)==false) {
            telerror.innerHTML = 'Formato telefónico';
            hayErrores = true;
        }

        if (b.tel.value.length>20) {
            telerror.innerHTML= "Máximo: 20 caracteres";
            hayErrores = true;

        }

        if (b.tel.value.length===0) {
            telerror.innerHTML= "El nombre es requerido";
            hayErrores = true;

        }

        if (hayErrores===true) {
         
            tel.classList.remove("is-valid");
            tel.classList.add("is-invalid");

        }else{

            tel.classList.remove("is-invalid");
            tel.classList.add("is-valid");
            telerror.innerHTML='';

        }

    }

    function validarCoordenadas() {

        hayErrores = false;

        if (regexCoord.test(b.coordenadas.value)==false) {
            coorderror.innerHTML = 'Coordenadas de hasta 8 decimales separadas por coma';
            hayErrores = true;
        }

        
        

        if (b.coordenadas.value.length>0) {
        
            var c = b.coordenadas.value.split('"').join('');
            var latLong = c.split(",");
    
            if (latLong.length>0) {
                                
                var latitud = latLong[0];
                var longitud = latLong[1];
                if (-90>=latitud || latitud>=90) {
                    coorderror.innerHTML = "La latitud debe establecerse entre -90 y 90";
                    hayErrores = true;

                }
            
                if (-180>=longitud || longitud>=180) {
                    coorderror.innerHTML = "La longitud debe establecerse entre -180 y 180";
                    hayErrores = true;

                }
                

            }
            
    
        }

        if (b.coordenadas.value.length===0) {
            coorderror.innerHTML= "Las coordenadas son requeridas";
            hayErrores = true;

        }

        if (hayErrores===true) {
            coordenadas.classList.remove("is-valid");
            coordenadas.classList.add("is-invalid");
        }else{
            coordenadas.classList.remove("is-invalid");
            coordenadas.classList.add("is-valid");
            coorderror.innerHTML = "";
        }

        return hayErrores;

    }
    
    a.addEventListener ("submit", function (event) {
   
        validarName();
        validarAddress();
        validarTel();
        validarCoordenadas();

        if (hayErrores===true) {
            event.preventDefault();
        }
        
    },false);

    nameInp.addEventListener("keyup" , function () {
        
        validarName();

    })

    address.addEventListener("keyup", function () {
        
        validarAddress();
    })

    tel.addEventListener("keyup" , function () {
        validarTel();
    })

    coordenadas.addEventListener("keyup", function () {
        validarCoordenadas();
    })

    coordenadas.addEventListener("change", function () {
        validarCoordenadas();
    })

    nameInp.addEventListener("change", function () {
        validarName();
    })
    
    

})