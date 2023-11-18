/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { DocumentViewModel } from '../view-models/document-view-model';
import { UpdateDocumentBody } from '../dtos/update-document-body';
import { DeleteDocumentById } from '@modules/document/use-cases/delete-document';
import { Public } from '@shared/utils/public-decorator';
import { VerifyDocumentByHash } from '@modules/document/use-cases/verify-document-by-hash';
import { Request as ExpressRequest } from 'express';
import { GetDocumentsByOwnerEmail } from '@modules/document/use-cases/get-by-owner-email';
import { getUserFromRequest } from '@shared/utils/get-user-from-request';

@Controller('documents')
export class DocumentsController {
  constructor(
    private createDocument: CreateDocument,
    private updateDocument: UpdateDocument,
    private getDocumentsByOwnerId: GetDocumentByOwnerId,
    private getDocumentById: GetDocumentById,
    private deleteDocumentById: DeleteDocumentById,
    private verifyDocumentByHash: VerifyDocumentByHash,
    private getDocumentsByOwnerEmail: GetDocumentsByOwnerEmail,
  ) {}

  @Post()
  @Public()
  async create(
    @Body() body: CreateDocumentBody,
    @Request() request: ExpressRequest,
  ) {
    const user = await getUserFromRequest(request);

    const { file_name, hash_id, url } = body;

    const { document } = await this.createDocument.execute({
      file_name,
      hash_id,
      url,
      owner_email: user.emailAddresses[0].emailAddress,
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

  @Get('/validate/:hash')
  async validateByHash(@Param('hash') hash: string) {
    const { isValid } = await this.verifyDocumentByHash.execute({ hash });

    return {
      isValid,
    };
  }

  @Get('/owner')
  async getByCurrentOwner(@Request() request: ExpressRequest) {
    const user = await getUserFromRequest(request);

    const { documents } = await this.getDocumentsByOwnerEmail.execute({
      email: user.emailAddresses[0].emailAddress,
    });

    return {
      documents: documents.map((document) =>
        DocumentViewModel.toHTTP(document),
      ),
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
