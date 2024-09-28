import { Request, Response } from 'express'
import catchAsync from '../helpers/catchAsync'
import { EventModel } from '../models/eventModel'
import HttpError from '../helpers/HttpError'
import { RegisterModel } from '../models/registerModel'

export const getEvents = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = 12
  const skip = (page - 1) * limit

  const sortBy = req.query.sortBy || 'title'
  const order = req.query.order === 'desc' ? -1 : 1

  const allowedSortFields = ['title', 'eventDate', 'organizer']
  if (!allowedSortFields.includes(sortBy as string)) {
    throw HttpError(400, 'Invalid sort field')
  }

  const events = await EventModel.find()
    .sort({ [sortBy as string]: order })
    .skip(skip)
    .limit(limit)

  const totalEvents = await EventModel.countDocuments()

  const totalPages = Math.ceil(totalEvents / limit)
  res.json({
    events,
    pagination: {
      totalEvents,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  })
})

export const getEventMembers = catchAsync(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const { id } = req.params
    if (!id || id.length !== 24) {
      throw HttpError(404, 'Event not found')
    }

    const event = await EventModel.findById(id)
    if (!event) {
      throw HttpError(404, 'Event not found')
    }
    const members = await RegisterModel.find({ _id: { $in: event.membersId } })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))

    const total = await RegisterModel.countDocuments({
      _id: { $in: event.membersId },
    })

    res.json({
      members,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    })
  }
)
