<?php

include('conexao.php');
include('get_ranking_mensagens.php');
$dbh = new Conexao();
$where = "";
if (isset($_GET["id_municipio"])) {
    $id_municipio = pg_escape_string(strtoupper($_GET["id_municipio"]));
    $where = "and p.id_municipio='{$id_municipio}'";
} else {
    $where = "";
}
if ($where != "") {
    $sql = "select distinct(p.id),p.*,c.* 
        from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap 
        where c.id_proponente=p.id
        AND haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id   
        AND c.id_situacao = 28
        $where
        order by valor_global desc
        limit 3;";
    $listaCoveniosCaros = $dbh->returnArray($sql);


    $sql2 = "select distinct(aap.descricao),aap.id,sum(c.valor_global) total,count(c.id) total_convenio
        from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap
        where c.id_proponente=p.id
        AND haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id
        AND c.id_situacao = 28
        $where
        group by aap.descricao,aap.id
        order by total desc
        limit 3
        ";

    $areasMaisCaras = $dbh->returnArray($sql2);


    $sql3 = "select distinct(p.nome),p.id,sum(distinct(c.valor_global)) total  , count(c.id) total_convenio, count(c.id) total_convenio
        from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap
        where c.id_proponente=p.id
        AND haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id
        $where
        AND c.id_situacao = 28
        group by p.nome,p.id
        order by total desc
        limit 3
        ";
//    pr($sql3);exit;
    $proponentesMaisCaros = $dbh->returnArray($sql3);

    $sql4 = "select distinct(p.nome),p.id,count(distinct(c.id)) total  , sum(c.valor_global) total_convenio
	from convenio c,proponente p
        where c.id_proponente=p.id
        $where
        AND c.id_situacao = 28
        group by p.nome,p.id
        order by total desc
        limit 3";

    $proponentesMaisConvenios = $dbh->returnArray($sql4);

    $sql5 = "select distinct(pr.nome),pr.cargo,pr.id,count(distinct(c.id)) total  
	from convenio c,proponente p, proposta pro, pessoa_responsavel pr
        where c.id_proponente=p.id
        and pro.id=c.id_proposta
        and pro.id_pessoa_responsavel_pelo_cadastramento=pr.id
         $where
        AND c.id_situacao = 28
        group by pr.nome,pr.cargo,pr.id
        order by total desc
        limit 3";
    $responsaveisMaisConvenios = $dbh->returnArray($sql5);

    $sql6 = "select distinct(pr.nome),pr.cargo,pr.id,sum(c.valor_global) total,o.nome orgao, count(c.id) total_convenio, o.nome orgao
	from convenio c,proponente p, proposta pro, pessoa_responsavel pr, orgao o
        where c.id_proponente=p.id
        and pro.id=c.id_proposta
        and pro.id_pessoa_responsavel_pelo_concedente=pr.id
        AND c.id_orgao_concedente=o.id
        $where
        AND c.id_situacao = 28
        group by pr.nome,pr.cargo,pr.id,o.nome
        order by total desc
        limit 3
        ";
//    pr($sql6);exit;
    $concedentesMaisDinheiro = $dbh->returnArray($sql6);


    $arr["conveniosMaisCaros"]["data"] = $listaCoveniosCaros;
    $arr["areasMaisCaras"]["data"] = $areasMaisCaras;
    $arr["proponentesMaisConvenios"]["data"] = $proponentesMaisConvenios;
    $arr["proponentesMaisCaros"]["data"] = $proponentesMaisCaros;
    $arr["responsaveisMaisConvenios"]["data"] = $responsaveisMaisConvenios;
    $arr["concedentesMaisDinheiro"]["data"] = $concedentesMaisDinheiro;
} else {
    $sqlP = "select distinct(p.id),p.*,c.* 
        from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap 
        where c.id_proponente=p.id
        AND haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id   
        AND c.id_situacao = 28
        order by valor_global desc
        limit 3;";
    $listaCoveniosCarosPais = $dbh->returnArray($sqlP);

    $sql2P = "select distinct(aap.descricao),aap.id,sum(distinct(c.valor_global)) total  , count(c.id) total_convenio
        from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap
        where c.id_proponente=p.id
        AND haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id
        AND c.id_situacao = 28
        group by aap.descricao,aap.id
        order by total desc
        limit 3
        ";
    $listaCoveniosCarosPorAreaPais = $dbh->returnArray($sql2P);
    $sql4P = "select distinct(p.nome),p.id,sum(distinct(c.valor_global)) total  , count(c.id) total_convenio
        from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap
        where c.id_proponente=p.id
        AND haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id
        AND c.id_situacao = 28
        group by p.nome,p.id
        order by total desc
        limit 3
        ";
    $proponentesMaisCarosPais = $dbh->returnArray($sql4P);

    $sql4 = "select distinct(p.nome),p.id,count(distinct(c.id)) total , sum(c.valor_global) total_convenio
	from convenio c,proponente p
        where c.id_proponente=p.id
        AND c.id_situacao = 28
        group by p.nome,p.id
        order by total desc limit 3
        ";

    $proponentesMaisConveniosPais = $dbh->returnArray($sql4);

    $sql5 = "select distinct(pr.nome),pr.cargo,pr.id,count(distinct(c.id)) total  
	from convenio c,proponente p, proposta pro, pessoa_responsavel pr
        where c.id_proponente=p.id
        and pro.id=c.id_proposta
        and pro.id_pessoa_responsavel_pelo_cadastramento=pr.id
        AND c.id_situacao = 28
        group by pr.nome,pr.cargo,pr.id
        order by total desc
        limit 3 ";
    $responsaveisMaisConveniosPais = $dbh->returnArray($sql5);

    $sql6 = "select distinct(pr.nome),pr.cargo,pr.id,sum(c.valor_global) total, count(c.id) total_convenio, o.nome orgao
	from convenio c,proponente p, proposta pro, pessoa_responsavel pr, orgao o
        where c.id_proponente=p.id
        and pro.id=c.id_proposta
        AND c.id_orgao_concedente=o.id
        
        and pro.id_pessoa_responsavel_pelo_concedente=pr.id
        AND c.id_situacao = 28
        group by pr.nome,pr.cargo,pr.id, o.nome
        order by total desc
        limit 3
        ";

    $concedentesMaisDinheiro = $dbh->returnArray($sql6);



    $sqlP = "select m.*,sum(c.valor_global) valor_global, count(c.id) total_convenio
        from convenio c,proponente p,municipio m
        where c.id_proponente=p.id
        AND p.id_municipio= m.id
        AND c.id_situacao = 28
        group by m.id
        order by valor_global desc
        limit 3;";

    $cidadesMaisCaras = $dbh->returnArray($sqlP);

    $arr["conveniosMaisCaros"]["data"] = $listaCoveniosCarosPais;
    $arr["areasMaisCaras"]["data"] = $listaCoveniosCarosPorAreaPais;
    $arr["proponentesMaisConvenios"]["data"] = $proponentesMaisConveniosPais;
    $arr["proponentesMaisCaros"]["data"] = $proponentesMaisCarosPais;
    $arr["responsaveisMaisConvenios"]["data"] = $responsaveisMaisConveniosPais;
    $arr["concedentesMaisDinheiro"]["data"] = $concedentesMaisDinheiro;
    $arr["cidadesMaisCaras"]["data"] = $cidadesMaisCaras;
}

