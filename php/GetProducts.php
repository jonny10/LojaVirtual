<?php
    //echo "Script de leitura de dados do banco";
    $dbUser = 'root';
    $dbPassword = '';
    $dbName = 'store';
    $dbHost = 'localhost';
    $connection = mysqli_connect($dbHost, $dbUser, $dbPassword, $dbName);
    if ( $connection ){
        //echo "<br/>Conexão Efetuada com sucesso<br/>";
        $query = "select * from products";
        $results = mysqli_query($connection, $query);
        $products = [];
        $index = 0;
        while($record = mysqli_fetch_row($results)){
            $product = new stdClass();
            $product->id = $record[0];
            $product->name = $record[1];
            $product->description = $record[2];
            $product->category = $record[3];
            $product->urlProductImage = $record[4];
            $product->price = $record[5];
            $products[$index] = $product;
            $index = $index + 1;
        }
        echo json_encode($products);
    }else{
        echo "conexão falhada";
        var_dump(mysqli_conect_error);
    }
?>