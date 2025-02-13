<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documents extends Model {
    protected static $unguarded = true;

    public function creatorid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Users::class, 'creatorid');
    }

    public function cooperativadetaxiid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Cooperativadetaxis::class, 'cooperativadetaxiid');
    }

}

