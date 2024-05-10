<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CalculMentalController extends AbstractController
{
    #[Route('/calcul-mental', name: 'app_calcul_mental')]
    public function index(): Response
    {
        return $this->render('calcul_mental/index.html.twig', [
            'controller_name' => 'CalculMentalController',
        ]);
    }
}
