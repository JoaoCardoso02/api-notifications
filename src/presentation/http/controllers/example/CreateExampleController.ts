import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import BaseController from '@shared/http/controller/BaseController'
import ExampleAppService from '@application/example/ExampleAppService'

import { ICreateExample } from '@domain/example/types/ICreateExample'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class CreateExampleController extends BaseController {
	constructor(
		@inject(tokens.ExampleAppService)
		private exampleAppService: ExampleAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { name, age } = request.body

			const result = this.exampleAppService.create({
				name,
				age,
			} as ICreateExample)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}
