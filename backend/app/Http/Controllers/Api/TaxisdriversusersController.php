<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\TaxisdriversusersRepositoryInterface;

class TaxisdriversusersController extends Controller
{
    protected TaxisdriversusersRepositoryInterface $taxisdriversusersRepository;
    protected Request $request;

    public function __construct(TaxisdriversusersRepositoryInterface $taxisdriversusersRepository, Request $request)
    {
        $this->taxisdriversusersRepository = $taxisdriversusersRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->taxisdriversusersRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="taxisdriversusers.csv"');
            $rows = $payload['rows'];
            $fields = array('id','taxis_driversid','userid',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['taxis_driversid'],$row['userid'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->taxisdriversusersRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->taxisdriversusersRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->taxisdriversusersRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->taxisdriversusersRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->taxisdriversusersRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->taxisdriversusersRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

