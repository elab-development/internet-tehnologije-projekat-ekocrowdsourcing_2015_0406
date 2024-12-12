<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'Project';
    public function toArray(Request $request): array
    {
        if($this->resource->description != null){
            return [
                'id' => $this->resource->id,
                'name' => $this->resource->name,
                'type' => $this->resource->type->name,
                'location' => $this->resource->location,
                'description' => $this->resource->description,
                'user' => $this->resource->user->name,
            ];}
            else{
                return [
                    'id' => $this->resource->id,
                    'name' => $this->resource->name,
                    'type' => $this->resource->type->name,
                    'location' => $this->resource->location,
                    'user' => $this->resource->user->name,
                ];
                
            }
        }

}