import { IsNotEmpty } from 'class-validator';

export class UpdateDocumentBody {
  @IsNotEmpty()
  file_name: string;

  @IsNotEmpty()
  url: string;
}
