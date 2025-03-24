# fake-movie-db
A fake movie database with information about movies and actors as part of a technical test interview

## Requirements

- Each movie need to be asociated to one or more actors or actress.
- The serach of one movie should be found by title, genre or actor or actress name.
- The result of the seach should be represented in the same page below the input search.

## Goals

- Search Movie a movie by actor, title or genre.
- Show results of seach in /
- show movies related
- show details of the movie /movie/

## Arquitecture

- all systems will be running on docker containers

- DB - SQL-server 2022 container
- Backend - Dotnetcore
- Frontend - NextJS ( react  vite )


### DB

```bash
# get the latest sql server container.
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

### backend

- dotnet 9 

## Development 

### DB

first run the 

to run de dev ennvironment just run 
```bash
cd ./api
dotnet run
```

to set your connection string in a development instance

```bash
export ConnectionStrings__FakeMovieDB="Server=host.docker.internal;Database=FakeMovieDb;User Id=sa;Password=my_super_secure_password;"
```

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

## Journal

- First , after define what I want to build and the tools based on the requirementes, I started to create the docker compose with the windows server db
using the information taken from [here](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash)

- I took this sunday to configure the API, and by my fault of practice it took me more time than I spected, in general in enterpices the db is already configured, in general.



