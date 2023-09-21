import { randomUUID } from "crypto";

export interface RegistryOfficeProps {
    id?: string;
    name: string;
    description: string;
    address_id?: string;
    document: string;
    phone: string;
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
}