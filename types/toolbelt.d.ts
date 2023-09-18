/**
 * 可选的转换为必有类型
 */
type OptionalRequired<T, K extends keyof T> = { [P in keyof T]: P extends K ? unknown : T[P] } & {
  [P in K]-?: T[P]
}
/**
 * 必选的转换为可选类型
 */
type OptionalPartial<T, K extends keyof T> = { [P in keyof T]: P extends K ? unknown : T[P] } & { [P in K]?: T[P] }

/**
 * 将对象的value提取为字面量类型
 */
type ValueOfType<T extends Record<string, string>> = T[keyof T]

/**
 * 将数组的value提取为字面量类型
 */
type ValueOfArray<T extends any[]> = T[number]

/** 打印具体的类型，用于类型体操后看不到具体类型的工具泛型 */
type LogType<T> = { [K in keyof T]: T[K] }

type Primitive = string | number | boolean | bigint | symbol | undefined | null

// eslint-disable-next-line @typescript-eslint/ban-types
type Builtin = Primitive | Function | Date | Error | RegExp

/**
 * 深度只读
 */
type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends Ref<infer U>
  ? Readonly<Ref<DeepReadonly<U>>>
  : T extends object
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>
    }
  : Readonly<T>
