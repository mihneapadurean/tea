<?php

namespace Server;

use Server\Models\Tea;
use Server\Services\AccountService;
use Server\Services\TeaService;
use Server\Services\TokenService;

require_once('Router.php');
require_once('Services/AccountService.php');
require_once('Services/TeaService.php');
require_once('Services/TokenService.php');
require_once('Configuration/Cors.php');

class Program
{
    public static function start()
    {
        $router = new Router();

        $router->post('/login', function(array $params) 
                                { 
                                    $result = (new AccountService())->login($params['email'], $params['password']);
                                    echo json_encode($result);
                                })
                ->post('/register', function(array $params) 
                                { 
                                    (new AccountService())->createUserAccount($params['name'], $params['email'], $params['password']);
                                    http_response_code(201);
                                });

        $router->post('/teas', function(array $params) 
                            { 
                                if(!array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {
                                    http_response_code(401);
                                    die();
                                }

                                $context = (new TokenService())->is_token_valid($_SERVER['HTTP_AUTHORIZATION']);
                                if($context->Role !== 'admin') {
                                    http_response_code(403);
                                    die();
                                }

                                $newTea = new Tea($params['name'], $params['type'], $params['caffeine'], $params['rating'], $params['description']);

                                $newTea = (new TeaService())->createTea($newTea);

                                http_response_code(201);
                                echo json_encode($newTea);
                            })
                ->delete('/teas', function(array $params) 
                            { 
                                if(!array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {
                                    http_response_code(401);
                                    die();
                                }

                                $context = (new TokenService())->is_token_valid($_SERVER['HTTP_AUTHORIZATION']);
                                if($context->Role !== 'admin') {
                                    http_response_code(403);
                                    echo json_encode(['message' => 'You are not authorized to perform this action']);
                                    die();
                                }

                                (new TeaService())->deleteTea($params['id']);
                                http_response_code(204);
                            })
                ->get('/teas', function() 
                            { 
                                if(!array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {
                                    http_response_code(401);
                                    die();
                                }

                                $teas = (new TeaService())->getAll();
                                echo json_encode($teas);
                            });


        cors();
        $router->resolve($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
    }
}