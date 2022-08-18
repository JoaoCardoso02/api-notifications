import { ForbiddenException } from '@shared/exceptions/ForbiddenException'

describe('ForbiddenException', () => {
	it('should throw an error', () => {
		const error = () => {
			throw new ForbiddenException('fakeError')
		}
		expect(error).toThrow()
	})
})
