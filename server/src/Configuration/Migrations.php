<?php

namespace Server;

use mysqli;

$configuration = parse_ini_file("appSettings.ini");
$dbServer = $configuration['db_server'];
$dbPort = $configuration['db_port'];
$dbUser = $configuration['db_user'];
$dbPassword = $configuration['db_password'];

$connection = new mysqli($dbServer, $dbUser, $dbPassword, "", $dbPort);
if ($connection->connect_error) 
{
    die('Could not connect: ' . $connection->connect_error);
}

$database = $configuration['db_database'];
$db_selected = $connection->select_db($database);

if (!$db_selected) 
{
  $sql = 'CREATE DATABASE ' . $database;

  if ($connection->query($sql)) 
  {
    $connection->select_db($database);
    echo "Database my_db created successfully\n";
  } else 
  {
    echo 'Error creating database: ' . $connection->error . "\n";
  }
}

$connection->query("
    CREATE TABLE IF NOT EXISTS Users (
        Id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        Email NVARCHAR(200) NOT NULL,
        Password NVARCHAR(200) NOT NULL,
        Role NVARCHAR(20) NOT NULL
    )
");

$connection->close();