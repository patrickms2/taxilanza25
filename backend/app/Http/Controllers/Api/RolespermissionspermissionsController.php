<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\RolespermissionspermissionsRepositoryInterface;

class RolespermissionspermissionsController extends Controller
{
    protected RolespermissionspermissionsRepositoryInterface $rolespermissionspermissionsRepository;
    protected Request $request;

    public function __construct(RolespermissionspermissionsRepositoryInterface $rolespermissionspermissionsRepository, Request $request)
    {
        $this->rolespermissionspermissionsRepository = $rolespermissionspermissionsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->rolespermissionspermissionsRepository->findAll($this->request->all());

        $fileType = request()->query('filetype');
        if($fileType && $fileType == 'csv') {
            header("Content-type: text/csv");
            header("Cache-Control: no-store, no-cache");
            header('Content-Disposition: attachment; filename="rolespermissionspermissions.csv"');
            $rows = $payload['rows'];
            $fields = array('id','roles_permissionsid','permissionid',

        );

            $f = fopen('php://output', 'w');

            fputcsv($f, $fields);

            foreach($rows as $row)
                {
                    fputcsv($f, array($row['id'],$row['roles_permissionsid'],$row['permissionid'],

        ));
                }

            fclose($f);

        } else {
            return response()->json($payload);
        }
    }

    public function count()
    {
        $payload = $this->rolespermissionspermissionsRepository->findAll($this->request->all());

        $countPayload = ['count' => $payload['count']];
        return response()->json($countPayload);
    }

    public function show($id)
    {
        $payload = $this->rolespermissionspermissionsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->rolespermissionspermissionsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->rolespermissionspermissionsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->rolespermissionspermissionsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->rolespermissionspermissionsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

