import { IExample } from './IExample'

export type IExampleRaw = Omit<IExample, 'id'> & { _id: string }
