import { IOCMessage } from "../dataDefinitions/onlineConsultationListItem";
import { IMessage } from "../components/Message";

export function getMessages(messages: IOCMessage[]): IMessage[] {
    let convertedMessages =  messages.map((message: IOCMessage) => {
        return {
            name: message.sender,
            text: message.data,
            timestamp: message.timestamp
        } as IMessage;
    });

    return convertedMessages;
}