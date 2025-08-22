import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth , auth} = useAuth();
    const userId = auth?.id || localStorage.getItem("userItem")
     localStorage.setItem("userId", userId) 

    const refresh = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await res.json();
        setAuth(prev => ({ ...prev, accessToken: data.accessToken , id : userId}));
        return data?.data?.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
