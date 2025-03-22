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



## Journal

- First , after define what I want to build and the tools based on the requirementes, I started to create the docker compose with the windows server db
using the information taken from [here](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash)

