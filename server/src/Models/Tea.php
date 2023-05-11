<?php

namespace Server\Models;

class Tea
{
    public int $id;
    public string $name;
    public string $type;
    public string $caffeine;
    public int $rating;
    public ?string $description;

    public function __construct(string $name, string $type, string $caffeine, int $rating, ?string $description) 
    {
        $this->name = $name;
        $this->type = $type;
        $this->caffeine = $caffeine;
        $this->rating = $rating;
        $this->description = $description;
    }
}