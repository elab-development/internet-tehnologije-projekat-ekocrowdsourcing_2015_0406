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
                'name' => $this->resource->name,
                'type' => $this->resource->type,
                'location' => $this->resource->location,
                'project description' => $this->resource->description,
                'user' => new UserResource($this->resource->user),
            ];}
            else{
                return [
                    'name' => $this->resource->name,
                    'type' => $this->resource->type,
                    'location' => $this->resource->location,
                    'user' => new UserResource($this->resource->user),
                ];
                
            }
        }

}