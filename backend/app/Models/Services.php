<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Services extends Model {
    protected static $unguarded = true;

    public function taxistaid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Users::class, 'taxistaid');
    }

    public function cooperativadetaxiid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Cooperativadetaxis::class, 'cooperativadetaxiid');
    }

}

