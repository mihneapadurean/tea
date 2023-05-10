<?php

namespace Server;

function SetErrorHandler() {
    set_error_handler(function ($errno, $errstr, $errfile, $errline ) {
        if (error_reporting()) {
                throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
        }
    });
}
