<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->name);

        return [
            'message' => 'Registered successfully',
            'user' => $user,
            'token' => $token->plainTextToken
        ];

    }

    // public function register(Request $request)
    // {
    //     $fields = $request->validate([
    //         'name' => 'required|string',
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required|confirmed|min:6',
    //     ]);

    //     $user = User::create([
    //         'name' => $fields['name'],
    //         'email' => $fields['email'],
    //         'password' => bcrypt($fields['password']),
    //     ]);

    //     return response()->json(['message' => 'Registered successfully']);
    // }



    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password,
        $user->password)){
            return [
                'message' => 'The provided credentials are inocrrect.'
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'message' => 'Logged in successfully',
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    /**
     * Login using session (Sanctum SPA mode)
     */
    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => 'required|email|exists:users',
    //         'password' => 'required',
    //     ]);

    //     if (!Auth::attempt($credentials)) {
    //         return response()->json(['message' => 'Invalid credentials'], 401);
    //     }

    //     return response()->json(['message' => 'Login successful']);
    // }



    public function logout(Request $request)
    {
        // Auth::logout();
        // return response()->json(['message' => 'Logged out']);

        $request->user()->tokens()->delete();

        return[
            'message' => 'You are logged out.'
        ];
    }

    //  public function logout(Request $request)
    // {
    //     Auth::logout();

    //     // $request->session()->invalidate();
    //     // $request->session()->regenerateToken();

    //     return response()->json(['message' => 'Logged out']);
    // }



    public function user(Request $request)
    {
    $user = $request->user();

    if (!$user) {
        return response()->json(['error' => 'User not authenticated'], 401);
    }

    return response()->json(['name' => $user->name]);
    }

}
