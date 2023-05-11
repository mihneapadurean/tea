<?php
declare(strict_types=1);

namespace Server\Services;

require_once('Models/Tea.php');
require_once('Services/BaseService.php');

use Server\Models\Tea;

class TeaService extends BaseService
{
    public function GetAll() : array
    {
        $connection = $this->GetConnection();
        $result = $connection->query("SELECT * FROM Teas");

        $rows = array();
        if ($result -> num_rows > 0) {
            while($row = $result -> fetch_assoc()) {
                $tea = new Tea($row['Name'], $row['Type'], $row['Caffeine'], (int)$row['Rating'], $row['Description']);
                $tea->id = (int)$row['Id'];

                $rows[] = $tea;
            }
        }

        return $rows;
    }

    public function CreateTea(Tea $newTea) : Tea
    {
        $connection = $this->GetConnection();
        $query = "INSERT INTO Teas (name, type, caffeine, rating, description) VALUES (?, ?, ?, ?, ?)";
        $statement = $connection->prepare($query);
        $statement->bind_param('sssis', $newTea->name, $newTea->type, $newTea->caffeine, $newTea->rating, $newTea->description);
        $statement->execute();
        $statement->close();

        $newTea->id = $connection->insert_id;
        return $newTea;
    }

    public function DeleteTea(int $id) : void
    {
        $connection = $this->GetConnection();
        $query = "DELETE FROM Teas WHERE id = ?";
        $statement = $connection->prepare($query);
        $statement->bind_param('i', $id);
        $statement->execute();
        $statement->close();
    }
}