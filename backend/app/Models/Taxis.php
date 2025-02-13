<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Taxis extends Model {
    protected static $unguarded = true;

    public function ownerid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Users::class, 'ownerid');
    }

}

