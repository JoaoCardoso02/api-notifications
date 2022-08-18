import ExampleRepository from '@domain/example/infrastructure/ExampleRepository'
import {
	exampleCreatedRawMock,
	exampleGotMock,
	exampleMock,
	exampleToCreateMock,
	exampleToUpdateMock,
	exampleUpdatedRawMock,
} from '@domain/example/__mocks__/Example'
import { ObjectId } from 'mongodb'

const makeMongoDBClient = () => {
	const MongoDBClientStub = jest.fn().mockImplementation(() => ({
		getCollection: jest.fn().mockReturnThis(),
		find: jest.fn().mockReturnThis(),
		toArray: jest.fn().mockResolvedValue([exampleGotMock]),
		findOne: jest.fn().mockResolvedValue(exampleGotMock),
		insertOne: jest.fn().mockResolvedValue(exampleCreatedRawMock),
		updateOne: jest.fn().mockResolvedValue(exampleUpdatedRawMock),
		deleteOne: jest.fn(),
	}))

	return new MongoDBClientStub()
}

const makeSut = () => {
	const mongoDBClientStub = makeMongoDBClient()
	const sut = new ExampleRepository(mongoDBClientStub)
	return {
		sut,
		mongoDBClientStub,
	}
}

const id = '62f18cb08ac475faddd4559e'

describe('ExampleRepository', () => {
	it('should create an ExampleRepository instance successfully', () => {
		const { sut } = makeSut()

		expect(sut).toBeInstanceOf(ExampleRepository)
	})

	describe('GetAll', () => {
		it('should return an empty array if does not exist any examples', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			jest.spyOn(mongoDBClientStub, 'toArray').mockResolvedValueOnce([])

			const result = await sut.getAll()

			expect(result).toEqual([])
		})

		it('should return a list of examples', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const findSpy = jest.spyOn(mongoDBClientStub, 'find')

			const result = await sut.getAll()

			expect(findSpy).toBeCalledWith({})
			expect(result).toEqual([exampleMock])
		})

		it('should throw if find method fails', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const findSpy = jest
				.spyOn(mongoDBClientStub, 'find')
				.mockRejectedValue(new Error('some error'))

			sut.getAll()

			await expect(findSpy).rejects.toThrow()
		})
	})

	describe('GetOne', () => {
		it('should throw a NotFound exception if example does not exist', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			jest.spyOn(mongoDBClientStub, 'findOne').mockResolvedValueOnce(null)

			const result = sut.getOne(id)

			expect(result).rejects.toThrow()
		})

		it('should create an example and returns it', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const findOneSpy = jest.spyOn(mongoDBClientStub, 'findOne')

			const result = await sut.getOne(id)

			expect(findOneSpy).toBeCalledWith({ _id: new ObjectId(id) })
			expect(result).toEqual(exampleMock)
		})

		it('should throw if finOne method fails', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const findOneSpy = jest
				.spyOn(mongoDBClientStub, 'findOne')
				.mockRejectedValue(new Error('some error'))

			sut.getOne(id)

			await expect(findOneSpy).rejects.toThrow()
		})
	})

	describe('Create', () => {
		it('should create an example successfully', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const insertOneSpy = jest.spyOn(mongoDBClientStub, 'insertOne')

			const result = await sut.create(exampleToCreateMock)

			expect(insertOneSpy).toBeCalledWith(exampleToCreateMock)
			expect(result).toEqual(exampleMock)
		})

		it('should throw if create method fails', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const insertOneSpy = jest
				.spyOn(mongoDBClientStub, 'insertOne')
				.mockRejectedValue(new Error('some error'))

			sut.create(exampleToCreateMock)

			await expect(insertOneSpy).rejects.toThrow()
		})
	})

	describe('Update', () => {
		it('should update an example successfully', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const updateOneSpy = jest.spyOn(mongoDBClientStub, 'updateOne')

			const result = await sut.update(id, exampleToUpdateMock)

			expect(updateOneSpy).toBeCalledWith(
				{ _id: new ObjectId(id) },
				{ $set: exampleToUpdateMock }
			)
			expect(result).toEqual(exampleMock)
		})

		it('should throw if update method fails', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const insertOneSpy = jest
				.spyOn(mongoDBClientStub, 'insertOne')
				.mockRejectedValue(new Error('some error'))

			sut.update(id, exampleToUpdateMock)

			await expect(insertOneSpy).rejects.toThrow()
		})
	})

	describe('Delete', () => {
		it('should delete an example successfully', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			const deleteOneSpy = jest.spyOn(mongoDBClientStub, 'deleteOne')

			const result = await sut.delete(id)

			expect(deleteOneSpy).toBeCalledWith({ _id: new ObjectId(id) })
			expect(result).toEqual(true)
		})

		it('should throw if delete method fails', async () => {
			const { sut, mongoDBClientStub } = makeSut()

			jest
				.spyOn(mongoDBClientStub, 'deleteOne')
				.mockRejectedValue(new Error('some error'))

			const result = await sut.delete(id)

			expect(result).toEqual(false)
		})
	})
})
