## Goal
This assessment is designed to get a base level understanding of the applicants skill level.  The end product should be 
a page which displays a sortable, paginated, and searchable list of vehicle records that the user can add/delete from 
their favorites list.  The application stack is build on symfony 5 and react, those are the tools that should be utilized
to complete the task.

A basic set of commands have been provided with this project to aid in the basic development experience so that the goal
can be completed without having mess with the environment too much.  We use a makefile to handle all build commands but
you are free to use whatever you are comfortable with as long as we are able to run the project using the tools provided.

### Environment Requirements
 - [docker](https://www.docker.com/products/docker-desktop)
 - [make](https://www.gnu.org/software/make/manual/html_node/Options-Summary.html)

### Build
The [make](https://www.gnu.org/software/make/manual/html_node/Options-Summary.html) command is used to abstract the project
build commands.  Listed below are the basic build commands needed for starting the project and developing:

 - `make start` Builds the necessary containers for development
 - `make stop` Stops and removes all containers
 - `make tty` Enters the main docker container.  Useful when needing to install new libraries or composer packages from command line
 - `make db-diff` Generates a migration file based on the difference between the entity and current schema
 - `make db-migrate` Runs any migrations that have been generated and are not up-to-date with the database.
 - `make watch` Runs the watch command in poll mode, will compile all frontend assets located in `assets`

There are several other commands listed in the file.  If you type `make` followed by `<Enter>` you will see the full list
of available commands.

To start the project run `make start` and wait for the containers to finish building.  Once everything is built you are ready
to begin development.  The application will be available on `localhost:8012`.  If you wish to change the port then update the
ports under services -> app -> ports in docker-compose.yml to -"{desired_port}:80".

### Data
This project contains a file, test.csv, located in the projects `./assets/data` directory.  This file contains a list of vehicles
along with associated data.  The applicant must create a symfony command to load this data and generate all necessary fields 
needed to map it to the Vehicle Entity.  This will require the applicant to analyze the data and generate appropriate fields
along with a migration.

## API
Once the records have been generated a RESTful API service needs to provide these records to the frontend of the application.
The endpoint must implement a basic level of pagination which sould be **25 results per page**.

## Controller
You will need to generate a basic landing page which will serve as an entry point for the application. 

## Application
The application should implement the following design/features.  Upon loading the page will display a basic header, container,
and footer.  The header should have a user icon along with a number displaying the number of items in the users favorites list.
The container area should initially display a loading placeholder while the application is loading data from the api endpoint
created above.  Once loaded the data should be displayed in table format along with pagination at the bottom.

Each row of data should contain a `save to favorites` icon which can be clicked to add/remove the item from the
user's favorites.  The icon should change depending on whether or not it is located in the user's favorites list.
For this implementation we can just use client side local storage to maintain the list so that if the page is refreshed 
then the favorited item should still display.  The number of items should also be updated dynamically in the header when a user
updates an item in the table.

## Tooling
This project should contain everything that is needed to complete the task but you are free to add libraries and other
tools that you would like to use to complete/enhance the project provided that symfony and react are still the primary frameworks.

