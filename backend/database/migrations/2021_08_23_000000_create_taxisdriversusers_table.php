<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaxisdriversusersTable extends Migration
{
    public function up()
    {
        Schema::create('taxisdriversusers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->string

("taxis_driversid")->nullable();
            $table->string

("userid")->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('taxisdriversusers');
    }
}

