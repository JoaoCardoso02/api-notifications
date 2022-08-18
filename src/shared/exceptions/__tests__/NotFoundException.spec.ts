import { NotFoundException } from '@shared/exceptions/NotFoundException'

describe('NotFoundException', () => {
	it('should throw an error', () => {
		const error = () => {
			throw new NotFoundException('fakeError')
		}
		expect(error).toThrow()
	})
})
