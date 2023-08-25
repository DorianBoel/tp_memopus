import { useCallback, useMemo, type PropsWithChildren } from "react";
import { authContext, useLocalStorage } from "../utils/hooks";
import { useNavigate } from "react-router";

const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();

    const [user, setUser] = useLocalStorage("user", "");

    const authConfig = () => {
        return Boolean(parseInt(process.env.REACT_APP_USE_AUTH));
    }

    const isAuth = useCallback((): boolean => {
        if (authConfig()) {
            return Boolean(user);
        }
        return true;
    }, [user]);

    const login = useCallback(async (data: any) => {
        setUser(data);
    }, [setUser]);

    const logout = useCallback(() => {
        setUser("");
        setTimeout(() => navigate(""), 200);
    }, [navigate, setUser]);

    const value = useMemo(() => ({
            user: authConfig() ? user : "",
            isAuth,
            login,
            logout,
        }),
        [user, isAuth, login, logout],
    );

    return (
        <authContext.Provider value={ value }>{ children }</authContext.Provider>
    );
}

export default AuthProvider;
