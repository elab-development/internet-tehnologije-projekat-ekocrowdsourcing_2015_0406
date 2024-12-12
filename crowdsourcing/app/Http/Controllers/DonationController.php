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
    
        if ($request->has('email')) {
            $email = $request->input('email');
            $query->where('email', 'like', '%' . $email . '%');
        }
    
        if ($request->has('project_name')) {
            $projectNames = explode(',', $request->input('project_name')); // razdvoj zarezom
            $query->whereHas('project', function($q) use ($projectNames) { //filtriraj one koje imaju neki iz array projectNames
                $q->where(function($q) use ($projectNames) {  //nested where clause to group multiple orWhere conditions|use ($projectNames) allows the $projectNames array to be used within this nested function.
                    foreach ($projectNames as $projectName) { //fopreach prolazi kroz svaki projectName u nizu
                        $q->orWhere('name', 'like', '%' . $projectName . '%'); //za svaki projectName radi orWhere gde proverava da li se slaze preko SQL like operatora, sa % koji omogucava parital match
                    }
                });
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
