<?php

namespace Server\Models;

class Tea
{
    public int $Id;
    public string $Name;
    public string $Type;
    public string $Caffeine;
    public int $Rating;
    public ?string $Description;

    public function __construct(string $name, string $type, string $caffeine, int $rating, ?string $description) 
    {
        $this->Name = $name;
        $this->Type = $type;
        $this->Caffeine = $caffeine;
        $this->Rating = $rating;
        $this->Description = $description;
    }
}