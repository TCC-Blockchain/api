import { Document } from '@modules/document/entities/document';

export class DocumentViewModel {
  static toHTTP(document: Document) {
    return {
      id: document.id,
      file_name: document.file_name,
      hash_id: document.hash_id,
      owner_id: document.owner_id,
      url: document.url,
      created_at: document.created_at,
      updated_at: document.updated_at,
    };
  }
}
