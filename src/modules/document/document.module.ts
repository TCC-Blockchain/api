import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ProvidersModule } from '@providers/providers.module';
import { CreateDocument } from './use-cases/create-document';
import { UpdateDocument } from './use-cases/update-document';
import { GetDocumentByOwnerId } from './use-cases/get-by-owner-id';
import { GetDocumentById } from './use-cases/get-by-id';
import { DeleteDocumentById } from './use-cases/delete-document';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  providers: [
    CreateDocument,
    UpdateDocument,
    GetDocumentByOwnerId,
    GetDocumentById,
    DeleteDocumentById,
  ],
  exports: [
    CreateDocument,
    UpdateDocument,
    GetDocumentByOwnerId,
    GetDocumentById,
    DeleteDocumentById,
  ],
})
export class DocumentModule {}
