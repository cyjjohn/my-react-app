import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './App.css'

function App() {
  return (
    <Suspense fallback="Loading...">
      {/* router自动创建结构 */}
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
