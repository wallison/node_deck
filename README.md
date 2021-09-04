# node-deck

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

This project is a simple example how to build a LookBack App with Docker. 
The project has 3 main APIs
 (`/deck-create`, `/deck-open/{deck_id}`, `/deck-draw/{deck_id}`), that can control a deck of 52 cards.

## Requirements

You will need [Docker](https://docs.docker.com/get-docker/) to execute this project, 
install it to let Docker works for you.

## Run the application

This application is based on Docker,
 you just need to execute a docker command in the root of the project to make all things work:

```sh
docker-compose up
```

You need to wait `docker` install all the dependencies.
After finish, all containers will be up ready to response requests.

Open http://127.0.0.1:3000 in your browser.

### API page

You can test the application with an easy way just using the explorer page: 
http://localhost:3000/explorer/

There you be the specification for each route.

### You can work inside app container

If you need to change something, can access the container related to LookBack service.

```sh
docker-compose exec app bash
```

That way you can then execute commands inside the container as well.

#### Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

#### Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

#### Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

#### Tests

```sh
npm test
```
