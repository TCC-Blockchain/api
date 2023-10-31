import { randomUUID } from 'node:crypto';
import { Replace } from 'src/shared/helpers/Replace';

export interface UserProps {
  id?: string;
  name: string;
  username?: string;
  email: string;
  document: string;
  phone: string;
  coins_amount: number;
  created_at: Date;
  updated_at?: Date;
  registry_office_id?: string;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
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

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public get username(): string | undefined {
    return this.props.username;
  }

  public set username(username: string | undefined) {
    this.props.username = username;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get coins_amount(): number {
    return this.props.coins_amount;
  }

  public set coins_amount(coins_amount: number) {
    this.props.coins_amount = coins_amount;
  }

  public get document(): string {
    return this.props.document;
  }

  public set document(document: string) {
    this.props.document = document;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public set registry_office_id(registry_office_id: string) {
    this.props.registry_office_id = registry_office_id;
  }

  public get registry_office_id(): string | undefined {
    return this.props.registry_office_id;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get updated_at(): Date | undefined {
    return this.props.updated_at;
  }
}
