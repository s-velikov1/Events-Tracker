import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { withAuth } from "../HOC/withAuth";

export const Home = withAuth(() => {
    const { user } = useContext(AppContext);
    const url: string = process.env.REACT_APP_BACK_END_BASE_URL || '';

    const requestContacts = () => {
        axios.get('http://localhost:3001/api/v1/contacts', {
            withCredentials: true
        }).then(res => {
            console.log(res.data.contacts[0])
        });
    };

    useEffect(() => {
        requestContacts();
    }, [])

    return (
        <>
            <h1>Home page</h1>
            <h2>{ JSON.stringify(user) }</h2>
            <table>
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>Events Count</th>
                    </tr>
                </thead>

            </table>
        </>
    );
});
