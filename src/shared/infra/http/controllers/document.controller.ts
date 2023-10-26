import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CreateDocumentBody } from '../dtos/create-document-body';
import { CreateDocument } from '@modules/document/use-cases/create-document';
import { GetDocumentByOwnerId } from '@modules/document/use-cases/get-by-owner-id';
import { GetDocumentById } from '@modules/document/use-cases/get-by-id';
import { UpdateDocument } from '@modules/document/use-cases/update-document';
import { User } from '@modules/user/entities/user';
import { DocumentViewModel } from '../view-models/document-view-model';
import { UpdateDocumentBody } from '../dtos/update-document-body';
import { DeleteDocumentById } from '@modules/document/use-cases/delete-document';

@Controller('documents')
export class DocumentsController {
  constructor(
    private createDocument: CreateDocument,
    private updateDocument: UpdateDocument,
    private getDocumentsByOwnerId: GetDocumentByOwnerId,
    private getDocumentById: GetDocumentById,
    private deleteDocumentById: DeleteDocumentById,
  ) {}

  @Post()
  async create(
    @Body() body: CreateDocumentBody,
    @Request() request: { user: User },
  ) {
    const { file_name, hash_id, url } = body;

    const { document } = await this.createDocument.execute({
      file_name,
      hash_id,
      url,
      owner_id: request.user.id,
    });

    return {
      document: DocumentViewModel.toHTTP(document),
    };
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateDocumentBody) {
    const { file_name, url } = body;

    const { document } = await this.updateDocument.execute({
      file_name,
      url,
      id,
    });

    return {
      document: DocumentViewModel.toHTTP(document),
    };
  }

  @Get('/owner/:id')
  async getByOwnerId(@Param('id') id: string) {
    const { documents } = await this.getDocumentsByOwnerId.execute({ id });

    return {
      documents: documents.map((document) =>
        DocumentViewModel.toHTTP(document),
      ),
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const { document } = await this.getDocumentById.execute({ id });

    return {
      document: DocumentViewModel.toHTTP(document),
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.deleteDocumentById.execute({ id });
  }
}
