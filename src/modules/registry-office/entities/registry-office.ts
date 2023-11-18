import { randomUUID } from 'crypto';
import { Address } from './address';
import { Replace } from '@helpers/Replace';

export interface RegistryOfficeProps {
  id?: string;
  name: string;
  logo: string;
  description: string;
  address_id?: string;
  address?: Address;
  document: string;
  phone: string;
  slug: string;
  created_at: Date;
  updated_at?: Date;
}

export class RegistryOffice {
  private _id: string;
  private props: RegistryOfficeProps;

  constructor(
    props: Replace<
      RegistryOfficeProps,
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

  public set logo(logo: string) {
    this.props.logo = logo;
  }

  public get logo(): string {
    return this.props.logo;
  }

  public set slug(slug: string) {
    this.props.slug = slug;
  }

  public get slug(): string {
    return this.props.slug;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public updateAddress(address: Address) {
    this.props.address_id = address.id;
    this.props.address = address;
  }

  public get address_id(): string | undefined {
    return this.props.address_id;
  }

  public set document(document: string) {
    this.props.document = document;
  }

  public get document(): string {
    return this.props.document;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public set created_at(created_at: Date) {
    this.props.created_at = created_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  public get updated_at(): Date | undefined {
    return this.props.updated_at;
  }
}
