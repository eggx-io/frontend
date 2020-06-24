import { defaultLog, ObjectId, dateStructure } from './-defaults'
import { Schema } from './-schema'
import { Person } from './person'

export interface PostSearchOptions {
  title?: string
  author?: ObjectId
  spotlight?: boolean
  log?: {
    createdDate: dateStructure
  }
}

export class Post extends Schema {
  title: string
  author: ObjectId | Person
  blurb: string
  content: string
  featuredImage: string
  spotlight: boolean
  callToAction?: string
  tags: string[]
  log?: defaultLog
}
