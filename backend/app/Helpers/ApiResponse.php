<?php

namespace App\Helpers;

class ApiResponse
{
    public static function success($data = null, $message = 'Success', $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public static function error($message = 'Error', $code = 400, $data = null)
    {
        return response()->json([
            'status' => 'error',
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public static function notFound($message = 'Not Found', $code = 404, $data = null)
    {
        return response()->json([
            'status' => 'not_found',
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ],$code);
    }

}
