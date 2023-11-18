/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Document } from '@modules/document/entities/document';
import { DocumentsRepository } from '@modules/document/repositories/document-repository';
import { Injectable } from '@nestjs/common';
import { PrismaDocumentMapper } from '../mappers/prisma-documents-mapper';
import { PrismaService } from '@shared/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaDocumentsRepository implements DocumentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(document: Document): Promise<void> {
    const raw = PrismaDocumentMapper.toPrisma(document);

    await this.prisma.document.create({
      data: raw,
    });
  }

  async update(document: Document): Promise<void> {
    const raw = PrismaDocumentMapper.toPrisma(document);

    //@ts-ignore
    delete raw.id;

    await this.prisma.document.update({
      data: raw,
      where: {
        id: document.id,
      },
    });
  }

  async findByOwnerEmail(id: string): Promise<Document[]> {
    const raws = await this.prisma.document.findMany({
      where: {
        owner_id: id,
      },
    });

    const documents = raws.map((document) =>
      PrismaDocumentMapper.toDomain({ raw: document }),
    );

    return documents;
  }

  async findByOwnerId(id: string): Promise<Document[]> {
    const raws = await this.prisma.document.findMany({
      where: {
        owner_id: id,
      },
    });

    const documents = raws.map((document) =>
      PrismaDocumentMapper.toDomain({ raw: document }),
    );

    return documents;
  }

  async findById(id: string): Promise<Document | null> {
    const raw = await this.prisma.document.findUnique({
      where: {
        id: id,
      },
    });

    if (!raw) {
      return null;
    }

    const documents = PrismaDocumentMapper.toDomain({ raw });

    return documents;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.document.delete({
      where: {
        id,
      },
    });
  }
}
