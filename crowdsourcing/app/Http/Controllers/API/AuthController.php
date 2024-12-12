<?php

namespace App\Http\Controllers\API;

use Laravel\Sanctum\HasApiTokens;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;


class AuthController extends Controller
{
    public function register(Request $request){

        $data = $request->all();
        if ($data['type']!='user' && (Auth::check() && Auth::user()->type != 'admin')) {  
            $data['type']='user';
        }

        $validator = Validator::make($data,[
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:8',
        ]);
        $data['type'] = 'user';
        
        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create($data);

        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json(['User created successfully', new UserResource($user)]); 
    }

    public function login(Request $request){
        if ($request->bearerToken()) {
            return response()->json(['message' => 'Already logged in'], 200);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['sucess'=>false]);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        // Authenticate the user in the session
        Auth::login($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['sucess'=>true,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request){
        // Revoke the user's current token...
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully']);
    }


}
