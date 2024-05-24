import React from 'react';
import { useRouter } from 'next/router';

const WithAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const Router = useRouter();
        const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        React.useEffect(() => {
            if (!user || !token) {
                Router.push('/login');
            }else{
                Router.push('/')
            }
        }, [user, token]);

        return user && token ? <WrappedComponent {...props} /> : null;
    };
};

export default WithAuth;