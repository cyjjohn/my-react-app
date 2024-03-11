import { useNavigate } from 'react-router-dom'

export const useGoTo = () => {
  const nav = useNavigate()
  const back = () => nav(-1)
  const go = (path?: string, params?: Record<string, string | number>) => {
    if (!path) {
      nav('/')
      return
    } else {
      if (!params) {
        nav(`/${path}`)
      } else {
        // /page/:id params: { id: 1 } => /page/1 match为捕获组 后续参数为捕获内容
        const url = path.replace(/\/:(\w+)/g, (_match: string, p1: string) => `/${params[p1]}`)
        nav(`/${url}`)
      }
    }
  }
  return { back, go }
}
