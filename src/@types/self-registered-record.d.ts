import { DocumentOriginInfo, Status, Transaction, Unit } from "."

export interface SelfRegisteredRecord{
    id: string
    documentOriginInfo: DocumentOriginInfo
    record_status: Status
    transaction: Transaction
    requested_by: Unit
}