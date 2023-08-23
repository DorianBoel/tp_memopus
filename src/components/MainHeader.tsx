import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../resources/logo.svg";

const MainHeader = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="text-black text-decoration-none">
                        <img src={ logo } className="app-logo mb-1" alt="logo" />
                        TP Memo
                    </Link>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default MainHeader;
