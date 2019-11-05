import IToken from './token';
import IUserDetails from './userDetails';

export default interface ISubmitOtpResponse {
    new_user: string;
    token: IToken;
    user_details: IUserDetails
}