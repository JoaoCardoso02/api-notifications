import { BaseError } from '@shared/exceptions/BaseError'

describe('BaseError', () => {
	it('should throw an error', () => {
		const error = () => {
			throw new BaseError({ message: 'fakeError' })
		}
		expect(error).toThrow()
	})
})
