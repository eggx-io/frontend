import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'

export class Project extends Schema {
  name: string
  team: ObjectId
  domain: string
  log?: defaultLog
}
