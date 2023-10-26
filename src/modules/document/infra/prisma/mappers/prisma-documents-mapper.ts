import { Document } from '@modules/document/entities/document';
import { Document as RawDocument } from '@prisma/client';

export class PrismaDocumentMapper {
  static toPrisma(document: Document) {
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

  static toDomain({ raw }: { raw: RawDocument }): Document {
    return new Document(
      {
        file_name: raw.file_name,
        hash_id: raw.hash_id,
        owner_id: raw.owner_id,
        url: raw.url,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }
}
