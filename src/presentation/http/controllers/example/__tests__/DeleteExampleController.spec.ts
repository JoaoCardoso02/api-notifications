import DeleteExampleController from '@presentation/http/controllers/example/DeleteExampleController'
import ExampleAppService from '@application/example/ExampleAppService'
import { IRequest } from '@presentation/http/types/IRequest'
import { InternalException } from '@shared/exceptions/InternalException'

const makeExampleAppService = () => {
	const ExampleAppServiceStub = {
		delete: jest.fn(),
	} as unknown as ExampleAppService

	return ExampleAppServiceStub
}

const makeSut = () => {
	const exampleAppServiceStub = makeExampleAppService()
	const sut = new DeleteExampleController(exampleAppServiceStub)

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

describe('DeleteExampleController', () => {
	it('should delete an example successfully', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(exampleAppServiceStub, 'delete')
			.mockReturnValue(true)

		const sendStatusSut = jest.spyOn(sut, 'sendStatus')

		await sut.execute(request)

		expect(sendStatusSut).toBeCalledWith(204)
		expect(deleteSut).toBeCalledWith(Number(request.params.id))
	})

	it('should returns error if delete method fails', async () => {
		const { sut, exampleAppServiceStub } = makeSut()

		const deleteSut = jest
			.spyOn(exampleAppServiceStub, 'delete')
			.mockImplementation(() => {
				throw new InternalException('some error')
			})

		const errorSut = jest.spyOn(sut, 'error')

		await sut.execute(request)

		expect(errorSut).toBeCalledWith(new InternalException('some error'))
		expect(deleteSut).toBeCalledWith(Number(request.params.id))
	})
})
