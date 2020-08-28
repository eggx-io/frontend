import { defaultLog, scheduleStructure, ObjectId } from './-defaults'
import { Schema } from './-schema'
import { Person } from './person'

export interface EventSearchOptions {
  type?: ('event' | 'workshop' | 'sponsored' | string)[]
  title?: string
  schedule?: {
    start?: number
    end?: number
  }
  people?: {
    author?: ObjectId
    hosts?: ObjectId[]
    invitees?: ObjectId[]
  }
}

export class Event extends Schema {
  type: 'event' | 'workshop' | 'sponsored' | string
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
    author: ObjectId | Person
    hosts: ObjectId[] | Person[],
    invitees?: ObjectId[] | Person[]
  }
  tags?: string[] = []
  log?: defaultLog
}
