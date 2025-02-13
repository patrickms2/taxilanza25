<?php

namespace App\Repositories\Eloquent;

use App\Models\Appointments;
use App\Models\Departments;
use App\Models\Cooperativadetaxis;

use App\Repositories\AppointmentsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AppointmentsRepository extends BaseRepository implements AppointmentsRepositoryInterface
{
    public function __construct(Appointments $model)
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

        $query->with('departmentid');
        $query->with('cooperativadetaxiid');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['dateRange'])) {
                [$start, $end] = $filter['dateRange'];

                if (!empty($start)) {
                    $query->where('date', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('date', '<=', $end);
                }
            }

            if (isset($filter['timeRange'])) {
                [$start, $end] = $filter['timeRange'];

                if (!empty($start)) {
                    $query->where('time', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('time', '<=', $end);
                }
            }

            if (isset($filter['creation_dateRange'])) {
                [$start, $end] = $filter['creation_dateRange'];

                if (!empty($start)) {
                    $query->where('creation_date', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('creation_date', '<=', $end);
                }
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['appointment_status'])) {
                $query->where('appointment_status', $filter['appointment_status']);
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
            $appointments = Appointments::create([
                    'date' => $attributes['date'] ?? null
,
                    'time' => $attributes['time'] ?? null
,
                    'departmentid' => $attributes['departmentid'] ?? null
,
                    'appointment_status' => $attributes['appointment_status'] ?? null
,
                    'creation_date' => $attributes['creation_date'] ?? null
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
            $appointments = Appointments::find($id);
            $appointments->update([
                    'date' => $attributes['date'] ?? null
,
                    'time' => $attributes['time'] ?? null
,
                    'departmentid' => $attributes['departmentid'] ?? null
,
                    'appointment_status' => $attributes['appointment_status'] ?? null
,
                    'creation_date' => $attributes['creation_date'] ?? null
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
            ->with('departmentid')
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

