import { DocumentOriginInfo, User } from "."

export interface AcceptingRecord{
    id: string
    documentOriginInfo: DocumentOriginInfo
    receiver: User
}