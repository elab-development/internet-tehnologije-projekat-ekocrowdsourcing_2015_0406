<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class UserProjectController extends Controller
{
    public function index($user_id){
        
        $projects = Project::where('user_id',$user_id)->get();
        if(is_null($projects)){
            return response()->json('nema', 404);
        }
        return new ProjectCollection($projects);
    }
}
