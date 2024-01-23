<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return new UserCollection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:8',
            'type' => 'sometimes|string|max:255'
        ]);

        $user = User::create($validatedData);

        return response()->json(['User created successfully', new UserResource($user)]);
    }
    protected function failedValidation(Validator $validator)
    {//editujem error response koji baca $request->validate() ako fejluje, valjda
        throw new HttpResponseException(response()->json(['Validation error' => $validator->errors()], 422));  
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|min:8',
            'type' => 'sometimes|string|max:255'
        ]);

        $user->update($validatedData);
        
        return response()->json(['message' => 'User updated successfully', 'User:' => new UserResource($user)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
