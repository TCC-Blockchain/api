import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../repositories/document-repository';
import { Document } from '../entities/document';
import { ethers } from 'ethers';
import DocumentsContract from 'artifacts/contracts/DocumentAuthentication.sol/DocumentAuthentication.json';
import { documentAddress } from '@shared/infra/blockchain';
import { DocumentAlreadyStored } from './errors/document-already-stored';

interface CreateDocumentRequest {
  hash_id: string;
  file_name: string;
  url: string;
  owner_id: string;
}

interface CreateDocumentResponse {
  document: Document;
}

@Injectable()
export class CreateDocument {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(
    request: CreateDocumentRequest,
  ): Promise<CreateDocumentResponse> {
    const { hash_id, file_name, url, owner_id } = request;

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

    console.log(isHashStored, 'STORED');

    const document = new Document({
      hash_id,
      file_name,
      url,
      owner_id,
    });

    await this.documentsRepository.create(document);

    return {
      document,
    };
  }
}
