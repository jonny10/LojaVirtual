<?php 

echo "hello world";

var_dump($_GET);

?>

<?php echo '<br/>' ?>

<?php

    ini_set("display_errors",1);
    error_reporting(E_ALL);
    echo 'Cheguei no PHP';
    $productName = $_GET['nameProduct'];
    $productPrice = $_GET['productPrice'];
    $productDescription = $_GET['productDescription'];
    $productURL = $_GET['productURL'];
    $productCategory = $_GET['ProductCategory'];
    echo '<br/>';


    echo 'Nome do produto: ',$productName,'<br/>';
    echo 'Preço do produto: ',$productPrice,'<br/>';
    echo 'Descrição do produto: ',$productDescription,'<br/>';
    echo 'URL da imagem do produto: ',$productURL,'<br/>';
    echo 'Categoria do produto: ',$productCategory,'<br/>';

    echo '<br/>';

    $hostname = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'store';
    $comn = mysqli_connect($hostname, $user, $password, $database);
    if($comn){
        echo "Conexão com o banco efetuada com sucesso!!";
        //gravar dados no bancade dados
        $query = "insert into products (productName, productDescription, productCategory, productUrlImage, productPrice) values ('".$productName."','".$productDescription."',".$productCategory.",'".$productURL."',".$productPrice.");";
        echo '<br/>', $query;
        $res = mysqli_query($comn, $query);
        if($res){
            echo "<h2>Produto incluido com sucesso<h2>!!!";
            header('Location: http://192.168.0.196:3004');
        }else{
            echo "<h2>Produto não incluido!!!<h2>";
        }
    }else{
        echo "Conexão com o banco de dados não efetuada !!!! <br/>";
        echo mysqli_conect_error();
    }
?>