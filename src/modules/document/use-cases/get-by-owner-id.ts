import { Injectable } from '@nestjs/common';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/document-repository';
import { DocumentNotFound } from './errors/document-not-found';

interface GetDocumentByOwnerIdRequest {
  id: string;
}

interface GetDocumentByOwnerIdResponse {
  documents: Document[];
}

@Injectable()
export class GetDocumentByOwnerId {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(
    request: GetDocumentByOwnerIdRequest,
  ): Promise<GetDocumentByOwnerIdResponse> {
    const { id } = request;

    const documents = await this.documentsRepository.findByOwnerId(id);

    if (!documents) {
      throw new DocumentNotFound();
    }

    return {
      documents,
    };
  }
}
