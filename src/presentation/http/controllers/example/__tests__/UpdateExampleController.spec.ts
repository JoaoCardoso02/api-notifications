import UpdateExampleController from '@presentation/http/controllers/example/UpdateExampleController'
import ExampleAppService from '@application/example/ExampleAppService'
import { exampleMock } from '@domain/example/__mocks__/Example'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeExampleAppService = () => {
	const ExampleAppServiceStub = {
		update: jest.fn(),
	} as unknown as ExampleAppService

	return ExampleAppServiceStub
}

const makeSut = () => {
	const exampleAppServiceStub = makeExampleAppService()
	const sut = new UpdateExampleController(exampleAppServiceStub)

	return {
		sut,
		exampleAppServiceStub,
	}
}

const request = {
	params: {
		id: '123',
	},
	body: {
		name: exampleMock.getName(),
		age: exampleMock.getAge(),
	},
} as unknown as IRequest

describe('UpdateExampleController', () => {
	it('should update an example successfully', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(exampleAppServiceStub, 'update')
			.mockReturnValue(exampleMock)

		const sendSut = jest.spyOn(sut, 'send')

		await sut.execute(request)

		expect(sendSut).toBeCalledWith(exampleMock)
		expect(updateSut).toBeCalledWith(Number(request.params.id), request.body)
	})

	it('should returns error if update method fails', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const updateSut = jest
			.spyOn(exampleAppServiceStub, 'update')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(updateSut).toBeCalledWith(Number(request.params.id), request.body)
	})
})
