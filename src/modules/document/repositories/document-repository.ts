import { Document } from '../entities/document';

export abstract class DocumentsRepository {
  abstract create(document: Document): Promise<void>;
  abstract update(document: Document): Promise<void>;
  abstract findByOwnerId(id: string): Promise<Document[] | null>;
  abstract findById(id: string): Promise<Document | null>;
  abstract delete(id: string): Promise<void>;
}
