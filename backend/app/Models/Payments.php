<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model {
    protected static $unguarded = true;

    public function serviceid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Services::class, 'serviceid');
    }

}

