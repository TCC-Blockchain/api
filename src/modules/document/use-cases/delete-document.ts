import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../repositories/document-repository';
import { DocumentNotFound } from './errors/document-not-found';

interface DeleteDocumentByIdRequest {
  id: string;
}

@Injectable()
export class DeleteDocumentById {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(request: DeleteDocumentByIdRequest): Promise<void> {
    const { id } = request;

    const document = await this.documentsRepository.findById(id);

    if (!document) {
      throw new DocumentNotFound();
    }

    await this.documentsRepository.delete(id);
  }
}
