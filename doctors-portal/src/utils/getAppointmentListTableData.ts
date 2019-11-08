import IAppointmentListItemResponse from "../dataDefinitions/appointmentListItemResponse";
import { Row } from '../components/Appointments';

export default function getAppointmentListTableData(response: IAppointmentListItemResponse): Row[] {

    if(response != null && response.total >= 1) {
        return response.result.map<Row>((item) => {
            return {
                patientName: item.user.first_name + ' ' + item.user.last_name,
                status: item.status,
                appointmentId: item.customer_appointment_id,
                date: new Date(item.requested_time).toDateString(),
                doctorName: item.doctor.first_name + ' ' + item.doctor.last_name
            } as Row;
        });
    }
}