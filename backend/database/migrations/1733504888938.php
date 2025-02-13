<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Migration1733504888938 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

                Schema::create('users', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                Schema::create('appointments', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('appointments', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('appointmentstaxistasusers', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('appointmentstaxistasusers', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('appointmentsusersusers', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('appointmentsusersusers', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('cooperativadetaxis', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('cooperativadetaxis', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('departments', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('departments', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('documents', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('documents', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('locations', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('locations', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('payments', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('payments', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('permissions', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('permissions', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('roles', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('roles', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('rolespermissionspermissions', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('rolespermissionspermissions', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('services', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('services', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('taxis', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('taxis', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('taxisdriversusers', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('taxisdriversusers', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('userscustom_permissionspermissions', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('userscustom_permissionspermissions', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('firstName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('lastName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('phoneNumber')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('email')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->enum('role', ['admin','user'])->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('disabled')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('password')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('emailVerified')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('emailVerificationToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('emailVerificationTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('passwordResetToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('passwordResetTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('provider')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('firstname')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('lastname')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('phonenumber')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('emailverified')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('emailverificationtoken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('emailverificationtokenexpiresat')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('passwordresettoken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('passwordresettokenexpiresat')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->unsignedBigInteger('app_roleid')->nullable();

                    $table->foreign('app_roleid')->references('id')->on('roles');

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->unsignedBigInteger('cooperativadetaxiid')->nullable();

                    $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

                });

                Schema::table('appointments', function (Blueprint $table) {
                    $table->timestamp('date')->nullable();

                });

                Schema::table('appointments', function (Blueprint $table) {
                    $table->timestamp('time')->nullable();

                });

                Schema::table('appointments', function (Blueprint $table) {
                    $table->unsignedBigInteger('departmentid')->nullable();

                    $table->foreign('departmentid')->references('id')->on('departments');

                });

                Schema::table('appointments', function (Blueprint $table) {
                    $table->enum('appointment_status', ['public.enum_appointments_appointment_status','creatorId uuid'])->nullable();

                });

                Schema::table('appointments', function (Blueprint $table) {
                    $table->timestamp('creation_date')->nullable();

                });

                Schema::table('appointments', function (Blueprint $table) {
                    $table->unsignedBigInteger('cooperativadetaxiid')->nullable();

                    $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

                });

                Schema::table('appointmentstaxistasusers', function (Blueprint $table) {
                    $table->string('appointments_taxistasid')->nullable();

                });

                Schema::table('appointmentstaxistasusers', function (Blueprint $table) {
                    $table->string('userid')->nullable();

                });

                Schema::table('appointmentsusersusers', function (Blueprint $table) {
                    $table->string('appointments_usersid')->nullable();

                });

                Schema::table('appointmentsusersusers', function (Blueprint $table) {
                    $table->string('userid')->nullable();

                });

                Schema::table('cooperativadetaxis', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('departments', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('departments', function (Blueprint $table) {
                    $table->string('color')->nullable();

                });

                Schema::table('departments', function (Blueprint $table) {
                    $table->unsignedBigInteger('cooperativadetaxiid')->nullable();

                    $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

                });

                Schema::table('documents', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('documents', function (Blueprint $table) {
                    $table->enum('document_type', ['public.enum_documents_document_type','departmentId uuid'])->nullable();

                });

                Schema::table('documents', function (Blueprint $table) {
                    $table->integer('year')->nullable();

                });

                Schema::table('documents', function (Blueprint $table) {
                    $table->integer('month')->nullable();

                });

                Schema::table('documents', function (Blueprint $table) {
                    $table->unsignedBigInteger('creatorid')->nullable();

                    $table->foreign('creatorid')->references('id')->on('users');

                });

                Schema::table('documents', function (Blueprint $table) {
                    $table->timestamp('creation_date')->nullable();

                });

                Schema::table('documents', function (Blueprint $table) {
                    $table->unsignedBigInteger('cooperativadetaxiid')->nullable();

                    $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

                });

                Schema::table('locations', function (Blueprint $table) {
                    $table->unsignedBigInteger('taxiid')->nullable();

                    $table->foreign('taxiid')->references('id')->on('taxis');

                });

                Schema::table('locations', function (Blueprint $table) {
                    $table->decimal('latitude')->nullable();

                });

                Schema::table('locations', function (Blueprint $table) {
                    $table->decimal('longitude')->nullable();

                });

                Schema::table('locations', function (Blueprint $table) {
                    $table->timestamp('last_update')->nullable();

                });

                Schema::table('locations', function (Blueprint $table) {
                    $table->unsignedBigInteger('cooperativadetaxiid')->nullable();

                    $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

                });

                Schema::table('payments', function (Blueprint $table) {
                    $table->unsignedBigInteger('serviceid')->nullable();

                    $table->foreign('serviceid')->references('id')->on('services');

                });

                Schema::table('payments', function (Blueprint $table) {
                    $table->decimal('amount')->nullable();

                });

                Schema::table('payments', function (Blueprint $table) {
                    $table->timestamp('payment_status')->nullable();

                });

                Schema::table('payments', function (Blueprint $table) {
                    $table->enum('payment_method', ['public.enum_payments_payment_method','cooperativadetaxiId uuid'])->nullable();

                });

                Schema::table('permissions', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('roles', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('roles', function (Blueprint $table) {
                    $table->string('role_customization')->nullable();

                });

                Schema::table('roles', function (Blueprint $table) {
                    $table->boolean('globalaccess')->nullable();

                });

                Schema::table('rolespermissionspermissions', function (Blueprint $table) {
                    $table->string('roles_permissionsid')->nullable();

                });

                Schema::table('rolespermissionspermissions', function (Blueprint $table) {
                    $table->string('permissionid')->nullable();

                });

                Schema::table('services', function (Blueprint $table) {
                    $table->timestamp('service_type')->nullable();

                });

                Schema::table('services', function (Blueprint $table) {
                    $table->timestamp('reservation_date')->nullable();

                });

                Schema::table('services', function (Blueprint $table) {
                    $table->enum('service_status', ['public.enum_services_service_status','clientId uuid'])->nullable();

                });

                Schema::table('services', function (Blueprint $table) {
                    $table->unsignedBigInteger('taxistaid')->nullable();

                    $table->foreign('taxistaid')->references('id')->on('users');

                });

                Schema::table('services', function (Blueprint $table) {
                    $table->unsignedBigInteger('cooperativadetaxiid')->nullable();

                    $table->foreign('cooperativadetaxiid')->references('id')->on('cooperativadetaxis');

                });

                Schema::table('taxis', function (Blueprint $table) {
                    $table->unsignedBigInteger('ownerid')->nullable();

                    $table->foreign('ownerid')->references('id')->on('users');

                });

                Schema::table('taxis', function (Blueprint $table) {
                    $table->string('license_plate')->nullable();

                });

                Schema::table('taxis', function (Blueprint $table) {
                    $table->string('brand')->nullable();

                });

                Schema::table('taxis', function (Blueprint $table) {
                    $table->string('model')->nullable();

                });

                Schema::table('taxis', function (Blueprint $table) {
                    $table->integer('year')->nullable();

                });

                Schema::table('taxis', function (Blueprint $table) {
                    $table->string('color')->nullable();

                });

                Schema::table('taxis', function (Blueprint $table) {
                    $table->enum('taxi_status', ['public.enum_taxis_taxi_status','cooperativadetaxiId uuid'])->nullable();

                });

                Schema::table('taxisdriversusers', function (Blueprint $table) {
                    $table->string('taxis_driversid')->nullable();

                });

                Schema::table('taxisdriversusers', function (Blueprint $table) {
                    $table->string('userid')->nullable();

                });

                Schema::table('userscustom_permissionspermissions', function (Blueprint $table) {
                    $table->string('users_custom_permissionsid')->nullable();

                });

                Schema::table('userscustom_permissionspermissions', function (Blueprint $table) {
                    $table->string('permissionid')->nullable();

                });

    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {

                Schema::table('userscustom_permissionspermissions', function(Blueprint $table) {
                    $table->dropColumn('permissionid');
                });

                Schema::table('userscustom_permissionspermissions', function(Blueprint $table) {
                    $table->dropColumn('users_custom_permissionsid');
                });

                Schema::table('taxisdriversusers', function(Blueprint $table) {
                    $table->dropColumn('userid');
                });

                Schema::table('taxisdriversusers', function(Blueprint $table) {
                    $table->dropColumn('taxis_driversid');
                });

                Schema::table('taxis', function(Blueprint $table) {
                    $table->dropColumn('taxi_status');
                });

                Schema::table('taxis', function(Blueprint $table) {
                    $table->dropColumn('color');
                });

                Schema::table('taxis', function(Blueprint $table) {
                    $table->dropColumn('year');
                });

                Schema::table('taxis', function(Blueprint $table) {
                    $table->dropColumn('model');
                });

                Schema::table('taxis', function(Blueprint $table) {
                    $table->dropColumn('brand');
                });

                Schema::table('taxis', function(Blueprint $table) {
                    $table->dropColumn('license_plate');
                });

                Schema::table('taxis', function(Blueprint $table) {
                    $table->dropColumn('ownerid');
                });

                Schema::table('services', function(Blueprint $table) {
                    $table->dropColumn('cooperativadetaxiid');
                });

                Schema::table('services', function(Blueprint $table) {
                    $table->dropColumn('taxistaid');
                });

                Schema::table('services', function(Blueprint $table) {
                    $table->dropColumn('service_status');
                });

                Schema::table('services', function(Blueprint $table) {
                    $table->dropColumn('reservation_date');
                });

                Schema::table('services', function(Blueprint $table) {
                    $table->dropColumn('service_type');
                });

                Schema::table('rolespermissionspermissions', function(Blueprint $table) {
                    $table->dropColumn('permissionid');
                });

                Schema::table('rolespermissionspermissions', function(Blueprint $table) {
                    $table->dropColumn('roles_permissionsid');
                });

                Schema::table('roles', function(Blueprint $table) {
                    $table->dropColumn('globalaccess');
                });

                Schema::table('roles', function(Blueprint $table) {
                    $table->dropColumn('role_customization');
                });

                Schema::table('roles', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('permissions', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('payments', function(Blueprint $table) {
                    $table->dropColumn('payment_method');
                });

                Schema::table('payments', function(Blueprint $table) {
                    $table->dropColumn('payment_status');
                });

                Schema::table('payments', function(Blueprint $table) {
                    $table->dropColumn('amount');
                });

                Schema::table('payments', function(Blueprint $table) {
                    $table->dropColumn('serviceid');
                });

                Schema::table('locations', function(Blueprint $table) {
                    $table->dropColumn('cooperativadetaxiid');
                });

                Schema::table('locations', function(Blueprint $table) {
                    $table->dropColumn('last_update');
                });

                Schema::table('locations', function(Blueprint $table) {
                    $table->dropColumn('longitude');
                });

                Schema::table('locations', function(Blueprint $table) {
                    $table->dropColumn('latitude');
                });

                Schema::table('locations', function(Blueprint $table) {
                    $table->dropColumn('taxiid');
                });

                Schema::table('documents', function(Blueprint $table) {
                    $table->dropColumn('cooperativadetaxiid');
                });

                Schema::table('documents', function(Blueprint $table) {
                    $table->dropColumn('creation_date');
                });

                Schema::table('documents', function(Blueprint $table) {
                    $table->dropColumn('creatorid');
                });

                Schema::table('documents', function(Blueprint $table) {
                    $table->dropColumn('month');
                });

                Schema::table('documents', function(Blueprint $table) {
                    $table->dropColumn('year');
                });

                Schema::table('documents', function(Blueprint $table) {
                    $table->dropColumn('document_type');
                });

                Schema::table('documents', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('departments', function(Blueprint $table) {
                    $table->dropColumn('cooperativadetaxiid');
                });

                Schema::table('departments', function(Blueprint $table) {
                    $table->dropColumn('color');
                });

                Schema::table('departments', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('cooperativadetaxis', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('appointmentsusersusers', function(Blueprint $table) {
                    $table->dropColumn('userid');
                });

                Schema::table('appointmentsusersusers', function(Blueprint $table) {
                    $table->dropColumn('appointments_usersid');
                });

                Schema::table('appointmentstaxistasusers', function(Blueprint $table) {
                    $table->dropColumn('userid');
                });

                Schema::table('appointmentstaxistasusers', function(Blueprint $table) {
                    $table->dropColumn('appointments_taxistasid');
                });

                Schema::table('appointments', function(Blueprint $table) {
                    $table->dropColumn('cooperativadetaxiid');
                });

                Schema::table('appointments', function(Blueprint $table) {
                    $table->dropColumn('creation_date');
                });

                Schema::table('appointments', function(Blueprint $table) {
                    $table->dropColumn('appointment_status');
                });

                Schema::table('appointments', function(Blueprint $table) {
                    $table->dropColumn('departmentid');
                });

                Schema::table('appointments', function(Blueprint $table) {
                    $table->dropColumn('time');
                });

                Schema::table('appointments', function(Blueprint $table) {
                    $table->dropColumn('date');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('cooperativadetaxiid');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('app_roleid');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordresettokenexpiresat');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordresettoken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailverificationtokenexpiresat');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailverificationtoken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailverified');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('phonenumber');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('lastname');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('firstname');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('provider');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerified');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('password');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('avatar');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('disabled');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('role');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('email');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('phoneNumber');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('lastName');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('firstName');
                });

                Schema::drop('userscustom_permissionspermissions');

                Schema::drop('taxisdriversusers');

                Schema::drop('taxis');

                Schema::drop('services');

                Schema::drop('rolespermissionspermissions');

                Schema::drop('roles');

                Schema::drop('permissions');

                Schema::drop('payments');

                Schema::drop('locations');

                Schema::drop('documents');

                Schema::drop('departments');

                Schema::drop('cooperativadetaxis');

                Schema::drop('appointmentsusersusers');

                Schema::drop('appointmentstaxistasusers');

                Schema::drop('appointments');

                Schema::drop('users');

    }
}
