import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../repositories/document-repository';
import { ethers } from 'ethers';
import DocumentsContract from 'artifacts/contracts/DocumentAuthentication.sol/DocumentAuthentication.json';
import { documentAddress } from '@shared/infra/blockchain';
import { DocumentAlreadyStored } from './errors/document-already-stored';

interface VerifyDocumentByHashRequest {
  hash: string;
}

interface VerifyDocumentByHashResponse {
  isValid: boolean;
}

@Injectable()
export class VerifyDocumentByHash {
  constructor(private documentsRepository: DocumentsRepository) {}

  async execute(
    request: VerifyDocumentByHashRequest,
  ): Promise<VerifyDocumentByHashResponse> {
    const { hash } = request;

    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      documentAddress,
      DocumentsContract.abi,
      signer,
    );
    const encodedHash = Buffer.from(hash, 'hex');

    const alreadyStored = await contract.verifyHash(encodedHash);

    if (alreadyStored) {
      throw new DocumentAlreadyStored();
    }

    const isHashStored = await contract.verifyHash(encodedHash);

    return {
      isValid: isHashStored,
    };
  }
}
