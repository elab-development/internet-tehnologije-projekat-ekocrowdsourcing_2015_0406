<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProjectController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Route::get('/projects', [ProjectController::class,'index']);
Route::get('/projects/{id}', [ProjectController::class,'show']); */

/* Route::get('/users/{user_id}/projects', [UserProjectController::class,'index']); */

Route::resource('projects', ProjectController::class);
Route::resource('users.projects', UserProjectController::class)->only(['index']);
Route::resource('users', UserController::class);
Route::resource('donations', DonationController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
