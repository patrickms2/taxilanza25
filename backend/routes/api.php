<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\AppointmentsController;
use App\Http\Controllers\Api\AppointmentstaxistasusersController;
use App\Http\Controllers\Api\AppointmentsusersusersController;
use App\Http\Controllers\Api\CooperativadetaxisController;
use App\Http\Controllers\Api\DepartmentsController;
use App\Http\Controllers\Api\DocumentsController;
use App\Http\Controllers\Api\LocationsController;
use App\Http\Controllers\Api\PaymentsController;
use App\Http\Controllers\Api\PermissionsController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\RolespermissionspermissionsController;
use App\Http\Controllers\Api\ServicesController;
use App\Http\Controllers\Api\TaxisController;
use App\Http\Controllers\Api\TaxisdriversusersController;
use App\Http\Controllers\Api\Userscustom_permissionspermissionsController;
use App\Http\Controllers\Api\FilesController;

Route::get('analytics', fn() => Storage::disk('local')->get('analytics.json'))->middleware('auth:api');

Route::post('file/upload/{table}/{column}', [FilesController::class, 'uploadFile']);
Route::get('file/download', [FilesController::class, 'download']);

Route::get('/email/verify/{id}/{hash}', [UsersController::class, 'verifyEmail'])
    ->middleware(['signed'])->name('verification.verify');

Route::group([
    'middleware' => 'auth:api',
], function() {

    Route::get('users/autocomplete', [UsersController::class, 'findAllAutocomplete']);
    Route::get('users/count', [UsersController::class, 'count']);
    Route::resource('users', UsersController::class);

    Route::get('appointments/autocomplete', [AppointmentsController::class, 'findAllAutocomplete']);
    Route::get('appointments/count', [AppointmentsController::class, 'count']);
    Route::resource('appointments', AppointmentsController::class);

    Route::get('appointmentstaxistasusers/autocomplete', [AppointmentstaxistasusersController::class, 'findAllAutocomplete']);
    Route::get('appointmentstaxistasusers/count', [AppointmentstaxistasusersController::class, 'count']);
    Route::resource('appointmentstaxistasusers', AppointmentstaxistasusersController::class);

    Route::get('appointmentsusersusers/autocomplete', [AppointmentsusersusersController::class, 'findAllAutocomplete']);
    Route::get('appointmentsusersusers/count', [AppointmentsusersusersController::class, 'count']);
    Route::resource('appointmentsusersusers', AppointmentsusersusersController::class);

    Route::get('cooperativadetaxis/autocomplete', [CooperativadetaxisController::class, 'findAllAutocomplete']);
    Route::get('cooperativadetaxis/count', [CooperativadetaxisController::class, 'count']);
    Route::resource('cooperativadetaxis', CooperativadetaxisController::class);

    Route::get('departments/autocomplete', [DepartmentsController::class, 'findAllAutocomplete']);
    Route::get('departments/count', [DepartmentsController::class, 'count']);
    Route::resource('departments', DepartmentsController::class);

    Route::get('documents/autocomplete', [DocumentsController::class, 'findAllAutocomplete']);
    Route::get('documents/count', [DocumentsController::class, 'count']);
    Route::resource('documents', DocumentsController::class);

    Route::get('locations/autocomplete', [LocationsController::class, 'findAllAutocomplete']);
    Route::get('locations/count', [LocationsController::class, 'count']);
    Route::resource('locations', LocationsController::class);

    Route::get('payments/autocomplete', [PaymentsController::class, 'findAllAutocomplete']);
    Route::get('payments/count', [PaymentsController::class, 'count']);
    Route::resource('payments', PaymentsController::class);

    Route::get('permissions/autocomplete', [PermissionsController::class, 'findAllAutocomplete']);
    Route::get('permissions/count', [PermissionsController::class, 'count']);
    Route::resource('permissions', PermissionsController::class);

    Route::get('roles/autocomplete', [RolesController::class, 'findAllAutocomplete']);
    Route::get('roles/count', [RolesController::class, 'count']);
    Route::resource('roles', RolesController::class);

    Route::get('rolespermissionspermissions/autocomplete', [RolespermissionspermissionsController::class, 'findAllAutocomplete']);
    Route::get('rolespermissionspermissions/count', [RolespermissionspermissionsController::class, 'count']);
    Route::resource('rolespermissionspermissions', RolespermissionspermissionsController::class);

    Route::get('services/autocomplete', [ServicesController::class, 'findAllAutocomplete']);
    Route::get('services/count', [ServicesController::class, 'count']);
    Route::resource('services', ServicesController::class);

    Route::get('taxis/autocomplete', [TaxisController::class, 'findAllAutocomplete']);
    Route::get('taxis/count', [TaxisController::class, 'count']);
    Route::resource('taxis', TaxisController::class);

    Route::get('taxisdriversusers/autocomplete', [TaxisdriversusersController::class, 'findAllAutocomplete']);
    Route::get('taxisdriversusers/count', [TaxisdriversusersController::class, 'count']);
    Route::resource('taxisdriversusers', TaxisdriversusersController::class);

    Route::get('userscustom_permissionspermissions/autocomplete', [Userscustom_permissionspermissionsController::class, 'findAllAutocomplete']);
    Route::get('userscustom_permissionspermissions/count', [Userscustom_permissionspermissionsController::class, 'count']);
    Route::resource('userscustom_permissionspermissions', Userscustom_permissionspermissionsController::class);

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function () {
    Route::any('signin/local', [AuthController::class, 'login'])->name('login');
    Route::put('verify-email', [UsersController::class, 'sendVerifyEmail']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('signin/google', [UsersController::class, 'signinGoogle']);
    Route::get('google/callback', [UsersController::class, 'callbackGoogle']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::put('password-update', [AuthController::class, 'passwordUpdate']);
    Route::post('send-password-reset-email', [AuthController::class, 'sendPasswordResetEmail']);
});
