<?php

namespace App\Http\Controllers\API;

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
            //'type' => 'sometimes|string|max:255'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
            //'type' => $request->type,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json(['data'=>$user,'access_token'=>$token,'token_type'=>'Bearer']);
    }

    public function login(Request $request)
{
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Unauthorized'], 401);
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
}
