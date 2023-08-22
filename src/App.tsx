import { Outlet } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/MainHeader";
import { Container } from "react-bootstrap";
import MainFooter from "./components/MainFooter";

function App() {
    return (
        <div className="App">
            <MainHeader />
            <main>
                <Container className="py-5">
                    <Outlet />
                </Container>
            </main>
            <MainFooter></MainFooter>
        </div>
    );
}

export default App;
