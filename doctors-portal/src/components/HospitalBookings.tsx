import * as React from 'react';
import { IProps } from '../scripts/common/base';

export interface IHospitalBookings extends IProps {

}

export default function HospitalBookings(props: IHospitalBookings) {
    return (
        <div>{"hospital bookings"}</div>
    );
}