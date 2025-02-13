<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departments extends Model {
    protected static $unguarded = true;

    public function cooperativadetaxiid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Cooperativadetaxis::class, 'cooperativadetaxiid');
    }

}

