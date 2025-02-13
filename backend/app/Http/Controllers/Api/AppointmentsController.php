<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\AppointmentsRepositoryInterface;

class AppointmentsController extends Controller
{
    protected AppointmentsRepositoryInterface $appointmentsRepository;
    protected Request $request;

    public function __construct(AppointmentsRepositoryInterface $appointmentsRepository, Request $request)
    {
        $this->appointmentsRepository = $appointmentsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->appointmentsRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="appointments.csv"');
            $rows = $payload['rows'];
            $fields = array('id',

      'date','time','creation_date',
        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],

      $row['date'],$row['time'],$row['creation_date'],
        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->appointmentsRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->appointmentsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->appointmentsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->appointmentsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->appointmentsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->appointmentsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

