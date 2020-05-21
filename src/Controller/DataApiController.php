<?php

namespace App\Controller;

use App\Entity\Vehicle;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class DataApiController extends AbstractController {
    /**
     * @Route("/api/data", methods={"GET"}, name="api_data")
     */
    public function index() {

        // TODO: PAGINATE THIS & UTILIZE THE Vehicle.php ENTITY
        // file() splits file into array, each line is an array element
        // could be potentially useful for pagination
        // $file_array = file("../assets/data/test.csv");
        // $file_headers = explode(",", $file_array[0]);
        // var_dump($file_headers);
        // var_dump($file_array);
        $file = fopen("../assets/data/test.csv", "r");
        $headers = fgetcsv($file, 0, ",");

        $vehicles = [];
        while (($row = fgetcsv($file, 0, ",")) !== FALSE) {
            $vehicle = [];
            foreach ($headers as $index => $val) {
                $vehicle[$val] = $row[$index];
            }
            $vehicles[] = $vehicle;
        }

        $data = [
            "headers" => $headers,
            "vehicles" => $vehicles
        ];
        
        $response = new Response(json_encode($data));

        return $response;
    }
}
