import { Role } from "./role"
import { Unit } from "./unit"
import { UserCredential } from "./user-credential"

export interface User{
  id: string
  firstNameEn: string
  lastNameEn: string
  firstNameKh: string
  lastNameKh: string
  gender: string
  nationality: string
  address: string
  dob: Date
  phoneNumber: string
  unit: Unit
  role: Role
  credential?: UserCredential

}

export interface UsersParams {
  q?: string;
}