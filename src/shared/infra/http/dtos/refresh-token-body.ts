import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshTokenBody {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
