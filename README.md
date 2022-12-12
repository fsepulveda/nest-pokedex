<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repositorio
2. Ejecutar

```
  pnpm install
```

3. Tener Nest CLI instalado

```
  npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. Clonar el arhivo **.env.template** y renombrarlo a **.env**

6. LLenar las variables de entorno en el archivo **.env**

7. Ejecutar la aplicación en modo desarrollo

```
  npm run start:dev
```

8. Insertar datos de prueba

```
GET http://localhost:3000/api/v2/seed
```

## Stack usado

- NestJS
- MongoDB

# Production Build

1. Crear el archivo **.env.prod**
2. LLenar las variables de entorno en el archivo **.env.prod**
3. Crear la nueva imagen

```
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

4. Para cambios que no requieran de una nueva imagen

```
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```
