import { BaseError } from '@shared/exceptions/BaseError'

export class NotFoundException extends BaseError {
	constructor(message: string) {
		super({ message, name: 'NotFoundException', statusCode: 404 })
	}
}
