<?php

include('conexao.php');
$dbh = new Conexao();
if (isset($_GET["id_municipio"])) {
    $id_municipio = pg_escape_string(strtoupper($_GET["id_municipio"]));
    $where = "and p.id_municipio='{$id_municipio}'";
} else {
    $where = "";
}
$sql = "select p.id as id_proponente,p.nome nome_proponente,ob.valor valor_ob, ob.data data_ob,
    c.id id_conveio,c.objeto objeto_convenio, c.numero_interno numero_interno_convenio ,
    c.valor_global,c.justificativa,o.nome orgao_concedente
    from convenio c,proponente p,ordem_bancaria ob, orgao o
    where c.id_proponente=p.id 
    AND c.id=ob.id_convenio 
    AND c.id_orgao_concedente=o.id
    AND c.id_situacao = 28 
    $where
    order by data desc limit 10";

//        echo $sql;exit;
$arr = $dbh->returnArray($sql);
if ($arr) {
    $dados["success"] = true;
    $dados["data"] = $arr;
    echo json_encode($dbh->utf8_converter($dados));
} else {
    echo json_encode(["success" => false, "message" => "Nada encontrado!"]);
}
