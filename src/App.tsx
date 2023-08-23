import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/MainHeader";

function App() {
    return (
        <div className="App">
            <MainHeader />
            <main>
                <Container className="py-4">
                    <Outlet />
                </Container>
            </main>
            {/* <MainFooter></MainFooter> */}
        </div>
    );
}

export default App;
