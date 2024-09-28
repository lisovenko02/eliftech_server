import { Request, Response } from 'express'
import catchAsync from '../helpers/catchAsync'
import HttpError from '../helpers/HttpError'
import { EventModel } from '../models/eventModel'
import { RegisterModel } from '../models/registerModel'

export const registerToEvent = catchAsync(
  async (req: Request, res: Response) => {
    const { fullName, email, dateOfBirth, heardFrom } = req.body

    const { id } = req.params
    if (!id || id.length !== 24) {
      throw HttpError(404, 'Event not found')
    }

    const event = await EventModel.findById(id)
    if (!event) {
      throw HttpError(404, 'Event not found')
    }

    const register = await RegisterModel.create({
      fullName,
      email,
      dateOfBirth,
      heardFrom,
      eventId: event._id,
    })

    if (register) {
      await EventModel.findByIdAndUpdate(id, {
        $push: { membersId: register._id },
      })
    }

    res.json({ message: `Successfully registered to ${event.title}` })
  }
)
