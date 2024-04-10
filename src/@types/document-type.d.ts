export interface DocumentType {
  id: string;
  name: string;

//   for use in select and search
  [key: string]: any;
  createdAt: Date
  updatedAt: Date
  
}
