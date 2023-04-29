<?php

namespace Server\Models;

class Context
{
    public string $UserId;
    public string $Role;

    public function __construct(string $userId, string $role)
    {
        $this->UserId = $userId;
        $this->Role = $role;
    }
}