<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::create([
            'name'=>"projekat 1",
            'type'=>"Deponija",
            'location'=>"srbija",
            'description'=>"opis1",
            'user_id'=>1,
        ]);
        Project::create([
            'name'=>"projekat 2",
            'type'=>"Vazduh",
            'location'=>"srbija",
            'description'=>"opis1",
            'user_id'=>1,
        ]);
        Project::create([
            'name'=>"projekat 3",
            'type'=>"Posumljavanje",
            'location'=>"srbija",
            'description'=>"opis1",
            'user_id'=>1,
        ]);
    }
}
