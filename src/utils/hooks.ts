import { createContext, useContext, useState } from "react";

export const useLocalStorage = (keyName: string, defaultValue: any):
    [string, (newValue: any) => void] =>
{
    const [storedValue, setStoredValue]: ReactUseState<string> = useState((): string => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue),
                );
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue: any): void => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            throw err;
        }
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};

export interface AuthContextValue {
    user: string;
    isAuth: () => boolean,
    login: (data: any) => void;
    logout: () => void;
}

export const authContext = createContext<AuthContextValue>({
    user: "",
    isAuth: () => false,
    login: () => {},
    logout: () => {},
});

export const useAuth = () => {
    return useContext(authContext);
};
