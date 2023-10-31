import { IsNotEmpty } from 'class-validator';

export class CreateDocumentBody {
  @IsNotEmpty()
  hash_id: string;

  @IsNotEmpty()
  file_name: string;

  @IsNotEmpty()
  url: string;
}
