<?php

namespace App\Repositories\Eloquent;

use App\Models\Locations;
use App\Models\Taxis;
use App\Models\Cooperativadetaxis;

use App\Repositories\LocationsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class LocationsRepository extends BaseRepository implements LocationsRepositoryInterface
{
    public function __construct(Locations $model)
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

        $query->with('taxiid');
        $query->with('cooperativadetaxiid');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['latitudeRange'])) {
                [$start, $end] = $filter['latitudeRange'];

                if (!empty($start)) {
                    $query->where('latitude', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('latitude', '<=', $end);
                }
            }

            if (isset($filter['longitudeRange'])) {
                [$start, $end] = $filter['longitudeRange'];

                if (!empty($start)) {
                    $query->where('longitude', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('longitude', '<=', $end);
                }
            }

            if (isset($filter['last_updateRange'])) {
                [$start, $end] = $filter['last_updateRange'];

                if (!empty($start)) {
                    $query->where('last_update', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('last_update', '<=', $end);
                }
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
            $locations = Locations::create([
                    'taxiid' => $attributes['taxiid'] ?? null
,
                    'latitude' => $attributes['latitude'] ?? null
,
                    'longitude' => $attributes['longitude'] ?? null
,
                    'last_update' => $attributes['last_update'] ?? null
,
                    'cooperativadetaxiid' => $attributes['cooperativadetaxiid'] ?? null
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
            $locations = Locations::find($id);
            $locations->update([
                    'taxiid' => $attributes['taxiid'] ?? null
,
                    'latitude' => $attributes['latitude'] ?? null
,
                    'longitude' => $attributes['longitude'] ?? null
,
                    'last_update' => $attributes['last_update'] ?? null
,
                    'cooperativadetaxiid' => $attributes['cooperativadetaxiid'] ?? null
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
            ->with('taxiid')
            ->with('cooperativadetaxiid')
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

