/** A class representation of the BSON ObjectId type. */
interface ObjectId extends String {
}

// we can search using alternative types in mongodb e.g.
// string types can be searched using a regex in mongo
// array types can be searched using their element type
type RegExpForString<T> = T extends string ? (RegExp | T): T;
type MongoAltQuery<T> =
    T extends Array<infer U> ? (T | RegExpForString<U>):
    RegExpForString<T>;

/** https://docs.mongodb.com/manual/reference/operator/query/type/#available-types */
enum BSONType {
  Double = 1,
  String,
  Object,
  Array,
  BinData,
  /** @deprecated */
  Undefined,
  ObjectId,
  Boolean,
  Date,
  Null,
  Regex,
  /** @deprecated */
  DBPointer,
  JavaScript,
  /** @deprecated */
  Symbol,
  JavaScriptWithScope,
  Int,
  Timestamp,
  Long,
  Decimal,
  MinKey = -1,
  MaxKey = 127,
}

type BSONTypeAlias =
    | 'number'
    | 'double' | 'string' | 'object' | 'array'
    | 'binData' | 'undefined' | 'objectId' | 'bool'
    | 'date' | 'null' | 'regex' | 'dbPointer' | 'javascript'
    | 'symbol' | 'javascriptWithScope' | 'int' | 'timestamp'
    | 'long' | 'decimal' | 'minKey' | 'maxKey';

/** A class representation of the BSON Binary type. */
class Binary {
  static readonly SUBTYPE_DEFAULT: number;
  static readonly SUBTYPE_FUNCTION: number;
  static readonly SUBTYPE_BYTE_ARRAY: number;
  static readonly SUBTYPE_UUID_OLD: number;
  static readonly SUBTYPE_UUID: number;
  static readonly SUBTYPE_MD5: number;
  static readonly SUBTYPE_USER_DEFINED: number;
}

/** https://docs.mongodb.com/manual/reference/operator/query-bitwise */
type BitwiseQuery =
    | number    /** <numeric bitmask> */
    | Binary    /** <BinData bitmask> */
    | number[]; /** [ <position1>, <position2>, ... ] */

/** https://docs.mongodb.com/manual/reference/operator/query/#query-selectors */
type QuerySelector<T> = {
  // Comparison
  $eq?: T;
  $gt?: T;
  $gte?: T;
  $in?: T[];
  $lt?: T;
  $lte?: T;
  $ne?: T;
  $nin?: T[];
  // Logical
  $not?: T extends string ? (QuerySelector<T> | RegExp) : QuerySelector<T>;
  // Element
  /**
   * When `true`, `$exists` matches the documents that contain the field,
   * including documents where the field value is null.
   */
  $exists?: boolean;
  $type?: BSONType | BSONTypeAlias;
  // Evaluation
  $expr?: any;
  $jsonSchema?: any;
  $mod?: T extends number ? [number, number] : never;
  $regex?: T extends string ? (RegExp | string) : never;
  $options?: T extends string ? string : never;
  // Geospatial
  // TODO: define better types for geo queries
  $geoIntersects?: { $geometry: object };
  $geoWithin?: object;
  $near?: object;
  $nearSphere?: object;
  $maxDistance?: number;
  // Array
  // TODO: define better types for $all and $elemMatch
  $all?: T extends Array<infer U> ? any[] : never;
  $elemMatch?: T extends Array<infer U> ? object : never;
  $size?: T extends Array<infer U> ? number : never;
  // Bitwise
  $bitsAllClear?: BitwiseQuery;
  $bitsAllSet?: BitwiseQuery;
  $bitsAnyClear?: BitwiseQuery;
  $bitsAnySet?: BitwiseQuery;
};

type Condition<T> = MongoAltQuery<T> | QuerySelector<MongoAltQuery<T>>;

type RootQuerySelector<T> = {
  /** https://docs.mongodb.com/manual/reference/operator/query/and/#op._S_and */
  $and?: Array<FilterQuery<T>>;
  /** https://docs.mongodb.com/manual/reference/operator/query/nor/#op._S_nor */
  $nor?: Array<FilterQuery<T>>;
  /** https://docs.mongodb.com/manual/reference/operator/query/or/#op._S_or */
  $or?: Array<FilterQuery<T>>;
  /** https://docs.mongodb.com/manual/reference/operator/query/text */
  $text?: {
      $search: string;
      $language?: string;
      $caseSensitive?: boolean;
      $diacraticSensitive?: boolean;
  };
  /** https://docs.mongodb.com/manual/reference/operator/query/where/#op._S_where */
  $where?: string | Function;
  /** https://docs.mongodb.com/manual/reference/operator/query/comment/#op._S_comment */
  $comment?: string;
  // we could not find a proper TypeScript generic to support nested queries e.g. 'user.friends.name'
  // this will mark all unrecognized properties as any (including nested queries)
  [key: string]: any;
};

/**
   * Patched version of FilterQuery to also allow:
   * - documents, ObjectId and strings for `_id`
   * - strings for properties defined as ObjectId
   *
   * Uses `[]` tuple syntax around the `Extract` to avoid distributing on unions.
   * See: https://devblogs.microsoft.com/typescript/announcing-typescript-2-8-2/#conditional-types
   *
   * Negates the condition with `never`, because the following condition:
   *   Extract<T[P], mongodb.ObjectId> extends mongodb.ObjectId
   * Would result in `never extends mongodb.ObjectId` for non-ObjectId properties,
   * which would result in a passing conditional, because `never` is included in all types.
   */
type MongooseFilterQuery<T> = {
  [P in keyof T]?: P extends '_id'
  ? [Extract<T[P], ObjectId>] extends [never]
  ? Condition<T[P]>
  : Condition<T[P] | string | { _id: ObjectId }>
  : [Extract<T[P], ObjectId>] extends [never]
  ? Condition<T[P]>
  : Condition<T[P] | string>;
} &
  RootQuerySelector<T>;

/* Helper type to extract a definition type from a Document type */
type DocumentDefinition<T> = Omit<T, Exclude<keyof Document, '_id'>>;

/* FilterQuery alias type for using as type for filter/conditions parameters */
export type FilterQuery<T> = MongooseFilterQuery<DocumentDefinition<T>>;

export interface ModelUpdateOptions  {
  /** safe mode (defaults to value set in schema (true)) */
  safe?: boolean;
  /** whether to create the doc if it doesn't match (false) */
  upsert?: boolean;
  /** whether multiple documents should be updated (false) */
  multi?: boolean;
  /** overrides the strict option for this update */
  strict?: boolean | "throw";
  /** disables update-only mode, allowing you to overwrite the doc (false) */
  overwrite?: boolean;
  /**
   * Only update elements that match the arrayFilters conditions in the document or documents that match the query conditions.
   */
  arrayFilters?: { [key: string]: any }[];
  /** other options */
  [other: string]: any;
  /**
   *  by default, mongoose only returns the first error that occurred in casting the query.
   *  Turn on this option to aggregate all the cast errors.
   */
  multipleCastError?: boolean;
}

export interface QueryPopulateOptions {
  /** space delimited path(s) to populate */
  path: string;
  /** optional fields to select */
  select?: any;
  /** optional query conditions to match */
  match?: any;
  /** optional model to use for population */
  model?: string;
  /** optional query options like sort, limit, etc */
  options?: any;
  /** deep populate */
  populate?: QueryPopulateOptions | QueryPopulateOptions[];
}
