<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('type_id')) {
             $query->type($request->input('type_id'));
         }
 
        if ($request->has('location')) {
             $query->location($request->input('location'));
         }
 
        if ($request->has('user_id')) {
             $query->creator($request->input('user_id'));
         }
 
        $projects = $query->paginate(12);
/*         $projects = Project::all(); */

        return new ProjectCollection($projects);
    }

    public function latestProjects(){
        $latestProjects = Project::orderBy('created_at', 'desc')->take(3)->get();
        return response()->json(['3 latest projects:' => new ProjectCollection($latestProjects)]);
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
        $user_id = Auth::id();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'type_id' => 'required|exists:types,id',
            'location' => 'required|min:2',
            'description' => 'required|min:1|max:1024',
        ]);

        $validatedData['user_id'] = $user_id;

        $project = Project::create($validatedData);

        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
       return new ProjectResource($project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        } 
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type_id' => 'sometimes|exists:types,id',
            'description'=>'sometimes|min:4|max:1024',
            'location' => 'sometimes|min:4'
        ]);

        $project->update($validatedData);
        return response()->json(['message' => 'Project updated successfully', 'Project:' => new ProjectResource($project)]);
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }

}
