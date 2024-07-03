<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class AccueilController extends AbstractController
{

    #[Route('/', name: 'app_accueil')]
    public function index(Request $request): Response
    {
        return $this->render('accueil/index.html.twig');
    }
}
