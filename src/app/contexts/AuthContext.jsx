import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(undefined)
const USER_KEY = 'mazhar-user'
const USERS_KEY = 'mazhar-users'

const MOCK_USER = {
  id: 'default-user',
  name: 'أحمد محمد',
  email: 'ahmed@mazhar.sa',
  storeSlug: 'mazhar-store',
  avatar: '',
  logo: '',
  banner: '',
  phone: '0501234567',
  bio: 'متجر ملابس ذكي يوفر تجربة تسوق احترافية مع أدوات عرض ذكية.',
}

const loadUsers = () => {
  const stored = localStorage.getItem(USERS_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const loadCurrentUser = () => {
  const stored = localStorage.getItem(USER_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

const saveCurrentUser = (user) => {
  if (!user) {
    localStorage.removeItem(USER_KEY)
    return
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

const getSharedDefaults = () => {
  const users = loadUsers()
  const current = loadCurrentUser()
  if (current) return current
  if (users.length > 0) return users[0]
  return MOCK_USER
}

const persistCurrentUser = (user, setUser) => {
  if (!user) {
    setUser(null)
    saveCurrentUser(null)
    return
  }

  setUser(user)
  saveCurrentUser(user)

  const users = loadUsers().filter(u => u.id !== user.id)
  saveUsers([...users, user])
}

const applyUpdatesToAllUsers = (updates) => {
  const users = loadUsers()
  const updated = users.map(u => ({ ...u, ...updates }))
  saveUsers(updated)
  return updated
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)
  
  const login = async (email, _password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)

    if (!email) return false

    const users = loadUsers()
    const existing = users.find(u => u.email === email)
    if (existing) {
      persistCurrentUser(existing, setUser)
      return true
    }

    return false
  }

  const register = async (name, email, _password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)

    const users = loadUsers()
    const duplicate = users.some(u => u.email === email)
    if (duplicate) return false

    const shared = getSharedDefaults()
    const id = Date.now().toString()
    const newUser = {
      ...MOCK_USER,
      ...shared,
      id,
      name,
      email,
    }

    persistCurrentUser(newUser, setUser)
    return true
  }

  const updateProfile = async (updates) => {
    if (!user) return false

    const next = { ...user, ...updates }
    saveCurrentUser(next)
    applyUpdatesToAllUsers(updates)
    persistCurrentUser(next, setUser)
    return true
  }

  const logout = () => {
    persistCurrentUser(null, setUser)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
