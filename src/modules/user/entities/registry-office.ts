import { randomUUID } from "crypto";

export interface RegistryOfficeProps {
    id?: string;
    name: string;
    logo: string;
    description: string;
    address_id?: string;
    document: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
}

export class RegistryOffice {

    private _id: string;
    private props: RegistryOfficeProps;

    constructor(props: RegistryOfficeProps, id?: string) {
        this._id = id ?? randomUUID();
        this.props = props
    };

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

    public set description(description: string) {
        this.props.description = description;
    }

    public get description(): string {
        return this.props.description;
    }

    public set address_id(address_id: string) {
        this.props.address_id = address_id;
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
    
    public get updated_at(): Date {
        return this.props.updated_at;
    }
}