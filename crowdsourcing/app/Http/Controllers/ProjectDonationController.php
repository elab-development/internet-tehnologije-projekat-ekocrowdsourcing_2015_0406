<?php

namespace App\Http\Controllers;

use App\Http\Resources\DonationCollection;
use App\Models\Donation;
use Illuminate\Http\Request;

class ProjectDonationController extends Controller
{
    public function index($project_id){
        
        $donations = Donation::where('project_id',$project_id)->get();
        if($donations->isEmpty()){
            return response()->json('No donations', 404);
        }
        return new DonationCollection($donations);
    }
}
