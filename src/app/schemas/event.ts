import { defaultLog, scheduleStructure, ObjectId } from './-defaults'
import { Schema } from './-schema'

export class Event extends Schema {
  type: string
  title: string
  blurb: string
  description: string
  schedule: scheduleStructure
  location?: {
    gps?: {
      lat: number
      lon: number
    },
    url?: string
    text?: string
  }
  people: {
    author: ObjectId
    hosts: ObjectId[],
    invitees?: ObjectId[]
  }
  tags?: string[] = []
  log?: defaultLog
}
