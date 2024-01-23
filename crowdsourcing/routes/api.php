<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectDonationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProjectController;
use App\Http\Controllers\API\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum', 'admin']], function () {       
    // samo admini mogu da pristupe ovim rutama
        Route::patch('/update-user/{id}', [UserController::class, 'update']); //radi samo admin
        Route::resource('users', UserController::class); //radi za admin i mod, treba proveriti kako destroy user a da ne ide preko user id
        Route::resource('donations', DonationController::class); //overlap problem?
        Route::get('/admin-dashboard', function () { //radi samo za admin
        return 'Welcome to the admin dashboard!';
    });
});

Route::group(['middleware' => ['auth:sanctum', 'mod']], function () {       
    //samo mod mogu da pristupe ovim rutama   
    Route::get('/mod-dashboard', function () { //radi samo za mod
        return 'Welcome to the moderator dashboard!';
    });
});

Route::group(['middleware' => ['auth:sanctum','admin-or-mod']], function () {       
    // admin i mod mogu da pristupe ovim rutama
    Route::resource('users', UserController::class)->only(['show','index']); //radi za admin ili mod
    Route::resource('projects', ProjectController::class); //except zbog errora, overlap pretpostavljam?  
    //radi za admin i mod
    Route::delete('/delete-project/{id}', [ProjectController::class,'destroy']); //radi za admin i mod
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    // samo ulogovani korisnici mogu da pristupe ovim rutama
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/create-donation', [DonationController::class, 'store']); //radi za sva 3 ulogovana
    Route::resource('users.projects', UserProjectController::class)->only(['show','index']); //radi za sva 3 ulogovana
    Route::resource('projects', ProjectController::class)->only(['store']);  //radi za sva 3, samo store, update nije proveren

});

//svi mogu
Route::resource('donations', DonationController::class)->only(['show','index']); //radi
Route::resource('projects.donations', ProjectDonationController::class)->only(['show','index']); //radi
Route::resource('projects', ProjectController::class)->only(['show','index']); //radi

Route::post('/register', [AuthController::class, 'register']); //radi
Route::post('/login', [AuthController::class, 'login']); //radi





