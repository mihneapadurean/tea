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

    public function delete(string $route, callable $action)
    {
        $this->routes["DELETE"]['/api' .$route] = $action;
        return $this;
    }

    public function resolve(string $route, string $method)
    {
        $parts = explode('?', $route);

        $action = $this->routes[$method][$parts[0]] ?? null;

        header("Access-Control-Allow-Origin: *");
        if(!$action) {
            throw new RouteNotFoundException($parts[0]);
        }

        $queries = array();
        if(count($parts) > 1)
        {
            parse_str($parts[1], $queries);
        }

        $body = json_decode(file_get_contents("php://input"), true) ?? array();
        
        $params = array_merge($queries, $body);
        return $action($params);
    }
}