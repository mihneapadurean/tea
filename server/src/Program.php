<?php

namespace Server;

use Server\Services\AccountService;

require_once('Router.php');
require_once('Services/AccountService.php');

class Program
{
    public static function start()
    {
        $router = new Router();

        $router->post('/login', function(array $body) 
                                { 
                                    $accountService = new AccountService();
                                    $token = $accountService->login($body['email'], $body['password']);
                                    echo json_encode(['access_token' => $token]);
                                })
                ->post('/register', function(array $body) 
                                { 
                                    $accountService = new AccountService();
                                    $accountService->createUserAccount($body['name'], $body['email'], $body['password']);
                                    http_response_code(201);
                                });

        $router->get('/teas', function() use($teaResponse) { echo json_encode($teaResponse); });


        $router->resolve($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
    }
}