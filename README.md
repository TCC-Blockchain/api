# Doc Guard (API REPOSITORY)

Doc Guard is a white label software made to registries offices.

##### We are still developing this game, so some features are not implemented yet.

This API requires [nodejs] to run.

### 💻 Stack
Current stack of this project

- [nodejs] (Language)
- [docker] 
- [nestjs] (Framework to create the structure (Like an Spring Boot))
- [prisma] (ORM that generates migrations and the interface with the database)

### 💻 Tech
First of all, you should have a postgresql image running, I recommend using [docker]

After installing docker you have to create an image of postgres with docker, you should run this command below:

```sh
  docker run -d --name postgres-tcc -e POSTGRES_PASSWORD=123456 -p 5432:5432 postgres
```

This command will generate and start a new docker image running with the latest version of postgres. (May take a while)

If you already created an image with docker, to start you must run (if your docker has a different name replace "postgres-tcc" to your custom name):

```sh
  docker start postgres-tcc 
```

After generating the image, you should populate the environment variable inside .env file (if there is no .env file, you must create using .env.example as template)

```sh
DATABASE_URL="postgresql://postgres:123456@localhost:5432/docguard"
```

### 🔨 Dependencies

To run this project, you must install all dependecies running the command below inside the repo, then just start the project.

```sh
$ npm install
```

after installing all dependecies run this command sync all migrations to your database: 

```sh
$ npx prisma migrate deploy
```

If everything worked properly, you must be able to start the application by running:

```sh
$ npm run start:dev 
```

Then the api will start in localhost at:

```sh
localhost:3000
```


### 📚 About

Here are the group members:

* Leandro Ciric de Souza
* FILL NAMES HERE
* FILL NAMES HERE


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [nodejs]: <http://nodejs.org>
   [docker]: <https://www.docker.com/>
   [prisma]: <https://www.prisma.io/>
   [nestjs]: <https://nestjs.com/>

