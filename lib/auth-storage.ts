interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  user_type: "client" | "admin"
  created_at: string
}

interface StoredUser extends User {
  password: string
}

export class AuthStorage {
  private static readonly USERS_KEY = "trusthost_users"
  private static readonly CURRENT_USER_KEY = "trusthost_current_user"
  private static readonly ADMIN_EMAIL = "admin@trusthostpro.com"
  private static readonly ADMIN_PASSWORD = "Admin123!"

  static initialize() {
    // Create default admin user if it doesn't exist
    const users = this.getUsers()
    const adminExists = users.some((user) => user.email === this.ADMIN_EMAIL)

    if (!adminExists) {
      const adminUser: StoredUser = {
        id: "admin-001",
        email: this.ADMIN_EMAIL,
        password: this.ADMIN_PASSWORD,
        full_name: "Super Administrator",
        phone: "+880 1XXXXXXXXX",
        user_type: "admin",
        created_at: new Date().toISOString(),
      }

      users.push(adminUser)
      this.setUsers(users)
      console.log("🔐 Super Admin Account Created:")
      console.log(`📧 Email: ${this.ADMIN_EMAIL}`)
      console.log(`🔑 Password: ${this.ADMIN_PASSWORD}`)
    }
  }

  static getUsers(): StoredUser[] {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(this.USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  static setUsers(users: StoredUser[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
  }

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(this.CURRENT_USER_KEY)
    return user ? JSON.parse(user) : null
  }

  static setCurrentUser(user: User | null) {
    if (typeof window === "undefined") return
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY)
    }
  }

  static registerUser(email: string, password: string, userData: Partial<User>) {
    const users = this.getUsers()

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      full_name: userData.full_name || "",
      phone: userData.phone || "",
      user_type: userData.user_type || "client",
      created_at: new Date().toISOString(),
    }

    users.push(newUser)
    this.setUsers(users)

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser
    return { success: true, user: userWithoutPassword }
  }

  static loginUser(email: string, password: string) {
    const users = this.getUsers()
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  }

  static updateUser(userId: string, updates: Partial<User>) {
    const users = this.getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return { success: false, error: "User not found" }
    }

    users[userIndex] = { ...users[userIndex], ...updates }
    this.setUsers(users)

    // Update current user if it's the same user
    const currentUser = this.getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      const { password: _, ...userWithoutPassword } = users[userIndex]
      this.setCurrentUser(userWithoutPassword)
    }

    const { password: _, ...userWithoutPassword } = users[userIndex]
    return { success: true, user: userWithoutPassword }
  }
}
