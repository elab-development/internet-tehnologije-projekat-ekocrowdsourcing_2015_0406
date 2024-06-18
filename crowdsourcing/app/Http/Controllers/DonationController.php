<?php

namespace App\Http\Controllers;

use App\Http\Resources\DonationCollection;
use App\Http\Resources\DonationResource;
use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Donation::query();

        if ($request->has('email')) { //da li  request ima parametar email
            $email = $request->input('email'); //uzima email vrednost iz request 
            $query->where('email', 'like', '%' . $email . '%'); //email - kolona iz tabele koju proveravam, like - SQL operator pattern matching, %.email.% je pattern za like pretragu
        }

        if ($request->has('project_name')) {
            $projectName = $request->input('project_name');
            $query->whereHas('project', function($q) use ($projectName) {
                $q->where('name', 'like', '%' . $projectName . '%'); //'name' specifies the column (name) in the projects table (associated with the project relationship).
            });
        }

        $donations = $query->paginate(15);

        return new DonationCollection($donations);
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
            'email' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'project_id' => 'required'
        ]);

        $donation = Donation::create($validatedData);

        return new DonationResource($donation);
    }

    /**
     * Display the specified resource.
     */
    public function show(Donation $donation)
    {
        return new DonationResource($donation);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donation $donation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $donation = Donation::find($id);
        if (!$donation) {
            return response()->json(['message' => 'Donation not found'], 404);
        } 

        $validatedData = $request->validate([
            'email' => 'sometimes|string|max:255',
            'amount' => 'sometimes|numeric',
            'description' => 'sometimes|string',
            'project_id' => 'sometimes'
        ]);

        $donation->update($validatedData);

        return response()->json(['message' => 'Donation updated successfully', 'Donation:' => new DonationResource($donation)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $donation = Donation::find($id);
        if (!$donation) {
            return response()->json(['message' => 'Donation not found'], 404);
        }
        $donation->delete();

        return response()->json(['message' => 'Donation deleted successfully']);
    }
}
