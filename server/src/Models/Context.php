<?php

namespace Server\Models;

class Context
{
    public int $UserId;
    public string $Role;

    public function __construct(int $userId, string $role)
    {
        $this->UserId = $userId;
        $this->Role = $role;
    }
}