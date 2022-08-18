import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'

import Example from '@domain/example/entities/Example'

import { ICreateExample } from '@domain/example/types/ICreateExample'
import { IExampleService } from '@domain/example/types/IExampleService'
import { IExampleRepository } from '../types/IExampleRepository'

@injectable()
export default class ExampleService implements IExampleService {
	constructor(
		@inject(tokens.ExampleRepository)
		private exampleRepository: IExampleRepository
	) {}

	findAll(): Example[] {
		return this.exampleRepository.getAll()
	}

	findOne(id: number): Example | null {
		return this.exampleRepository.getOne(id)
	}

	create(example: ICreateExample): Example {
		return this.exampleRepository.create(example)
	}

	update(id: number, example: ICreateExample): Example {
		return this.exampleRepository.update(id, example)
	}

	delete(id: number): boolean {
		return this.exampleRepository.delete(id)
	}
}
