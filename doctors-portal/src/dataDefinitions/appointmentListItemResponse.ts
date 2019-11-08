import IAppointmentListItem from "./appointmentListItem";

export default interface IAppointmentListItemResponse {
    result: IAppointmentListItem[];
    next_page: boolean;
    total: number;
}