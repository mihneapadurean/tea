<?php
declare(strict_types=1);

namespace Server\Services;

require_once('TokenService.php');
require_once('Exceptions/InvalidCredentialsException.php');
require_once('Services/BaseService.php');

use Server\Exceptions\InvalidCredentialsException;

class AccountService extends BaseService
{
    private TokenService $tokenService;
    public function __construct() 
    {
        $this->tokenService = new TokenService();
    }

    public function login(string $email, string $password) : array
    {
        $connection = $this->GetConnection();
        $query = "SELECT id, name, email, password, role FROM Users WHERE email = ?";
        $statement = $connection->prepare($query);
        $statement->bind_param('s', $email);
        $statement->bind_result($id, $name, $email, $passwordHash, $role);
        $statement->execute();
        $statement->fetch();
        $statement->close();

        if($passwordHash == null || !password_verify($password, $passwordHash))
        {
            throw new InvalidCredentialsException();
        }
        
        return [
            "access_token" => $this->tokenService->generate_token($id, $role, $name),
            "role" => $role
        ];
    }

    public function createUserAccount(string $name, string $email, string $password) : void
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $role = "user";

        $connection = $this->GetConnection();
        $query = "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)";
        $statement = $connection->prepare($query);
        $statement->bind_param('ssss', $name, $email, $passwordHash, $role);
        $statement->execute();
    }
}