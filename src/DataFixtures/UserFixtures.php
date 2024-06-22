<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {

        $admin1 = new User();

        $admin1->setEmail('olivier.dy@gmail.com');
        $admin1->setPseudo('Admin');
        $admin1->setRoles(['ROLE_ADMIN']);
        $admin1->setPassword($this->hasher->hashPassword($admin1, 'Bettr@ve999!!!!'));
        $admin1->setRang($this->getReference('rangBronze'));
        $admin1->setAnneeNaissance('1979');
        $admin1->setVerified(true);

        $manager->persist($admin1);

        $user1 = new User();

        $user1->setEmail('user@test.com');
        $user1->setPseudo('User');
        $user1->setPassword($this->hasher->hashPassword($user1, 'Bettr@ve999!!!!'));
        $user1->setRang($this->getReference('rangBronze'));
        $user1->setAnneeNaissance('2010');
        $user1->setVerified(true);

        $manager->persist($user1);

        $manager->flush();
    }
}
