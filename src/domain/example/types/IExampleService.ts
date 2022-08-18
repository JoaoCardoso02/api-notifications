import Example from '@domain/example/entities/Example'
import { ICreateExample } from '@domain/example/types/ICreateExample'

export interface IExampleService {
	findAll(): Example[]
	findOne(id: number): Example | null
	create(example: ICreateExample): Example
	update(id: number, example: ICreateExample): Example
	delete(id: number): boolean
}
