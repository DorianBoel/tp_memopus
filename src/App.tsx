import { Container } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/MainHeader";
import AuthProvider from "./components/AuthProvider";
import MainFooter from "./components/MainFooter";

function App() {
    return (
            <div className="App">
                <DndProvider backend={ HTML5Backend }>
                    <AuthProvider>
                        <MainHeader />
                        <main className="mb-5">
                            <Container className="py-4">
                                <Outlet />
                            </Container>
                        </main>
                        <MainFooter />
                    </AuthProvider>
                </DndProvider>
            </div>
    );
}

export default App;
