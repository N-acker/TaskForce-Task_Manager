<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

// any route that wasn’t matched above will fall back here
Route::fallback(function () {
    // serve the Angular index.html
    return Response::file(public_path('index.html'));
});


