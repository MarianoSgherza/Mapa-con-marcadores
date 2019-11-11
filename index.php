
<?php 
    include("registro.php");
    
   // var_dump($_POST);
  // var_dump($errores);
   
?>

<!DOCTYPE html>
<html lang="es-ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""/>

  <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
   integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
   crossorigin=""></script>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/validate.js"></script>
  <script src="js/script.js"></script>
  <title>Document</title>
</head>
<body>

    <div class="container-fluid">
        
        <div id="marker-menu" class="col-5 col-sm-4 col-lg-3 col-xl-2">
            <div class="marker-h">
                <p class="menu-text">Opciones de marcador</p>
            </div>
            <div class="marker-slide" style="display:none">

                <div class="marker-opt">
                    <div class="agregar" id="agregar_mk">
                        <p class="menu-text">Agregar marcador</p>
                        
                    </div>
                    
                </div>
                <div id="marker-list">
                    
                </div>
            </div>
        </div>
        <div id="form-wrapper" class="mr-3 mt-2" style="display: none;">
        <form action="index.php" method="post" id="map-form" class="py-3 px-3" novalidate>

            <h2 id="form-title" class="mark-title">Agregar marcador</h2>

            <div class="form-group row">
                <label for="name" class="col-3 col-form-label col-form-label-sm tag">Nombre</label>
                <div class="col-9">
                    <input type="text" name="name" class="campo form-control form-control-sm <?php if(isset($errores["name"])){echo 'is-invalid';};?>" id="name" value="<?php if(isset($_POST["name"])){echo $_POST['name'];};?>" placeholder="Ej: Av. Madero 1652" required>
                    <div class="invalid-feedback valid-feedback" id="name-error"><?php if(isset($errores["name"])){echo  ($errores['name']);};?></div>
                </div>
            </div>
            <div class="form-group row">
                <label for="address" class="col-3 col-form-label col-form-label-sm tag">Dirección</label>
                <div class="col-9">
                    <input type="text" name="address" class="campo form-control form-control-sm <?php if(isset($errores["address"])){echo 'is-invalid';};?>" id="address" value="<?php if(isset($_POST["address"])){echo $_POST['address'];};?>" placeholder="Ej: Av. Madero 1652">
                    <div id="address-error" class="invalid-feedback valid-feedback"><?php if(isset($errores["address"])){echo $errores["address"];}?></div>
                </div>    
            </div>

            <div class="form-group row">
                <label for="tel" class= "col-3 col-form-label col-form-label-sm tag">Teléfono</label>
                <div class="col-9">
                    <input type="text" name="tel" class="campo form-control form-control-sm <?php if(isset($errores["tel"])){echo 'is-invalid';};?>" id="tel" value="<?php if(isset($_POST["tel"])){echo $_POST['tel'];};?>" placeholder="Número de teléfono">
                    <div id="tel-error" class="invalid-feedback valid-feedback"><?php if(isset($errores["tel"])){echo $errores["tel"];}?></div>
                </div>    
            </div>

            <div class="form-group row">
                <label for="categoria" class="col-3 col-form-label col-form-label-sm tag">Categoría</label>

                <div class="col-9">    
                    <select name="categoria" class="form-control form-control-sm" id="categoria">
                        <option selected disabled>Seleccione una categoría</option>
                        <option value="comercial">Comercial</option>
                        <option value="residencial">Residencial</option>
                        <option value="mixta">Mixta</option>
                    </select>
                    <div id="categoria-error" class="invalid-feedback valid-feedback"><?php if(isset($errores["categoria"])){echo $errores["categoria"];}?></div>

                </div>    
            </div>
              
            <div class="form-group row">
                <label for="coordenadas" class="col-3 col-form-label col-form-label-sm tag">Coord.</label>
                <div class="col-9">
                    <input type="text" name="coordenadas" class="campo form-control form-control-sm <?php if(isset($errores["coordenadas"])){echo 'is-invalid';};?>" id="coordenadas" value="<?php if(isset($_POST["coordenadas"])){echo ($_POST['coordenadas']);};?>" placeholder="lat,long">
                    <div id="coordenadas-error" class="invalid-feedback valid-feedback"><?php if(isset($errores["coordenadas"])){echo $errores["coordenadas"];}?></div>
                </div>    
            </div>

            <div class="custom-control custom-switch sw-dv">
                <input type="checkbox" name="coordMap" class="custom-control-input" id="customSwitch1">
                <label class="custom-control-label sw-mk"  for="customSwitch1">Coordenadas desde el mapa</label>
            </div>
            <div class="d-flex flex-row-reverse">
                <input type="submit" class="btn btn-success btn-sm agregar col-3" id="agr-btn" value="Agregar">
            </div>  
                    
            <div class="d-flex flex-row-reverse">
                <input type="button" class="btn btn-success btn-sm agregar col-3" id="edit-btn" value="Editar">
            </div>   
        </form>
    </div>
        
        <div class="row col-11 py-5 mx-auto mapawrapper">
            <div class="" id="mapa"></div>
        </div>

    
    </div>

</body>
</html> 