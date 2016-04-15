<?php

include('conexao.php');
$dbh = new Conexao();
if (isset($_GET["id_proponente"])) {
    $id_proponente = pg_escape_string(strtoupper($_GET["id_proponente"]));
} else {
    echo json_encode(["message" => "Escolha um proponente!"]);
    exit;
}
$sql = "select distinct(p.id), p.cod_programa_siconv, p.nome, p.descricao, p.data_disponibilizacao, 
       p.data_inicio_recebimento_propostas, p.data_fim_recebimento_propostas, 
       p.acao_orcamentaria, p.obriga_plano_trabalho, p.aceita_emenda_parlamentar, 
       p.data_publicacao_dou, p.possui_chamamento_publico, p.aceita_despesa_administrativa, 
       p.data_inicio_emenda_parlamentar, p.data_fim_emenda_parlamentar, 
       p.data_inicio_beneficiario_especifico, p.data_fim_beneficiario_especifico, 
       p.situacao, p.id_orgao_superior, p.id_orgao_vinculado, p.id_orgao_mandatario, 
       p.id_orgao_executor
from convenio c,convenio_programa cp, programa p, proponente pp where c.id=cp.id_convenio AND cp.id_programa=p.id 
AND c.id_proponente=pp.id 
-- AND pp.id_natureza_juridica=34
AND id_situacao = 28 and pp.id='{$id_proponente}'
order by nome;";
//        echo $sql;exit;
$arr = $dbh->returnArray($sql);
if ($arr) {
    $dados["success"]=true;
    $dados["data"]=$arr;
    echo json_encode($dbh->utf8_converter($dados));
}else{
    echo json_encode(["success"=>false,"message"=>"Nada encontrado!"]);
}
