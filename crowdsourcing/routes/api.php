<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectDonationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProjectController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TypeController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum', 'admin']], function () {       
    // samo admini mogu da pristupe ovim rutama
        Route::patch('/update-user/{id}', [UserController::class, 'update']);
        Route::resource('users', UserController::class); 
        Route::resource('donations', DonationController::class);
        Route::delete('types/{type}', [TypeController::class, 'destroy']);
        Route::get('/admin-dashboard', function () { 
        return 'Welcome to the admin dashboard!';
    });
});

Route::group(['middleware' => ['auth:sanctum', 'mod']], function () {       
    //samo mod mogu da pristupe ovim rutama   
    Route::get('/mod-dashboard', function () {
        return 'Welcome to the moderator dashboard!';
    });
});

Route::group(['middleware' => ['auth:sanctum','admin-or-mod']], function () {       
    Route::resource('users', UserController::class)->only(['show','index']);
    Route::resource('projects', ProjectController::class);
    Route::delete('/delete-project/{id}', [ProjectController::class,'destroy']); 
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::patch('/update-user', [UserController::class, 'updateMe']);
    Route::get('/profile', [UserController::class, 'showCurrent']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('users.projects', UserProjectController::class)->only(['show','index']); 
    Route::resource('projects', ProjectController::class)->only(['store']);
    Route::resource('types', TypeController::class)->only(['show','index']);;
});

//svi mogu
Route::post('/create-donation', [DonationController::class, 'store']); 
Route::resource('donations', DonationController::class)->only(['show','index','store']); //radi
Route::resource('projects.donations', ProjectDonationController::class)->only(['index']); //radi
Route::resource('projects', ProjectController::class)->only(['show','index']); //radi
Route::get('/latest-projects', [ProjectController::class, 'latestProjects']);
Route::post('/register', [AuthController::class, 'register']); //radi
Route::post('/login', [AuthController::class, 'login']); //radi





