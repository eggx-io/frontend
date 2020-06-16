import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'

export class Team extends Schema {
  draft: ObjectId
  name: string
  members: ObjectId[]
  mentor: ObjectId
  log?: defaultLog
}
