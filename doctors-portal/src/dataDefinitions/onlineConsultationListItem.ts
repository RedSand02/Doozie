/**
 * IOnlineConsultationListItemUserDetails
 */
export interface IOCListItemUserDetails {
    first_name: string;
    last_name: string;
    user_id: string;
    status: string;
    date_of_birth: string;
    gender: string;
    phone_number: string;
    email_address: string;
}

/**
 * IOnlineConsultationDocument
 */
export interface IOCDocument {
    document_url: string;
    notes: string;
    file_type: string;
    deleted: string;
    attributes: string;
}

/**
 * IOnlineConsultationMessage
 */
export interface IOCMessage {
    data: string;
    timestamp: string;
    type: string;
    sender: string;
}

/**
 * IOnlineConsultationPayment
 */
export interface IOCPayment {
    type: string;
    status: string;
    method: string;
    payment_reference_id: string;
    transaction_type: string;
    currency: string;
    amount: number;
    comments: string;
    version: number;
    transaction_reference_id: string;
    recorded_date: string;
    attributes: IOCPaymentAttributes;
}

/**
 * IOnlineConsultationPaymentAttributes
 */
export interface IOCPaymentAttributes {
    amount: number;
    payment_id: string;
    receipt: string;
    id: string;
    invoice_number: string;
    order_id: string;
    short_url: string;
}

export default interface IOnlineConsultationListItem {
    user: IOCListItemUserDetails;
    doctor_notes: {};
    user_id: string;
    family_member_id: string;
    doctor_id: string;
    customer_consultation_id: string;
    status: string;
    total: number;
    requested_time: string;
    adjustments: [];
    documents: IOCDocument[];
    messages: IOCMessage[];
    payments: IOCPayment[];
}