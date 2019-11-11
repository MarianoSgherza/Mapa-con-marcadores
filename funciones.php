<?php 
//require_once("registro.php");

function darId()
{

    if (empty($comprobacion)) {

        $comprobacion = json_decode(file_get_contents('marcadores.json'),true);
        //var_dump($comprobacion);
        $marcadores = $comprobacion["marcadores"];
    
        $ids = [];
        foreach ($marcadores as $marcador) {
        
            $id = '';
            if (isset($marcador["id"])) {
            
                $ids[] = $marcador["id"];
                
            }                                           
            
        } 

        $ultimoid = max($ids);
        // var_dump($ultimoid);
        $id = $ultimoid +1;
        //var_dump($ultimoid);
        //var_dump($comprobacion);

    }else {

        $id = 1;

    }

    return $id;

}



   