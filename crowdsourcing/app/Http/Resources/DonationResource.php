<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'email'=> $this->resource->email,
            'amount'=> $this->resource->amount,
            'project'=> new ProjectResource($this->resource->project),
            'donation message'=> $this->resource->description,
        ];
    }
}
