# fake-movie-db
A fake movie database with information about movies and actors as part of a technical test interview

## Requirements

- Each movie need to be asociated to one or more actors or actress.
- The serach of one movie should be found by title, genre or actor or actress name.
- The result of the seach should be represented in the same page below the input search.

## Goals

- Search Movie by titlee, actor, title or genre.
- Show results of search in /
- show Actors related in a /movie/id new component or page

## Arquitecture

- all systems will be running on docker containers

- DB - SQL-server 2022 container
- Backend - Dotnetcore
- Frontend - NextJS ( react  vite )

## Dataset

The dataset was taken from [imDb](https://developer.imdb.com/non-commercial-datasets/) and only using the title basics and name basics, based in the requirements of the assgintment and with date of 18 March 2025:  [datasets](https://datasets.imdbws.com/)

### DB

```bash
# get the latest sql server container.
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

### backend

- dotnet 9 

## Development 

### DB and API

first run the 

to run de dev ennvironment just run 
```bash
cd ./api
dotnet run
```

to set your connection string in a development instance

```bash
export ConnectionStrings__FakeMovieDB="Server=host.docker.internal;Database=FakeMovieDb;User Id=sa;Password=<yoursupersecurepassword>;Encrypt=False;TrustServerCertificate=True"

to init the db just run the following comamnds 
```bash
# could be neccesary to install the tool 
dotnet tool install --global dotnet-ef

# add the Initial Migration
dotnet ef migrations add InitialMigration
dotnet ef database update

# you could undo this action, use:
dotnet ef migrations remove
```

### Frontend

> requirements
    [Deno](https://docs.deno.com/deploy/manual/)

```
cd ./frontend
deno install
deno run dev
```

## Journal

- First , after define what I want to build and the tools based on the requirementes, I started to create the docker compose with the windows server db
using the information taken from [here](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash)

- I took this sunday to configure the API, and by my fault of practice it took me more time than I spected, in general in enterpices the db is already configured, in general.

also i had a lot of issues configuring [ODBC 17 ](https://learn.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver16&tabs=ubuntu18-install%2Cubuntu17-install%2Cdebian8-install%2Credhat7-13-install%2Crhel7-offline) and MSSQL on docker and ubuntu for development.

and after investigate how to connect the API to the MSSQL , and upload the datasets using DBbeaver I vibecode the Controller , one of my goals is simplify the next step so I added pagination, in the search call.

I a second version of this Api I want to increase performance only using documentation and hard work, but now , I need speed.

now.. its time to the last part, the frontend... 

( you could check the time of those messages doing a commit blame or with the git intelisence)

For the Frontend I choose DENO , because use Typescript by default so I forced to use it and I install sass to work more confortable with css, I know tailwind but I preffer the control a more pure css.

now! with a first aproach to the frontend its time to give life to the search component and create the results components.