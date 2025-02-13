<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\DocumentsRepositoryInterface;

class DocumentsController extends Controller
{
    protected DocumentsRepositoryInterface $documentsRepository;
    protected Request $request;

    public function __construct(DocumentsRepositoryInterface $documentsRepository, Request $request)
    {
        $this->documentsRepository = $documentsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->documentsRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="documents.csv"');
            $rows = $payload['rows'];
            $fields = array('id','name',
        'year','month',

      'creation_date',
        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['name'],
        $row['year'],$row['month'],

      $row['creation_date'],
        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->documentsRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->documentsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->documentsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->documentsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->documentsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->documentsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

