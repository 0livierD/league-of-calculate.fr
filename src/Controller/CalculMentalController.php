<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
class CalculMentalController extends AbstractController
{

    #[Route('/index', name: 'app_calcul_mental_tuto')]
    public function index(): Response
    {
        return $this->render('calcul_mental/tuto.html.twig');
    }

    #[Route('/calcul-mental', name: 'app_calcul_mental')]
    public function play(): Response
    {
        return $this->render('calcul_mental/index.html.twig');
    }
}
