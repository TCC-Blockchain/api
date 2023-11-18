import { Injectable } from '@nestjs/common';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/document-repository';
import { DocumentNotFound } from './errors/document-not-found';

interface GetDocumentsByOwnerEmailRequest {
  email: string;
}

interface GetDocumentsByOwnerEmailResponse {
  documents: Document[];
}

@Injectable()
export class GetDocumentsByOwnerEmail {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(
    request: GetDocumentsByOwnerEmailRequest,
  ): Promise<GetDocumentsByOwnerEmailResponse> {
    const { email } = request;

    const documents = await this.documentsRepository.findByOwnerEmail(email);

    if (!documents) {
      throw new DocumentNotFound();
    }

    return {
      documents,
    };
  }
}
