import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../repositories/document-repository';
import { Document } from '../entities/document';
import { DocumentNotFound } from './errors/document-not-found';

interface UpdateDocumentRequest {
  file_name: string;
  url: string;
  id: string;
}

interface UpdateDocumentResponse {
  document: Document;
}

@Injectable()
export class UpdateDocument {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(
    request: UpdateDocumentRequest,
  ): Promise<UpdateDocumentResponse> {
    const { file_name, url, id } = request;

    const document = await this.documentsRepository.findById(id);

    if (!document) {
      throw new DocumentNotFound();
    }

    document.file_name = file_name;
    document.url = url;

    await this.documentsRepository.update(document);

    return {
      document,
    };
  }
}