$a["titulo"] = "Áreas de atuação que recebem mais dinheiro";
$b["titulo"] = "Proponentes que recebem mais dinheiro";
$c["titulo"] = "Proponentes que têm mais convênios";
$d["titulo"] = "Convênios mais caro";
$e["titulo"] = "Órgãos que concedem mais dinheiro";
$f["titulo"] = "Pessoas responsáveis por mais convênio";

if (isset($arr["cidadesMaisCaras"]["data"])) {
    $g["titulo"] = "Cidades que recebem mais dinheiro de convênios";
}
//
//pr($arr["conveniosMaisCaros"]);exit;

foreach ($arr["areasMaisCaras"]["data"] as $value) {
    $a["data"][] = html_entity_decode("A área de <b>{$value["descricao"]}</b> possui {$value["total_convenio"]} convênios somando um total de R$ " . number_format($value["total"], 2, ',', '.') . ".");
}
foreach ($arr["proponentesMaisCaros"]["data"] as $value) {
    $b["data"][] = html_entity_decode("O proponente <b>{$value["nome"]}</b> possui {$value["total_convenio"]} convênios somando um total de R$ " . number_format($value["total"], 2, ',', '.') . ".");
}
foreach ($arr["proponentesMaisConvenios"]["data"] as $value) {
    $c["data"][] = html_entity_decode("O proponente <b>" . $value["nome"] . "</b> possui {$value["total"]} convênios somando um total de R$ " . number_format($value["total_convenio"], 2, ',', '.') . ".");
}
foreach ($arr["conveniosMaisCaros"]["data"] as $value) {
    $d["data"][] = html_entity_decode("O convênio <b>" . substr($value["objeto"],0, 50) . "...</b> (<b>{$value["numero_interno"]}</b>), do proponente {$value["nome"]}, tem o valor global de <b>R$ " . number_format($value["valor_global"], 2, ',', '.') . "</b>.");
}

foreach ($arr["concedentesMaisDinheiro"]["data"] as $value) {
    $e["data"][] = html_entity_decode("O orgão <b>" . $value["orgao"] . "</b>  concede R$ " . number_format($value["total"], 2, ',', '.') . " para {$value["total_convenio"]} convênios.");
}
foreach ($arr["responsaveisMaisConvenios"]["data"] as $value) {
    $f["data"][] = html_entity_decode("<b>" . $value["nome"] . "</b> é responsável por {$value["total"]} proponentes ao mesmo tempo.");
}
if (isset($arr["cidadesMaisCaras"]["data"])) {
    foreach ($arr["cidadesMaisCaras"]["data"] as $value) {
        $g["data"][] = html_entity_decode("<b>" . $value["nome"] . "</b> tem {$value["total_convenio"]} em execução, somando R$ " . number_format($value["valor_global"], 2, ',', '.') . ".");
    }
}

$abb[] = $a;
$abb[] = $b;
$abb[] = $c;
$abb[] = $d;
$abb[] = $e;
$abb[] = $f;
if (isset($arr["cidadesMaisCaras"]["data"])) {
    $abb[] = $g;
}
if ($abb) {
    $dados["success"] = true;
    $dados["data"] =  $abb;
    echo json_encode($dbh->utf8_converter($dados));
} else {
    echo json_encode(["success" => false, "message" => "Nada encontrado!"]);
}
