import { useRef } from 'react'
import { useTodoStore } from '@/store'
import { useRequest } from 'ahooks'
import { getTodoListService } from '@/hooks/useTodoListData'

export default function Todo() {
  const { todoList, addTodo, removeTodo, setTodo } = useTodoStore()
  const inputRef = useRef<HTMLInputElement>(null)

  //获取todoList
  const { loading } = useRequest(getTodoListService, {
    onSuccess(result) {
      setTodo(result)
    },
  })

  function handleClick() {
    const elem = inputRef.current
    if (!elem) return
    addTodo(elem.value)
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <input type="text" placeholder="编辑Todo内容" ref={inputRef} />
        <button onClick={handleClick}>增加</button>
      </div>
      {loading ? (
        <div>loading</div>
      ) : (
        <ul>
          {todoList.map(item => (
            <li key={item.id}>
              {item.text} <button onClick={() => removeTodo(item.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
