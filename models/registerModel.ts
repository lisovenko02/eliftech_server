import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Event } from './eventModel'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Register {
  public _id?: Types.ObjectId

  @prop({ required: true, ref: () => 'Event' })
  public eventId!: Ref<Event>

  @prop({ required: true })
  public fullName!: string

  @prop({ required: true })
  public email!: string

  @prop({ required: true })
  public dateOfBirth!: Date

  @prop({ required: true })
  public heardFrom!: 'Social media' | 'Friends' | 'Found myself'
}

export const RegisterModel = getModelForClass(Register)
