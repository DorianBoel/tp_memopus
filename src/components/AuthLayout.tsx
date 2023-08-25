import { useLayoutEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import { useAuth } from "../utils/hooks";

const AuthLayout = () => {
    const outlet = useOutlet();

    const navigate = useNavigate();

    const auth = useAuth();

    useLayoutEffect(() => {
        if (!auth.isAuth()) {
            navigate("/login");
        }
    });

    return (
        <>
            { outlet }
        </>
    );
};

export default AuthLayout;
