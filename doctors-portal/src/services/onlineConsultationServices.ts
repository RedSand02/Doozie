import { get } from "./httpClient";
import { BaseUrl } from './constants';
import IOnlineConsultationListResponse from "../dataDefinitions/onlineConsultationListResponse";
import UserDataManagement from "../utils/userDataManagement";
import IOnlineConsultationListItem from "../dataDefinitions/onlineConsultationListItem";

/**
 * As of now functions are static and we are not caching list and details.
 * Going forward maintain the list with details and serve as cache from here.
 */
export default class OnlineConsultationServices {

    public static async getOnlineConsultaionsList(statuses: string = 'confirmed') {
        try {
            const url = BaseUrl + 'online-consultations?statuses=' + statuses;
            const accessToken = UserDataManagement.getAccessToken();
            const response = await get<IOnlineConsultationListResponse>(
                url,
                {
                    "Content-Type": "application/json",
                    "Accept-Encoding": "gzip, deflate",
                    "Authorization": "Bearer " + accessToken,
                }
            );

            return response.parsedBody as IOnlineConsultationListResponse;
        }
        catch (ex) {
            console.log("Exception in getting online consultation list");
            throw ex;
        }
    }

    public static async getOnlineConsultaionDetails(customerConsultationId: string) {
        try {
            const url = BaseUrl + 'online-consultations/' + customerConsultationId;
            const accessToken = UserDataManagement.getAccessToken();
            const response = await get<IOnlineConsultationListItem>(
                url,
                {
                    "Content-Type": "application/json",
                    "Accept-Encoding": "gzip, deflate",
                    "Authorization": "Bearer " + accessToken,
                }
            );

            return response.parsedBody as IOnlineConsultationListItem;
        }
        catch (ex) {
            console.log("Exception in getting online consultation details");
            throw ex;
        }
    }
}