import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'
import { Draft } from './draft'
import { Person } from './person'

export class Team extends Schema {
  draft: ObjectId | Draft
  name: string
  members: ObjectId[] | Person[]
  mentor: ObjectId | Person
  log?: defaultLog
}
