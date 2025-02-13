<?php

namespace App\Repositories\Eloquent;

use App\Models\Services;
use App\Models\Users;
use App\Models\Cooperativadetaxis;

use App\Repositories\ServicesRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ServicesRepository extends BaseRepository implements ServicesRepositoryInterface
{
    public function __construct(Services $model)
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

        $query->with('taxistaid');
        $query->with('cooperativadetaxiid');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['service_typeRange'])) {
                [$start, $end] = $filter['service_typeRange'];

                if (!empty($start)) {
                    $query->where('service_type', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('service_type', '<=', $end);
                }
            }

            if (isset($filter['reservation_dateRange'])) {
                [$start, $end] = $filter['reservation_dateRange'];

                if (!empty($start)) {
                    $query->where('reservation_date', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('reservation_date', '<=', $end);
                }
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['service_status'])) {
                $query->where('service_status', $filter['service_status']);
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
            $services = Services::create([
                    'service_type' => $attributes['service_type'] ?? null
,
                    'reservation_date' => $attributes['reservation_date'] ?? null
,
                    'service_status' => $attributes['service_status'] ?? null
,
                    'taxistaid' => $attributes['taxistaid'] ?? null
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
            $services = Services::find($id);
            $services->update([
                    'service_type' => $attributes['service_type'] ?? null
,
                    'reservation_date' => $attributes['reservation_date'] ?? null
,
                    'service_status' => $attributes['service_status'] ?? null
,
                    'taxistaid' => $attributes['taxistaid'] ?? null
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
            ->with('taxistaid')
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

