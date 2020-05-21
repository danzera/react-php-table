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
        
        $response = new Response(json_encode($vehicles));

        return $response;
    }
}
