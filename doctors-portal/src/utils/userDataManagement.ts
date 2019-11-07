import ISubmitOtpResponse from '../dataDefinitions/submitOtpResponse';
import { app } from './constants';

export default class UserDataManagement {

    public static storeUserInfo(userInfo: ISubmitOtpResponse) {
        if(localStorage.getItem(app) == null){
            localStorage[app] = JSON.stringify(userInfo);
        }
    }

    public static getUserInfo(): ISubmitOtpResponse {
        if(localStorage.getItem(app) == null){
            return null;
        }

        return JSON.parse(localStorage[app]) as ISubmitOtpResponse;
    }

    public static isUserLoggedIn(): boolean {
        var userDetails: ISubmitOtpResponse = this.getUserInfo();
        
        if (userDetails !== null && userDetails.token !== undefined && userDetails.token.expiry !== undefined && new Date().getTime() < new Date(userDetails.token.expiry).getTime()) {
            return true;
        }
        localStorage.removeItem(app);
        
        this.gotoLogin();
        return false;
    }

    public static getAccessToken(): string {
        if(this.isUserLoggedIn()) {
            var userDetails: ISubmitOtpResponse = this.getUserInfo();
            return userDetails.token.access_token;
        }
        return null;
    }

    public static getRefreshToken(): string {
        if(this.isUserLoggedIn()) {
            var userDetails: ISubmitOtpResponse = this.getUserInfo();
            return userDetails.token.refresh_token;
        }
        return null;
    }

    public static getUserPhoneNumber(): string {
        if(this.isUserLoggedIn()) {
            return localStorage["phoneNumber"];
        }
        return null;
    }

    public static getUserId(): string {
        if(this.isUserLoggedIn()) {
            var userDetails: ISubmitOtpResponse = this.getUserInfo();
            return userDetails.user_details.id;
        }
        return null;
    }

    public static getRoles(): string[] {
        if(this.isUserLoggedIn()) {
            var userDetails: ISubmitOtpResponse = this.getUserInfo();
            return userDetails.user_details.roles;
        }
        return null;
    }

    public static storeKeyValue(key: string, value: string) {
        localStorage[key] = value;
    }

    public static clearLocalStorage() {
        localStorage.removeItem(app);
        this.gotoLogin();
    }

    public static gotoLogin() {
        if(window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
    }
}