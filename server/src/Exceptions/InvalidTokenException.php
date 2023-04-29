<?php
namespace Server\Exceptions;

require_once('MainException.php');

class InvalidTokenException extends MainException
{
    public function __construct()
    {
        parent::__construct(401, "Invalid token");
    }
}