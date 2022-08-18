import { InternalException } from '@shared/exceptions/InternalException'

describe('InternalException', () => {
	it('should throw an error', () => {
		const error = () => {
			throw new InternalException('fakeError')
		}
		expect(error).toThrow()
	})
})
