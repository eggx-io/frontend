export interface defaultLog {
  createdDate: number
};

export interface dateStructure extends Number { }

export interface scheduleStructure {
  start: number
  end: number
  repeat?: {
    basis: string,
    interval: number
  }
};

export interface ObjectId extends String { }
