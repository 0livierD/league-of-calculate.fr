<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240421184138 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD rang_id INT NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6493CC0D837 FOREIGN KEY (rang_id) REFERENCES rang (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6493CC0D837 ON user (rang_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6493CC0D837');
        $this->addSql('DROP INDEX IDX_8D93D6493CC0D837 ON user');
        $this->addSql('ALTER TABLE user DROP rang_id');
    }
}
