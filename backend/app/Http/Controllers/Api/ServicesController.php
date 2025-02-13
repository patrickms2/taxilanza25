<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\ServicesRepositoryInterface;

class ServicesController extends Controller
{
    protected ServicesRepositoryInterface $servicesRepository;
    protected Request $request;

    public function __construct(ServicesRepositoryInterface $servicesRepository, Request $request)
    {
        $this->servicesRepository = $servicesRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->servicesRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="services.csv"');
            $rows = $payload['rows'];
            $fields = array('id',

      'service_type','reservation_date',
        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],

      $row['service_type'],$row['reservation_date'],
        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->servicesRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->servicesRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->servicesRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->servicesRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->servicesRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->servicesRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

