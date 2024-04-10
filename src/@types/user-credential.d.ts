import { User } from "./user"

export interface UserCredential {
  id: string
  email: string
  password: number
  user: User
}