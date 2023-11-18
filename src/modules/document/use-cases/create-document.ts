import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../repositories/document-repository';
import { Document } from '../entities/document';
import { ethers } from 'ethers';
import DocumentsContract from 'artifacts/contracts/DocumentAuthentication.sol/DocumentAuthentication.json';
import { documentAddress } from '@shared/infra/blockchain';
import { DocumentAlreadyStored } from './errors/document-already-stored';
import { UsersRepository } from '@modules/user/repositories/users-repository';
import { UserNotFound } from '@modules/user/use-cases/errors/user-not-found';
import { StoreError } from './errors/store-error';

interface CreateDocumentRequest {
  hash_id: string;
  file_name: string;
  url: string;
  owner_email: string;
}

interface CreateDocumentResponse {
  document: Document;
}

@Injectable()
export class CreateDocument {
  constructor(
    private documentsRepository: DocumentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    request: CreateDocumentRequest,
  ): Promise<CreateDocumentResponse> {
    const { hash_id, file_name, url, owner_email } = request;

    const user = await this.usersRepository.findUserByEmail(owner_email);

    if (!user) {
      throw new UserNotFound();
    }

    const document = new Document({
      hash_id,
      file_name,
      url,
      owner_id: user.id,
    });

    await this.documentsRepository.create(document);

    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      documentAddress,
      DocumentsContract.abi,
      signer,
    );
    const encodedHash = Buffer.from(hash_id, 'hex');

    const alreadyStored = await contract.verifyHash(encodedHash);

    if (alreadyStored) {
      throw new DocumentAlreadyStored();
    }

    await contract.storeHash(`0x${hash_id}`);

    const isHashStored = await contract.verifyHash(encodedHash);

    if (!isHashStored) {
      throw new StoreError();
    }

    return {
      document,
    };
  }
}
