import * as React from 'react';
import { IProps } from '../scripts/common/base';
import userDataManagement from '../utils/userDataManagement';
import { app } from '../utils/constants';

export interface LoginProps extends IProps {
    compiler: string;
    framework: string;
}

export default class Login extends React.Component<LoginProps, any> {

    componentDidMount() {
        if(userDataManagement.isUserLoggedIn(app)) {
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <div>OTP login</div>
        );
    }
}