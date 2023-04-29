<?php
namespace Server\Exceptions;

require_once('MainException.php');

class InvalidCredentialsException extends MainException
{
    public function __construct()
    {
        parent::__construct(401, "Username or password is incorrect");
    }
}