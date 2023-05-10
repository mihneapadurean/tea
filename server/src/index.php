<?php
namespace Server;

use Server\Exceptions\MainException;

require_once("Program.php");
require_once('Exceptions/MainException.php');
require_once('Configuration/ErrorConfiguration.php');
require_once('Configuration/Migrations.php');


try 
{
    ApplyMigrations();
    SetErrorHandler();

    Program::start();
}
catch(MainException $mainException)
{
    http_response_code($mainException->status_code);
    echo json_encode(['errorMessage' => $mainException->getMessage()]);
    die();
}
catch(\Exception $exception)
{
    echo json_encode($exception->getMessage());
    http_response_code(500);
    die();
}