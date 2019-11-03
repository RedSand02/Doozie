export default class UserDataManagement {

    public static getUserInfo() {
        return null;
    }

    public static getAuthorizationDetails(app: string) {
        return null;
    }

    public static isUserLoggedIn(app: string): boolean {
        return false;
    }

    public static getAccessToken(app: string): string {
        return '';
    }

    public static getUserPhoneNumber(app: string): string {
        return '';
    }

    public static getUserId(app: string): string {
        return '';
    }

    public static storeKeyValue(key: string, value: string) {
        localStorage[key] = value;
    }

    public static getValueForKey(key: string): string {
        return '';
    }

    public static clearLocalStorage(app: string) {
        localStorage.removeItem(app);
    }
}