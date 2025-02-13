<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointments extends Model {
    protected static $unguarded = true;

    public function departmentid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Departments::class, 'departmentid');
    }

    public function cooperativadetaxiid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Cooperativadetaxis::class, 'cooperativadetaxiid');
    }

}

