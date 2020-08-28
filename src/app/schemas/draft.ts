import { defaultLog, dateStructure } from './-defaults'
import { Schema } from './-schema'

export class DraftSearchOptions {
  name: string
  /** positive numbers = draft starts after `start`,
   * negative numbers = draft starts before `start` */
  start: number
  /** positive numbers = draft ends after `end`,
   * negative numbers = draft ends before `end` */
  end: number
}

export class Draft extends Schema {
  number: number
  name: string
  start: dateStructure
  end: dateStructure
  log?: defaultLog
}
