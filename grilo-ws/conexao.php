<?php

function pr($obj) {
    echo "<pre>";
    print_r($obj);
    echo "</pre>";
}

class Conexao {

    private $dbh;

    function start() {
        return pg_connect("host=localhost port=5432 dbname=siconv user=postgres password=123456");
    }

    function end() {
        return pg_close();
    }

    function query($sql) {
        $this->start();
        $r = pg_query($sql);
        $this->end();
        return $r;
    }

    function fetch($f) {
        return pg_fetch_all($f);
    }

    function returnArray($sql) {
        $f = $this->query($sql);
        return $this->fetch($f);
    }

    public function utf8_converter($array) {
        array_walk_recursive($array, function(&$item, $key) {
            if (!mb_detect_encoding($item, 'utf-8', true)) {
                $item = utf8_encode($item);
            }
        });

        return $array;
    }

}
