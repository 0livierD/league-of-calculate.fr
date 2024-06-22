<?php

namespace App\DataFixtures;

use App\Entity\Rang;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class RangFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $rangBronze = new Rang();
        $rangBronze->setDescription('Bronze');
        $manager->persist($rangBronze);

        $rangArgent = new Rang();
        $rangArgent->setDescription('Argent');
        $manager->persist($rangArgent);

        $rangOr = new Rang();
        $rangOr->setDescription('Or');
        $manager->persist($rangOr);

        $rangEmeraude = new Rang();
        $rangEmeraude->setDescription('Emeraude');
        $manager->persist($rangEmeraude);

        $rangDiamant = new Rang();
        $rangDiamant->setDescription('Diamant');
        $manager->persist($rangDiamant);

        $this->addReference('rangBronze', $rangBronze);
        $this->addReference('rangArgent', $rangArgent);
        $this->addReference('rangOr', $rangOr);
        $this->addReference('rangEmeraude', $rangEmeraude);
        $this->addReference('rangDiamant', $rangDiamant);

        $manager->flush();
    }
}

