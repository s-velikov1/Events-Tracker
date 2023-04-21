import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import { withAuth } from "../HOC/withAuth";

export const Home = withAuth(() => {
    const { user } = useContext(AppContext);
    const url: string = process.env.REACT_APP_BACK_END_BASE_URL || '';

    const handleLogout = async () => {
        await axios.get(`${url}/api/v1/auth/logout`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                
            })
    };

    const handleGetPage = () => {
        axios.get(url+'/user', {
            withCredentials: true
        }).then(res => {
            console.log(res);
        }).catch(err => console.log('some error: ', err))
    };
    
    return (
        <>
            <h1>Home page</h1>
            <h2>{ JSON.stringify(user) }</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleGetPage}>Get Page info</button>
        </>
    );
});
