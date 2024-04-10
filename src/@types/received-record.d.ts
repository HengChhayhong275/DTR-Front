import { DocumentOriginInfo, Unit, User } from "."

export interface ReceivedRecord{
    id: string
    documentOriginInfo: DocumentOriginInfo
    receiver: User
    sender: User
    unit: Unit
    acceptedDate: Date
}