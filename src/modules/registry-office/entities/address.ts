import { randomUUID } from 'crypto';

export interface AddressProps {
  id?: string;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  country: string;
  postal_code: string;
}

export class Address {
  private _id: string;
  private props: AddressProps;

  constructor(props: AddressProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get street(): string {
    return this.props.street;
  }

  public set number(number: string) {
    this.props.number = number;
  }

  public get number(): string {
    return this.props.number;
  }

  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public set state(state: string) {
    this.props.state = state;
  }

  public get state(): string {
    return this.props.state;
  }

  public set country(country: string) {
    this.props.country = country;
  }

  public get country(): string {
    return this.props.country;
  }

  public set postal_code(postal_code: string) {
    this.props.postal_code = postal_code;
  }

  public get postal_code(): string {
    return this.props.postal_code;
  }
}
