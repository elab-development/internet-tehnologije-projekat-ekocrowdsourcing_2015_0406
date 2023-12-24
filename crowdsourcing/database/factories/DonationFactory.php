<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Donation>
 */
class DonationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $projectId = [1,2,3,4,5];
        return [
            'email' => fake()->safeEmail(),
            'amount' => $this->faker->randomNumber,
            'project_id' => $this->faker->randomElement($projectId),
            'description'=> $this->faker->sentence,
        ];
    }
}
