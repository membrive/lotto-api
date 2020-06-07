# Lotto API

Lotto API is an example REST API to create lottery players and transactions.

## Requirements

- Node.js 12.x
- MySQL 8.0.x
- Docker (if you want)

## API Docs

You can find the API Docs in the `docs` folder. You will find also a `openapi.yaml` with the OpenAPI 3.0 specification for the API.

## Development and testing in a local environment

### With Docker

You can spin up a local Docker environment with Node.js and MySQL in order to test Lotto API:

1. Run the stack: `docker-compose up -d --build`.
2. Install development dependencies inside docker: `docker exec -it lotto-api_node_1 npm install`.
3. Run the migrations: `docker exec -it lotto-api_node_1 npm run migrate`.
4. Run the tests: `docker exec -it lotto-api_node_1 npm run test`.

Now you can make requests to <http://127.0.0.1:3000>.

### Without Docker

First, start your own MySQL server and configure it. You can also use the included in Docker Compose: `docker-compose up -d mysql`.

Then, create a `.env` file with your own configuration:

```ini
MYSQL_USER=exampleUser
MYSQL_PASSWORD=examplePass
MYSQL_DATABASE=exampleDB
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
LOG_LEVEL=debug
```

Finally:

1. Install dev dependencies: `npm install`.
2. Run migrations: `npm run migrate`.
3. Run tests: `npm run test`.
4. Start the development server: `npm start`. In this case *nodemon* will automatically restart the server on code changes.

Now you can make requests to <http://127.0.0.1:3000>.

## CI/CD to a live environment

![Lotto API workflow](https://github.com/membrive/lotto-api/workflows/Lotto%20API%20workflow/badge.svg)

This project uses GitHub Actions to perform a trunk based build and deployment:

1. **test**: Run the integration tests in a MySQL testing environment. Tests results are published as *GitHub annotations* and code coverage report is published as an *artifact* in GitHub Actions.
2. **build**: Build the project Docker image from the `master` branch, and push it to Docker Hub, so everyone can download the image. It also stores the exported Docker image as an *artifact* in GitHub Actions.
3. **deploy**: Download the *artifact* image, tag it for Heroku Container Registry, and push it to Heroku.. Then the image is deployed as a Heroku Dyno, and run the migrations. At this point, the project is now up and running.

You can check the script in `.github/workflows/main.yml`.

## TBD and improvement opportunities

- Use *semver* releases at GitHub, and tag Docker images with that release version number.
- Integration tests should be done over a test environment/database. Otherwise, we should implement a mock library for *sequelize*, so we do not have to test over a real database. For this example project we will use the main configured database but this is not the right way.
- Paginate GET responses with `?page=X` and `?pageSize=Y`.
