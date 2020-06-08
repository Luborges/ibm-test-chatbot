import styled from 'styled-components';

export const Button = styled.button`
    width: 100%;
    background-color: #00B9BC;
    color: #eee;
    font-weight: bold;
    margin-top: 10px;
    text-transform: uppercase;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

export const Box = styled.div`
    max-width: 480px;
    flex: 1;
    padding: 50px 25px 20px 25px;
    border: 1px solid #71a0c7;
    background-color: #71a0c7;
    box-shadow: 0 1.5px 0 0 rgba(0,0,0,0.1);
    text-align: center;
`;

export const ChangeButton = styled.div`
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    text-decoration: underline;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100vh;
    align-items: center;
    background: #e1e4e8;
    border-radius: 5px;
`;

export const Form = styled.form`
    justify-content: flex-start;
    padding: 10px 5px 10px 5px;
`;

export const Input = styled.input`
    flex: 3;
`;

export const Label = styled.label`
    flex: 1;
`;

export const TextEnter = styled.div`
    display: flex;
    margin: 10px;
`;

export const Title = styled.label`
    font-size:20px;
    text-align: center;
    padding: 20px 20px 0;
    margin:0;
`;

export const Warning = styled.div`
    font-size: 10px;
    color: red;
`;