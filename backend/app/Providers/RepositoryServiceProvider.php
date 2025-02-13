<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquent\BaseRepository;
use App\Repositories\EloquentRepositoryInterface;

use App\Repositories\UsersRepositoryInterface;
use App\Repositories\Eloquent\UsersRepository;
use App\Repositories\AppointmentsRepositoryInterface;
use App\Repositories\Eloquent\AppointmentsRepository;
use App\Repositories\AppointmentstaxistasusersRepositoryInterface;
use App\Repositories\Eloquent\AppointmentstaxistasusersRepository;
use App\Repositories\AppointmentsusersusersRepositoryInterface;
use App\Repositories\Eloquent\AppointmentsusersusersRepository;
use App\Repositories\CooperativadetaxisRepositoryInterface;
use App\Repositories\Eloquent\CooperativadetaxisRepository;
use App\Repositories\DepartmentsRepositoryInterface;
use App\Repositories\Eloquent\DepartmentsRepository;
use App\Repositories\DocumentsRepositoryInterface;
use App\Repositories\Eloquent\DocumentsRepository;
use App\Repositories\LocationsRepositoryInterface;
use App\Repositories\Eloquent\LocationsRepository;
use App\Repositories\PaymentsRepositoryInterface;
use App\Repositories\Eloquent\PaymentsRepository;
use App\Repositories\PermissionsRepositoryInterface;
use App\Repositories\Eloquent\PermissionsRepository;
use App\Repositories\RolesRepositoryInterface;
use App\Repositories\Eloquent\RolesRepository;
use App\Repositories\RolespermissionspermissionsRepositoryInterface;
use App\Repositories\Eloquent\RolespermissionspermissionsRepository;
use App\Repositories\ServicesRepositoryInterface;
use App\Repositories\Eloquent\ServicesRepository;
use App\Repositories\TaxisRepositoryInterface;
use App\Repositories\Eloquent\TaxisRepository;
use App\Repositories\TaxisdriversusersRepositoryInterface;
use App\Repositories\Eloquent\TaxisdriversusersRepository;
use App\Repositories\Userscustom_permissionspermissionsRepositoryInterface;
use App\Repositories\Eloquent\Userscustom_permissionspermissionsRepository;
use App\Repositories\FilesRepositoryInterface;
use App\Repositories\Eloquent\FilesRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);

        $this->app->bind(UsersRepositoryInterface::class, UsersRepository::class);

        $this->app->bind(AppointmentsRepositoryInterface::class, AppointmentsRepository::class);

        $this->app->bind(AppointmentstaxistasusersRepositoryInterface::class, AppointmentstaxistasusersRepository::class);

        $this->app->bind(AppointmentsusersusersRepositoryInterface::class, AppointmentsusersusersRepository::class);

        $this->app->bind(CooperativadetaxisRepositoryInterface::class, CooperativadetaxisRepository::class);

        $this->app->bind(DepartmentsRepositoryInterface::class, DepartmentsRepository::class);

        $this->app->bind(DocumentsRepositoryInterface::class, DocumentsRepository::class);

        $this->app->bind(LocationsRepositoryInterface::class, LocationsRepository::class);

        $this->app->bind(PaymentsRepositoryInterface::class, PaymentsRepository::class);

        $this->app->bind(PermissionsRepositoryInterface::class, PermissionsRepository::class);

        $this->app->bind(RolesRepositoryInterface::class, RolesRepository::class);

        $this->app->bind(RolespermissionspermissionsRepositoryInterface::class, RolespermissionspermissionsRepository::class);

        $this->app->bind(ServicesRepositoryInterface::class, ServicesRepository::class);

        $this->app->bind(TaxisRepositoryInterface::class, TaxisRepository::class);

        $this->app->bind(TaxisdriversusersRepositoryInterface::class, TaxisdriversusersRepository::class);

        $this->app->bind(Userscustom_permissionspermissionsRepositoryInterface::class, Userscustom_permissionspermissionsRepository::class);
        $this->app->bind(FilesRepositoryInterface::class, FilesRepository::class);
    }
}

