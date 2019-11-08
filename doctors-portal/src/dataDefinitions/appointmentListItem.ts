export default interface IAppointmentListItem {
    user: IUser;
    doctor: IDoctor;
    provider_location: IProviderLocation;
    user_id: string;
    family_member_id: string;
    doctor_id: string;
    provider_location_id: string;
    customer_appointment_id: string;
    demand_slots: IDemandSlotsEntity[];
    status: string;
    total: number;
    requested_time: string;
    adjustments: [];
    attributes: IAttributesEntity[];
    documents: [];
    feedbacks: [];
    payments: [];
    notes: [];
    additional_items: [];
    assistance_needed: boolean;
}

export interface IUser {
    first_name: string;
    last_name: string;
    user_id: string;
    status: string;
    date_of_birth: string;
    gender: string;
    phone_number: string;
    email_address: string;
}

export interface IDoctor {
    first_name: string;
    last_name: string;
    thumbnail_url: string;
    image_url: string;
    pre_salutation: any;
    post_salutation: any;
    external_id: string;
}

export interface IProviderLocation {
    name: string;
    type: string;
    description: string;
    address_line: string;
    landmark: string;
    city: string;
    postal_code: string;
    country: string;
    contact_person: string;
    email_addresses: [];
    phone_numbers: string[];
    latitude: number;
    longitude: number;
    image_url: string;
    attributes: [];
}

export interface IDemandSlotsEntity {
    start_time: string;
    end_time: string;
}

export interface IAttributesEntity {
    attribute_key: string;
    attribute_value: string;
    language: string;
}
