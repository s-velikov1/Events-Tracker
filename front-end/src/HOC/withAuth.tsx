import { ComponentType, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export const withAuth = (Component: ComponentType) => {
    return (props: any) => {
        const { user } = useContext(AppContext);
        const isAuthenticated = !!user.email;
        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);

        return <Component {...props} />
    }
};
