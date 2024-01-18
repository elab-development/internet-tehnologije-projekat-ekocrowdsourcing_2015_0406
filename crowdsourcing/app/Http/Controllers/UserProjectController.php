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
        if($projects->isEmpty()){
            return response()->json('No projects', 404);
        }
        return new ProjectCollection($projects);
    }
}
