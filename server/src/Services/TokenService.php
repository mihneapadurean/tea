<?php
declare(strict_types=1);

namespace Server\Services;

require_once('Exceptions/InvalidTokenException.php');
require_once('Models/Context.php');

use Server\Exceptions\InvalidTokenException;
use Server\Models\Context;

class TokenService
{
    private string $secret;
    public function __construct() 
    {
        $this->secret = parse_ini_file('appSettings.ini')['jwt_secret'];
    }

    public function generate_token(int $userId, string $name, string $role) : string
    {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['sub' => $userId, 'role' => $role, 'name' => $name];

        return $this->generate_jwt($headers, $payload);
    }

    public function is_token_valid(string $token) : Context
    {
	    $tokenParts = explode('.', $token);
	    $header = base64_decode($tokenParts[0]);
        $payload = json_decode(base64_decode($tokenParts[1]));
        $signature_provided = $tokenParts[2];

        // build a signature based on the header and payload using the secret
        $base64_url_header = $this->base64url_encode($header);
        $base64_url_payload = $this->base64url_encode($payload);
        $signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $this->secret, true);
        $base64_url_signature = $this->base64url_encode($signature);

        // verify it matches the signature provided in the jwt
        $is_signature_valid = ($base64_url_signature === $signature_provided);
        
        if (!$is_signature_valid) 
        {
            throw new InvalidTokenException();
        }

        return new Context($payload->sub, $payload->role);
    }

    private function generate_jwt(array $headers, array $payload) : string
    {
        $headers_encoded = $this->base64url_encode(json_encode($headers));
        $payload_encoded = $this->base64url_encode(json_encode($payload));
        
        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $this->secret, true);
        $signature_encoded = $this->base64url_encode($signature);
        
        $jwt = "$headers_encoded.$payload_encoded.$signature_encoded";
        
        return $jwt;
    }

    private function base64url_encode(string $str) : string
    {
        return rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
    }
}