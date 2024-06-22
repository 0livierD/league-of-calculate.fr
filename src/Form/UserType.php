<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserType extends AbstractType
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $isAdmin = $this->security->isGranted('ROLE_ADMIN');

        if ($isAdmin) {
            $builder
                ->add('roles', ChoiceType::class, [
                    'choices' => [
                        'Admin' => 'ROLE_ADMIN',
                    ],
                    'multiple' => true, // Permettre la sélection multiple
                    'expanded' => true, // Utiliser des cases à cocher
                ]);
        }
        $builder
            ->add('pseudo')
            ->add('oldPassword', PasswordType::class, [
               'constraints' => [
                    new NotBlank([
                        'message' => 'Merci de saisir votre mot de passe',
                    ]),
                ],
                'mapped' => false,
                'label' => 'Mot de passe actuel',
                'required' => false,
                'error_bubbling'=>true
            ])
            ->add('newPassword', PasswordType::class, [
                'required' => false,
                'attr' => [
                    'autocomplete' => 'new-password',
                ],
                'constraints' => [
                    new Length([
                        'min' => 10,
                        'minMessage' => 'Le mot de passe doit contenir au moins {{ limit }} caractères',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
                'label' => 'Nouveau mot de passe',
                'mapped' => false,
                'error_bubbling'=>true
            ]);;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
