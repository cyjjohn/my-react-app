import { IPropChild } from '@/types/user.type'
import { createContext, useContext, useMemo, useState } from 'react'

// 自定义ctx的value内容
interface IStore<T> {
  key: string
  store: T
  setStore: (payload: Partial<T>) => void
}

/**
 * 获取provider组件
 * @param key 唯一键
 * @param defaultStore 默认value
 * @param AppContext ctx上下文对象
 * @returns Provider组件
 */
function getCtxProvider<T>(key: string, defaultStore: T, AppContext: React.Context<IStore<T>>) {
  return ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultStore)
    const value = useMemo(
      () => ({
        key,
        store,
        setStore: (payload = {}) =>
          setStore(state => ({
            ...state,
            ...payload,
          })),
      }),
      [store],
    )
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
  }
}

const cxtCache: Record<string, Cxt> = {}

// 自定义ctx
class Cxt<T = any> {
  defaultStore: IStore<T> // 默认value
  AppContext: React.Context<IStore<T>> // react提供的ctx
  Provider: ({ children }: IPropChild) => JSX.Element // Provider组件

  constructor(key: string, defaultValue: T) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    }
    this.AppContext = createContext(this.defaultStore)
    this.Provider = getCtxProvider(key, defaultValue, this.AppContext)
    cxtCache[key] = this
  }
}

// 从cache中得到store、setStore
export function useAppContext<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>
  const app = useContext(cxt.AppContext)
  return {
    store: app.store,
    setStore: app.setStore,
  }
}

// 高阶组件 包裹Provider
export function connectFactory<T>(key: string, defaultValue: T) {
  const cxt = cxtCache[key]
  let CurCxt: Cxt<T>
  if (cxt) {
    CurCxt = cxt
  } else {
    CurCxt = new Cxt<T>(key, defaultValue)
  }

  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  )
}
