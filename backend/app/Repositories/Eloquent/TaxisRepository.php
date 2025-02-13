<?php

namespace App\Repositories\Eloquent;

use App\Models\Taxis;
use App\Models\Users;

use App\Repositories\TaxisRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class TaxisRepository extends BaseRepository implements TaxisRepositoryInterface
{
    public function __construct(Taxis $model)
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

        $query->with('ownerid');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['license_plate'])) {
                $query->where('license_plate', 'like', '%'.$filter['license_plate'].'%');
            }

            if (isset($filter['brand'])) {
                $query->where('brand', 'like', '%'.$filter['brand'].'%');
            }

            if (isset($filter['model'])) {
                $query->where('model', 'like', '%'.$filter['model'].'%');
            }

            if (isset($filter['color'])) {
                $query->where('color', 'like', '%'.$filter['color'].'%');
            }

            if (isset($filter['yearRange'])) {
                [$start, $end] = $filter['yearRange'];

                if (!empty($start)) {
                    $query->where('year', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('year', '<=', $end);
                }
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['taxi_status'])) {
                $query->where('taxi_status', $filter['taxi_status']);
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
            $taxis = Taxis::create([
                    'ownerid' => $attributes['ownerid'] ?? null
,
                    'license_plate' => $attributes['license_plate'] ?? null
,
                    'brand' => $attributes['brand'] ?? null
,
                    'model' => $attributes['model'] ?? null
,
                    'year' => $attributes['year'] ?? null
,
                    'color' => $attributes['color'] ?? null
,
                    'taxi_status' => $attributes['taxi_status'] ?? null
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
            $taxis = Taxis::find($id);
            $taxis->update([
                    'ownerid' => $attributes['ownerid'] ?? null
,
                    'license_plate' => $attributes['license_plate'] ?? null
,
                    'brand' => $attributes['brand'] ?? null
,
                    'model' => $attributes['model'] ?? null
,
                    'year' => $attributes['year'] ?? null
,
                    'color' => $attributes['color'] ?? null
,
                    'taxi_status' => $attributes['taxi_status'] ?? null
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
            ->with('ownerid')
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

