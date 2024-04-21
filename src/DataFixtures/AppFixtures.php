<?php

namespace App\DataFixtures;

use App\Entity\Rang;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $rangFer = new Rang();
        $rangFer->setDescription('Fer');
        $manager->persist($rangFer);
        $manager->flush();
    }
}
