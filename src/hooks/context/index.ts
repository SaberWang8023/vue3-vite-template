import { defineComponent, inject, provide, type DefineComponent, type InjectionKey, type PropType, type VNode } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContextType = any

export type CreateContext = DefineComponent<
  undefined,
  () => VNode | VNode[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>

export const createContext = <T extends object>(contextInjectKey: InjectionKey<T> = Symbol(), injectCompName = 'Context.Provider') => {
  const ContextProvider = defineComponent({
    name: injectCompName,
    props: {
      value: {
        type: Object as PropType<T>,
        required: true,
      },
    },
    setup(props, { slots }) {
      provide<typeof props.value>(contextInjectKey, props.value)
      return () => slots.default?.()
    },
  })

  return ContextProvider
}

export const useContext = <T>(contextInjectKey: string | InjectionKey<T> = Symbol(), defaultValue?: T): T | undefined => {
  return inject<T>(contextInjectKey) ?? defaultValue
}

// :: examples ::
//
// interface MyContextProps {
//   param1: string;
//   param2: boolean;
//   someData?: string[];
// }
//
// const [ state, ContextProvider ] = createContext<MyContextProps>({
//   param1: 'abc',
//   param2: false,
//   someData: ['a', 'b', 'c', 'd']
// });
//
// const value = useContext<MyContextProps>();
//
// console.log('value', toRaw(value));
// console.log('param1', value.param1); // 'abc'
// console.log('param2', value.param2); // false
// console.log('someData', value.someData); // ['a', 'b', 'c', 'd']
