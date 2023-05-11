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

  //if the tea table is empty insert mock data
  $teasQuery = $connection->query("SELECT Count(*) FROM Teas");
  if($teasQuery->fetch_row()[0] == 0)
  {
    $connection->query("
      INSERT INTO Teas (Name, Type, Caffeine, Rating, Description) 
      VALUES 
      ('Green Tea', 'Green', 'Low', 4, 'A light tea with a fresh taste and a hint of sweetness.'),
      ('Earl Grey', 'Black', 'Medium', 4, 'A classic tea with a citrusy flavor and a hint of bergamot.'),
      ('Chai', 'Black', 'High', 5, 'A spiced tea with a bold flavor and a hint of sweetness.'),
      ('Peppermint', 'Herbal', 'None', 2, 'A refreshing tea with a cool minty flavor.'),
      ('Jasmine', 'Green', 'Low', 3, 'A fragrant tea with a delicate floral flavor.'),
      ('English Breakfast', 'Black', 'Medium', 4,'A robust tea with a full-bodied flavor and a hint of maltiness.'),
      ('Lemon Ginger', 'Herbal', 'None' , 1,'A zesty tea with a bright lemon flavor and a hint of ginger.');
    ");
  }
  
  

  $connection->close();
}