import CreateExampleController from '@presentation/http/controllers/example/CreateExampleController'
import ExampleAppService from '@application/example/ExampleAppService'
import { exampleMock } from '@domain/example/__mocks__/Example'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeExampleAppService = () => {
	const ExampleAppServiceStub = {
		create: jest.fn(),
	} as unknown as ExampleAppService

	return ExampleAppServiceStub
}

const makeSut = () => {
	const exampleAppServiceStub = makeExampleAppService()
	const sut = new CreateExampleController(exampleAppServiceStub)

	return {
		sut,
		exampleAppServiceStub,
	}
}

const request = {
	body: {
		name: exampleMock.getName(),
		age: exampleMock.getAge(),
	},
} as unknown as IRequest

describe('CreateExampleController', () => {
	it('should create an example successfully', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(exampleAppServiceStub, 'create')
			.mockReturnValue(exampleMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(exampleMock)
		expect(createSut).toBeCalledWith(request.body)
	})

	it('should returns error if create method fails', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const createSut = jest
			.spyOn(exampleAppServiceStub, 'create')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(createSut).toBeCalledWith(request.body)
	})
})
