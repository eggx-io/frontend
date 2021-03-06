import { defaultLog, dateStructure, ObjectId } from './-defaults'
import { Schema } from './-schema'

export interface PersonSearchOptions {
  name?: string
}

export class Person extends Schema {
  email: string
  email_verified?: boolean
  avatar?: string
  profile: {
    firstName: string
    lastName: string
    address?: {
      line1: string
      line2: string
      city: string
      postal_code: string
      country: string
    }
  }
  log?: Partial<defaultLog & {
    joinedDate?: dateStructure
  }>
  pendingDeletion?: boolean
}
