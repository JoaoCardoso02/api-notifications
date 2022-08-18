import { IExample } from '@domain/example/types/IExample'

export default class Example {
	private id?: string
	private name!: string
	private age!: number

	constructor(data: IExample) {
		this.setId(data.id)
		this.setName(data.name)
		this.setAge(data.age)
	}

	getId() {
		return this.id
	}

	setId(id?: string) {
		this.id = id
	}

	getName() {
		return this.name
	}

	setName(name: string) {
		if (!name) throw new Error('name is invalid')

		this.name = name
	}

	getAge() {
		return this.age
	}

	setAge(age: number) {
		if (!age) throw new Error('age is invalid')

		this.age = age
	}
}
