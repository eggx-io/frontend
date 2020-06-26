import { defaultLog, ObjectId } from './-defaults'
import { Schema } from './-schema'
import { Team } from './team'

export interface ProjectSearchOptions {
  name?: string
  domain?: string
  team?: ObjectId
}

export class Project extends Schema {
  name: string
  team: ObjectId | Team
  domain: string
  featuredImage: string
  log?: defaultLog
}
