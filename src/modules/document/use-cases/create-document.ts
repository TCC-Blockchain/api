import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../repositories/document-repository';
import { Document } from '../entities/document';

interface CreateDocumentRequest {
  hash_id: string;
  file_name: string;
  url: string;
  owner_id: string;
}

interface CreateDocumentResponse {
  document: Document;
}

@Injectable()
export class CreateDocument {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(
    request: CreateDocumentRequest,
  ): Promise<CreateDocumentResponse> {
    const { hash_id, file_name, url, owner_id } = request;

    const document = new Document({
      hash_id,
      file_name,
      url,
      owner_id,
    });

    await this.documentsRepository.create(document);

    return {
      document,
    };
  }
}
