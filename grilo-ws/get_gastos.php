<?php

include('conexao.php');
$dbh = new Conexao();
if (isset($_GET["id_convenio"])) {
    $id_convenio = pg_escape_string(strtoupper($_GET["id_convenio"]));
} else {
    echo json_encode(["message" => "Escolha um id_convenio!"]);
    exit;
}
$sql = "select * 
        from ordem_bancaria  
        where id_convenio='{$id_convenio}' order by data desc;";
//        echo $sql;exit;
$arr = $dbh->returnArray($sql);
if ($arr) {
    $dados["success"]=true;
    $dados["data"]=$arr;
    echo json_encode($dbh->utf8_converter($dados));
}else{
    echo json_encode(["success"=>false,"message"=>"Nada encontrado!"]);
}
