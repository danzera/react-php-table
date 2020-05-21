<?php

namespace App\Controller;

use App\Entity\Vehicle;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DataApiController extends AbstractController {
    /**
     * @Route("/api/data", methods={"GET"}, name="api_data")
     */
    public function index(Request $request) {
        $num_results = $request->query->get('num_results') ? $request->query->get('num_results') : 25;
        $page_requested = $request->query->get('page') ? $request->query->get('page') : 1;

        // TODO: paginate utilizing the Vehicle.php Entity
        //       likely involving the use of Doctrine\ORM\Tools\Pagination\Paginator
        $file_array = file("../assets/data/test.csv");
        $file_headers = explode(",", $file_array[0]);

        $num_pages = ceil(count($file_array) / $num_results);
        // make sure $page_requested <= $num_results, otherwise default to page 1
        $page_requested = ($page_requested <= $num_pages) ? $page_requested : 1;
        // get index to start at for the specified page, add 1 to skip headers
        $start_index = $num_results * ($page_requested - 1) + 1;

        // format data
        $vehicles = [];
        for ($i = $start_index; ($i < count($file_array)) && ($i < $start_index + $num_results); $i++) {
            $vehicle = [];
            $row = explode(",", $file_array[$i]);
            foreach ($file_headers as $index => $val) {
                // TODO: make this check more resilient against other forms of 'null' in data
                //       this is a short-term solution in lieu of data being created via migration
                $vehicle[$val] = ($row[$index] == 'NULL') ? null : $row[$index];
            }
            $vehicles[] = $vehicle;
        }

        $data = [
            "num_pages" => $num_pages,
            "headers" => $file_headers,
            "vehicles" => $vehicles
        ];
        
        $response = new Response(json_encode($data));

        return $response;
    }
}
