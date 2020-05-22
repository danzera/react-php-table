<?php

namespace App\Command;

use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Process\InputStream;
use Symfony\Component\Process\Process;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class LoadData extends Command
{
    // php bin/console app:load-data
    protected static $defaultName = 'app:load-data';

    protected function configure()
    {
        $this->setDescription('Generate data from /assets/data/test.csv');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $output->writeln('Generating data from /assets/data/test.csv');

        $entityCommand = $this->getApplication()->find('make:entity');
        
        // TODO: programmatically run through the make:entity setup...?
        // potentially helpful links
        // https://github.com/symfony/maker-bundle/issues/269
        // https://github.com/symfony/maker-bundle/blob/master/src/Test/MakerTestEnvironment.php#L208-L235

        // generate a new migration
        $migrationCommand = $this->getApplication()->find('make:migration');
        $migrationCommand->run($input, $output);

        return 0;
    }
}
