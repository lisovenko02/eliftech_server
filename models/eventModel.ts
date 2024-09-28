import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Event {
  public _id?: Types.ObjectId

  @prop({ required: true })
  public title!: string

  @prop({ required: true })
  public description!: string

  @prop({ required: true })
  public eventDate!: Date

  @prop({ required: true })
  public organizer!: string

  @prop({ required: true, default: [] })
  public membersId!: string[]
}

export const EventModel = getModelForClass(Event)
