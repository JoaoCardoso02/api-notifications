import Example from '@domain/example/entities/Example'

describe('Example', () => {
	it('should create a Example instance successfully', () => {
		const sut = new Example({
			age: 20,
			name: 'fake name',
		})

		expect(sut).toBeInstanceOf(Example)
	})

	it('should get the name and this must be the same as the one passed in the instance', () => {
		const sut = new Example({
			age: 20,
			name: 'fake name',
		})

		expect(sut.getName()).toBe('fake name')
	})

	it('should get the age and this must be the same as the one passed in the instance', () => {
		const sut = new Example({
			age: 20,
			name: 'fake name',
		})

		expect(sut.getAge()).toBe(20)
	})
})
