<?php

namespace App\Http\Controllers\API;

use Laravel\Sanctum\HasApiTokens;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


class AuthController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:8',
            'type' => 'sometimes|string|max:255'
        ]);

        if (!Auth::check() || (Auth::check() && Auth::user()->type !== 'admin')) {  
            $validatedData['type'] = 'user';
        }

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $user = Auth::user();
        return response()->json(['data'=>$user]);

/* 
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => $request->type
        ]);

        //$token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json(['data'=>$user]); */
    }

    public function login(Request $request)
{
    if ($request->bearerToken()) {
        return response()->json(['message' => 'Already logged in'], 200);
    }

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Wrong credentials'], 401);
    }


    $user = User::where('email', $request['email'])->firstOrFail();


    // Authenticate the user in the session
    Auth::login($user);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Welcome ' . $user->name . '!',
        'access_token' => $token,
        'token_type' => 'Bearer',
    ]);
}

public function logout(Request $request)
{
    // Revoke the user's current token...
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'User logged out successfully']);
}


}
