<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/user')]
class UserController extends AbstractController
{

    #[Route('/', name: 'app_user_index', methods: ['GET'])]
    public function index(UserRepository $userRepository): Response
    {
        $user = $userRepository->find($this->getUser());

        if (in_array('ROLE_ADMIN', $this->getUser()->getRoles())) {
            return $this->render('user/index.html.twig', [
                'users' => $userRepository->findAll(),
            ]);
        }

        return $this->redirectToRoute('app_user_edit', ['id' => $user->getId()]);
    }

//    #[IsGranted('ROLE_ADMIN')]
//    #[Route('/new', name: 'app_user_new', methods: ['GET', 'POST'])]
//    public function new(Request $request, EntityManagerInterface $entityManager): Response
//    {
//        $user = new User();
//        $form = $this->createForm(UserType::class, $user);
//        $form->handleRequest($request);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $entityManager->persist($user);
//            $entityManager->flush();
//
//            return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
//        }
//
//        return $this->render('user/new.html.twig', [
//            'user' => $user,
//            'form' => $form->createView(),
//        ]);
//    }

//    #[Route('/{id}', name: 'app_user_show', methods: ['GET'])]
//    public function show(User $user): Response
//    {
//        return $this->render('user/show.html.twig', [
//            'user' => $user,
//        ]);
//    }

    #[Route('/{id}/edit', name: 'app_user_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request,
                         User $user,
                         EntityManagerInterface $entityManager,
                         UserPasswordHasherInterface $hasher): Response
    {
        if ($user === $this->getUser() || in_array('ROLE_ADMIN', $this->getUser()->getRoles())) {
            $form = $this->createForm(UserType::class, $user);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {

                $oldPassword = $form->get('oldPassword')->getData();
                $newPassword = $form->get('newPassword')->getData();

                if ($oldPassword != null) {

                    if ($hasher->isPasswordValid($user, $oldPassword)) {

                        if ($newPassword != null) {
                            $user->setPassword($hasher->hashPassword($user, $newPassword));
                        }

                        $entityManager->flush();
                    } else {
                       $form->addError(new FormError("Mauvais mot de passe !"));

                        return $this->render('user/edit.html.twig', [
                            'user' => $user,
                            'form' => $form,
                        ]);
                    }

                } else {
                    if (in_array('ROLE_ADMIN', $this->getUser()->getRoles())) {
                        $entityManager->flush();
                    }
                }

                return $this->redirectToRoute('app_user_edit', ['id' => $user->getId()], Response::HTTP_SEE_OTHER);
            }

            return $this->render('user/edit.html.twig', [
                'user' => $user,
                'form' => $form,
            ]);
        }
        return $this->redirectToRoute('app_accueil');
    }

    #[Route('/{id}', name: 'app_user_delete', methods: ['POST'])]
    public function delete(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $user->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($user);
            $entityManager->flush();
        }

        $session = new Session();
        $session->invalidate();

        return $this->redirectToRoute('app_logout', [], Response::HTTP_SEE_OTHER);
    }
}
