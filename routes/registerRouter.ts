import express from 'express'
import { registerToEvent } from '../controllers/registerController'

const registerRouter = express.Router()

registerRouter.post('/:id', registerToEvent)

export default registerRouter
