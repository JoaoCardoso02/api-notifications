import { tokens } from '@di/tokens'
import BaseController from '@shared/http/controller/BaseController'
import { inject, injectable } from 'tsyringe'
import { IRouter } from './IRouter'
import BaseRouter from '@shared/http/controller/BaseRouter'
import { Router } from 'express'

@injectable()
export class ExampleRouter extends BaseRouter implements IRouter {
	constructor(
		@inject(tokens.GetAllExamplesController)
		private getAllExamplesController: BaseController,

		@inject(tokens.GetOneExampleController)
		private getOneExampleController: BaseController,

		@inject(tokens.CreateExampleController)
		private createExampleController: BaseController,

		@inject(tokens.UpdateExampleController)
		private updateExampleController: BaseController,

		@inject(tokens.DeleteExampleController)
		private deleteExampleController: BaseController
	) {
		super(Router())
	}

	setup(): Router {
		this.get('/v1/examples', this.getAllExamplesController)
		this.get('/v1/examples/:id', this.getOneExampleController)
		this.post('/v1/examples', this.createExampleController)
		this.patch('/v1/examples/:id', this.updateExampleController)
		this.delete('/v1/examples/:id', this.deleteExampleController)

		return this.getRouter()
	}
}
