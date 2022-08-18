## API-FOUNDATION

There is an starter development kit for my projects, there I have everything I need to start developing with out to worry with other things than the project code.
I'd liked to use this architecture because it is simple and good divided what become more easy to implement, test and reuse code.

### Project Structure

```
.
├── jest-integration-config.js
├── jest-mongodb-config.js
├── jest-unit-config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
├── src
│   ├── jest.setup.ts
│   ├── index.ts
│   ├── application
│   ├── di
│   │   ├── container.ts
│   │   └── tokens.ts
│   ├── domain
│   │   └── **
│   │       ├── __mocks__
│   │       ├── entities
│   │       │   ├── **.ts
│   │       ├── infrastructure
│   │       │   ├── **Repository.ts
│   │       ├── services
│   │       │   ├── **Service.ts
│   │       └── types
│   ├── infrastructure
│   │   ├── docs
│   │   │   └── DocsService.ts
│   │   └── mongodb
│   │       ├── MongoDBClient.ts
│   ├── presentation
│   │   └── http
│   │       ├── controllers
│   │       │   └── **
│   │       │       └── docs
│   │       │           └── **.docs.yaml
│   │       ├── routes
│   │       └── types
│   └── shared
│       ├── exceptions
│       └── http
│           ├── adapters
│           ├── controller
│           └── interfaces
```

Here I had divided my project in this architecture, here we have on the top some layers like domain, presentation, infrastructure, and shared.
Above the domain layer I could quote some important folders like entities, infrastructure, services, and types.
My idea was for each folder was:

- Domain
    - Everything that represent something, an object, person, company, and etc;
    - It's the core of the project, the idea behind it, is how and what the project works.
- Infrastructure
    - There contains high level coulping, here I would have things like documentations services, database conections, loggers, and etc.
- Presentation
    - Everything related about the way how is presented for the client: routes, controllers, or another ways to enable the client to consume our project.
- Shared
    - How the name says, it's code shared with several layers, folders and files.
    - The things putted here, can be accessed for any file.
