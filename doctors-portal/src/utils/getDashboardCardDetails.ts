import IDashboardCardDetails from '../dataDefinitions/dashboardCardDetails';
import UserDataManagement from './userDataManagement';

const RoleToCardsMapping = {
    "super_user": "OnlineConsultations;Appointments;CallBackRequests;Tests;Scans;HospitalBookings",
    "rm": "Appointments;CallBackRequests;Tests;Scans;HospitalBookings",
    "offline_doctor": "Appointments;HospitalBookings",
    "online_doctor": "OnlineConsultations"
};

const CardDetails = {
    "OnlineConsultations": {
        name: 'Online consultations',
        description: 'view online consultations',
        color: '',
        uri: '/onlineconsulations',
        backgroundImage: '',
        accessRoles: []
    } as IDashboardCardDetails,
    "Appointments": {
        name: 'Appointments',
        description: 'view Appointments',
        color: '',
        uri: '/appointments',
        backgroundImage: '',
        accessRoles: []
    } as IDashboardCardDetails,
    "CallBackRequests": {
        name: 'Callback requests',
        description: 'view Callback requests',
        color: '',
        uri: '/callbackrequests',
        backgroundImage: '',
        accessRoles: []
    } as IDashboardCardDetails,
    "Tests": {
        name: 'Tests',
        description: 'view Tests',
        color: '',
        uri: '/tests',
        backgroundImage: '',
        accessRoles: []
    } as IDashboardCardDetails,
    "Scans": {
        name: 'Scans',
        description: 'view scans',
        color: '',
        uri: '/scans',
        backgroundImage: '',
        accessRoles: []
    } as IDashboardCardDetails,
    "HospitalBookings": {
        name: 'Hospital bookings',
        description: 'view hospital bookings',
        color: '',
        uri: '/hospitalbookings',
        backgroundImage: '',
        accessRoles: []
    } as IDashboardCardDetails
};

export const getDashboardCardDetails = () : IDashboardCardDetails[] => {
    const roles = UserDataManagement.getRoles();

    if(roles == null || roles.length <= 0) {
        return [];
    }
    
    let cardsForUserRole: IDashboardCardDetails[] = [];
    roles.forEach(role => {
        let cards = RoleToCardsMapping[role].split(';');
        cards.forEach(card => {
            if(!cardsForUserRole.includes(card)) {
                cardsForUserRole.push(CardDetails[card]);
            }
        });
    });

    return cardsForUserRole;
}