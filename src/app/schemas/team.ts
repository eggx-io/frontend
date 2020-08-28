import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'
import { Draft } from './draft'
import { Person } from './person'

export interface TeamSearchOptions {
  name: string
  /** id of the draft, not name */
  draft: ObjectId
  /** finds teams that have the specified members */
  members: ObjectId[]
  mentor: ObjectId
}

export class Team extends Schema {
  draft: ObjectId | Draft
  name: string
  members: ObjectId[] | Person[]
  mentor: ObjectId | Person
  log?: defaultLog
}
