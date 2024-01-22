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

/* Route::get('/projects', [ProjectController::class,'index']);
Route::get('/projects/{id}', [ProjectController::class,'show']); */

/* Route::get('/users/{user_id}/projects', [UserProjectController::class,'index']); */

Route::resource('projects', ProjectController::class);
Route::resource('users', UserController::class);
Route::resource('users.projects', UserProjectController::class);
Route::resource('donations', DonationController::class);
Route::resource('projects.donations', ProjectDonationController::class);
Route::delete('/delete-project/{id}', [ProjectController::class,'destroy']);
Route::patch('/update-user/{id}', [UserController::class, 'update']);
Route::post('/create-donation', [DonationController::class, 'store']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();


});
