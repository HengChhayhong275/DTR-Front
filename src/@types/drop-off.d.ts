import { DocumentOriginInfo, Unit, User } from "."

export interface DropOff {
    id: string
    documentOriginInfo: DocumentOriginInfo
    receiving_unit: Unit
    sender: User
    createdAt: Date
}