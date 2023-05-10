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

        if ($result -> num_rows > 0) {
            $rows = array();
            while($row = $result -> fetch_assoc()) {
                $rows[] = $row;
            }
        }

        return $rows;
    }

    public function CreateTea(Tea $newTea) : Tea
    {
        $connection = $this->GetConnection();
        $query = "INSERT INTO Teas (name, type, caffeine, rating, description) VALUES (?, ?, ?, ?, ?)";
        $statement = $connection->prepare($query);
        $statement->bind_param('sssis', $newTea->Name, $newTea->Type, $newTea->Caffeine, $newTea->Rating, $newTea->Description);
        $statement->execute();
        $statement->close();

        $newTea->Id = $connection->insert_id;
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