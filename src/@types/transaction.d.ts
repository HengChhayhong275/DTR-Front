import { Status, User } from "."

export interface Transaction {
  id: string
  createdAt: Date
  updatedAt: Date
  transaction_status: Status
  method: string
  sender: User
  pin: number
  receiver?: User
}