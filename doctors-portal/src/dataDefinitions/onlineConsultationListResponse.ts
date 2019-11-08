import IOnlineConsultationListItem from './onlineConsultationListItem';

export default interface IOnlineConsultationListResponse {
    result: IOnlineConsultationListItem[];
    next_page: boolean;
    total: number;
}