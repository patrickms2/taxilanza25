<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserscustompermissionspermissionsTable extends Migration
{
    public function up()
    {
        Schema::create('userscustom_permissionspermissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->string

("users_custom_permissionsid")->nullable();
            $table->string

("permissionid")->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('userscustom_permissionspermissions');
    }
}

