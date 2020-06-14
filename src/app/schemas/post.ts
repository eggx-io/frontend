import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'

export class Post extends Schema {
  title: string
  author: ObjectId
  blurb: string
  content: string
  spotlight?: boolean
  callToAction?: string
  log?: defaultLog
}
