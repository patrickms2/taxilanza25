<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\Userscustom_permissionspermissionsRepositoryInterface;

class Userscustom_permissionspermissionsController extends Controller
{
    protected Userscustom_permissionspermissionsRepositoryInterface $userscustom_permissionspermissionsRepository;
    protected Request $request;

    public function __construct(Userscustom_permissionspermissionsRepositoryInterface $userscustom_permissionspermissionsRepository, Request $request)
    {
        $this->userscustom_permissionspermissionsRepository = $userscustom_permissionspermissionsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->userscustom_permissionspermissionsRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="userscustom_permissionspermissions.csv"');
            $rows = $payload['rows'];
            $fields = array('id','users_custom_permissionsid','permissionid',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['users_custom_permissionsid'],$row['permissionid'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->userscustom_permissionspermissionsRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->userscustom_permissionspermissionsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->userscustom_permissionspermissionsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->userscustom_permissionspermissionsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->userscustom_permissionspermissionsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->userscustom_permissionspermissionsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

