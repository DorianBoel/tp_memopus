import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../resources/logo.svg";
import { useAuth } from "../utils/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const MainHeader = () => {
    const auth = useAuth();

    const logout = () => {
        auth.logout();
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="text-black text-decoration-none">
                        <img src={ logo } className="app-logo mb-1" alt="logo" />
                        TP Memo
                    </Link>
                </Navbar.Brand>
                <Nav>
                    { auth.isAuth() && auth.user &&
                        <Nav.Link onClick={ logout }>
                            Se déconnecter
                            <FontAwesomeIcon className="ms-2 mt-1" icon={ faRightFromBracket } />
                        </Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};

export default MainHeader;
