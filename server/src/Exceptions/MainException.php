<?php
namespace Server\Exceptions;

abstract class MainException extends \Exception
{
    public int $status_code;
    public function __construct(int $statusCode, string $message)
    {
        parent::__construct($message);
        $this->status_code = $statusCode;
    }
}