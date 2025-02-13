<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locations extends Model {
    protected static $unguarded = true;

    public function taxiid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Taxis::class, 'taxiid');
    }

    public function cooperativadetaxiid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Cooperativadetaxis::class, 'cooperativadetaxiid');
    }

}

