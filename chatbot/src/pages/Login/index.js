import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import { 
    Button,
    Box,
    ChangeButton,
    Container,
    Input,
    Form,
    Label,
    TextEnter,
    Title,
    Warning
} from './styles';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstLogin, setFirstLogin] = useState(false);

    useEffect(() => { 
        const token = localStorage.getItem("auth");
        if (token) {
            history.push('/Chatbot');
        }
    }, [history]);
  
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (firstLogin) {
            if (password !== confirmPassword) {
                return;
            }
            try {
                const response = await api.post('user', {
                    email,
                    password,
                });
                
                if (response) {
                    localStorage.setItem("auth", response.data.token);
                    window.location.href = '/Chatbot';
                }
            }
            catch(err) {
                alert('Houve um problema no cadastro do usuário');
                console.error(err);
            }
        }
        else{
            try {
                const response = await api.post('login', {
                    email,
                    password,
                });
                
                if (response) {
                    localStorage.setItem("auth", response.data.token);
                    window.location.href = '/Chatbot';
                }
            }
            catch(err) {
                alert('Usuário inválido');
                console.error(err);
            }
        }
    }

    return (
        <Container>
            <Box>
                <Title>
                    {
                        firstLogin ? 
                            "Welcome, let's start" : 
                            "Welcome, please log-in"
                    }
                </Title>
                <Form id='form-login' onSubmit={handleSubmit}>
                <TextEnter>
                    <Label htmlFor='email'>E-mail: </Label>
                    <Input type='email' id='email' placeholder="Your e-mail" 
                        value={email}
                        onChange={evt => setEmail(evt.target.value)} />
                </TextEnter>
                <TextEnter>
                    <Label htmlFor='password'>Password: </Label> 
                    <Input type='password' id='password' placeholder="Your password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)} />
                </TextEnter>
                {firstLogin && 
                    <>
                        <TextEnter>
                            <Label htmlFor='confirm-password'>Password: </Label> 
                            <Input type='password' id='confirm-password' placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={evt => setConfirmPassword(evt.target.value)} />
                        </TextEnter>
                        {password !== confirmPassword && <Warning>Please verify your password</Warning>}
                    </>
                }
                <TextEnter>
                    <Button id='submit-button' type='submit'>Enter</Button>
                </TextEnter>
                    {firstLogin ? 
                        <ChangeButton onClick={() => setFirstLogin(!firstLogin)}>
                            I already have an account
                        </ChangeButton> 
                        : 
                        <ChangeButton onClick={() => setFirstLogin(!firstLogin)}>
                            I don't have an account
                        </ChangeButton>
                    }
                </Form>
            </Box>
        </Container>
    )
}

export default Login;