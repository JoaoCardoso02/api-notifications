import SwaggerUI from 'swagger-ui-express'
import { join } from 'path'
import { injectable } from 'tsyringe'
import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
	definition: {
		info: {
			title: 'REST API for api-foundation',
			version: '1.0.0',
		},
	},
	apis: [
		join(
			__dirname,
			'..',
			'..',
			'presentation',
			'http',
			'controllers',
			'**',
			'docs',
			'**.docs.yaml'
		),
	],
}

@injectable()
export default class DocsService {
	public initDocs = SwaggerUI.serve
	public makeDocs = SwaggerUI.setup(swaggerJSDoc(options))
}
