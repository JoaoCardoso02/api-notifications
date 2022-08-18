import { tokens } from '@di/tokens'
import Example from '@domain/example/entities/Example'
import { ICreateExample } from '@domain/example/types/ICreateExample'
import { MongoDBClient } from '@infrastructure/mongodb/MongoDBClient'
import { NotFoundException } from '@shared/exceptions/NotFoundException'
import { ObjectId } from 'mongodb'
import { inject, injectable } from 'tsyringe'
import { IExampleRaw } from '../types/IExampleRaw'

@injectable()
export default class ExampleRepository {
	private collectionName = 'examples'

	constructor(
		@inject(tokens.MongoDBClient)
		private client: MongoDBClient
	) {}

	async getAll(): Promise<Example[]> {
		const collection = await this.client.getCollection(this.collectionName)

		const examples = await collection.find<IExampleRaw>({}).toArray()

		return examples.map(
			(example) =>
				new Example({
					...example,
					id: example._id.toString(),
				})
		)
	}

	async getOne(id: string): Promise<Example | null> {
		const collection = await this.client.getCollection(this.collectionName)

		const example = await collection.findOne<IExampleRaw>({
			_id: new ObjectId(id),
		})

		if (!example) {
			throw new NotFoundException('Example was not found')
		}

		return new Example({
			...example,
			id: example._id.toString(),
		})
	}

	async create(example: ICreateExample): Promise<Example> {
		const collection = await this.client.getCollection(this.collectionName)

		const exampleCreated = await collection.insertOne(example)

		return (await this.getOne(exampleCreated.insertedId.toString())) as Example
	}

	async update(id: string, example: ICreateExample): Promise<Example> {
		const collection = await this.client.getCollection(this.collectionName)

		const exampleUpdated = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: example }
		)

		return (await this.getOne(exampleUpdated.upsertedId.toString())) as Example
	}

	async delete(id: string): Promise<boolean> {
		try {
			const collection = await this.client.getCollection(this.collectionName)

			await collection.deleteOne({ _id: new ObjectId(id) })

			return true
		} catch {
			return false
		}
	}
}
