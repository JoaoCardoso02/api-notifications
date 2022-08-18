import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Example from '@domain/example/entities/Example'
import { IExampleService } from '@domain/example/types/IExampleService'
import { ICreateExample } from '@domain/example/types/ICreateExample'

@injectable()
export default class ExampleAppService {
	constructor(
		@inject(tokens.ExampleService)
		private exampleService: IExampleService
	) {}

	findAll(): Example[] {
		return this.exampleService.findAll()
	}

	findOne(id: number): Example | null {
		return this.exampleService.findOne(id)
	}

	create(data: ICreateExample): Example {
		return this.exampleService.create(data)
	}

	update(id: number, data: ICreateExample): Example {
		return this.exampleService.update(id, data)
	}

	delete(id: number): boolean {
		return this.exampleService.delete(id)
	}
}
