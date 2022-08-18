import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import ExampleAppService from '@application/example/ExampleAppService'

import { ICreateExample } from '@domain/example/types/ICreateExample'
import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class UpdateExampleController extends BaseController {
	constructor(
		@inject(tokens.ExampleAppService)
		private exampleAppService: ExampleAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params
			const { name, age } = request.body

			const result = await this.exampleAppService.update(Number(id), {
				name,
				age,
			} as ICreateExample)

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}
