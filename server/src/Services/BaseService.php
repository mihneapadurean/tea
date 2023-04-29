<?php

namespace Server\Services;

use mysqli;

class BaseService
{
    protected function GetConnection() : mysqli
    {
        $configuration = parse_ini_file("appSettings.ini");
        $dbServer = $configuration['db_server'];
        $dbPort = $configuration['db_port'];
        $dbUser = $configuration['db_user'];
        $dbPassword = $configuration['db_password'];
        $database = $configuration['db_database'];

        return new mysqli($dbServer, $dbUser, $dbPassword, $database, $dbPort);
    }
}