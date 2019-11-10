import IOnlineConsultationListResponse from "../dataDefinitions/onlineConsultationListResponse";
import { Row } from '../components/OnlineConsultations';

export default function getOCListTableData(response: IOnlineConsultationListResponse): Row[] {

    if(response != null && response.total >= 1) {
        return response.result.map<Row>((item) => {
            return {
                name: item.user.first_name + ' ' + item.user.last_name,
                status: item.status,
                dateOfBirth: item.user.date_of_birth,
                gender: item.user.gender,
                phoneNumber: item.user.phone_number,
                consultationId: item.customer_consultation_id
            } as Row;
        });
    }
}