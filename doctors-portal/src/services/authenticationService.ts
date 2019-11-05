import { post } from "./httpClient";
import { BaseUrl } from './constants';

export interface IRequestOtpResponse {
    otp_id: string;
    expiry: number;
}

export default class AuthService {

    public static async requestOtp(phonenumber: string) {
        const url = BaseUrl + 'authentication/otp/request';
        const response = await post<IRequestOtpResponse>(
            url,
            { 
                phone_number: phonenumber,
                channel: "sms",
                language: "english"
             }
          );

        return response;
    }
}