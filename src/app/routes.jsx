import { createBrowserRouter } from 'react-router'
import { LandingPage } from './pages/LandingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { ProductsPage } from './pages/ProductsPage.jsx'
import { AddProductPage } from './pages/AddProductPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { ShopPage } from './pages/ShopPage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { NotificationsPage } from './pages/NotificationsPage.jsx'
import { VotePage } from './pages/VotePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { LocalPage } from './pages/LocalPage.jsx'
import { DashboardLayout } from './components/shared/DashboardLayout.jsx'
import { RootLayout } from './components/shared/RootLayout.jsx'
import { ProtectedDashboardRoute } from './components/shared/ProtectedDashboardRoute.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'local', element: <LocalPage /> },
      { path: 'vote/:productId', element: <VotePage /> },
      { path: 'shop/:slug', element: <ShopPage /> },
      { path: 'shop/:slug/product/:id', element: <ProductPage /> },
      {
        path: 'dashboard',
        element: <ProtectedDashboardRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'products', element: <ProductsPage /> },
              { path: 'products/new', element: <AddProductPage /> },
              { path: 'products/:id/edit', element: <AddProductPage /> },
              { path: 'orders', element: <OrdersPage /> },
              { path: 'settings', element: <SettingsPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
