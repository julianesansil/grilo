<?php

include('conexao.php');
$dbh = new Conexao();
if (isset($_GET["id_municipio"]) && isset($_GET["id_area"])) {
    $id_municipio = pg_escape_string(strtoupper($_GET["id_municipio"]));
    $id_area = pg_escape_string(strtoupper($_GET["id_area"]));
} else {
    echo json_encode(["message" => "Escolha um Municipio e área de atuação!"]);
    exit;
}

if ($id_area == "0") {//outras
    $sql = "select distinct(p.id),p.id,p.nome,p.endereco,p.cep,p.telefone,p.fax, p.nome_responsavel,id_responsavel, 
                count(c.id) total_convenios,
                sum(c.valor_global) total_global, ea.nome nome_esfera, nj.nome natureza_juridica
            from convenio c,proponente p, esfera_administrativa ea, natureza_juridica nj
            where c.id_proponente=p.id 
            AND p.id_esfera_administrativa=ea.id
            AND p.id_natureza_juridica=nj.id
            AND c.id_situacao = 28 
            and p.id_municipio='{$id_municipio}' 
            AND p.id not in( select distinct(p.id) 
                            from convenio c,proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap 
                            where c.id_proponente=p.id 
                            AND haa.id_proponente=p.id 
                            AND saap.id=haa.id_subarea 
                            AND saap.id_area=aap.id 
                             AND c.id_situacao = 28 
                             and p.id_municipio='{$id_municipio}' )
            group by p.id,p.nome,p.endereco,p.cep,p.telefone,p.fax,p.nome_responsavel,id_responsavel, ea.nome,nj.nome 
            order by nome";
} else if ($id_area == "T") {
    $sql = "select distinct(p.id),p.id,p.nome,p.endereco,p.cep,p.telefone,p.fax, p.nome_responsavel,id_responsavel, 
                count(c.id) total_convenios,
                sum(c.valor_global) total_global, ea.nome nome_esfera, nj.nome natureza_juridica
            from convenio c,proponente p , esfera_administrativa ea, natureza_juridica nj
            where c.id_proponente=p.id 
            AND p.id_esfera_administrativa=ea.id
            AND p.id_natureza_juridica=nj.id
            AND c.id_situacao = 28 
            and p.id_municipio='{$id_municipio}' 
            group by p.id,p.nome,p.endereco,p.cep,p.telefone,p.fax,p.nome_responsavel,id_responsavel, ea.nome,nj.nome 
            order by nome";
} else {

    $sql = " select * from (select distinct(pp.id),pp.id,pp.nome,pp.endereco,pp.cep,pp.telefone,pp.fax, pp.nome_responsavel,id_responsavel, 
    count(c.id) total_convenios,
    sum(c.valor_global) total_global , ea.nome nome_esfera, nj.nome natureza_juridica
        from convenio c, proponente pp, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap, esfera_administrativa ea, natureza_juridica nj
        where c.id_proponente=pp.id
        AND pp.id_esfera_administrativa=ea.id
        AND pp.id_natureza_juridica=nj.id
        AND haa.id_proponente=pp.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id
        AND id_situacao = 28
	and aap.id='{$id_area}'
        and pp.id_municipio='{$id_municipio}'
        group by pp.id,pp.nome,pp.endereco,pp.cep,pp.telefone,pp.fax,pp.nome_responsavel,id_responsavel, ea.nome,nj.nome ) a order by nome";
}
//        echo $sql;exit;
$arr = $dbh->returnArray($sql);
if ($arr)
    foreach ($arr as $value) {

        $sql2 = "select distinct(saap.descricao) descricao  from proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap --, area_atuacao_proponente aap
        where haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
	and p.id={$value["id"]}
        order by descricao";
        $arr2 = $dbh->returnArray($sql2);

        $sql3 = "select distinct(aap.descricao) descricao  from proponente p, habilitacao_area_atuacao haa, subarea_atuacao_proponente saap, area_atuacao_proponente aap
        where haa.id_proponente=p.id
        AND saap.id=haa.id_subarea
        AND saap.id_area=aap.id   
	and p.id={$value["id"]}
        order by descricao";
        $arr3 = $dbh->returnArray($sql3);
        if (!$arr2) {
            $arr2[0]["id"] = 0;
            $arr2[0]["descricao"] = "Sem subarea";
        }
        if (!$arr3) {
            $arr2[0]["id"] = 0;
            $arr3[0]["descricao"] = "Sem area";
        }

        $p["p"] = $value;
        $p["p"]["area"] = $arr3;
        $p["p"]["sub_area"] = $arr2;
        $ar[] = $p["p"];
    }
$arr = $ar;

if ($arr) {
    $dados["success"] = true;
    $dados["data"] = $arr;
    echo json_encode($dbh->utf8_converter($dados));
} else {
    echo json_encode(["success" => false, "message" => "Nada encontrado!"]);
}
