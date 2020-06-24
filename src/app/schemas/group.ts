import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'
import { Person } from './person'

export interface GroupSearchOptions {
  name?: string
  people?: ObjectId[]
}

export class Group extends Schema {
  name: string
  people: {
    title: string,
    person: ObjectId | Person,
    tagline: string
  }[]
  log?: defaultLog
}
