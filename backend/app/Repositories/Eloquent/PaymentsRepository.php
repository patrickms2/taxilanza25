<?php

namespace App\Repositories\Eloquent;

use App\Models\Payments;
use App\Models\Services;

use App\Repositories\PaymentsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class PaymentsRepository extends BaseRepository implements PaymentsRepositoryInterface
{
    public function __construct(Payments $model)
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

        $query->with('serviceid');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['amountRange'])) {
                [$start, $end] = $filter['amountRange'];

                if (!empty($start)) {
                    $query->where('amount', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('amount', '<=', $end);
                }
            }

            if (isset($filter['payment_statusRange'])) {
                [$start, $end] = $filter['payment_statusRange'];

                if (!empty($start)) {
                    $query->where('payment_status', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('payment_status', '<=', $end);
                }
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['payment_method'])) {
                $query->where('payment_method', $filter['payment_method']);
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
            $payments = Payments::create([
                    'serviceid' => $attributes['serviceid'] ?? null
,
                    'amount' => $attributes['amount'] ?? null
,
                    'payment_status' => $attributes['payment_status'] ?? null
,
                    'payment_method' => $attributes['payment_method'] ?? null
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
            $payments = Payments::find($id);
            $payments->update([
                    'serviceid' => $attributes['serviceid'] ?? null
,
                    'amount' => $attributes['amount'] ?? null
,
                    'payment_status' => $attributes['payment_status'] ?? null
,
                    'payment_method' => $attributes['payment_method'] ?? null
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
            ->with('serviceid')
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

