import { DocumentOriginInfo, Status, Transaction, Unit } from "."

export interface OtherRegisteredRecord{
    id: string
    documentOriginInfo: DocumentOriginInfo
    record_status: Status
    transaction: Transaction
    requested_from: Unit
}