import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useFetcher, type FetcherWithComponents } from "react-router-dom";
import { type UserInterface } from "../model/User";
import { useAuth } from "../utils/hooks";

const LoginView = () => {
    const navigate = useNavigate();

    const auth = useAuth();

    const fetcher: FetcherWithComponents<Partial<UserInterface> | false> = useFetcher();

    const [loginFailed, setLoginFailed] = useState(false);

    const [usernameInvalid, setUsernameInvalid] = useState(false);

    const loginFormRef = useRef<HTMLFormElement>() as MutableRefObject<HTMLFormElement>;

    const usernameRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

    const usernameFeedbackRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

    const resetValidation = () => {
        setLoginFailed(false);
        setUsernameInvalid(false);
        usernameFeedbackRef.current.innerHTML = "";
    };

    const handleSubmit = async (evt: React.FormEvent<HTMLElement>) => {
        evt.preventDefault();
        resetValidation();
        await new Promise<void>((resolve) => setTimeout(resolve, 500));
        const validationErrors: [string, () => void][] = [];
        if (!usernameRef.current.value.trim().length) {
            validationErrors.push([
                "Nom d'utilisateur requis",
                () => setUsernameInvalid(true),
            ]);
        }
        if (validationErrors.length) {
            usernameFeedbackRef.current.innerHTML = validationErrors
                .map((valid) => `<span>${valid[0]}</span>`)
                .join("");
            validationErrors.forEach((valid) => {
                valid[1]();
            });
            return;
        }
        const formData = new FormData(loginFormRef.current);
        fetcher.submit(formData, {
            method: "POST",
            action: "/login/action",
        });
    };

    useEffect(() => {
        if (auth.isAuth()) {
            setTimeout(() => navigate("/"), 50);
            return;
        }
        if (fetcher.data === false) {
            setLoginFailed(true);
        } else if (fetcher.data) {
            auth.login(fetcher.data.id);
            setTimeout(() => navigate("/"), 50);
        }
    }, [auth, fetcher, navigate]);

    return (
        <Card className="col-10 col-md-7 m-auto">
            <Card.Header>
                <Card.Title>
                    Connexion
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form ref={ loginFormRef } onSubmit={ handleSubmit }>
                    <Form.Group className="mb-2" controlId="username">
                        <Form.Label>
                            Utilisateur
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            ref={ usernameRef }
                            isInvalid={ usernameInvalid } />
                        <Form.Control.Feedback type="invalid" ref={ usernameFeedbackRef } />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>
                            Mot de passe
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="password" />
                    </Form.Group>
                    { loginFailed && !fetcher.data &&
                        <Form.Text className="text-danger d-block mb-3">
                            Nom d'utilisateur ou mot de passe invalide.
                        </Form.Text>
                    }
                    <Button variant="primary" type="submit">
                        Se connecter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LoginView;
