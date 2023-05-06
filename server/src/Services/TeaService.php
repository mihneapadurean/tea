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
        $query = "SELECT * FROM Teas";
        $result = $connection->query($query);
        
        while($row = $result->fetch_assoc()) {
            
        }
    }
}