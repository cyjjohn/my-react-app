import axios from '@/services/request'
import { Todo } from '@/store/todo'

//获取TodoList
interface apiData {
  id: string
  name: string
  [key: string]: unknown // 字符串索引签名
}
export async function getTodoListService(offset = 0, size = 5): Promise<Todo[]> {
  const url = `/entire/list`
  const data = await axios.get(url, {
    params: {
      offset,
      size,
    },
  })
  const list = data.list as apiData[]
  return list.map(item => ({ id: item.id, text: item.name }))
}
