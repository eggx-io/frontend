
/** number milliseconds since epoch */
export interface dateStructure extends Number { }

export interface scheduleStructure {
  start: number
  end?: number
  repeat?: {
    basis: string,
    interval: number
  }
};

export interface defaultLog {
  createdDate: dateStructure
};

export interface ObjectId extends String { }
