import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'

import BaseController from '@shared/http/controller/BaseController'
import ExampleAppService from '@application/example/ExampleAppService'

import { BaseError } from '@shared/exceptions/BaseError'

@injectable()
export default class GetAllExamplesController extends BaseController {
	constructor(
		@inject(tokens.ExampleAppService)
		private exampleAppService: ExampleAppService
	) {
		super()
	}

	public async execute() {
		try {
			const result = this.exampleAppService.findAll()

			return this.send(result)
		} catch (err) {
			return this.error(err as BaseError)
		}
	}
}
