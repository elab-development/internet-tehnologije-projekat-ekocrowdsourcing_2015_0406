<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{

    public function scopeEmail($query, $email)
    {
        return $query->where('email', $email);
    }

    public function scopeProjectId($query, $projectId)
    {
        return $query->where('project_id', $projectId);
    }
    
    use HasFactory;

    protected $fillable = [
        'email',
        'amount',
        'project_id',
        'description',
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }
/*     public function user(){
        return $this->belongsTo(User::class);
    } */
}
