<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCooperativadetaxisTable extends Migration
{
    public function up()
    {
        Schema::create('cooperativadetaxis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->string

("name")->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cooperativadetaxis');
    }
}

