import { Defaults } from './-defaults'
import { Schema } from './-schema'
const D = new Defaults()

export class Domain extends Schema {
  protected getThis() {
    return this;
  }
  name: string
  externalUrl: string
  log = defaultLog
}
