<?php

class Mensagem {

    function conveniosCaros($dados) {
        foreach ($dados as $value) {
            $texto = "Nome {$value["nome"]}   ";
            
        }
        return $texto;
    }

}
