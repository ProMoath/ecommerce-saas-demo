import { Outlet } from 'react-router'
import { Navbar } from './Navbar.jsx'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-[Cairo]">
      <Navbar />
      <Outlet />
    </div>
  )
}
