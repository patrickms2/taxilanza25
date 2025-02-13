<?php

namespace App\Repositories\Eloquent;

use App\Models\Userscustom_permissionspermissions;

use App\Repositories\Userscustom_permissionspermissionsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Userscustom_permissionspermissionsRepository extends BaseRepository implements Userscustom_permissionspermissionsRepositoryInterface
{
    public function __construct(Userscustom_permissionspermissions $model)
    {
        parent::__construct($model);
    }

    public function findAll($params) : array
    {
        $limit = 0;
        $offset = 0;
        $orderBy = null;

        $query = $this->model->newModelQuery();
        //$query->select("*", "product as prod_id");

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['users_custom_permissionsid'])) {
                $query->where('users_custom_permissionsid', 'like', '%'.$filter['users_custom_permissionsid'].'%');
            }

            if (isset($filter['permissionid'])) {
                $query->where('permissionid', 'like', '%'.$filter['permissionid'].'%');
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['createdAtRange'])) {
                [$start, $end] = $filter['createdAtRange'];

                if (!empty($start)) {
                    $query->where('created_at', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('created_at', '<=', $end);
                }
            }
        }

        if ($limit) {
            $query->limit($limit);
        }

        $rows = $query->get();

        return [
            'rows' => $rows->toArray(),
            'count' => $rows->count(),
        ];
    }

    public function create(array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $attributes['created_by_user'] = $currentUser->id;
            $userscustom_permissionspermissions = Userscustom_permissionspermissions::create([
                    'users_custom_permissionsid' => $attributes['users_custom_permissionsid'] ?? null
,
                    'permissionid' => $attributes['permissionid'] ?? null
,
                    'created_by_user' => $currentUser->id
                ]);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function update($id, array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $userscustom_permissionspermissions = Userscustom_permissionspermissions::find($id);
            $userscustom_permissionspermissions->update([
                    'users_custom_permissionsid' => $attributes['users_custom_permissionsid'] ?? null
,
                    'permissionid' => $attributes['permissionid'] ?? null
,
                    'updated_by_user' => $currentUser->id
                ]);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

    public function findById($id)
    {
        $query = $this->model->newModelQuery();

        $query
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'id as label');

        if (isset($params['query'])) {
            $query->where('id', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('id', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

