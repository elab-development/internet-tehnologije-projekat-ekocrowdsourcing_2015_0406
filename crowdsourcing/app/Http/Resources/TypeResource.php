<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TypeResource extends JsonResource
{
    public static $wrap = 'Project type:';
    public function toArray(Request $request): array
    {
        return [
            'name'=>$this->resource->name,
        ];
    }
}
