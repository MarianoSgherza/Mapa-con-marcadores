<?php

require("funciones.php");
/*$datos = $_POST;*/
//var_dump($_POST);
//var_dump($_REQUEST);
//echo 'hola';
$marcadores = [];
$marcador = [
    "id"=>"", 
    "name"=>"", 
    "address"=>"", 
    "tel"=>"", 
    "categoria"=>"", 
    "coordenadas"=>[
        "latitud"=>"",
        "longitud"=>""
    ]
];
$errores = [];
/*$errores= [
    "name",
    "address",
    "tel",
    "coordenadas"
    ];*/
$latitud = "";
$longitud = "";

    
if (!empty($_POST)&&empty($_POST["delete"])) {

    
    if (strlen($_POST["name"])>20) {
        $errores["name"] = "Hasta 20 caracteres";
      }
    
    if (!preg_match("/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\.\-\_\']+$/", $_POST["name"])) {
        $errores["name"]= "Sólo se permiten caracteres alfanuméricos y espacios";
    }

    if (empty($_POST["name"])) {
        $errores["name"]='Es obligatorio ingresar el nombre.';
    } 



    if (empty($errores['name'])) {
      $h='';
      $h=filter_var($_POST['name'], FILTER_SANITIZE_STRING);
      $n=trim($h);
      $marcador["name"]=$n;
  
    }

   /* if (!empty($_POST["address"])) {
        # code...
    }*/

    
    if (strlen($_POST["address"])>25) {
      $errores["address"] = "Hasta 25 caracteres";
    }

    if (!preg_match("/^([A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+\.?)+$/", $_POST["address"])) {
        $errores["address"]= "Sólo se permiten caracteres alfanuméricos y espacios";
    }

    if (empty($_POST["address"])) {
        $errores["address"]='Es obligatorio ingresar la dirección.';
    }

    if (empty($errores['address'])) {
      $h='';
      $h=filter_var($_POST['address'], FILTER_SANITIZE_STRING);
      $n=trim($h);
      $marcador["address"]=$n;
  
    }

    if (!preg_match("/^([0-9\s]+)(([\-])?([0-9\s]+)*)+$/", $_POST["tel"])) {
        $errores["tel"]= "Sólo se permite formato telefónico";
    }

    if (strlen($_POST["address"])>20) {
        $errores["address"] = "Hasta 20 caracteres";
    }
  

    if (empty($_POST["tel"])) {
        $errores["tel"]='Es obligatorio ingresar el teléfono.';
    } 

    if (empty($errores['tel'])) {
      $h='';
      $h=filter_var($_POST['tel'], FILTER_SANITIZE_STRING);
      $n=trim($h);
      $marcador["tel"]=$n;
  
    }

    //Regex para coordenadas

    if ($_POST["coordenadas"]) {
        
    
    if (!preg_match("/^(\s*)(-?)(\d{1,3})+((\.)(\d{0,8}))?(\s*)(\,)(\s*)(-?)(\d)+((\.)(\d{0,8}))?(\s*)$/", $_POST["coordenadas"])) {

        $errores["coordenadas"]= "Coordenadas de hasta 8 decimales separadas por coma";

    }

        
        $coordenadas = explode("," , $_POST["coordenadas"]);

        if (isset($coordenadas[1]) && isset($coordenadas[1])) {
            $latitud = trim($coordenadas[0]);
            
            $longitud = trim($coordenadas[1]);
            if (-90>=$latitud || $latitud>90) {
                $errores["coordenadas"] = "La latitud debe establecerse entre -90 y 90";
            }
        
            if (-180>=$longitud || $longitud>=180) {
                $errores["coordenadas"] = "La longitud debe estar entre -180 y 180";
            }
        }

        }
        

    if (empty($_POST["edito"])) {
          
      

        $comprobacion = json_decode(file_get_contents('marcadores.json'),true);
          //var_dump($comprobacion);
        $marcadores = $comprobacion["marcadores"];
  
          
        foreach ($marcadores as $marker) {
              
            if (($marker["coordenadas"]["latitud"])==$latitud&&($marker["coordenadas"]["longitud"]==$longitud)) {
              
                //return true; 
                $errores["coordenadas"]='Ya existe un marcador con estas coordenadas';
                //echo 'Encontre algo';
                // echo($e["coordenadas"]);
          
            }

            
        }
    }

    if (empty($_POST["coordenadas"])) {
        $errores["coordenadas"]='Es obligatorio ingresar las coordenadas.';
    } 


    if (empty($errores['coordenadas'])) {
        
        $latitud=filter_var($latitud, FILTER_SANITIZE_STRING);
        $latitud=trim($latitud);
        $marcador["coordenadas"]["latitud"] = $latitud;

        $longitud=filter_var($longitud, FILTER_SANITIZE_STRING);
        $longitud=trim($longitud);
        $marcador["coordenadas"]["longitud"] = $longitud;    
    
    }

    if (!empty($_POST["categoria"])) {
    

        if (is_null($_POST["categoria"])) {
            $errores["categoria"] = "Seleccione una categoría";
        }

    }

    if (empty($errores['categoria'])) {
        
        $marcador["categoria"] = $_POST["categoria"];
    }  


}


