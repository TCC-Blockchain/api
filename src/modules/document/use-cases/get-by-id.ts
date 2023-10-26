import { Injectable } from '@nestjs/common';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/document-repository';
import { DocumentNotFound } from './errors/document-not-found';

interface GetDocumentByIdRequest {
  id: string;
}

interface GetDocumentByIdResponse {
  document: Document;
}

@Injectable()
export class GetDocumentById {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(
    request: GetDocumentByIdRequest,
  ): Promise<GetDocumentByIdResponse> {
    const { id } = request;

    const document = await this.documentsRepository.findById(id);

    if (!document) {
      throw new DocumentNotFound();
    }

    return {
      document,
    };
  }
}
