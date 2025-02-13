<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\CooperativadetaxisRepositoryInterface;

class CooperativadetaxisController extends Controller
{
    protected CooperativadetaxisRepositoryInterface $cooperativadetaxisRepository;
    protected Request $request;

    public function __construct(CooperativadetaxisRepositoryInterface $cooperativadetaxisRepository, Request $request)
    {
        $this->cooperativadetaxisRepository = $cooperativadetaxisRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->cooperativadetaxisRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="cooperativadetaxis.csv"');
            $rows = $payload['rows'];
            $fields = array('id','name',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['name'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->cooperativadetaxisRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->cooperativadetaxisRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->cooperativadetaxisRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->cooperativadetaxisRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->cooperativadetaxisRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->cooperativadetaxisRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

