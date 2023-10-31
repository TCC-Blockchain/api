import { randomUUID } from 'node:crypto';
import { Replace } from 'src/shared/helpers/Replace';

export interface DocumentProps {
  id?: string;
  hash_id: string;
  file_name: string;
  url: string;
  owner_id: string;
  created_at: Date;
  updated_at?: Date;
}

export class Document {
  private _id: string;
  private props: DocumentProps;

  constructor(
    props: Replace<
      DocumentProps,
      {
        created_at?: Date;
      }
    >,
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

  public get hash_id(): string {
    return this.props.hash_id;
  }

  public set hash_id(hash_id: string) {
    this.props.hash_id = hash_id;
  }

  public get url(): string {
    return this.props.url;
  }

  public set url(url: string) {
    this.props.url = url;
  }

  public get file_name(): string {
    return this.props.file_name;
  }

  public set file_name(file_name: string) {
    this.props.file_name = file_name;
  }

  public set owner_id(owner_id: string) {
    this.props.owner_id = owner_id;
  }

  public get owner_id(): string {
    return this.props.owner_id;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date | undefined {
    return this.props.updated_at;
  }
}
