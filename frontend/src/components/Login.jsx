import React, { useContext, useState } from 'react';
import { Context } from '../util/store';
import {Box, TextField, Button, CircularProgress, Alert} from '@mui/material';
import { login, signUp } from '../util/auth';

const Login = () => {
    const {setLocation, setUserName} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [news, setNews] = useState(false);

    const handleClickLogin = async () => {
        if(email.length === 0 || password.length === 0) {
            setError('Password and username cannot be empty.');
            setNews(false);
            return;
        }

        try {
            setLoading(true);
            await login(email, password);
            setError(false);
            setUserName(email);
            setLocation('dashboard');
        } catch (error) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleClickSignup = async () => {
        if(email.length === 0 || password.length === 0) {
            setError('Password and username cannot be empty.');
            setNews(false);
            return;
        }

        try {
            setLoading(true);
            await signUp(email, password, password);
            setError(false);
            setNews('Signed up successfully. Now you can login.');
        } catch (error) {
            setError('User already signed up');
            setNews(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box m={4} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh'
          }}>
            <Box m={2} sx={{width: '50%'}}>
                <TextField label="Username" fullWidth value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </Box>
            <Box m={2} sx={{width : '50%'}}>
                <TextField label="Password" fullWidth value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </Box>
            <Box m={3} sx={{width : '30%', display : 'flex', flexDirection : 'row'}}>
                <Button variant='contained' size='large' onClick={handleClickLogin} sx={{flex : 1, margin: 0.5}}>Login</Button>
                <Button variant='contained' size='large' onClick={handleClickSignup} sx={{flex : 1, margin: 0.5}}>Signup</Button>
            </Box>
            <Box m={2} sx={{width : '50%', flexDirection : 'column'}}>
                <Box sx={{marginBottom : 0.5, display : 'flex', justifyContent: 'center'}}>
                    {loading && <CircularProgress />}
                </Box>
                <Box>
                    {error && <Alert severity='error'>{error}</Alert>}
                    {news && <Alert severity='success'>{news}</Alert>}
                </Box>
            </Box>
        </Box>
    );
}

export default Login;