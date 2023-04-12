import { useState } from "react";
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});

    const url: string = process.env.REACT_APP_BACK_END_BASE_URL || '';

    const login = () => {
        axios.post('http://localhost:3001/api/v1/auth/login',
        {
            username: email,
            password
        }, { 
            withCredentials: true
        }).then((res) => {
            console.log(res.data.data);
            const user = res.data.data.user;
            setUser({
                id: user?.id,
                email: user?.email,
                password: user?.password
            })
        }).catch((err) => {
            console.log(err);
            
        })
    };

    const logout = () => {
        axios.get(`${url}/api/v1/auth/logout`, {
            withCredentials: true
        }).then((res) => {
            console.log(res);
            setUser({})
        }).catch(err => console.log('logout error: ', err))
    }

    return (
        <>
            <h1>Login page</h1>
            <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>

            {JSON.stringify(user) || ''}
        </>
    );
}
