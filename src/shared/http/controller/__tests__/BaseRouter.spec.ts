import BaseController from '@shared/http/controller/BaseController'
import BaseRouter from '@shared/http/controller/BaseRouter'

import { HttpResponse } from '@shared/http/interfaces/IHttpResponse'
import { Router } from 'express'

class FakeController extends BaseController {
	async execute(): Promise<HttpResponse> {
		return this.send('123')
	}
}

const makeSut = () => {
	const router = {
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		patch: jest.fn(),
		delete: jest.fn(),
	} as unknown as Router
	const fakeControllerStub = new FakeController()
	const sut = new BaseRouter(router)

	return {
		sut,
		router,
		fakeControllerStub,
	}
}

describe('BaseRouter', () => {
	it('should call get method from Router', () => {
		const { sut, router, fakeControllerStub } = makeSut()

		const getSpy = jest.spyOn(router, 'get')

		sut.get('/get', fakeControllerStub)

		expect(getSpy).toBeCalled()
	})

	it('should call get method from Router', () => {
		const { sut, router, fakeControllerStub } = makeSut()

		const postSpy = jest.spyOn(router, 'post')

		sut.post('/post', fakeControllerStub)

		expect(postSpy).toBeCalled()
	})

	it('should call put method from Router', () => {
		const { sut, router, fakeControllerStub } = makeSut()

		const putSpy = jest.spyOn(router, 'put')

		sut.put('/put', fakeControllerStub)

		expect(putSpy).toBeCalled()
	})

	it('should call patch method from Router', () => {
		const { sut, router, fakeControllerStub } = makeSut()

		const patchSpy = jest.spyOn(router, 'patch')

		sut.patch('/patch', fakeControllerStub)

		expect(patchSpy).toBeCalled()
	})

	it('should call delete method from Router', () => {
		const { sut, router, fakeControllerStub } = makeSut()

		const deleteSpy = jest.spyOn(router, 'delete')

		sut.delete('/delete', fakeControllerStub)

		expect(deleteSpy).toBeCalled()
	})

	it('should return Router when call getRouter method', () => {
		const { sut, router } = makeSut()

		const result = sut.getRouter()

		expect(result).toEqual(router)
	})
})
