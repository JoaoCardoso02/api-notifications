import { BaseError } from '@shared/exceptions/BaseError'

export class ForbiddenException extends BaseError {
	constructor(message: string) {
		super({ message, name: 'ForbiddenException', statusCode: 403 })
	}
}
