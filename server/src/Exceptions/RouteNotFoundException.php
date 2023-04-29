<?php
namespace Server\Exceptions;

require_once('MainException.php');

class RouteNotFoundException extends MainException
{
    public function __construct(string $route)
    {
        parent::__construct(404, "Route '$route' not found");
    }
}