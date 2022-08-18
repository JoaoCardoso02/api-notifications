import Example from '@domain/example/entities/Example'

export const exampleMock = new Example({
	id: '62f18cb08ac475faddd4559e',
	age: 20,
	name: 'fake name',
})

export const exampleGotMock = {
	_id: { toString: () => '62f18cb08ac475faddd4559e' },
	age: 20,
	name: 'fake name',
}

export const exampleUpdatedMock = new Example({
	id: '62f18cb08ac475faddd4559e',
	age: 30,
	name: 'fake name to update',
})

export const exampleToUpdateMock = {
	age: 30,
	name: 'fake name to update',
}

export const exampleUpdatedRawMock = {
	upsertedId: { toString: () => '62f18cb08ac475faddd4559e' },
}

export const exampleCreatedRawMock = {
	insertedId: { toString: () => '62f18cb08ac475faddd4559e' },
}

export const exampleToCreateMock = {
	age: 30,
	name: 'fake name to update',
}
