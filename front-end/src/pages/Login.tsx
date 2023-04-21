import { useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(AppContext);

    const url: string = process.env.REACT_APP_BACK_END_BASE_URL || '';

    const login = () => {
        axios.post('http://localhost:3001/api/v1/auth/login',
        {
            email,
            password
        }, { 
            withCredentials: true
        }).then((res) => {
            console.log(res.data.data);
            const user = res.data.data.user;
            setUser(user);
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
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
            </form>

            {JSON.stringify(user) || ''}
        </>
    );
}
