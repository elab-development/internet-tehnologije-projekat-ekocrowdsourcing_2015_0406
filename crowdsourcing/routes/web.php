<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/', [ProjectController::class, 'latestProjects']);

Route::get('/greeting', function () {
    return 'Hello world';
});
