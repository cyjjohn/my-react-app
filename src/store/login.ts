import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

//定义state
export interface LoginState {
  isSubmitting: boolean
  error: string
  username: string
  password: string
  remember: boolean
}

//定义function
interface LoginStore extends LoginState {
  setIsSubmitting: (isSubmitting: boolean) => void
  setError: (error: string) => void
  setUsername: (username: string) => void
  setPassword: (password: string) => void
  setRemember: (remember: boolean) => void
  setLoginState: (state: Partial<LoginState>) => void
}

export const useLoginStore = create(
  immer<LoginStore>(set => ({
    isSubmitting: false,
    error: '',
    username: '',
    password: '',
    remember: false,
    setIsSubmitting: isSubmitting => set({ isSubmitting }),
    setError: error => set({ error }),
    setUsername: username => set({ username }),
    setPassword: password => set({ password }),
    setRemember: remember => set({ remember }),
    setLoginState: state => set(state), // 批量设置状态
  })),
)
