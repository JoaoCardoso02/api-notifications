import GetOneExampleController from '@presentation/http/controllers/example/GetOneExampleController'
import ExampleAppService from '@application/example/ExampleAppService'
import { exampleMock } from '@domain/example/__mocks__/Example'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeExampleAppService = () => {
	const ExampleAppServiceStub = {
		findOne: jest.fn(),
	} as unknown as ExampleAppService

	return ExampleAppServiceStub
}

const makeSut = () => {
	const exampleAppServiceStub = makeExampleAppService()
	const sut = new GetOneExampleController(exampleAppServiceStub)

	return {
		sut,
		exampleAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
} as unknown as IRequest

describe('GetOneExampleController', () => {
	it('should get one example successfully', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(exampleAppServiceStub, 'findOne')
			.mockReturnValue(exampleMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(exampleMock)
		expect(findOneSut).toBeCalledWith(Number(request.params.id))
	})

	it('should returns error if find one method fails', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const findOneSut = jest
			.spyOn(exampleAppServiceStub, 'findOne')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(findOneSut).toBeCalledWith(Number(request.params.id))
	})
})
