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
    public function index()
    {
        $donation = Donation::all();

        return new DonationCollection($donation);
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
    public function update(Request $request, Donation $donation)
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
     * Remove the specified resource from storage.
     */
    public function destroy(Donation $donation)
    {
        if (!$donation) {
            return response()->json(['message' => 'Donation not found'], 404);
        }
        $donation->delete();

        return response()->json(['message' => 'Donation deleted successfully']);
    }
}
