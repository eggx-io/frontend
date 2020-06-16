import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'

export class Tag extends Schema {
  name: string
  domain: ObjectId
  log?: defaultLog
}
