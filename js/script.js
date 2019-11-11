$(document).ready(function () {

  var mymap;
  var id;

  mymap = L.map('mapa').setView([-34.603562, -58.389099], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',   {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);
  var formc = document.getElementById("form-wrapper");
  var f = document.getElementById("map-form");
  var g = f.elements;
  var h = g.coordenadas;
  
  function sacarDecimales(numero, cantDeDecimales) {
    
    var multiplicador = Math.pow(10, cantDeDecimales);
    var aTruncar = numero * multiplicador;
    var resultado = Math.trunc(aTruncar);
    var retorno = resultado/multiplicador;
    return retorno;

  }
 
    function kl(e) {

      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      var lati = sacarDecimales(e.latlng.lat, 8),
      long = sacarDecimales (e.latlng.lng, 8);
      h.value = lati + "," + long;
      
    };

   
    g.coordMap.addEventListener("click", function () {

      if (g.coordMap.checked===false) {
          
          mymap.removeEventListener('click',  kl);  
      
      } else{
        mymap.addEventListener('click',  kl);  

      }
      
    });
    
      function crearMarcador(mapa) {
        
        var marcador;
        var pin;
        var puntoRojo = "images/red_dot.png";
        var puntoAzul = "images/blue-dot.png";
        var puntoNaranja = "images/orange-dot.png";
        var contenido;
        
        for( var i = 0; i < info.marcadores.length; i++){
        
          console.log(info.marcadores[i].coordenadas.latitud);
          var cat = info.marcadores[i].categoria;
          var url;
          pin = url;
          switch (cat) {
            case "residencial":
                pin = puntoRojo;
              break;
    
            case "comercial":
                pin = puntoAzul;
              break;
              
            case "mixta":
                pin = puntoNaranja;
              break;    
          
            default:
              pin = puntoAzul;
            
              
          }
    
          var icon = L.icon({
            iconUrl: pin,
            iconSize:[30,30]
          })
    
          /*var a = coord.split('"').join('');*/
          var b = info.marcadores[i].coordenadas.latitud + ',' + info.marcadores[i].coordenadas.longitud;
          var c = info.marcadores[i].coordenadas.latitud;
          var d = info.marcadores[i].coordenadas.longitud;
    
          marcador = L.marker([c,d],{icon}).addTo(mapa);
    
          contenido = '<div class="etiqueta"><div class="etiqueta-texto">'+'<p>'+'<b>Descripción: </b>'+info.marcadores[i].name+'</p>'+'<p>'+'<b>Dirección: </b>'+info.marcadores[i].address+'</p>'+'<p>'+'<b>Teléfono: </b>'+info.marcadores[i].tel+'</p>'+'<p>'+'<b>(X,Y): </b>'+b+'</p>'+'<p>'+'<b>Categoría: </b>'+info.marcadores[i].categoria+'</p></div>'+'<div class="flecha"></div></div>';
    
          var markerOptions = ({
            closeButton: false,
            className:'popUpWrapper'
            })
    
          marcador.bindPopup(contenido, markerOptions).closePopup();
    
        }
    

      }

  function listaMarcadores() {

    var ultimo = info.marcadores.length;
    for (let i = 0; i < ultimo; i++) {

      let n = info.marcadores[i].name;
      let c = info.marcadores[i].coordenadas.latitud + ',' + info.marcadores[i].coordenadas.longitud;
      var node = document.createElement("div");
      var nombre = document.createElement("p");
      var childn = document.createTextNode(n);
      var coord = document.createElement("p");
      var childc = document.createTextNode(c);
      var botones = document.createElement("div");
      var iconoborrar = document.createElement("div");
      var imgborrar = document.createElement("img");
      var iconoeditar = document.createElement("div");
      var imgeditar = document.createElement("img");
      imgborrar.src = "images/icon_trash.svg";
      imgeditar.src = "images/iconfinder_edit.svg";
      node.classList.add("markitem");
      iconoborrar.classList.add("as");
      iconoeditar.classList.add("as");
      iconoeditar.classList.add("editicon");
      iconoborrar.classList.add("deleteicon");
      botones.classList.add("botones");
      nombre.classList.add("marknombre");
      coord.classList.add("markcoord");
      imgborrar.classList.add("imgborrar");
      imgeditar.classList.add("imgedit");
      
      iconoborrar.appendChild(imgborrar);
      iconoeditar.appendChild(imgeditar);
      iconoeditar.setAttribute("id", "edit_" + i);
      iconoborrar.setAttribute("id", "delete_" + i);
      botones.appendChild(iconoeditar);
      botones.appendChild(iconoborrar);
      botones.style.display="none";
      nombre.appendChild(childn);
      coord.appendChild(childc);
      node.appendChild(nombre);
      node.appendChild(coord);
      node.appendChild(botones);
      document.getElementById("marker-list").appendChild(node);
      var botonesid = "list_" + i;
      botones.setAttribute("id", botonesid);
      var itemid = "item_" + i;
      node.setAttribute("id", itemid);
      /*var tooltip = document.createElement("span");
      var ttext = ""*/
      $("#edit_"+i).click(function () {

        $("#form-wrapper").show();
        document.getElementById("form-title").innerHTML = "Editar marcador";
        document.getElementById("agr-btn").style.display = "none";
        document.getElementById("edit-btn").style.display = "block";
        f.name.value= info.marcadores[i].name;
        f.address.value= info.marcadores[i].address;
        f.categoria.value= info.marcadores[i].categoria;
        f.tel.value= info.marcadores[i].tel;
        f.coordenadas.value = c;
        id = info.marcadores[i].id;

        var t = document.querySelectorAll(".campo");
        var u = t.length;
        for(let i = 0; i<u;i++){
          if(t[i].classList.contains("is-invalid")){
            t[i].classList.remove("is-invalid");
          }
          if(t[i].classList.contains("is-valid")){
            t[i].classList.remove("is-valid");
          }
    
        }
            
      })

      $('#delete_'+i).click(function(){

        //console.log("hola");
        var url = "registro.php";
        var v = {'name':info.marcadores[i].name,"id":info.marcadores[i].id,"delete":1};
        
        $.ajax({ 

          type: "POST",                 
          url: url, 
          cache:false,                    
          data: v, 
          dataType:'json',
          success: function(response)             
          {
            console.log('hola');
          //  if (response.hasOwnProperty("aborrar")) {

              let list  = document.getElementById("item_" + i);
              list.parentNode.removeChild(list);
              
          //  }
            
          }
    
        })
      })

      $("#item_"+i).hover(function () {
        $("#list_"+i).show();
      },
      function () {
        $("#list_"+i).hide();
      })

    }

  }    

  var pedidoJson = new XMLHttpRequest();
  var info;

  pedidoJson.onreadystatechange = function() {
  
    if (pedidoJson.readyState == 4 && pedidoJson.status == 200) {
    
      // Declaramos y definimos una variable cuyo valor es la respuesta transformada a JSON
      info = JSON.parse(pedidoJson.responseText);
      //initMap();
      crearMarcador(mymap);
      listaMarcadores();
  
      console.log(info.marcadores[0].name);
     
    }}
  pedidoJson.open("POST", "marcadores.json", true);
  
  pedidoJson.send();

  var mousePosition;
  var offset = [0,0];
  var isDown = false;

  //var formi = document.getElementById("map-form"); 
  var formi = document.getElementById("form-wrapper"); 
  formi.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        formi.offsetLeft - e.clientX,
        formi.offsetTop - e.clientY
    ];

  }, true);

  document.addEventListener('mouseup', function() {
    isDown = false;
  }, true);

  document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
    
          x : event.clientX,
          y : event.clientY
    
        };
        formi.style.left = (mousePosition.x + offset[0]) + 'px';
        formi.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
  }, true);

  
  $(".marker-h").click(function () {
    $(".marker-slide").slideToggle("slow");
  }) 

  var agregar = document.getElementById("agregar_mk");
  agregar.addEventListener("click",function () {
    formc.style.display="block";
    document.getElementById("edit-btn").style.display = "none";
    document.getElementById("agr-btn").style.display = "block";
    f.reset();
    document.getElementById("map-form").reset();
    f.name.value = "";  
    f.address.value = "";  
    f.tel.value = "";  
    f.coordenadas.value = "";
    var r = document.querySelectorAll(".campo");
    var s = r.length;
    for(let i = 0; i<s;i++){
      if(r[i].classList.contains("is-invalid")){
        r[i].classList.remove("is-invalid");
      }
      if(r[i].classList.contains("is-valid")){
        r[i].classList.remove("is-valid");
      }
    
    }
      
  });

  //agregar.addEventListener
  
  var editores = document.querySelectorAll(".editicon");
  editores.forEach(element => {
    element.addEventListener("click", function () {
      
      formc.style.display="block";
    })
    
  });
  

  $('#edit-btn').click(function(){

    var url = "registro.php";
    var store = {

      "name":f.name.value,
      "address":f.address.value,
      "tel":f.tel.value,
      "categoria":f.categoria.value,
      "coordenadas":f.coordenadas.value,
      "edito":1,
      "id":id
      

    }
    //var store = $("#map-form").serialize();
    
    $.ajax({                        
       type: "POST",                 
       url: url, 
       cache:false,                    
       //data: $("#map-form").serialize(), 
       data:store,
       dataType:'json',
       success: function(response)             
       {
        if (response.hasOwnProperty("erroresjson")&&response.erroresjson.length>0) {
          
        
        if (erroresjson.hasOwnProperty("name")) {
          document.getElementById("name-error").innerHTML = response.erroresjson.name; 
          f.name.classList.add("is-invalid"); 
       
        }

        if (response.erroresjson.address!==undefined) {
          document.getElementById("address-error").innerHTML = response.erroresjson.address; 
          f.address.classList.add("is-invalid"); 
       
        }
        if (response.erroresjson.tel!==undefined) {
          document.getElementById("tel-error").innerHTML = response.erroresjson.tel; 
          f.tel.classList.add("is-invalid"); 
       
        }
        if (response.erroresjson.categoria!==undefined) {
          document.getElementById("categoria-error").innerHTML = response.erroresjson.categoria; 
          f.categoria.classList.add("is-invalid"); 
       
        }
        if (response.erroresjson.coordenadas!==undefined) {
          document.getElementById("coordenadas-error").innerHTML = response.erroresjson.coordenadas; 
          f.coordenadas.classList.add("is-invalid"); 
       
        }

      }
        if (response=='OK') {
          console.log('vino el ok');
          document.getElementById("form-wrapper").style.display = 'none';
        }
        
       }
    });

  });


  var agregarsbt = document.getElementById("agr-btn");
  var corderror = document.getElementById("coordenadas-error");


  if (corderror.innerHTML.length>0) {
    formc.style.display = 'block';
  }
    

  
    
});