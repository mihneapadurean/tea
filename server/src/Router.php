<?php
declare(strict_types=1);

namespace Server;

require_once('Exceptions/RouteNotFoundException.php');

use Server\Exceptions\RouteNotFoundException;

class Router
{
    private array $routes;

    public function get(string $route, callable $action)
    {
        $this->routes["GET"]['/api' . $route] = $action;
        return $this;
    }

    public function post(string $route, callable $action)
    {
        $this->routes["POST"]['/api' .$route] = $action;
        return $this;
    }

    public function resolve(string $route, string $method)
    {
        $route = explode('?', $route)[0];

        $action = $this->routes[$method][$route] ?? null;

        header("Access-Control-Allow-Origin: *");
        if(!$action) {
            throw new RouteNotFoundException($route);
        }

        $body = json_decode(file_get_contents("php://input"), true);
        return $action($body);
    }
}