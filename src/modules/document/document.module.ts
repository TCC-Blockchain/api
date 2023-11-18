import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { CreateDocument } from './use-cases/create-document';
import { UpdateDocument } from './use-cases/update-document';
import { GetDocumentByOwnerId } from './use-cases/get-by-owner-id';
import { GetDocumentById } from './use-cases/get-by-id';
import { DeleteDocumentById } from './use-cases/delete-document';
import { VerifyDocumentByHash } from './use-cases/verify-document-by-hash';
import { GetDocumentsByOwnerEmail } from './use-cases/get-by-owner-email';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  providers: [
    CreateDocument,
    UpdateDocument,
    GetDocumentByOwnerId,
    GetDocumentById,
    DeleteDocumentById,
    VerifyDocumentByHash,
    GetDocumentsByOwnerEmail,
  ],
  exports: [
    CreateDocument,
    UpdateDocument,
    GetDocumentByOwnerId,
    GetDocumentById,
    DeleteDocumentById,
    VerifyDocumentByHash,
    GetDocumentsByOwnerEmail,
  ],
})
export class DocumentModule {}
