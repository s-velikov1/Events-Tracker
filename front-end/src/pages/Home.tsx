import axios from "axios";

export const Home = () => {
    const user = {
        "email": "stas+5@gmail.com",
        "password": "Qwe123"
    };
    const url: string = process.env.REACT_APP_BACK_END_BASE_URL || '';

    // axios.get(url)
    //     .then((res) => {
    //         console.log(res);
            
    //     }
    // );

    const handleLogin = async () => {
        await axios.post(`${url}/api/v1/auth/login`, user, { withCredentials: true })
        .then((res) => {
            console.log(res.headers);
            
        });
    };

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
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleGetPage}>Get Page info</button>
        </>
    );
}
