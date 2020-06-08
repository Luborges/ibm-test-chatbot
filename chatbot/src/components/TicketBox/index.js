import React from 'react';

import { 
    MessageContainer,
    Title,
    Text,
} from './styles';

const TicketBox = ({ ticket }) => {

    const convertDate = (unix_timestamp) => {
        const date = new window.Date();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);

        return [day, month, date.getFullYear()].join("-");
    }

    const { description, date, status} = ticket;
    return (
        <MessageContainer>
            <Title><b>Description:</b> {description}</Title>
            <Text><b>Last update:</b> {convertDate(date)}</Text>
            <Text><b>Status:</b> {status}</Text>
        </MessageContainer>
    )
}

export default TicketBox;