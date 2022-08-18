import { BaseError } from '@shared/exceptions/BaseError'

export class UnauthorizedException extends BaseError {
	constructor(message: string) {
		super({ message, name: 'UnauthorizedException', statusCode: 401 })
	}
}
