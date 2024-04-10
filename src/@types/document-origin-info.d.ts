import { User } from "."
import { DocumentType } from "./document-type"

export interface DocumentOriginInfo{
    id: string
    doc_given_number: string
    created_by: User
    summary: string
    num_of_copies: number
    published_date: Date
    documentType: DocumentType
    main_doc_file: string
    referral_doc_file: string
    other: string
    createdAt: Date
}