function guardarUsuario($marcadr) {

    $marcadores = json_decode(file_get_contents('marcadores.json'),true);
    if (is_null($marcadores)) {
        $marcadores = ['marcadores' => []];
        
	}

	$marcadores['marcadores'][] = $marcadr;
    file_put_contents('marcadores.json', json_encode($marcadores,JSON_PRETTY_PRINT));

}

if (!empty($_POST)&&empty($_POST['id'])&&empty($_POST["edito"])) {
    
    if (empty($errores)) {

        $marcador["id"] = darId();
        guardarUsuario($marcador);
        /* var_dump($marcador);*/
        
        /*header("Location:index.php");*/

    } else{

        $erroresjson["erroresjson"] = $errores;
        $erroresjson = json_encode($erroresjson);
        echo $erroresjson;
        //header("Location:index.php");

    }

}

//var_dump($errores);

if (!empty($_POST["id"])&&!empty($_POST["delete"])) {
    //echo $_POST["delete"];
    
    $lista = json_decode(file_get_contents('marcadores.json'),true);
    $nom = $_POST["name"];
    $ide = $_POST["id"];
    $items = $lista["marcadores"];
    //var_dump($items);
    $aborrar = $ide;
    json_encode($aborrar);
    echo $aborrar;
    for ($i=0; $i <count($items); $i++) { 

        if (($ide==$items[$i]["id"])&&$nom==$items[$i]["name"]&&$_POST["delete"]==1) {
            //var_dump($items[$i]);
            
            unset($items[$i]);
            
        }
        
    }
    
    
    $items = array_values($items);
    $lista["marcadores"] = $items;


    file_put_contents('marcadores.json', json_encode($lista,JSON_PRETTY_PRINT));



}

if (!empty($_POST["edito"])&&empty($errores)) {
    
    $list = json_decode(file_get_contents('marcadores.json'),true);
    $nom = $_POST["name"];
    $ide = $_POST["id"];
    $items = $list["marcadores"];
   // var_dump($items);
    
    for ($i=0; $i <count($items); $i++) { 

        if (($ide==$items[$i]["id"])&&$_POST["edito"]==1) {
            //var_dump($items[$i]);
            
            $items[$i]["name"] = $marcador["name"];
            $items[$i]["address"] = $marcador["address"];
            $items[$i]["tel"] = $marcador["tel"];
            $items[$i]["categoria"] = $marcador["categoria"];
            $items[$i]["coordenadas"]["latitud"] = $latitud;
            $items[$i]["coordenadas"]["longitud"] = $longitud;

        }
        
    }
    
    
    $items = array_values($items);
    $list["marcadores"] = $items;
    $ok = json_encode("OK");
    echo $ok;

    file_put_contents('marcadores.json', json_encode($list,JSON_PRETTY_PRINT));

}

if(!empty($_POST["edito"])&&!empty($errores)) {
    
    $erroresjson["erroresjson"]=$errores;
    //$erroresjson["erroresjson"][]=json_encode($errores);
    $erroresjson=json_encode($erroresjson);
    echo $erroresjson;

}



