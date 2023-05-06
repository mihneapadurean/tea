<?php

namespace Server\Models;

class Tea
{
    public int $Id;
    public string $Name;
    public string $Type;
    public bool $Caffeine;
    public int $Rating;
    public string $Description;

    public function __construct(int $id, string $name, string $type, bool $caffeine, int $rating, string $description) 
    {
        $this->Id = $id;
        $this->Name = $name;
        $this->Type = $type;
        $this->Caffeine = $caffeine;
        $this->Rating = $rating;
        $this->Description = $description;
    }
}