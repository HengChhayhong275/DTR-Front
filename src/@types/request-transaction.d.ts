import { Status, Unit } from "."

export interface RequestTransaction {
  id: string
  createdAt: Date
  updatedAt: Date
  transaction_status: Status
  requested_from: Unit
  requested_by: Unit
}