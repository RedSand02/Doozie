import { post } from "./httpClient";
import { BaseUrl } from './constants';
import IRequestOtpResponse from "../dataDefinitions/requestOtpResponse";
import ISubmitOtpResponse from '../dataDefinitions/submitOtpResponse';

export default class AuthService {

    public static async requestOtp(phonenumber: string) {
        try {
            const url = BaseUrl + 'authentication/otp/request';
            const response = await post<IRequestOtpResponse>(
                url,
                {
                    "phone_number": phonenumber,
                    "channel": "sms",
                    "language": "english"
                },
                {
                    "Content-Type": "application/json",
                    "Accept-Encoding": "gzip, deflate"
                }
            );

            return response.parsedBody as IRequestOtpResponse;
        }
        catch (ex) {
            console.log("Exception in requesting OTP");
            throw ex;
        }
    }

    public static async submitOtp(otp: string, phoneNumber: string, otpId: string) {
        try {
            const url = BaseUrl + 'authentication/otp/validate';
            const response = await post<ISubmitOtpResponse>(
                url,
                {
                    "phone_number": phoneNumber,
                    "otp": otp,
                    "otp_id": otpId
                },
                {
                    "Content-Type": "application/json",
                    "Accept-Encoding": "gzip, deflate"
                }
            );

            return response.parsedBody as ISubmitOtpResponse;
        }
        catch (ex) {
            console.log("Exception in submitting OTP");
            throw ex;
        }
    }
}