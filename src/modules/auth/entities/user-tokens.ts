import { Replace } from '@shared/helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface UserTokenProps {
  id?: string;
  token: string;
  user_id: string;
  expires_at: Date;
  created_at: Date;
  updated_at?: Date;
}

export class UserToken {
  private _id: string;
  private props: UserTokenProps;

  constructor(
    props: Replace<UserTokenProps, { created_at?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get user_id(): string {
    return this.props.user_id;
  }

  public get token(): string {
    return this.props.token;
  }

  public get expires_at(): Date {
    return this.props.expires_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date | undefined {
    return this.props.updated_at;
  }
}
