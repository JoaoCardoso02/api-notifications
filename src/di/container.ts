import { container } from 'tsyringe'
import { tokens } from '@di/tokens'

const childContainer = container.createChildContainer()

// Global
import { Routes } from '@presentation/http/Routes'
import DocsService from '@infrastructure/docs/DocsService'
import DocsController from '@presentation/http/controllers/DocsController'
import { MongoDBClient } from '@infrastructure/mongodb/MongoDBClient'

childContainer.registerSingleton(tokens.Routes, Routes)
childContainer.registerSingleton(tokens.DocsService, DocsService)
childContainer.registerSingleton(tokens.DocsController, DocsController)
childContainer.registerSingleton(tokens.MongoDBClient, MongoDBClient)

// Example
import ExampleRepository from '@domain/example/infrastructure/ExampleRepository'
import ExampleService from '@domain/example/services/ExampleService'
import ExampleAppService from '@application/example/ExampleAppService'
import GetAllExamplesController from '@presentation/http/controllers/example/GetAllExamplesController'
import GetOneExampleController from '@presentation/http/controllers/example/GetOneExampleController'
import CreateExampleController from '@presentation/http/controllers/example/CreateExampleController'
import UpdateExampleController from '@presentation/http/controllers/example/UpdateExampleController'
import DeleteExampleController from '@presentation/http/controllers/example/DeleteExampleController'
import { ExampleRouter } from '@presentation/http/routes/ExampleRouter'

childContainer.registerSingleton(tokens.ExampleRepository, ExampleRepository)
childContainer.registerSingleton(tokens.ExampleService, ExampleService)
childContainer.registerSingleton(tokens.ExampleAppService, ExampleAppService)
childContainer.registerSingleton(
	tokens.GetAllExamplesController,
	GetAllExamplesController
)
childContainer.registerSingleton(
	tokens.GetOneExampleController,
	GetOneExampleController
)
childContainer.registerSingleton(
	tokens.CreateExampleController,
	CreateExampleController
)
childContainer.registerSingleton(
	tokens.UpdateExampleController,
	UpdateExampleController
)
childContainer.registerSingleton(
	tokens.DeleteExampleController,
	DeleteExampleController
)
childContainer.registerSingleton(tokens.ExampleRouter, ExampleRouter)

export { childContainer as container }
