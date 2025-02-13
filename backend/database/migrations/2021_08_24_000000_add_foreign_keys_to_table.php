<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTable extends Migration
{
    public function up()
    {

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('app_roleid')->nullable();
            $table->foreign('app_roleid')->references('id')->on('roles');

            $table->unsignedBigInteger('cooperativadetaxiid')->nullable();
            $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

        });

        Schema::table('appointments', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('departmentid')->nullable();
            $table->foreign('departmentid')->references('id')->on('departments');

            $table->unsignedBigInteger('cooperativadetaxiid')->nullable();
            $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

        });

        Schema::table('appointmentstaxistasusers', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('appointmentsusersusers', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('cooperativadetaxis', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('departments', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('cooperativadetaxiid')->nullable();
            $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

        });

        Schema::table('documents', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('creatorid')->nullable();
            $table->foreign('creatorid')->references('id')->on('users');

            $table->unsignedBigInteger('cooperativadetaxiid')->nullable();
            $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

        });

        Schema::table('locations', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('taxiid')->nullable();
            $table->foreign('taxiid')->references('id')->on('taxis');

            $table->unsignedBigInteger('cooperativadetaxiid')->nullable();
            $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

        });

        Schema::table('payments', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('serviceid')->nullable();
            $table->foreign('serviceid')->references('id')->on('services');

        });

        Schema::table('permissions', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('roles', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('rolespermissionspermissions', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('services', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('taxistaid')->nullable();
            $table->foreign('taxistaid')->references('id')->on('users');

            $table->unsignedBigInteger('cooperativadetaxiid')->nullable();
            $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

        });

        Schema::table('taxis', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('ownerid')->nullable();
            $table->foreign('ownerid')->references('id')->on('users');

        });

        Schema::table('taxisdriversusers', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('userscustom_permissionspermissions', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('files', function(Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');
        });
    }

    public function down()
    {
        //
    }
}
