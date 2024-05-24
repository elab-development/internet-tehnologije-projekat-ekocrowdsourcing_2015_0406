<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Type;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->lastName(),
            'type_id' => Type::inRandomOrder()->first()->id,
            'location'=> $this->faker->city,
            'description'=> $this->faker->sentence,
            'user_id' => User::factory(),
        ];
    }
}
