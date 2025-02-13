<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\AppointmentstaxistasusersRepositoryInterface;

class AppointmentstaxistasusersController extends Controller
{
    protected AppointmentstaxistasusersRepositoryInterface $appointmentstaxistasusersRepository;
    protected Request $request;

    public function __construct(AppointmentstaxistasusersRepositoryInterface $appointmentstaxistasusersRepository, Request $request)
    {
        $this->appointmentstaxistasusersRepository = $appointmentstaxistasusersRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->appointmentstaxistasusersRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="appointmentstaxistasusers.csv"');
            $rows = $payload['rows'];
            $fields = array('id','appointments_taxistasid','userid',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['appointments_taxistasid'],$row['userid'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->appointmentstaxistasusersRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->appointmentstaxistasusersRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->appointmentstaxistasusersRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->appointmentstaxistasusersRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->appointmentstaxistasusersRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->appointmentstaxistasusersRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

