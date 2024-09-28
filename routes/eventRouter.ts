import express from 'express'
import { getEventMembers, getEvents } from '../controllers/eventController'

const eventRouter = express.Router()

eventRouter.get('', getEvents)

eventRouter.get('/:id', getEventMembers)

export default eventRouter
