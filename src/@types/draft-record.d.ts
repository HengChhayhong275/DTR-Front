import { DocumentOriginInfo, Unit } from "."
import { RequestTransaction } from "./request-transaction"

export interface DraftRecord {
    id: string
    documentOriginInfo: DocumentOriginInfo
    owner_unit: Unit
    draft_type: string
    request_transaction: RequestTransaction
}