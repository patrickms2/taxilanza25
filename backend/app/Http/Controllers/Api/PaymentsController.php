<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\PaymentsRepositoryInterface;

class PaymentsController extends Controller
{
    protected PaymentsRepositoryInterface $paymentsRepository;
    protected Request $request;

    public function __construct(PaymentsRepositoryInterface $paymentsRepository, Request $request)
    {
        $this->paymentsRepository = $paymentsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->paymentsRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="payments.csv"');
            $rows = $payload['rows'];
            $fields = array('id',

        'amount',
      'payment_status',
        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],

        $row['amount'],
      $row['payment_status'],
        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->paymentsRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->paymentsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->paymentsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->paymentsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->paymentsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->paymentsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

