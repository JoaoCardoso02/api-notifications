import BaseController from '@shared/http/controller/BaseController'
import { HttpResponse } from '@shared/http/interfaces/IHttpResponse'
import { Request, Response } from 'express'
import { controllerAdapter } from '../controllerAdapter'

const request = {
	body: {
		name: 'fake name',
	},
	params: {
		id: 123,
	},
	query: {
		deleted: true,
	},
	headers: {
		Authorization: 'Bearer fake authorization',
	},
} as unknown as Request

const response = {
	status: jest.fn().mockReturnThis(),
	send: jest.fn().mockReturnThis(),
} as unknown as Response

class FakeController extends BaseController {
	async execute(): Promise<HttpResponse> {
		return this.send('123')
	}
}

const makeSut = () => {
	const fakeControllerStub = new FakeController()
	const sut = controllerAdapter(fakeControllerStub)

	return {
		sut,
		fakeControllerStub,
	}
}

describe('ControllerAdapter', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should pass correct request data to controller', () => {
		const { sut, fakeControllerStub } = makeSut()

		const executeSpy = jest.spyOn(fakeControllerStub, 'execute')
		sut(request, response)

		expect(executeSpy).toBeCalledWith({
			body: {
				name: 'fake name',
			},
			params: {
				id: 123,
			},
			query: {
				deleted: true,
			},
			headers: {
				Authorization: 'Bearer fake authorization',
			},
		})
	})

	it('should send error code and error data if controller fails', async () => {
		const { sut, fakeControllerStub } = makeSut()

		jest.spyOn(fakeControllerStub, 'execute').mockResolvedValueOnce({
			error: {
				code: 404,
				message: {
					type: 'fake_message',
					value: 'fake message',
				},
			},
		})

		const statusSpy = jest.spyOn(response, 'status')
		const sendSpy = jest.spyOn(response, 'send')

		await sut(request, response)

		expect(statusSpy).toBeCalledWith(404)
		expect(sendSpy).toBeCalledWith({
			code: 404,
			message: {
				type: 'fake_message',
				value: 'fake message',
			},
		})
	})

	it('should send status code and body returned by controller', async () => {
		const { sut, fakeControllerStub } = makeSut()

		jest.spyOn(fakeControllerStub, 'execute').mockResolvedValueOnce({
			statusCode: 201,
			data: {
				id: 123,
				name: 'fake name',
			},
		})

		const statusSpy = jest.spyOn(response, 'status')
		const sendSpy = jest.spyOn(response, 'send')

		await sut(request, response)

		expect(statusSpy).toBeCalledWith(201)
		expect(sendSpy).toBeCalledWith({
			id: 123,
			name: 'fake name',
		})
	})

	it('should send status code and body if controller does not return status code', async () => {
		const { sut, fakeControllerStub } = makeSut()

		jest.spyOn(fakeControllerStub, 'execute').mockResolvedValueOnce({
			data: {
				id: 123,
				name: 'fake name',
			},
		})

		const statusSpy = jest.spyOn(response, 'status')
		const sendSpy = jest.spyOn(response, 'send')

		await sut(request, response)

		expect(statusSpy).toBeCalledWith(200)
		expect(sendSpy).toBeCalledWith({
			id: 123,
			name: 'fake name',
		})
	})
})
