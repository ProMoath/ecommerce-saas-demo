import { RouterProvider } from 'react-router'
import { router } from './routes.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div dir="rtl" className="font-[Cairo]">
            <RouterProvider router={router} />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
