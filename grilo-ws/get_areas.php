<?php

include('conexao.php');
$dbh = new Conexao();
if (isset($_GET["id_municipio"])) {
    $id_municipio = pg_escape_string(strtoupper($_GET["id_municipio"]));
} else {
    echo json_encode(["message" => "Escolha um Municipio!"]);
    exit;
}

$sql = "select * from (select distinct(aap.descricao),aap.id,count(distinct(p.id)) total,sum(c.valor_global) valor_total  
        from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap
        where c.id_proponente=p.id
        AND haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id
      --  AND p.id_natureza_juridica=34
        AND c.id_situacao = 28
        and p.id_municipio='{$id_municipio}' 
        group by aap.descricao,aap.id
        order by 1
        ) a
	union all
	
        select 'Outras','0', count(distinct(p.id)) total,sum(c.valor_global) valor_total  from convenio c,proponente p
        where c.id_proponente=p.id
        AND c.id_situacao = 28
        and p.id_municipio='{$id_municipio}' 
         AND p.id not in(
			select distinct(p.id)  from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap
			where c.id_proponente=p.id
			AND haa.id_proponente=p.id
			AND saap.id=haa.id_subarea
			AND saap.id_area=aap.id
		--	AND p.id_natureza_juridica=34
			AND c.id_situacao = 28
			and p.id_municipio='{$id_municipio}' 
			) ";
//        echo $sql;exit;
$arr = $dbh->returnArray($sql);
if($arr[0]["descricao"]=="Outras"){
    if($arr[0]["total"]==0){
        $arr=[];
    }
}
if ($arr) {

    $dados["success"] = true;
    $dados["message"] = "Apenas áreas de atuação que possuem convênio em execução.";
    $dados["data"] = $arr;
    echo json_encode($dbh->utf8_converter($dados));
} else {
    echo json_encode(["success" => false, "message" => "Nenhuma área de atuação possui convênio em execução na cidade."]);
}
