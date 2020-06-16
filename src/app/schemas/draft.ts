import { defaultLog, dateStructure } from './-defaults'
import { Schema } from './-schema'

export class Draft extends Schema {
  number: number
  name: string
  start: dateStructure
  end: dateStructure
  log?: defaultLog
}
