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
    public static $wrap = 'Donation';
    public function toArray(Request $request): array
    {
        if($this->resource->description != null){
        return [
            'email'=> $this->resource->email,
            'amount'=> $this->resource->amount,
            'project'=> new ProjectResource($this->resource->project),
            'donation message'=> $this->resource->description,
        ];}
        else{
            return[
                'email'=> $this->resource->email,
                'amount'=> $this->resource->amount,
                'project'=> new ProjectResource($this->resource->project)
            ];
            
        }
    }
}
