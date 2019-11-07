import * as React from 'react';
import { IProps } from '../scripts/common/base';

export interface IOnlineConsultations extends IProps {

}

export default function OnlineConsultations(props: IOnlineConsultations) {
    return (
        <div>{"Online Consultations"}</div>
    );
}