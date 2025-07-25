<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\AppointmentsusersusersRepositoryInterface;

class AppointmentsusersusersController extends Controller
{
    protected AppointmentsusersusersRepositoryInterface $appointmentsusersusersRepository;
    protected Request $request;

    public function __construct(AppointmentsusersusersRepositoryInterface $appointmentsusersusersRepository, Request $request)
    {
        $this->appointmentsusersusersRepository = $appointmentsusersusersRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->appointmentsusersusersRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="appointmentsusersusers.csv"');
            $rows = $payload['rows'];
            $fields = array('id','appointments_usersid','userid',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['appointments_usersid'],$row['userid'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->appointmentsusersusersRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->appointmentsusersusersRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->appointmentsusersusersRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->appointmentsusersusersRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->appointmentsusersusersRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->appointmentsusersusersRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

