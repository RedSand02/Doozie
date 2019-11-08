import { get } from "./httpClient";
import { BaseUrl } from './constants';
import IAppointmentListItemResponse from "../dataDefinitions/appointmentListItemResponse";
import UserDataManagement from "../utils/userDataManagement";

export default class AppointmentServices {

    public static async getAppointmentsList() {
        try {
            const url = BaseUrl + 'appointments';
            const accessToken = UserDataManagement.getAccessToken();
            const response = await get<IAppointmentListItemResponse>(
                url,
                {
                    "Content-Type": "application/json",
                    "Accept-Encoding": "gzip, deflate",
                    "Authorization": "Bearer " + accessToken,
                }
            );

            return response.parsedBody as IAppointmentListItemResponse;
        }
        catch (ex) {
            console.log("Exception in getting appointments list");
        }

        return null;
    }

    public static async getAppointmentsDetails(customerAppointmentId: string) {
        try {
            const url = BaseUrl + 'appointments/' + customerAppointmentId;
            const accessToken = UserDataManagement.getAccessToken();
            const response = await get<IAppointmentListItemResponse>(
                url,
                {
                    "Content-Type": "application/json",
                    "Accept-Encoding": "gzip, deflate",
                    "Authorization": "Bearer " + accessToken,
                }
            );

            return response.parsedBody as IAppointmentListItemResponse;
        }
        catch (ex) {
            console.log("Exception in getting  Appointment details");
        }

        return null;
    }
}