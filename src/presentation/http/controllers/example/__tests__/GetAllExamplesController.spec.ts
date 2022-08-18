import GetAllExamplesController from '@presentation/http/controllers/example/GetAllExamplesController'
import ExampleAppService from '@application/example/ExampleAppService'
import { exampleMock } from '@domain/example/__mocks__/Example'
import { InternalException } from '@shared/exceptions/InternalException'

const makeExampleAppService = () => {
	const ExampleAppServiceStub = {
		findAll: jest.fn(),
	} as unknown as ExampleAppService

	return ExampleAppServiceStub
}

const makeSut = () => {
	const exampleAppServiceStub = makeExampleAppService()
	const sut = new GetAllExamplesController(exampleAppServiceStub)

	return {
		sut,
		exampleAppServiceStub,
	}
}

describe('GetAllExamplesController', () => {
	it('should get all examples successfully', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(exampleAppServiceStub, 'findAll')
			.mockReturnValue([exampleMock])

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute()

		expect(sendSut).toBeCalledWith([exampleMock])
		expect(findAllSut).toBeCalled()
	})

	it('should returns error if find all method fails', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const findAllSut = jest
			.spyOn(exampleAppServiceStub, 'findAll')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute()

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findAllSut).toBeCalled()
	})
})
