<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(
            [
            'name'=>"Admin",
            'email'=>"admin@admin.com",
            'password'=>"Admin123",
            'type'=>"admin"
            ]);


        User::create(            [
            'name'=>"Mod",
            'email'=>"mod@mod.com",
            'password'=>"mod123",
            'type'=>"mod"
        ]);

        User::create(            [
            'name'=>"User",
            'email'=>"User@user.com",
            'password'=>"User123",
            'type'=>"user"
            ]);

    }
}
