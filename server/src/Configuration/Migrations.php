<?php

namespace Server;

use mysqli;


function ApplyMigrations()
{
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
      echo "Database my_db created successfully\n";
    } else 
    {
      echo 'Error creating database: ' . $connection->error . "\n";
    }
  }
  $connection->select_db($database);

  $connection->query("
    CREATE TABLE IF NOT EXISTS Users (
        Id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        Email NVARCHAR(200) NOT NULL,
        Password NVARCHAR(200) NOT NULL,
        Role NVARCHAR(20) NOT NULL
    );
  ");

  $connection->query("
    CREATE TABLE IF NOT EXISTS Teas (
      Id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      Name NVARCHAR(200) NOT NULL,
      Type NVARCHAR(200) NOT NULL,
      Caffeine NVARCHAR(200) NOT NULL,
      Rating INT NOT NULL,
      Description NVARCHAR(200)
    );
  ");

  $connection->query("
    INSERT IGNORE INTO Users (Id, Name, Email, Password, Role)
    VALUES (1, 'Admin', 'admin@yahoo.com', '$2y$10$40y54Yx5DoBaibRND09pIOgFAltsZdZWP8nqhlC4w6Z3EADjCSNim', 'admin');
  ");

  $connection->close();
}