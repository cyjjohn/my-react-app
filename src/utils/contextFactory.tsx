import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

interface IStore<T> {
  key: string
  store: T
  setStore: (payload: Partial<T>) => void
}

interface IProp {
  children: ReactNode
}

function getCtxProvider<T>(key: string, defaultStore: T, AppContext: React.Context<IStore<T>>) {
  return ({ children }: IProp) => {
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

class Cxt<T = any> {
  defaultStore: IStore<T>
  AppContext: React.Context<IStore<T>>
  Provider: ({ children }: IProp) => JSX.Element

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

export function useAppContext<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>
  const app = useContext(cxt.AppContext)
  return {
    store: app.store,
    setStore: app.setStore,
  }
}

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
