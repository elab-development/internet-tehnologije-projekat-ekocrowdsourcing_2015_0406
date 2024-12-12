<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['Deponija', 'Vazduh', 'Posumljavanje', 'Korita'];

        foreach ($types as $type) {
            Type::create(['name' => $type]);
        }
    }
}
