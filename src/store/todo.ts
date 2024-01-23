import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

//定义Todo
export interface Todo {
  id: string
  text: string
}

//定义state
export interface TodoState {
  todoList: Todo[]
}

//定义function
interface TodoStore extends TodoState {
  setTodo: (todoList: Todo[]) => void
  addTodo: (text: string) => void
  removeTodo: (id: string) => void
}

export const useTodoStore = create(
  devtools(
    immer<TodoStore>(set => ({
      todoList: [
        { id: '1', text: '初始值1' },
        { id: '2', text: '初始值2' },
      ],
      setTodo: todo => {
        set(state => {
          state.todoList = todo
        })
      },
      addTodo: text => {
        set(state => {
          state.todoList.push({ id: new Date().getTime().toString(), text })
        })
      },
      removeTodo: id => {
        set(state => {
          const { todoList } = state
          const index = todoList.findIndex(item => item.id === id)
          todoList.splice(index, 1)
        })
      },
    })),
  ),
)
