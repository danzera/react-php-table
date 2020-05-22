<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200522173645 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE vehicle ADD year INT NOT NULL, ADD make VARCHAR(255) NOT NULL, ADD model VARCHAR(255) NOT NULL, ADD body_style VARCHAR(255) DEFAULT NULL, ADD color VARCHAR(255) NOT NULL, ADD vin VARCHAR(255) NOT NULL, ADD odometer INT NOT NULL, ADD engine_size VARCHAR(255) DEFAULT NULL, ADD current_bid INT NOT NULL, ADD sale_date DATE DEFAULT NULL, ADD sale_start_at DATETIME DEFAULT NULL, ADD location_name VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE vehicle DROP year, DROP make, DROP model, DROP body_style, DROP color, DROP vin, DROP odometer, DROP engine_size, DROP current_bid, DROP sale_date, DROP sale_start_at, DROP location_name');
    }
}
