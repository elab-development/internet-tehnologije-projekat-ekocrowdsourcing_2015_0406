<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeLocation($query, $location)
    {
        return $query->where('location', $location);
    }

/*     public function scopeCreator($query, $creator)
    {
        return $query->where('creator', $creator);
    } */
    
    use HasFactory;
    protected $fillable = [
        'name',
        'type',
        'location',
        'description',
        'user_id'
    ];

   /*  protected $hidden = [
    ];

    protected $casts = [
    ]; */


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class); 
    }
}
