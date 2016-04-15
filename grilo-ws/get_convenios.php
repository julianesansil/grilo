<?php

include('conexao.php');
$dbh = new Conexao();
if (isset($_GET["id_proponente"])) {
//    $id_programa = pg_escape_string(strtoupper($_GET["id_programa"]));
    $id_proponente = pg_escape_string(strtoupper($_GET["id_proponente"]));
} else {
    echo json_encode(["message" => "Escolha um programa! ?id_proponente= &id_programa="]);
    exit;
}
$sql = "select distinct(c.id),c.data_inicio_vigencia, c.data_fim_vigencia, c.justificativa, c.valor_global, 
       sum(distinct(c.valor_repasse)) valor_repasse,
       c.valor_contra_partida, c.valor_contrapartida_financeira, 
       c.valor_contrapartida_bens_servicos, c.data_assinatura, c.data_publicacao, 
       c.id_situacao, c.id_subsituacao, c.id_situacao_publicacao, c.objeto, 
       c.capacidade_tecnica, c.agencia_bancaria, c.conta_bancaria, c.nome_banco, 
       c.codigo_banco, c.indicador_parecer_tecnico, c.indicador_parecer_juridico, 
       c.indicador_parecer_gestor, c.indicador_publicado, c.numero_processo, 
       c.numero_interno, c.permite_ajustes_cronograma_fisico, c.indicador_termo_aditivo, 
       c.id_proposta, c.id_proponente, c.id_orgao_concedente, c.id_modalidade, 
       -- c.id_pessoa_responsavel_como_concedente,
       o.nome nome_orgao_concendente
from convenio c,convenio_programa cp, programa p, proponente pp, orgao o
where c.id=cp.id_convenio AND cp.id_programa=p.id 
AND c.id_orgao_concedente=o.id
AND c.id_proponente=pp.id
-- AND pp.id_natureza_juridica=34 
AND id_situacao = 28 AND pp.id='{$id_proponente}'
group by c.id,o.nome order by c.data_fim_vigencia asc";
//        echo $sql;exit;
$arr = $dbh->returnArray($sql);
if ($arr) {
    $dados["success"]=true;
    $dados["data"]=$arr;
    echo json_encode($dbh->utf8_converter($dados));
}else{
    echo json_encode(["success"=>false,"message"=>"Nada encontrado!"]);
}
