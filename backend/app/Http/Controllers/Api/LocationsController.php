<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\LocationsRepositoryInterface;

class LocationsController extends Controller
{
    protected LocationsRepositoryInterface $locationsRepository;
    protected Request $request;

    public function __construct(LocationsRepositoryInterface $locationsRepository, Request $request)
    {
        $this->locationsRepository = $locationsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->locationsRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="locations.csv"');
            $rows = $payload['rows'];
            $fields = array('id',

        'latitude','longitude',
      'last_update',
        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],

        $row['latitude'],$row['longitude'],
      $row['last_update'],
        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->locationsRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->locationsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->locationsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->locationsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->locationsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->locationsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

