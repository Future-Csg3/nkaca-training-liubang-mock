import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

import callAdminAuthApi from "../../../apis/auth/AdminAuthFunc";

const AdminLoginForm: React.FC = () => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    function handleLogin() {
        callAdminAuthApi(userId, password).then(function (response) {
            sessionStorage.setItem('x-master-key', response.data.master_key);
            navigate('/admin')
        }).catch((err) => {
            setIsError(true)
            // get error status
            console.log(err);
            
            const status = err.response.status;
            if (status === 401) {
                setErrorMessage("Authentication failed.")
                return
            }
            setErrorMessage("Api error.")
        });
    }

    return (
        <>
            <Container>
                <LoginCard>
                    <TextField error={isError} variant="standard" margin="normal" fullWidth label="user id" onChange={(e) => { setUserId(e.target.value) }} />
                    <TextField
                        error={isError}
                        variant="standard"
                        margin="normal"
                        fullWidth
                        label="password"
                        type="password"
                        helperText={errorMessage}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Login
                    </Button>
                </LoginCard>
            </Container>
        </>
    );
}

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
});

const LoginCard = styled('div')({
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});

export default AdminLoginForm;