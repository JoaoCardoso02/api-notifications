import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import ExampleAppService from '@application/example/ExampleAppService'

import { IRequest } from '@presentation/http/types/IRequest'
import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetOneExampleController extends BaseController {
	constructor(
		@inject(tokens.ExampleAppService)
		private exampleAppService: ExampleAppService
	) {
		super()
	}

	public async execute(request: IRequest) {
		try {
			const { id } = request.params

			const result = await this.exampleAppService.findOne(Number(id))

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}
