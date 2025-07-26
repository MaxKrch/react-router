import Header from '@/widgets/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div
      data-testid="AppLayout"
      className="min-h-[100vh] min-w-[320px] max-w-[1280px] w-[90%] m-auto bg-gray-100"
    >
      <Header />
      <Outlet />
    </div>
  )
}

export default AppLayout
