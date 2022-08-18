import Example from '@domain/example/entities/Example'
import { ICreateExample } from '@domain/example/types/ICreateExample'

export interface IExampleRepository {
	getAll(): Example[]
	getOne(id: number): Example | null
	create(example: ICreateExample): Example
	update(id: number, example: ICreateExample): Example
	delete(id: number): boolean
}
