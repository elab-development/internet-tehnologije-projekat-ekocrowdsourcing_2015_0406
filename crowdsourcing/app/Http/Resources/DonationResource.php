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
            'id' => $this->resource->id,
            'email'=> $this->resource->email,
            'amount'=> $this->resource->amount,
            'description'=> $this->resource->description,
            'project'=> $this->resource->project->name // ovo je promenjeno

        ];}
        else{
            return[
                'id' => $this->resource->id,
                'email'=> $this->resource->email,
                'amount'=> $this->resource->amount,
                'project'=> $this->resource->project->name
            ];
            
        }
    }
}
