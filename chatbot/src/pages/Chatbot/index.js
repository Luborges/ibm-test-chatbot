import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import TicketBox from '../../components/TicketBox';

import { 
    Box,
    ButtonSend,
    Container,
    Chatbox,
    Chat,
    Input,
    Message,
    Send,
    Title,
    Logout
} from './styles';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [enter, setEnter] = useState(0);
    const [chat, setChat] = useState([]);
    const [intent, setIntent] = useState('General_Greetings');

    const messageError = () => {
        setChat([
            ...chat,
            {
                message: 'There was an error communicating with the service, please try again later',
                user: 'chatbot'
            }
        ]);
    }

    const scrollDiv = () => {
        const element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight;
    }

    const sendInitialMessage = async () => {
        try {
            const response = await api.post('message', {
                message: '',
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("auth")}`,
                },
            });
                
            if (response) {
                const responseMessages = response.data.response.map((item) => {
                    return {
                        message: item.text,
                        user: 'chatbot'
                    }
                });
                    
                setChat([
                    ...chat,
                    ...responseMessages
                ]);

                setIntent(response.data.intent);
                scrollDiv();
            }
        }
        catch(err) {
            messageError();
            console.error(err);
        }
    }

    const findTickets = async () => {
        try {
            const response = await api.get('ticket', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("auth")}`,
                },
            });
    
            if (response) {
                let responseMessages = [{
                    message: 'There are no tickets associated with your account',
                    user: 'chatbot',
                }];

                if (response.data.length > 0){
                    responseMessages  = response.data.map((item) => {
                        return {
                            message: <TicketBox ticket={item} />,
                            user: 'chatbot',
                        }
                    });
                }

                setChat([
                    ...chat,
                    ...responseMessages
                ]);
                scrollDiv();
            }
        }
        catch(err) {
            messageError();
            console.error(err);
        }
    }

    const createTicket = async () => {
        try {
            const message = input;
            setInput('');

            const response = await api.post('ticket', {
                message,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("auth")}`,
                },
            });
            
            if (response && response.data && response.data.ticket && response.data.ticket.id) {

                setIntent('General_Greetings');
                
                setChat([
                    ...chat,
                    {
                        message: 'Your ticket has being created successfully',
                        user: 'chatbot'
                    }
                ]);
                scrollDiv();
            }
        }
        catch(err) {
            messageError();
            console.error(err);
        }

        setEnter(false);
    }

    const sendMessage = async () => {
        try {
            const message = input;
            setInput('');

            const response = await api.post('message', {
                message,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("auth")}`,
                },
            });

            if (response) {
                const responseMessages = response.data.response.map((item) => {
                    return {
                        message: item.text,
                        user: 'chatbot'
                    }
                });

                setChat([
                    ...chat,
                    ...responseMessages
                ]);
                setIntent(response.data.intent);
                scrollDiv();
            }
        }
        catch(err) {
            messageError();
            console.error(err);
        }

        setEnter(false);
    }

    const handleClick = () => {
        if (input) {
            scrollDiv();
            if (intent === 'ticket_creation') {
                setChat([...chat, {
                    user: 'user',
                    message: input,
                }, {
                    user: 'chatbot',
                    message: 'We are creating your ticket',
                }]);
                setEnter(2);
            }
            else {
                setChat([...chat, {
                    user: 'user',
                    message: input,
                }]);

                setEnter(1);
            }
        }
    }

    const handleEnter = (key) => {
        if(Number(key) === 13) {
            handleClick();
        }
    }

    const logout = async () => {
        api.get('logout', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("auth")}`,
            },
        });
        
        localStorage.clear();
        window.location.href = '/';
    }

    useEffect(() => { 
        sendInitialMessage();             
    }, []);

    useEffect(() => {
        if (intent === 'ticket_search') {
            setIntent('General_Greetings');
            findTickets();
        } 
    }, [intent]);

    useEffect(() => { 
        if (enter === 1) {
            sendMessage();
        }
        else if (enter === 2) {
            createTicket();
        }
    }, [enter]);

    return (
        <Container>
            <Logout onClick={logout}>Logout</Logout>
            <Box>
                <Title>Ticket management assistant</Title>
                <Chatbox>
                    <Chat id='chat'>
                        {chat.map((item, i) => (
                            <div key={`message_${i}`}>
                                <Message right={item.user === 'user'}>
                                    {item.message}
                                </Message>
                            </div>
                        ))}
                    </Chat>
                    <Input placeholder={'Send message'} onKeyPress={evt => handleEnter(evt.which)}
                        value={input} onChange={evt => setInput(evt.target.value)} />
                    <ButtonSend onClick={() => handleClick()}>
                        <Send />
                    </ButtonSend>
                </Chatbox>
            </Box>
        </Container>
    )
}

export default Chatbot;