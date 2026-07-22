"use client"

// Simple authentication system for admin panel
export const AUTH_CONFIG = {
  username: "admin",
  password: "jay2024", // Change this to a secure password
}

export function login(username: string, password: string): boolean {
  if (username === AUTH_CONFIG.username && password === AUTH_CONFIG.password) {
    localStorage.setItem("isAdminLoggedIn", "true")
    localStorage.setItem("adminLoginTime", Date.now().toString())
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem("isAdminLoggedIn")
  localStorage.removeItem("adminLoginTime")
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
  const loginTime = localStorage.getItem("adminLoginTime")

  if (!isLoggedIn || !loginTime) return false

  // Session expires after 24 hours
  const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  const currentTime = Date.now()
  const timeSinceLogin = currentTime - Number.parseInt(loginTime)

  if (timeSinceLogin > sessionDuration) {
    logout()
    return false
  }

  return isLoggedIn === "true"
}
