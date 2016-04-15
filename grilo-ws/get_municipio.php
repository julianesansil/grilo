<?php

include('conexao.php');
$dbh = new Conexao();
if (isset($_GET["uf"])) {
    $uf = pg_escape_string(strtoupper($_GET["uf"]));
} else {
    echo json_encode(["message" => "Escolha uma UF!"]);
    exit;
}
$sql = "SELECT id,nome FROM municipio where uf='{$uf}' order by nome";
$ufs = $dbh->returnArray($sql);

echo json_encode($ufs);
