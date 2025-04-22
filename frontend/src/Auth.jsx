import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Auth({ code, setCurrAccessToken }) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post('https://harmony-backend-b2cx.onrender.com/login', { code })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                window.history.pushState({}, null, '/');
            })
            .catch(err => {
                console.error("Error during login:", err);
            });
    }, [code]);

    useEffect(() => {
        if (accessToken) {
            setCurrAccessToken(accessToken); 
        }
    }, [accessToken]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!refreshToken || !expiresIn) return;
            axios.post('https://harmony-backend-b2cx.onrender.com/refresh', { refreshToken })
                .then(res => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                })
                .catch(err => {
                    console.error("Error during token refresh:", err);
                });
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return null; 
}
  
export default Auth;
