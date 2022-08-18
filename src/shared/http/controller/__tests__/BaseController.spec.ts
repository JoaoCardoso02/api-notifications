import BaseController from '../BaseController'
import { BaseError } from '@shared/exceptions/BaseError'
import { NotFoundException } from '@shared/exceptions/NotFoundException'
import { HttpResponse } from '@shared/http/interfaces/IHttpResponse'

const makeSut = () => {
	class FakeBaseController extends BaseController {
		constructor() {
			super()
		}

		async execute(): Promise<HttpResponse> {
			return {
				statusCode: 204,
			}
		}
	}

	const sut = new FakeBaseController()

	return { sut }
}

describe('BaseController', () => {
	describe('Send', () => {
		it('should send data successfully', () => {
			const { sut } = makeSut()

			const data = { value: 'some data' }

			const result = sut.send(data)

			expect(result).toEqual({
				data: data,
			})
		})
	})

	describe('SendStatus', () => {
		it('should send status successfully', () => {
			const { sut } = makeSut()

			const status = 204

			const result = sut.sendStatus(status)

			expect(result).toEqual({
				status: status,
			})
		})
	})

	describe('Error', () => {
		it('should send error data successfully', () => {
			const { sut } = makeSut()

			const error = new NotFoundException('some error')

			const result = sut.error(error)

			expect(result).toEqual({
				error: {
					code: error.statusCode,
					message: {
						type: error.name,
						value: error.message,
					},
				},
			})
		})

		it('should throw a internal exception if error is not a customer error', () => {
			const { sut } = makeSut()

			const error = new Error('some error')

			const fn = () => sut.error(error as BaseError)

			expect(fn).toThrow()
		})
	})
})
