import { UnauthorizedException } from '@shared/exceptions/UnauthorizedException'

describe('UnauthorizedException', () => {
	it('should throw an error', () => {
		const error = () => {
			throw new UnauthorizedException('fakeError')
		}
		expect(error).toThrow()
	})
})
