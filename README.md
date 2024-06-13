# NestJS Application Template

This repository is a NestJS application template with essential features and best practices already implemented. It provides a solid foundation for building scalable and maintainable applications.

## Features

- **Core Module**: Includes the core functionality of the application.
- **Logger Middleware**: Middleware for logging HTTP requests and responses.
- **Data Transformation**: Inbuilt data transformation which maps responses in a data object.
- **DTO Validation**: Inbuilt validation for Data Transfer Objects (DTOs) to ensure data integrity.
- **Global Exception Handler**: Inbuilt global exception handler which handles all kinds of exception.

## Project Structure

```
📦src
 ┣ 📂common
 ┃ ┣ 📂filters
 ┃ ┃ ┣ 📜all-exception.filter.spec.ts
 ┃ ┃ ┗ 📜all-exception.filter.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┗ 📜logger.middleware.ts
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📜config-loader.module.ts
 ┃ ┃ ┣ 📜middleware-loader.module.ts
 ┃ ┃ ┣ 📜module-loader.module.ts
 ┃ ┃ ┗ 📜provider-loader.module.ts
 ┃ ┣ 📂pipes
 ┃ ┃ ┣ 📜parse-int.pipe.spec.ts
 ┃ ┃ ┣ 📜parse-int.pipe.ts
 ┃ ┃ ┣ 📜validation.pipe.spec.ts
 ┃ ┃ ┗ 📜validation.pipe.ts
 ┃ ┗ 📂services
 ┃ ┃ ┗ 📜logger.service.ts
 ┣ 📂core
 ┃ ┣ 📂interceptors
 ┃ ┃ ┣ 📜transform.interceptor.spec.ts
 ┃ ┃ ┗ 📜transform.interceptor.ts
 ┃ ┗ 📜core.module.ts
 ┣ 📂modules
 ┃ ┗ 📂index
 ┃ ┃ ┣ 📜index.controller.spec.ts
 ┃ ┃ ┣ 📜index.controller.ts
 ┃ ┃ ┣ 📜index.module.ts
 ┃ ┃ ┣ 📜index.service.spec.ts
 ┃ ┃ ┗ 📜index.service.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts
```

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ICEatm/nest-template.git
    cd nestjs-template
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the application in development mode:

```bash
npm run start:dev
# or
yarn start:dev
```

The application will be available at `http://localhost:3000`.

### Testing

Run the unit tests:
```bash
npm run test
# or
yarn test
```

### Key Modules and Components

### Common

- **Filters**
  - `all-exception.filter.ts`: Global exception filter to handle all exceptions.
- **Middlewares**
  - `logger.middleware.ts`: Middleware for logging incoming requests and responses.
- **Modules**
  - `config-loader.module.ts`: Configuration loader module.
  - `middleware-loader.module.ts`: Middleware loader module.
  - `module-loader.module.ts`: General module loader.
  - `provider-loader.module.ts`: Provider loader module.
- **Pipes**
  - `parse-int.pipe.ts`: Pipe for parsing integers.
  - `validation.pipe.ts`: Pipe for validating DTOs.
- **Services**
  - `logger.service.ts`: Logger service for handling logging logic.

### Core

- **Interceptors**
  - `transform.interceptor.ts`: Interceptor for transforming responses.
- **Core Module**
  - `core.module.ts`: Core module of the application.

### Modules

- **Index**
  - `index.controller.ts`: Controller for the index module.
  - `index.module.ts`: Module for the index.
  - `index.service.ts`: Service for the index module.

### Application Entry Point

- `app.module.ts`: The root module of the application.
- `main.ts`: The entry point of the application.

### Todo

- Add the remaining missing unit tests