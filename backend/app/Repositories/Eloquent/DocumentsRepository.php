<?php

namespace App\Repositories\Eloquent;

use App\Models\Documents;
use App\Models\Users;
use App\Models\Cooperativadetaxis;

use App\Repositories\DocumentsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DocumentsRepository extends BaseRepository implements DocumentsRepositoryInterface
{
    public function __construct(Documents $model)
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

        $query->with('creatorid');
        $query->with('cooperativadetaxiid');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['name'])) {
                $query->where('name', 'like', '%'.$filter['name'].'%');
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

            if (isset($filter['monthRange'])) {
                [$start, $end] = $filter['monthRange'];

                if (!empty($start)) {
                    $query->where('month', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('month', '<=', $end);
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

            if (isset($filter['document_type'])) {
                $query->where('document_type', $filter['document_type']);
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
            $documents = Documents::create([
                    'name' => $attributes['name'] ?? null
,
                    'document_type' => $attributes['document_type'] ?? null
,
                    'year' => $attributes['year'] ?? null
,
                    'month' => $attributes['month'] ?? null
,
                    'creatorid' => $attributes['creatorid'] ?? null
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
            $documents = Documents::find($id);
            $documents->update([
                    'name' => $attributes['name'] ?? null
,
                    'document_type' => $attributes['document_type'] ?? null
,
                    'year' => $attributes['year'] ?? null
,
                    'month' => $attributes['month'] ?? null
,
                    'creatorid' => $attributes['creatorid'] ?? null
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
            ->with('creatorid')
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

