import { injectable, inject } from 'tsyringe'
import DocsService from '@infrastructure/docs/DocsService'
import { tokens } from '@di/tokens'

@injectable()
export default class DocsController {
	constructor(
		@inject(tokens.DocsService)
		private docsService: DocsService
	) {}

	public initDocs = this.docsService.initDocs
	public makeDocs = this.docsService.makeDocs
}
