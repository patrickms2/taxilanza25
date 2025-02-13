<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaxisTable extends Migration
{
    public function up()
    {
        Schema::create('taxis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->string

("license_plate")->nullable();
            $table->string

("brand")->nullable();
            $table->string

("model")->nullable();
            $table->integer

("year")->nullable();
            $table->string

("color")->nullable();
            $table->enum
("taxi_status", ["public.enum_taxis_taxi_status","cooperativadetaxiId uuid"],)->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('taxis');
    }
}

