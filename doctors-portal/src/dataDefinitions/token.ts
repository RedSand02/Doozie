export default interface IToken {
    access_token: string;
    refresh_token: string;
    expiry: number;
    expired: boolean;
}