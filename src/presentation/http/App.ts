import { container } from '@di/container'
import { tokens } from '@di/tokens'
import bodyParser from 'body-parser'
import express, { Router } from 'express'
import { Routes } from './Routes'

const router = Router()
const routes = container.resolve<Routes>(tokens.Routes)
routes.setupRouter(router)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

export default app
