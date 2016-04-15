<?php
include('conexao.php');
$dbh = new Conexao();
$sql = "SELECT sigla,nome FROM uf where sigla not in ('IN','NI','EX','NA') order by nome";
$ufs = $dbh->returnArray($sql);

echo json_encode($ufs);