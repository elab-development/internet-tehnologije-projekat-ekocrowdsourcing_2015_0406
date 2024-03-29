<?php

namespace Database\Seeders;

use App\Models\Donation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DonationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Donation::create([
            'email'=>'jedan@jedan.com',
            'amount'=>111,
            'description'=>'opis1',
            'project_id'=>1,

        ]);
        Donation::create([
            'email'=>'jedan@jedan.com',
            'amount'=>222,
            'project_id'=>1,

        ]);
        Donation::create([
            'email'=>'jedan@jedan.com',
            'amount'=>333,
            'project_id'=>1,

        ]);
    }
}
